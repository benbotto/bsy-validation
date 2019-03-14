import { MaxLengthValidator } from './';

describe('Validator()', () => {
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
  });

  describe('.getErrorMessage()', () => {
    it('returns an error message.', () => {
      expect(v.getErrorMessage('foo')).toBe('"foo" must be at most 2 characters long.');
    });
  });
});

