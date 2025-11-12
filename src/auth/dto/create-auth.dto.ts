import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  @MaxLength(100)
  nome: string;

  @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
  @IsString()
  @MinLength(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres.' })
  @MaxLength(30, { message: 'O nome de usuário não pode exceder 30 caracteres.' })
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message: 'O nome de usuário deve conter apenas letras, números e os caracteres _, ., -',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  senha: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  @IsString({ message: 'O CEP deve ser uma string.' })
  @IsNumberString({}, { message: 'O CEP deve conter apenas números.' })
  @Length(8, 8, { message: 'O CEP deve ter exatamente 8 dígitos.' })
  cep: string;

  @IsNotEmpty({ message: 'O logradouro é obrigatório.' })
  @IsString()
  @MaxLength(100)
  logradouro: string;

  @IsNotEmpty({ message: 'O número é obrigatório.' })
  @IsString()
  @Length(1, 10)
  numero: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  complemento?: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório.' })
  @IsString()
  @MaxLength(100)
  bairro: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString()
  @MaxLength(100)
  cidade: string;

  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @IsString()
  @MaxLength(100)
  estado: string;
}