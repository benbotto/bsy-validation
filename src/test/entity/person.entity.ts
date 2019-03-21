import { Table, Column, OneToMany } from 'formn';

import { PhoneNumber } from '../';

@Table({name: 'people'})
export class Person {
  @Column({name: 'personID', isPrimary: true, isGenerated: true, isNullable: false, sqlDataType: 'int'})
  id: number;

  @Column({hasDefault: true, isNullable: false, sqlDataType: 'timestamp'})
  createdOn: Date;

  @Column({maxLength: 20, sqlDataType: 'varchar'})
  firstName: string;

  @Column({maxLength: 20, sqlDataType: 'varchar'})
  lastName: string;

  @Column({sqlDataType: 'double'})
  weight: number;

  @OneToMany<Person, PhoneNumber>(() => PhoneNumber, (l, r) => [l.id, r.personId])
  phoneNumbers: PhoneNumber[];
}
