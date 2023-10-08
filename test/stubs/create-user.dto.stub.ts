import { VerifyUserDto } from '@src/user/dto/verify-user.dto';

export const CreateUserDtoStub = (): VerifyUserDto => {
  return <VerifyUserDto>{
    login: 'myLogin111',
    password: 'Lolkek123!',
    email: '222some@mail.com',
  };
};
