import { PhoneValidator } from './';

describe('Validator()', () => {
  const v = new PhoneValidator();

  describe('.validate()', () => {
    it('returns true if the has at least 10 digits.', () => {
      expect(v.validate('1234567890')).toBe(true);
      expect(v.validate('1234567890123')).toBe(true);
      expect(v.validate('123.456-7890')).toBe(true);
    });

    it('returns false if the value has fewer than 10 characters.', () => {
      expect(v.validate('911')).toBe(false);
    });
  });

  describe('.getErrorMessage()', () => {
    it('returns an error message.', () => {
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid phone number.');
    });
  });
});

