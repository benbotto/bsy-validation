import { StringValidator } from './';

describe('StringValidator()', () => {
  const v = new StringValidator();

  describe('.validate()', () => {
    it('returns true if the value is a string.', () => {
      expect(v.validate('asdf')).toBe(true);
      expect(v.validate('')).toBe(true);
    });

    it('returns false if the value is not a string.', () => {
      expect(v.validate(12)).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a string.');
    });
  });
});

