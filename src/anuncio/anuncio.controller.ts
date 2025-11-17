import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { Usuario } from '../../generated/client';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Post()
  create(@Body() createAnuncioDto: CreateAnuncioDto, @Request() req: any) {
    const user: Usuario = req.user;
    return this.anuncioService.create(createAnuncioDto, user?.id!);
  }

  @Get()
  findAll() {
    return this.anuncioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anuncioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto) {
    return this.anuncioService.update(+id, updateAnuncioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anuncioService.remove(+id);
  }
}
