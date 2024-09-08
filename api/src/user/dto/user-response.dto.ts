import { User } from '../../entities/user.entity';

export class UserResponseDto extends User {
  token: string;
}