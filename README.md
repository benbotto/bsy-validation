# bsy-validation

Light validation utilities for TypeScript classes.  With bsy-validation, class properties are decorated with validators, and then plain objects can be validated against a class's validation schema.

Note that version 2 is a complete rewrite, and is not backwards compatible.

### Installation

With yarn:

```
yarn add bsy-validation@2.x.x
```

With npm:

```
npm install --save bsy-validation@2.x.x
```

Ensure that you have `experimentalDecorators` and `emitDecoratorMetadata` enabled in your `tsconfig.json`.

### Usage

First, decorate a class's properties with the `@Validate` decorator.  Supply one or more [Validators](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/validator.ts) as arguments.  All of the [Validator](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/validator.ts) classes can be found in the [validator](https://github.com/benbotto/bsy-validation/tree/develop-2.x.x/src/validator) directory.

For example, here is a decorated `Person` class.

```typescript
import {
  Validate, IntValidator, StringValidator, MaxLengthValidator, EmailValidator,
  PhoneValidator, DateValidator, NumberValidator
} from 'bsy-validation';

export class Person {
  @Validate(new IntValidator())
  id: number;

  @Validate(
    new StringValidator(),
    new MaxLengthValidator(50))
  name: string;

  @Validate(new PhoneValidator())
  phone: string;

  @Validate(new EmailValidator())
  email: string;

  @Validate(new DateValidator())
  dob: Date;

  @Validate(new NumberValidator())
  weight: number;
}
```

An object can be checked against this class's validation schema using an [ObjectValidator](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/object-validator.ts) instance.  This class's `validate` method takes two arguments: An object to validate, and a the constructor of a `@Validate`-decorated class.  It returns a promise that is resolved if the object is valid, or rejected with one or more errors if the object is invalid.

Here's an example of a valid `Person` object.

```typescript
import { ObjectValidator } from 'bsy-validation';

import { Person } from './person';

const validator = new ObjectValidator();

// Joe Dirt is valid.
const joeDirt = {
  id: 42,
  name: 'Joe Dirte',
  phone: '530-444-5555',
  email: 'dirte@itsfrench.com',
  dob: '1983-09-19T00:00:00.000Z',
  weight: 205
};

validator
  .validate(joeDirt, Person)
  .then(() => console.log('Joe Dirt is valid.'))
  .catch(console.error);
```

The above logs "Joe Dirt is valid."  Here's an example of an invalid object.

```typescript
import { ObjectValidator } from 'bsy-validation';

import { Person } from './person';

const validator = new ObjectValidator();

// Donald Trump is invalid.
const emperorTrump = {
  id: 74.7, // Not a valid int.
  name: 'Trust me people, my name is Mister Magnificient Trump', // Too long.
  weight: 239 // A lie, but valid.
};

validator
  .validate(emperorTrump, Person)
  .then(() => console.log('Trump is valid.'))
  .catch(err => console.error(JSON.stringify(err, null, 2)));
```

The above logs an error that describes why the object is invalid.

```
{
  "code": "VAL_ERROR_LIST",
  "name": "ValidationErrorList",
  "detail": "Validation errors occurred.",
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "name": "ValidationError",
      "detail": "\"name\" must be at most 50 characters long.",
      "field": "name"
    },
    {
      "code": "VALIDATION_ERROR",
      "name": "ValidationError",
      "detail": "\"id\" must be a valid integer.",
      "field": "id"
    }
  ]
}
```

### Validator Call Order

For a given `@Validate`-decorated property, validators are applied in order.  If one of the validators fails, then execution halts.  For example, in the `Person` class defined above, `Person.name` has two validators: [StringValidator](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/string-validator.ts) and [MaxLengthValidator](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/max-length-validator.ts).  [StringValidator](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/string-validator.ts) is applied first, then [MaxLengthValidator](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/max-length-validator.ts) is  called *if [StringValidator](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/string-validator.ts) passes*.

```typescript
const aGirlHasNoName = {
  name: false // Not a string.
};

validator
  .validate(aGirlHasNoName, Person)
  .catch(err => console.error(JSON.stringify(err, null, 2)));
```

In the above example, `aGirlHasNoName.name` is not a string, so [MaxLengthValidator](https://github.com/benbotto/bsy-validation/blob/develop-2.x.x/src/validator/max-length-validator.ts) is never executed.  The above logs the following error.

```
{
  "code": "VAL_ERROR_LIST",
  "name": "ValidationErrorList",
  "detail": "Validation errors occurred.",
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "name": "ValidationError",
      "detail": "\"name\" must be a string.",
      "field": "name"
    }
  ]
}
```
