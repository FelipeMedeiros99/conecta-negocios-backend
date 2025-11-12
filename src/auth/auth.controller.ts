import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("cadastrar")
  cadastrar(@Body() createAuthDto: CreateAuthDto) {
    // return createAuthDto
    return this.authService.cadastrar(createAuthDto);
  }

  @Post("logar")
  logar(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.logar(loginAuthDto);
  }

}
