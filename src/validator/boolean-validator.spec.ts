import { BooleanValidator } from './';

describe('BooleanValidator()', () => {
  const v = new BooleanValidator();

  describe('.validate()', () => {
    it('returns true if the value is a bool.', () => {
      expect(v.validate(true)).toBe(true);
      expect(v.validate(false)).toBe(true);
    });

    it('returns false if the values is not a bool.', () => {
      expect(v.validate('1')).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid boolean.');
    });
  });
});

