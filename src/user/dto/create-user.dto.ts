import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome de usuário',
    minLength: 5,
    maxLength: 100,
    example: 'john_doe',
  })
  @IsString()
  @Length(5, 100)
  userName: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'john_doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    minLength: 6,
    example: 'password123',
  })
  @IsString()
  @Length(6, 100)
  password: string;
}
