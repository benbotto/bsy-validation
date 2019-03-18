import { NumberValidator } from './';

describe('NumberValidator()', () => {
  const v = new NumberValidator();

  describe('.validate()', () => {
    it('returns true if the value is a number.', () => {
      expect(v.validate(1)).toBe(true);
      expect(v.validate(0)).toBe(true);
      expect(v.validate(-123.456)).toBe(true);
      expect(v.validate(123.24)).toBe(true);
    });

    it('returns true if the value is a string that can be coerced to a number.', () => {
      expect(v.validate('1.3')).toBe(true);
      expect(v.validate('0')).toBe(true);
      expect(v.validate('-123.43')).toBe(true);
    });

    it('returns false if the value is cannot be coerced to a number.', () => {
      expect(v.validate('a')).toBe(false);
    });

    it('skips the validation if the value is null.', () => {
      expect(v.validate(null)).toBe(true);
    });

    it('skips the validation if the value is undefined.', () => {
      expect(v.validate(undefined)).toBe(true);
    });
  });

  describe('.getErrorMessage()', () => {
    it('returns an error message.', () => {
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid number.');
    });
  });
});

