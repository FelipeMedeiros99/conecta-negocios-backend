import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TipoAnuncio } from '../../../generated/enums'; 

export class CreateAnuncioDto {

  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @MinLength(5, { message: 'O título deve ter no mínimo 5 caracteres.' })
  @MaxLength(150, { message: 'O título deve ter no máximo 150 caracteres.' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @MinLength(20, { message: 'A descrição deve ter no mínimo 20 caracteres.' })
  descricao: string;

  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @IsPositive({ message: 'O preço deve ser um valor positivo.' })
  @Min(0.01)
  @Type(() => Number)
  preco: number;

  @IsEnum(TipoAnuncio, { message: 'Tipo de anúncio inválido.' })
  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  tipo: TipoAnuncio;

  @IsInt({ message: 'O ID da categoria deve ser um número inteiro.' })
  @IsPositive({ message: 'O ID da categoria deve ser válido.' })
  @Type(() => Number) 
  categoriaId: number;
}