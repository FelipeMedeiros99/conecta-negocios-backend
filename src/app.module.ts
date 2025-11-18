import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';
import { AnuncioModule } from './anuncio/anuncio.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", 'uploads'),
      serveRoot: '/uploads',
    }),
    UsuarioModule, AuthModule, CategoriaModule, AnuncioModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
