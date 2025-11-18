import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { AnuncioController } from './anuncio.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, callback) => {
          const randomName = randomBytes(16).toString('hex');
          const extension = extname(file.originalname);
          callback(null, `${randomName}${extension}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  ],
  controllers: [AnuncioController],
  providers: [AnuncioService, PrismaService, AuthService],
})
export class AnuncioModule {}
