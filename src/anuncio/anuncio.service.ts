import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '../../generated/internal/prismaNamespace';

@Injectable()
export class AnuncioService {
  constructor (private readonly prisma: PrismaService) {}

  async create(createAnuncioDto: CreateAnuncioDto, userId: number) {
    try {
      const {tipo, ...resto} = createAnuncioDto;
      const anuncio = await this.prisma.anuncio.create({
        data: {
          ...resto,
          usuarioId: userId
        }
      });
      return anuncio;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Erro de chave estrangeira (ex: categoriaId não existe)
        if (error.code === 'P2003') {
          throw new NotFoundException(
            'A categoria (categoriaId) informada não existe.',
          );
        }
      }
      console.log(error)
      throw new InternalServerErrorException('Erro ao criar o anúncio.');
    }
  }

  findAll() {
    return `This action returns all anuncio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anuncio`;
  }

  update(id: number, updateAnuncioDto: UpdateAnuncioDto) {
    return `This action updates a #${id} anuncio`;
  }

  remove(id: number) {
    return `This action removes a #${id} anuncio`;
  }
}
