import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule, CommonModule],
  providers: [AuthService, JwtStrategy],
  exports: [],
})
export class AuthModule {}
