import { UUID } from 'angular2-uuid';

export class User {
  id: UUID = "";
  username: string = "";
  email: string = "";
  role: string = "GUEST";
}
