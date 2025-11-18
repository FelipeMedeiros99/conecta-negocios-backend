import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { Usuario } from '../../generated/client';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FindAllQueryDto } from './dto/find-all-query.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Post()
  create(@Body() createAnuncioDto: CreateAnuncioDto, @Request() req: any) {
    const user: Usuario = req.user;
    return this.anuncioService.create(createAnuncioDto, user?.id!);
  }

  @UseInterceptors(FilesInterceptor('imagens', 5))
  @Post(":postId")
  createImagens(@Param("postId") postId: number, @UploadedFiles() imagens: Array<Express.Multer.File>, @Request() req: any) {
    const user: Usuario = req.user;
    return this.anuncioService.createImagens(+postId, +user?.id!, imagens);
  }
  
  @Get()
  findAll(@Query() query: FindAllQueryDto) {
    return this.anuncioService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.anuncioService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto) {
  //   return this.anuncioService.update(+id, updateAnuncioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.anuncioService.remove(+id);
  // }
}
