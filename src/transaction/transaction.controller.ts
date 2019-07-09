import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto';
import { ParsePagerRequestPipe, PagerRequestDto } from 'common/pager';
import { IUserPayload } from 'auth/interfaces/user.payload';
import { CurrentUser } from 'auth/decorators/current-user.decorator';
import { JwtGuard } from 'auth/guards/jwt.guard';
import { TransactionListDto } from './dto/transaction-list.dto';

@Controller('transactions')
@ApiUseTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class TransactionController {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create a new transaction.' })
  @ApiCreatedResponse({ description: 'Transaction Created.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  async createTransaction(@Body() dto: CreateTransactionDto): Promise<void> {
    return this.transactionService.createTransaction(dto);
  }

  @Get()
  @ApiOperation({ title: 'Get transactions' })
  @ApiOkResponse({
    type: TransactionListDto,
    description: 'Paged transactions response.',
  })
  async get(
    @CurrentUser() user: IUserPayload,
    @Query(new ParsePagerRequestPipe()) query: PagerRequestDto,
  ): Promise<TransactionListDto> {
    return this.transactionService.getTransactions(user.id, query);
  }

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
