import {Role} from "./enums/role";

export class Userx {
  id!: string;
  username?: string;
  createDate?: Date;
  updateDate?: Date;
  password!: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  enabled?: boolean;
  role?: string[];
  new? : boolean;

  static getTableColumns(): any[] {
    return [
      {field: 'id', header: 'Id'},
      {field: 'username', header: 'Username'},
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'email', header: 'E-Mail'},
      {field: 'enabled', header: 'Enabled'},
      {field: 'role', header: 'Role'},
      {field: 'new', header: 'is New'}
    ]
  }
}

export class UserxDTO {
  username?: string;
  createDate?: Date;
  updateDate?: Date;
  password!: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  enabled?: boolean;
  roles?: Role[];
  id?: string;
  new?: boolean;
}

