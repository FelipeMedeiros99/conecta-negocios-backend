import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Post()
  create(@Body() createAnuncioDto: CreateAnuncioDto) {
    return this.anuncioService.create(createAnuncioDto);
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
