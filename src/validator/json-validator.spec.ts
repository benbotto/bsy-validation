import { JSONValidator } from './';

describe('JSONValidator()', () => {
  const v = new JSONValidator();

  describe('.validate()', () => {
    it('returns true if the value can be parsed as JSON.', () => {
      expect(v.validate('{}')).toBe(true);
      expect(v.validate('{"name":"joe"}')).toBe(true);
      expect(v.validate('[]')).toBe(true);
      expect(v.validate('[{"name":"joe"}]')).toBe(true);
      expect(v.validate(1)).toBe(true);
      expect(v.validate('"str"')).toBe(true);
    });

    it('returns false if the value cannot be parsed as JSON.', () => {
      expect(v.validate('{"name":"joe"')).toBe(false);
      expect(v.validate({})).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be valid JSON.');
    });
  });
});

