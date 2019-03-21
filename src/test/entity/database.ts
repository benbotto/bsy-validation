import { Person, PhoneNumber }  from '../';

import { Column, Table, ManyToOne, OneToMany, metaFactory } from 'formn';

// This file clears all the metadata cache and manually decorates each class
// when testing.
export function initDB() {
  let colDec, relDec, tblDec;

  metaFactory.clear();

  // Person.
  colDec = Column({name: 'personID', isPrimary: true, isGenerated: true, isNullable: false, sqlDataType: 'int'});
  colDec(Person.prototype, 'id');

  colDec = Column({maxLength: 255, sqlDataType: 'varchar'});
  colDec(Person.prototype, 'firstName');

  colDec = Column({maxLength: 255, sqlDataType: 'varchar'});
  colDec(Person.prototype, 'lastName');

  colDec = Column({hasDefault: true, isNullable: false, sqlDataType: 'timestamp'});
  colDec(Person.prototype, 'createdOn');

  colDec = Column({sqlDataType: 'double'});
  colDec(Person.prototype, 'weight');

  relDec = OneToMany<Person, PhoneNumber>(() => PhoneNumber, (l, r) => [l.id, r.personId]);
  relDec(Person.prototype, 'phoneNumbers');

  tblDec = Table({name: 'Persons'});
  tblDec(Person);

  // PhoneNumber.
  colDec = Column({name: 'phoneNumberID', isPrimary: true, isGenerated: true, isNullable: false, sqlDataType: 'int'});
  colDec(PhoneNumber.prototype, 'id');

  colDec = Column({isNullable: false, maxLength: 255, sqlDataType: 'varchar'});
  colDec(PhoneNumber.prototype, 'phoneNumber');

  colDec = Column({maxLength: 255, sqlDataType: 'varchar'});
  colDec(PhoneNumber.prototype, 'type');

  colDec = Column({name: 'personID', isNullable: false, sqlDataType: 'int'});
  colDec(PhoneNumber.prototype, 'personId');

  relDec = ManyToOne<PhoneNumber, Person>(() => Person, (l, r) => [l.personId, r.id]);
  relDec(PhoneNumber.prototype, 'person');

  tblDec = Table({name: 'phone_numbers'});
  tblDec(PhoneNumber);
}

