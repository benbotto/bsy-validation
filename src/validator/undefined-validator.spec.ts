import { UndefinedValidator } from './';

describe('UndefinedValidator()', () => {
  const v = new UndefinedValidator();

  describe('.validate()', () => {
    it('returns true if the value is undefined.', () => {
      expect(v.validate(undefined)).toBe(true);
    });

    it('returns false if the value is defined.', () => {
      expect(v.validate('')).toBe(false);
      expect(v.validate(false)).toBe(false);
      expect(v.validate(null)).toBe(false);
    });
  });

  describe('.getErrorMessage()', () => {
    it('returns an error message.', () => {
      expect(v.getErrorMessage('foo')).toBe('"foo" must not be defined.');
    });
  });
});
