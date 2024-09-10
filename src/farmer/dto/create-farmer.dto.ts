import { IsAreaValidConstraint } from '@/auth/decorators/validateConstraintArea.decorato';
import { IsCpfOrCnpj } from '@/auth/decorators/validationCpfCnpj.decorato';
import { PlantedCropEnum } from '@/enums/planted-crop.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsEnum,
  Length,
  Matches,
  ArrayNotEmpty,
  IsNumber,
  ValidationArguments,
  Validate,
} from 'class-validator';
export class CreateFarmerDto {
  @ApiProperty({
    description:
      'CPF ou CNPJ do produtor rural. Obs:(Lembrar de remover uma das opções no exemplo!)',
    example: '123.456.789-00 ou 12.345.678/0001-99',
  })
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message:
      'O CPF deve seguir o formato 000.000.000-00 ou CNPJ 00.000.000/0000-00',
  })
  @IsCpfOrCnpj({
    message: (args: ValidationArguments) => {
      return `Erro: O valor '${args.value}' no campo '${args.property}' está incorreto. Digite um CPF ou CNPJ válido.`;
    },
  })
  cpfOrCnpj: string;

  @ApiProperty({
    description: 'Farmer name.',
    example: 'John Doe',
  })
  @IsString()
  @Length(5, 100)
  farmerName: string;

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
  @IsNumber()
  totalAreaHectares: number;

  @ApiProperty({
    description: 'Área agricultável em hectares',
    example: '1200.50',
  })
  @IsNumber()
  arableAreaHectares: number;

  @ApiProperty({
    description: 'Área de vegetação em hectares',
    example: '300.25',
  })
  @IsNumber()
  vegetationAreaHectares: number;

  @ApiProperty({
    description: 'Culturas plantadas na fazenda (Soja, Milho, etc.)',
    example: [PlantedCropEnum.SOY, PlantedCropEnum.CORN],
    isArray: true,
    enum: PlantedCropEnum,
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'Deve haver ao menos uma cultura plantada' })
  @IsEnum(PlantedCropEnum, { each: true })
  plantedCrops: PlantedCropEnum[];

  @Validate(IsAreaValidConstraint)
  areaValidation: this;
}
