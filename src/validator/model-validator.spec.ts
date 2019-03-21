import { initDB, Person } from '../test/';
import { ModelValidator } from './';

describe('ModelValidator()', () => {  
  const mv = new ModelValidator();

  beforeEach(() => initDB());

  describe('.validate()', () => {
    it('fails()', () => {
      const obj = {
        firstName: 'Jack'
      };

      mv.validate(obj, Person);
    });
  });
});

