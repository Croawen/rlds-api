import { createParamDecorator } from '@nestjs/common';
import { IUserPayload } from '../interfaces/user.payload';

export const CurrentUser = createParamDecorator(
  (data, req): IUserPayload => {
    return req.user;
  },
);
