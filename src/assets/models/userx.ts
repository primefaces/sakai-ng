
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
  roles?: string[];
  new? : boolean;

  static getTableColumns(): any[] {
    return [
      {field: 'id', header: 'Id'},
      {field: 'username', header: 'Username'},
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'email', header: 'E-Mail'},
      {field: 'enabled', header: 'Enabled'},
      {field: 'roles', header: 'Roles'},
      {field: 'new', header: 'is New'}
    ]
  }

    static getFilterFields(): string[] {
        return ['id', 'username', 'email']
    }
}


