import { NotBlankValidator } from './';

describe('Validator()', () => {
  const v = new NotBlankValidator();

  describe('.validate()', () => {
    it('returns true if the value is not blank.', () => {
      expect(v.validate('asdf')).toBe(true);
      expect(v.validate(' ')).toBe(true);
    });

    it('returns false if the value is blank.', () => {
      expect(v.validate('')).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must not be blank.');
    });
  });
});

