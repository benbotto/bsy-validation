import { MaxLengthValidator } from './';

describe('MaxLengthValidator()', () => {
  const v = new MaxLengthValidator(2);

  describe('.validate()', () => {
    it('returns true if the string is less than or equal to the max length.', () => {
      expect(v.validate('')).toBe(true);
      expect(v.validate('1')).toBe(true);
      expect(v.validate('12')).toBe(true);
      expect(v.validate(12)).toBe(true); // Cast to string.
    });

    it('returns false if the string exceeds the max length.', () => {
      expect(v.validate('123')).toBe(false);
      expect(v.validate('1234')).toBe(false);
      expect(v.validate(123)).toBe(false);
    });

    it('returns true if the array is less than or equal to the max length.', () => {
      expect(v.validate([])).toBe(true);
      expect(v.validate([1])).toBe(true);
      expect(v.validate([1, 2])).toBe(true);
    });

    it('returns false if the array exceeds the max length.', () => {
      expect(v.validate([1, 2, 3])).toBe(false);
      expect(v.validate([1, 2, 3, 4])).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be at most 2 characters long.');
    });
  });
});

