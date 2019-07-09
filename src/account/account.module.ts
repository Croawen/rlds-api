import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Account } from './model/account.model';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [TypegooseModule.forFeature([Account])],
  providers: [AccountService],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
