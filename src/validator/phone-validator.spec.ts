import { PhoneValidator } from './';

describe('PhoneValidator()', () => {
  const v = new PhoneValidator();

  describe('.validate()', () => {
    it('returns true if the value is a US phone.', () => {
      expect(v.validate('9162241111')).toBe(true);
      expect(v.validate('916224111112')).toBe(true);
      expect(v.validate('9162241111e12')).toBe(true);
      expect(v.validate('9162241111 12')).toBe(true);
      expect(v.validate('(916)2241111')).toBe(true);
      expect(v.validate('(916)224111112')).toBe(true);
      expect(v.validate('(916)2241111 12')).toBe(true);
      expect(v.validate('(916)-2241111')).toBe(true);
      expect(v.validate('(916).2241111')).toBe(true);
      expect(v.validate('(916) 2241111')).toBe(true);
      expect(v.validate('(916)-224-1111')).toBe(true);
      expect(v.validate('(916)-224.1111')).toBe(true);
      expect(v.validate('(916)-224 1111')).toBe(true);
      expect(v.validate('(916)-224 1111 12')).toBe(true);
      expect(v.validate('(916)-224 1111 e12')).toBe(true);
      expect(v.validate('(916)-224 1111 ex12')).toBe(true);
      expect(v.validate('(916)-224 1111 ext12')).toBe(true);
      expect(v.validate('(916)-224 1111 ext.12')).toBe(true);
      expect(v.validate('(916)-224 1111 ext. 12')).toBe(true);
    });

    it('returns false if the phone number starts with a 1.', () => {
      expect(v.validate('1 234 456 9900 ext. 21')).toBe(false);
      expect(v.validate('1 916-224-1111')).toBe(false);
    });

    it('returns false for three-digit phones.', () => {
      expect(v.validate('911')).toBe(false);
    });

    it('returns false if the value is not a valid phone.', () => {
      expect(v.validate('test')).toBe(false);
      expect(v.validate(' 9162241111')).toBe(false);
      expect(v.validate('916  2241111')).toBe(false);
      expect(v.validate('916224  1111')).toBe(false);
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

