import { Controller, Inject, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from './dto/register-req.dto';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('users')
@ApiUseTags('Users')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ title: 'Register new user.' })
  @ApiCreatedResponse({ description: 'New user successfuly created.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiResponse({ status: 460, description: 'User already exists.' })
  async register(@Body() dto: RegisterRequestDto): Promise<void> {
    return this.userService.register(dto);
  }
}
