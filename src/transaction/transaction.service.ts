import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'bson';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { AccountService } from '../account/account.service';
import { BaseService } from '../common/base.service';
import { currencyRates } from '../common/currencies';
import { PagerRequestDto } from '../common/pager';
import {
  CreateTransactionDto,
  TransactionDetailsDto,
  TransactionListDto,
} from './dto';
import { TransactionType } from './enums/transaction-type.enum';
import { Transaction } from './model/transaction.model';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
  constructor(
    @InjectModel(Transaction) transactionModel: ModelType<Transaction>,
    @Inject(AccountService) private readonly accountService: AccountService,
  ) {
    super(transactionModel);
  }

  async createTransaction(
    dto: CreateTransactionDto,
    userId: string,
  ): Promise<void> {
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
      category: dto.category,
      createdAt: new Date(),
      user: new ObjectId(userId),
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
      sourceChange: 0,
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
      targetChange: 0,
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
      sourceChange: -sourceChange,
      targetChange,
    };
  }

  async getTransactions(
    userId: string,
    pagerReq: PagerRequestDto,
  ): Promise<TransactionListDto> {
    const accounts = await this.accountService.model.find(
      { user: new ObjectId(userId) },
      { _id: 1 },
    );
    const accountIds = accounts.map(a => a._id);
    const res = await this.getPaged(
      pagerReq,
      {
        $or: [
          { sourceAccount: { $in: accountIds } },
          { targetAccount: { $in: accountIds } },
        ],
      },
      {},
      ['sourceAccount', 'targetAccount'],
    );
    return new TransactionListDto(
      res.items,
      res.totalItems,
      pagerReq.pageSize,
      pagerReq.pageNumber,
    );
  }

  async getTransaction(
    userId: string,
    transactionId: string,
  ): Promise<TransactionDetailsDto> {
    const transaction = await this.model
      .findOne({
        user: new ObjectId(userId),
        _id: new ObjectId(transactionId),
      })
      .populate(['sourceAccount', 'targetAccount']);

    if (!transaction)
      throw new NotFoundException(
        'Transaction with provided id was not found.',
      );

    return new TransactionDetailsDto(transaction);
  }
}
