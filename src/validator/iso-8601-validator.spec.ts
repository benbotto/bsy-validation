import { ISO8601Validator } from './';

describe('ISO8601Validator()', () => {
  const v = new ISO8601Validator();

  describe('.validate()', () => {
    it('returns true if the value is a valid date string.', () => {
      expect(v.validate('1983-09-19T04:05:06.999Z')).toBe(true);
    });

    it('returns false if the value is not a valid date string.', () => {
      expect(v.validate('')).toBe(false);
      expect(v.validate('1983-01-02')).toBe(false);
      expect(v.validate('04/02/2019')).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid UTC date in ISO8601 format.');
    });
  });
});

