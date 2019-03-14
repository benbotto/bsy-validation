import { Constraint } from '../';
import { StringValidator, MaxLengthValidator, PhoneValidator } from '../';

/**
 * This class is only used for testing and is not part of the build.
 */
export class TestClass {
  @Constraint(new StringValidator())
  @Constraint(new MaxLengthValidator(10))
  firstName: string;

  @Constraint(new StringValidator())
  @Constraint(new PhoneValidator())
  phone: string;
}

