import { JSONObjectValidator } from './';

describe('JSONObjectValidator()', () => {
  const v = new JSONObjectValidator();

  describe('.validate()', () => {
    it('returns true if the value can be parsed as JSON and the result is an object.', () => {
      expect(v.validate('{}')).toBe(true);
      expect(v.validate('{"name":"joe"}')).toBe(true);
    });

    it('returns false if the value cannot be parsed as JSON.', () => {
      expect(v.validate('{"name":"joe"')).toBe(false);
      expect(v.validate({})).toBe(false);
    });

    it('returns false if the parsed value is not an object.', () => {
      expect(v.validate('[]')).toBe(false);
      expect(v.validate('[{"name":"joe"}]')).toBe(false);
      expect(v.validate(1)).toBe(false);
      expect(v.validate('"str"')).toBe(false);
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
      expect(v.getErrorMessage('foo')).toBe('"foo" must be a valid JSON representation of an object.');
    });
  });
});

