import { MinLengthValidator } from './';

describe('MinLengthValidator()', () => {
  const v = new MinLengthValidator(2);

  describe('.validate()', () => {
    it('returns true if the string is long enough.', () => {
      expect(v.validate('12')).toBe(true);
      expect(v.validate('123')).toBe(true);
      expect(v.validate('124')).toBe(true);
      expect(v.validate(12)).toBe(true); // Cast to string.
    });

    it('returns false if the string is too short.', () => {
      expect(v.validate('1')).toBe(false);
      expect(v.validate('')).toBe(false);
      expect(v.validate(1)).toBe(false);
    });

    it('returns true if the array is long enough.', () => {
      expect(v.validate([1, 2])).toBe(true);
      expect(v.validate([1, 2, 3])).toBe(true);
    });

    it('returns false if the array is not long enough.', () => {
      expect(v.validate([])).toBe(false);
      expect(v.validate([1])).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must have a length of at least 2.');
    });
  });
});

