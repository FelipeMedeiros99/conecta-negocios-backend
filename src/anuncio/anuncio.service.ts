import { HttpCode, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '../../generated/internal/prismaNamespace';

@Injectable()
export class AnuncioService {
  constructor (private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(AnuncioService.name)

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
        if (error.code === 'P2003') {
          throw new NotFoundException(
            'A categoria (categoriaId) informada não existe.',
          );
        }
      }
      this.logger.error("Erro ao criar anuncio: ", error)
      throw new InternalServerErrorException('Erro ao criar o anúncio.');
    }
  }

  async createImagens(postId: number, userId: number, imagens: Array<Express.Multer.File>){
    try{
      const imagensParaSalvar = imagens.map((image)=> {
        return {
          url: image.filename,
          anuncioId: postId,
        }
      })

      await this.prisma.imagens.createMany({
        data: imagensParaSalvar
      })

      return "Imagens salvas com sucesso"

    }catch(e){
      if(e instanceof HttpException) throw e;

      this.logger.error("erro ao tentar criar imagnes: ", e)
      throw new HttpException("Erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try{
      const anuncios = await this.prisma.anuncio.findMany({
        include: {
          imagens: {
            select: {
              id: true,
              url: true
            }
          },
          usuario: {
            select: {
              nome: true,
              cidade: true,
              estado: true
            }
          },
          categoria: {
            select:{
              nome: true, 
            }
          }
        }
      })

      return anuncios
      
    }catch(e){
      if(e instanceof HttpException) throw e;

      this.logger.error("erro ao tentar criar imagnes: ", e)
      throw new HttpException("Erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try{
      const anuncios = await this.prisma.anuncio.findFirst({
        where: {id},
        include: {
          imagens: true,
          usuario: true,
          categoria: true
        }
      })
      console.log(anuncios)

      return anuncios
      
    }catch(e){
      if(e instanceof HttpException) throw e;

      this.logger.error("erro ao tentar criar imagnes: ", e)
      throw new HttpException("Erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  update(id: number, updateAnuncioDto: UpdateAnuncioDto) {
    return `This action updates a #${id} anuncio`;
  }

  remove(id: number) {
    return `This action removes a #${id} anuncio`;
  }
}
