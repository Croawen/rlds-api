import { Module } from '@nestjs/common';
import { Transaction } from './model/transaction.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [TransactionController],
  exports: [],
  imports: [TypegooseModule.forFeature([Transaction]), AccountModule],
  providers: [TransactionService],
})
export class TransactionModule {}
