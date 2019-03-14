import { StringValidator } from './';

describe('Validator()', () => {
  const v = new StringValidator();

  describe('.validate()', () => {
    it('returns true if the value is a string.', () => {
      expect(v.validate('asdf')).toBe(true);
      expect(v.validate('')).toBe(true);
    });

    it('returns false if the value is not a string.', () => {
      expect(v.validate(12)).toBe(false);
    });
  });

  describe('.getErrorMessage()', () => {
    it('returns an error message.', () => {
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a string.');
    });
  });
});
