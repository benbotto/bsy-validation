import {
  ObjectValidator, MaxLengthValidator, PhoneValidator, Validator
} from './';
import { validationFactory } from '../';
import { ValidationMetadata, Validate } from '../decorator/';

import { TestClass } from '../test/test-class';

describe('ObjectValidator()', () => {
  const ov: ObjectValidator = new ObjectValidator();

  beforeEach(() => {
    validationFactory.clear();
  });

  describe('.validate()', () => {
    let obj: {[key: string]: any};

    it('applies all constraints, even if one fails.', (done) => {
      obj = {
        phone: 'asdf 1234'
      };

      Validate(new MaxLengthValidator(3))(TestClass.prototype, 'phone');
      Validate(new PhoneValidator())(TestClass.prototype, 'phone');

      ov
        .validate(obj, TestClass)
        .catch(errList => {
          expect(errList.errors.length).toBe(2);

          // Order is reversed intentionally.  See the note in ObjectValidator.
          expect(errList.errors[0].message).toBe('"phone" must be a valid phone number.');
          expect(errList.errors[1].message).toBe('"phone" must be at most 3 characters long.');

          done();
        });
    });

    it('applies validators until one fails.', (done) => {
      obj = {
        phone: 'asdf 1234'
      };

      Validate(
        new MaxLengthValidator(3),
        new PhoneValidator())(TestClass.prototype, 'phone');

      ov
        .validate(obj, TestClass)
        .catch(errList => {
          expect(errList.errors.length).toBe(1);

          expect(errList.errors[0].message).toBe('"phone" must be at most 3 characters long.');

          done();
        });
    });

    it('passes if an asyn validator resolves.', (done) => {
      class ResolveValidator implements Validator {
        validate(val: any): Promise<void> {
          return new Promise(resolve =>
            setTimeout(() => resolve(), 0));
        }

        getErrorMessage(prop: string): string {
          return '';
        }
      }

      obj = {
        phone: '223-456-7890'
      };

      Validate(
        new MaxLengthValidator(12),
        new ResolveValidator(),
        new PhoneValidator())(TestClass.prototype, 'phone');

      ov
        .validate(obj, TestClass)
        .then(() => done())
    });

    it('fails if an asyn validator rejects.', (done) => {
      class RejectValidator implements Validator {
        validate(val: any): Promise<void> {
          return new Promise((resolve, reject) =>
            setTimeout(() => reject(new Error('foo')), 0));
        }

        getErrorMessage(prop: string): string {
          return 'Rejected!';
        }
      }

      obj = {
        phone: '123-456-7890'
      };

      Validate(
        new MaxLengthValidator(12),
        new RejectValidator(),
        new PhoneValidator())(TestClass.prototype, 'phone');

      ov
        .validate(obj, TestClass)
        .catch(errList => {
          expect(errList.errors.length).toBe(1);
          expect(errList.errors[0].message).toBe('Rejected!');
          done();
        });
    });
  });
});

