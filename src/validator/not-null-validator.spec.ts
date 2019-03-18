import { NotNullValidator } from './';

describe('NotNullValidator()', () => {
  const v = new NotNullValidator();

  describe('.validate()', () => {
    it('returns true if the value is not null.', () => {
      expect(v.validate('')).toBe(true);
      expect(v.validate(false)).toBe(true);
      expect(v.validate(undefined)).toBe(true);
    });

    it('returns false if the value is null.', () => {
      expect(v.validate(null)).toBe(false);
    });
  });

  describe('.getErrorMessage()', () => {
    it('returns an error message.', () => {
      expect(v.getErrorMessage('foo')).toBe('"foo" must not be null.');
    });
  });
});

