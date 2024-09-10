import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  Length,
  Matches,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateFarmerDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor rural',
    example: '123.456.789-00',
  })
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message:
      'O CPF deve seguir o formato 000.000.000-00 ou CNPJ 00.000.000/0000-00',
  })
  document: string;

  @ApiProperty({
    description: 'Nome da fazenda do usuário',
    minLength: 5,
    maxLength: 100,
    example: 'Fazenda Arreio de Ouro',
  })
  @IsString()
  @Length(5, 100)
  farmName: string;

  @ApiProperty({
    description: 'Cidade onde a fazenda está localizada',
    minLength: 3,
    maxLength: 100,
    example: 'Ferreiros',
  })
  @IsString()
  @Length(3, 100)
  city: string;

  @ApiProperty({
    description: 'Estado onde a fazenda está localizada',
    example: 'PE',
  })
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({
    description: 'Área total da fazenda em hectares',
    example: '1500.75',
  })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'A área total deve ser um número decimal com até 2 casas decimais',
  })
  field_hectares: string;

  @ApiProperty({
    description: 'Área agricultável em hectares',
    example: '1200.50',
  })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message:
      'A área agricultável deve ser um número decimal com até 2 casas decimais',
  })
  field_arable: string;

  @ApiProperty({
    description: 'Área de vegetação em hectares',
    example: '300.25',
  })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message:
      'A área de vegetação deve ser um número decimal com até 2 casas decimais',
  })
  field_vegetation_hectares: string;

  @ApiProperty({
    description: 'Culturas plantadas na fazenda (Soja, Milho, etc.)',
    example: ['Soja', 'Milho'],
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'Deve haver ao menos uma cultura plantada' })
  @IsString({ each: true })
  platable_crop: string[];
}
