import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { IUserPayload } from '../auth/interfaces/user.payload';
import { PagerRequestDto, ParsePagerRequestPipe } from '../common/pager';
import {
  CreateTransactionDto,
  GetCategoriesDto,
  TransactionDetailsDto,
  TransactionListDto,
} from './dto';
import { TransactionService } from './transaction.service';

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

  @Get('categories')
  @ApiOperation({ title: 'Get transaction categories.' })
  @ApiOkResponse({
    type: GetCategoriesDto,
    description: 'Get transaction categories response.',
  })
  async categories(): Promise<GetCategoriesDto> {
    return new GetCategoriesDto();
  }

  @Get(':transactionId')
  @ApiOperation({ title: 'Get transaction details.' })
  @ApiOkResponse({ type: TransactionDetailsDto })
  @ApiNotFoundResponse({
    description: 'Transaction with provided id was not found.',
  })
  async getDetails(
    @CurrentUser() user: IUserPayload,
    @Param('transactionId') transactionId: string,
  ) {
    return this.transactionService.getTransaction(user.id, transactionId);
  }
}
