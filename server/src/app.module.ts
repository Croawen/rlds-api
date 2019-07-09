import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from 'user/user.module';
import { AccountModule } from 'account/account.module';
import { TransactionModule } from 'transaction/transaction.module';
import { GroupModule } from 'group/group.module';

@Module({
  imports: [
    TypegooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule,
    AccountModule,
    GroupModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
