/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserService } from '@/user/user.service';
import { comparePasswords, hashPassword } from '@/utils/hashing.utils';
import { extractUserFields } from '@/utils/return.utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const compPass = await comparePasswords(pass, user.password);
    if (!compPass) {
      return null;
    }

    const { password, ...result } = user;

    return result;
  }

  public async login(user) {
    try {
      const paylod = {
        id: user.id,
        email: user.email,
      };
      return {
        access_token: this.jwtService.sign(paylod),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message || 'NOT FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async create(user) {
    try {
      const pass = await hashPassword(user.password);

      const newUser = await this.userService.create({
        ...user,
        password: pass,
      });
      const { password, ...result } = newUser;
      const token = await this.generateToken(result);

      return { user: extractUserFields(newUser), token };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || 'Internal Server Error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async generateToken(user) {
    const { uuid, name, email, role, status } = user;
    const token = await this.jwtService.signAsync({
      uuid,
      name,
      email,
      role,
      status,
    });
    return token;
  }
}
