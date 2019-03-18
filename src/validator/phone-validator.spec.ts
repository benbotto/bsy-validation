import { PhoneValidator } from './';

describe('PhoneValidator()', () => {
  const v = new PhoneValidator();

  describe('.validate()', () => {
    it('returns true if the value has at least 10 digits.', () => {
      expect(v.validate('1234567890')).toBe(true);
      expect(v.validate('1234567890123')).toBe(true);
      expect(v.validate('123.456-7890')).toBe(true);
    });

    it('returns false if the value has fewer than 10 characters.', () => {
      expect(v.validate('911')).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid phone number.');
    });
  });
});

