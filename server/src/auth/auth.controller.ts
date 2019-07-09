import { Controller, Inject, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto, RefreshRequestDto } from './dto';
import {
  ApiUseTags,
  ApiResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller()
@ApiUseTags('Auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ title: 'Log in an existing user.' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ title: 'Refresh existing token.' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async refresh(@Body() dto: RefreshRequestDto): Promise<LoginResponseDto> {
    return this.authService.refresh(dto);
  }
}
