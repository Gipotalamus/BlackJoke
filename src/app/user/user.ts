export class User {
  id: number;
  name: string;
  role: string;
  loggedIn: boolean;
  constructor(id: number, name: string, role: string, loggedIn: boolean){
    this.id = id;
    this.name = name;
    this.role = role;
    this.loggedIn = loggedIn;
  }
}
