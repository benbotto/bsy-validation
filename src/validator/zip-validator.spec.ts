import { ZipValidator } from './';

describe('ZipValidator()', () => {
  const v = new ZipValidator();

  describe('.validate()', () => {
    it('returns true if the value is a zip code.', () => {
      expect(v.validate('96150')).toBe(true);
      expect(v.validate('96150 0011')).toBe(true);
      expect(v.validate('96150-1234')).toBe(true);
    });

    it('returns false if the value is not a valid zip code.', () => {
      expect(v.validate('test')).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid zip code.');
    });
  });
});

