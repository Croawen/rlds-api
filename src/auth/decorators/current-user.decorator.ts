import { createParamDecorator } from '@nestjs/common';
import { IUserPayload } from 'auth/interfaces/user.payload';

export const CurrentUser = createParamDecorator(
  (data, req): IUserPayload => {
    return req.user;
  },
);
