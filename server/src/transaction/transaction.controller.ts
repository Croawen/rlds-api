import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto';
import { ParsePagerRequestPipe } from 'common/pager';
import { IUserPayload } from 'auth/interfaces/user.payload';
import { CurrentUser } from 'auth/decorators/current-user.decorator';

@Controller()
@ApiUseTags('Transactions')
export class TransactionController {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create a new transaction.' })
  @ApiOkResponse({ description: 'Transaction Created.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  async createTransaction(@Body() dto: CreateTransactionDto): Promise<void> {
    return this.transactionService.createTransaction(dto);
  }

  //   @Get()
  //   @ApiOperation({ title: 'Get transactions' })
  //   @ApiOkResponse({
  //     type: AccountListDto,
  //     description: 'Paged transactions response.',
  //   })
  //   async get(
  //     @CurrentUser() user: IUserPayload,
  //     @Query(new ParsePagerRequestPipe()) query: PagerRequestDto,
  //   ): Promise<AccountListDto> {
  //     return this.transactionService.getTransactons(user.id, query);
  //   }

  //   @Get(':transactionId')
  //   @ApiOperation({ title: 'Get transaction details.' })
  //   @ApiOkResponse({ type: AccountDetailsDto })
  //   @ApiNotFoundResponse({
  //     description: 'Transaction with provided id was not found.',
  //   })
  //   async getDetails(
  //     @CurrentUser() user: IUserPayload,
  //     @Param('transactionId') transactionId: string,
  //   ) {
  //     return this.transactionService.getTransactionDetails(
  //       user.id,
  //       transactionId,
  //     );
  //   }
}
