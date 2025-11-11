import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class LoginAuthDto {

  @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
  @IsString()
  @MaxLength(30) // Garante que bate com o VarChar(30) do banco
  username: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString()
  senha: string;
}