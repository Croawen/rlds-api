import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { GroupModule } from './group/group.module';
import { CommonModule } from './common/common.module';
import { ConfigService, Config } from './common/config';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get(Config.MONGO_URI),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
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
