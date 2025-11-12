import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from "bcrypt"
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '../../generated/internal/prismaNamespace';
import { Usuario } from '../../generated/browser';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async cadastrar(createAuthDto: CreateAuthDto) {
    const { senha, username, nome, bairro, cep, cidade, estado, logradouro, numero, complemento } = createAuthDto
    try {
      const hashPassword = await bcrypt.hash(senha, 10);
      const user = await this.prisma.usuario.create({
        data: {
          username,
          senha: hashPassword,
          nome: nome.toUpperCase(),
          bairro: bairro.toUpperCase(),
          cep: cep.toUpperCase(),
          cidade: cidade.toUpperCase(),
          estado: estado.toUpperCase(),
          logradouro: logradouro.toUpperCase(),
          numero: numero.toUpperCase(),
          complemento: complemento ? complemento.toUpperCase() : null,
        }
      })
      const {senha: sen, ...rest} = user

      return rest;      

    } catch (e) {
      if (e instanceof HttpException) throw e
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(`O username já está em uso.`);
        }
      }
      throw new HttpException("Erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logar(loginAuthDto: LoginAuthDto) {
    const {username, senha} = loginAuthDto;
    try {
      const user = await this.prisma.usuario.findUnique({
        where: { username },
      });
      if (!user) {
        throw new HttpException("Usuário não encontrado.", HttpStatus.UNAUTHORIZED);
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        throw new HttpException("Senha incorreta", HttpStatus.UNAUTHORIZED);
      }

      const dadosUsuario: Partial<Usuario>= {...user}
      delete dadosUsuario.senha
      
      return {
        access_token: await this.jwtService.signAsync(dadosUsuario)
      }


    } catch (e) {
      if(e instanceof HttpException) throw e;

      console.error("Erro enquanto tentava se logar: ", e)
      throw new HttpException("Erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}