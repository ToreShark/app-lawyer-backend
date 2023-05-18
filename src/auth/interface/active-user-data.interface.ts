import { Role } from '../../users/enum/role.enum';

export interface ActiveUserData {
  sub: string;

  phone: string;

  role: Role;
}
