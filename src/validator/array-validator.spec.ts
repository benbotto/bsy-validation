import { ArrayValidator } from './';

describe('ArrayValidator()', () => {
  const v = new ArrayValidator();

  describe('.validate()', () => {
    it('returns true if the value is an array.', () => {
      expect(v.validate([])).toBe(true);
      expect(v.validate([1,2,3])).toBe(true);
    });

    it('returns false if the values is not an array.', () => {
      expect(v.validate({})).toBe(false);
      expect(v.validate(0)).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid array.');
    });
  });
});

