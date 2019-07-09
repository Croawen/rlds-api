import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'user/user.module';
import { CommonModule } from 'common/common.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [UserModule, CommonModule],
  providers: [AuthService, JwtStrategy],
  exports: [],
})
export class AuthModule {}
