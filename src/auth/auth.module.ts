import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {},
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AuthModule {}
