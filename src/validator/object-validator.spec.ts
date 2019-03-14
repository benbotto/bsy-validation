import { ObjectValidator } from './';
import { TestClass } from '../test/test-class';

describe('ObjectValidator()', () => {
  let ov: ObjectValidator;

  beforeEach(() => ov = new ObjectValidator());

  describe('.validate()', () => {
    let obj: {[key: string]: any};

    beforeEach(() => {
      obj = {
        firstName: 'Joe',
        phone: '123-456-7890'
      };
    });

    it('rejects if the property is not a string.', (done) => {
      obj.firstName = 1;

      ov
        .validate(obj, TestClass)
        .catch(err => {
          expect(err.length).toBe(1);
          expect(err[0].message).toBe('"firstName" must be a string.');
          done();
        });
    });

    it('rejects if the property exceeds a max length.', (done) => {
      obj.firstName = 'Mr. Bart Simpson';

      ov
        .validate(obj, TestClass)
        .catch(err => {
          expect(err.length).toBe(1);
          expect(err[0].message).toBe('"firstName" must be at most 10 characters long.');
          done();
        });
    });

    it('executes validators in order, top to bottom.', (done) => {
      obj.phone = 1;

      ov
        .validate(obj, TestClass)
        .catch(err => {
          expect(err.length).toBe(2);
          expect(err[0].message).toBe('"phone" must be a string.');
          expect(err[1].message).toBe('"phone" is not a valid phone number.');
          done();
        });
    });
  });
});

