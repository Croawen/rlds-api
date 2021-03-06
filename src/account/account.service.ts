import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { Account } from './model/account.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, InstanceType } from 'typegoose';
import { CreateAccountDto, AccountListDto, AccountDetailsDto } from './dto';
import { ObjectId } from 'bson';
import { BaseService } from '../common/base.service';
import { PagerRequestDto } from '../common/pager';
import { EditAccountDto } from './dto/edit-account.dto';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(@InjectModel(Account) accountModel: ModelType<Account>) {
    super(accountModel);
  }

  async createAccount(userId: string, dto: CreateAccountDto): Promise<void> {
    const account = new this.model({
      ...dto,
      group: new ObjectId(dto.group),
      user: new ObjectId(userId),
    });

    await account.save();
  }

  async updateAccount(
    userId: string,
    accountId: string,
    dto: EditAccountDto,
  ): Promise<void> {
    const account = await this.getAccountEntity(userId, accountId);
    account.name = dto.name;
    account.description = dto.description;

    await account.save();
  }

  async deleteAccount(userId: string, accountId: string): Promise<void> {
    const account = await this.getAccountEntity(userId, accountId);

    account.isDeleted = true;
    await account.save();
  }

  async getAccounts(
    userId: string,
    pagerReq: PagerRequestDto,
  ): Promise<AccountListDto> {
    const res = await this.getPaged(pagerReq, {
      user: new ObjectId(userId),
      isDeleted: false,
    });
    return new AccountListDto(
      res.items,
      res.totalItems,
      pagerReq.pageSize,
      pagerReq.pageNumber,
    );
  }

  async getAccountDetails(
    userId: string,
    accountId: string,
  ): Promise<AccountDetailsDto> {
    const account = await (await this.getAccountEntity(userId, accountId))
      .populate('group')
      .execPopulate();

    return new AccountDetailsDto(account);
  }

  private async getAccountEntity(
    userId: string,
    accountId: string,
  ): Promise<InstanceType<Account>> {
    const account = await this.model.findOne({
      _id: new ObjectId(accountId),
      user: new ObjectId(userId),
      isDeleted: false,
    });

    if (!account)
      throw new NotFoundException('Account with provided id was not found.');

    return account;
  }
}
