import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtTokenPayload } from '@civic-pulse/contracts';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtTokenPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtTokenPayload | undefined;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
