import {
  ApiUseTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Inject,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto, AccountListDto, AccountDetailsDto } from './dto';
import { CurrentUser } from 'auth/decorators/current-user.decorator';
import { IUserPayload } from 'auth/interfaces/user.payload';
import { ParsePagerRequestPipe, PagerRequestDto } from 'common/pager';

@Controller()
@ApiUseTags('Accounts')
export class AccountController {
  constructor(
    @Inject(AccountService) private readonly accountService: AccountService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create a new account.' })
  @ApiOkResponse({ description: 'New account has been created.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiResponse({
    status: 460,
    description: 'Account with this name already exists.',
  })
  async create(
    @CurrentUser() user: IUserPayload,
    @Body() dto: CreateAccountDto,
  ): Promise<void> {
    return this.accountService.createAccount(user.id, dto);
  }

  @Delete(':accountId')
  @ApiOperation({ title: 'Delete account with provided id.' })
  @ApiOkResponse({ description: 'Account deleted.' })
  @ApiNotFoundResponse({ description: 'Account not found.' })
  @ApiResponse({
    status: 460,
    description: 'Users can only delete their own accounts.',
  })
  async delete(
    @CurrentUser() user: IUserPayload,
    @Param('accountId') accountId: string,
  ): Promise<void> {
    return this.accountService.deleteAccount(user.id, accountId);
  }

  @Get()
  @ApiOperation({ title: 'Get accounts' })
  @ApiOkResponse({
    type: AccountListDto,
    description: 'Paged accounts response.',
  })
  async get(
    @CurrentUser() user: IUserPayload,
    @Query(new ParsePagerRequestPipe()) query: PagerRequestDto,
  ): Promise<AccountListDto> {
    return this.accountService.getAccounts(user.id, query);
  }

  @Get(':accountId')
  @ApiOperation({ title: 'Get account details.' })
  @ApiOkResponse({ type: AccountDetailsDto })
  @ApiNotFoundResponse({
    description: 'Account with provided id was not found.',
  })
  async getDetails(
    @CurrentUser() user: IUserPayload,
    @Param('accountId') accountId: string,
  ) {
    return this.accountService.getAccountDetails(user.id, accountId);
  }
}
