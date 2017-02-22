export class User {
  username: string;
  token: string;

  private admin: boolean;

  constructor(
    username: string = '',
    isAdmin: boolean = false,
    token: string = ''
  ) {
    this.username = username;
    this.admin = isAdmin;
    this.token = token;
  }

  isAdmin(): boolean
  {
    return this.admin;
  }
}
