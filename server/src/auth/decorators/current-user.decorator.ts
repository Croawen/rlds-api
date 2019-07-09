import { createParamDecorator } from '@nestjs/common';
import { IUserPayload } from 'auth/interfaces/user.payload';

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]): IUserPayload => ctx.req.user,
);
