export class UserClass {
  usermail!: string;
  username!: string;
  password!: string;
  timestamp!: number;
  constructor(username = "", usermail = "", password = "") {
    this.username = username;
    this.usermail = usermail;
    this.password = password;
    this.timestamp = Date.now();
  }
}
