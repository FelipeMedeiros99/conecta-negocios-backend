import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { AnuncioController } from './anuncio.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AnuncioController],
  providers: [AnuncioService, PrismaService],
})
export class AnuncioModule {}
