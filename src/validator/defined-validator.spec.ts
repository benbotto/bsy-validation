import { DefinedValidator } from './';

describe('DefinedValidator()', () => {
  const v = new DefinedValidator();

  describe('.validate()', () => {
    it('returns true if the value is defined.', () => {
      expect(v.validate('')).toBe(true);
      expect(v.validate(false)).toBe(true);
      expect(v.validate(null)).toBe(true);
    });

    it('returns false if the value is not defined.', () => {
      expect(v.validate(undefined)).toBe(false);
    });
  });

  describe('.getErrorMessage()', () => {
    it('returns an error message.', () => {
      expect(v.getErrorMessage('foo')).toBe('"foo" must be defined.');
    });
  });
});
