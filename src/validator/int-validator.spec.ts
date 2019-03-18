import { IntValidator } from './';

describe('IntValidator()', () => {
  const v = new IntValidator();

  describe('.validate()', () => {
    it('returns true if the value is an int.', () => {
      expect(v.validate(1)).toBe(true);
      expect(v.validate(0)).toBe(true);
      expect(v.validate(-123)).toBe(true);
      expect(v.validate(123.00)).toBe(true);
    });

    it('returns true if the value is a string that can be coerced to an int.', () => {
      expect(v.validate('1')).toBe(true);
      expect(v.validate('0')).toBe(true);
      expect(v.validate('-123')).toBe(true);
    });

    it('returns false if the value is a float.', () => {
      expect(v.validate(1.23)).toBe(false);
    });

    it('returns false if the value is cannot be coerced to an int.', () => {
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid integer.');
    });
  });
});

