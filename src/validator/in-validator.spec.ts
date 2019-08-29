import { InValidator } from './';

describe('InValidator()', () => {
  const v = new InValidator<string>(['Ben', 'Jack', 'Jill']);

  describe('.validate()', () => {
    it('returns true if the values is included in the list of valid values.', () => {
      expect(v.validate('Ben')).toBe(true);
      expect(v.validate('Jack')).toBe(true);
      expect(v.validate('Jill')).toBe(true);
    });

    it('returns true if the values is null.', () => {
      expect(v.validate(null)).toBe(true);
    });

    it('returns true if the values is undefined.', () => {
      expect(v.validate(undefined)).toBe(true);
    });

    it('returns false if the value is not included in the list of valid values.', () => {
      expect(v.validate('Paul')).toBe(false);
    });
  });

  describe('.getErrorMessage()', () => {
    it('returns an error message.', () => {
      expect(v.getErrorMessage('name')).toBe('"name" must be one of "Ben, Jack, Jill."');
    });
  });
});

