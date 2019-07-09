import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshRequestDto,
  TokenDto,
} from './dto';
import { IUserPayload } from './interfaces/user.payload';
import { SignOptions, sign, verify } from 'jsonwebtoken';
import { ObjectId } from 'bson';
import * as sha256 from 'sha256';
import { ConfigService, Config } from '../common/config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    this.jwtOptions = {
      expiresIn: configService.getNumber(Config.JWT_EXPIRES_IN),
    };
    this.jwtKey = configService.get(Config.JWT_KEY);
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.model.findOne({
      login: dto.login,
      passwordHash: sha256(dto.password),
    });

    if (!user) throw new NotFoundException('User not found.');

    const token = await this.createToken(user.id, user.login);
    return new LoginResponseDto(token);
  }

  async refresh(dto: RefreshRequestDto): Promise<LoginResponseDto> {
    try {
      const decodedUser = verify(dto.token, this.jwtKey) as IUserPayload;
      if (!decodedUser) throw new BadRequestException('Invalid token.');
      const user = await this.userService.model.findOne({
        _id: new ObjectId(decodedUser.id),
      });

      if (!user) throw new NotFoundException('User not found.');

      const token = await this.createToken(user.id, user.login);
      return new LoginResponseDto(token);
    } catch (e) {
      throw new HttpException('Token expired.', 460);
    }
  }

  private async createToken(id: string, login: string): Promise<TokenDto> {
    const payload: IUserPayload = {
      id,
      login,
    };
    const accessToken = await this.signPayload(payload);
    return new TokenDto(
      accessToken,
      new Date(
        Date.now() + this.configService.getNumber(Config.JWT_EXPIRES_IN),
      ),
    );
  }

  async validateUser(validatePayload: IUserPayload): Promise<IUserPayload> {
    const user = await this.userService.model.findById(validatePayload.id);
    if (!user) return null;

    return validatePayload;
  }

  private async signPayload(payload: IUserPayload): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }
}
