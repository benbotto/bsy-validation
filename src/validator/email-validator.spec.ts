import { EmailValidator } from './';

describe('EmailValidator()', () => {
  const v = new EmailValidator();

  describe('.validate()', () => {
    it('returns true if the value is an email address.', () => {
      expect(v.validate('test@test.com')).toBe(true);
      expect(v.validate('a@b.info')).toBe(true);
      expect(v.validate('as@[192.168.2.2]')).toBe(true);
    });

    it('returns false if the value is not a valid email.', () => {
      expect(v.validate('test@computer')).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid email address.');
    });
  });
});

