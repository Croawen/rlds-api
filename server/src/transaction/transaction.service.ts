import {
  Injectable,
  Inject,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { BaseService } from 'common/base.service';
import { Transaction } from './model/transaction.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { CreateTransactionDto } from './dto';
import { AccountService } from 'account/account.service';
import { TransactionType } from './enums/transaction-type.enum';
import { currencyRates } from 'common/currencies';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
  constructor(
    @InjectModel(Transaction) transactionModel: ModelType<Transaction>,
    @Inject(AccountService) private readonly accountService: AccountService,
  ) {
    super(transactionModel);
  }

  async createTransaction(dto: CreateTransactionDto): Promise<void> {
    let transactionObj = {};

    switch (dto.type) {
      case TransactionType.DEPOSIT:
        const depositRes = await this.createDepositTransaction(
          dto.targetAccount,
          dto.amount,
        );
        transactionObj = { ...depositRes };
        break;

      case TransactionType.WITHDRAW:
        const withdrawRes = await this.createWithdrawTransaction(
          dto.sourceAccount,
          dto.amount,
        );
        transactionObj = { ...withdrawRes };
        break;

      case TransactionType.TRANSFER:
        const transferRes = await this.createTransferTransaction(
          dto.sourceAccount,
          dto.targetAccount,
          dto.amount,
        );
        transactionObj = { ...transferRes };
        break;

      default:
        throw new BadRequestException('Invalid transaction type.');
    }

    const transaction = new this.model({
      ...transactionObj,
      title: dto.title,
      type: dto.type,
      createdAt: new Date(),
    });
    await transaction.save();
  }

  private async createDepositTransaction(
    targetAccountId: string,
    amount: number,
  ): Promise<any> {
    const targetAccount = await this.accountService.model.findById(
      targetAccountId,
    );

    targetAccount.balance += amount;
    await targetAccount.save();

    return {
      targetAccount: targetAccount._id,
      sourceAccount: null,
      targetChange: amount,
    };
  }

  private async createWithdrawTransaction(
    sourceAccountId: string,
    amount: number,
  ): Promise<any> {
    const sourceAccount = await this.accountService.model.findById(
      sourceAccountId,
    );

    if (sourceAccount.balance < amount)
      throw new HttpException('Insignificant balance on source account.', 460);

    sourceAccount.balance -= amount;
    sourceAccount.transactionCount++;
    await sourceAccount.save();

    return {
      sourceAccount: sourceAccount._id,
      targetAccount: null,
      sourceChange: -amount,
    };
  }

  private async createTransferTransaction(
    sourceAccountId: string,
    targetAccountId: string,
    value: number,
  ): Promise<any> {
    const sourceAccount = await this.accountService.model.findById(
      sourceAccountId,
    );
    const targetAccount = await this.accountService.model.findById(
      targetAccountId,
    );
    const sourceChange = value;
    let targetChange = value;

    if (sourceAccount.currency !== targetAccount.currency) {
      const currencyRate =
        currencyRates[sourceAccount.currency][targetAccount.currency];
      targetChange = value * currencyRate;
    }

    if (sourceAccount.balance < value)
      throw new HttpException('Insignificant balance on source account.', 460);

    sourceAccount.balance -= sourceChange;
    targetAccount.balance += targetChange;
    sourceAccount.transactionCount++;
    targetAccount.transactionCount++;
    await Promise.all([sourceAccount.save(), targetAccount.save()]);

    return {
      sourceAccount: sourceAccount._id,
      targetAccount: targetAccount._id,
      sourceChange,
      targetChange,
    };
  }
}
