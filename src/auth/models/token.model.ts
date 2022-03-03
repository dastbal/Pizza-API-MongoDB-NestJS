import { User } from "src/users/entities/user.entity";

export interface PayloadToken {
  sub: string;
  role: string;
  user: User;
}
