import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrigadasService } from './brigadas.service';
import { CreateBrigadaDto } from './dto/create-brigada.dto';
import { UpdateBrigadaDto } from './dto/update-brigada.dto';

@Controller('brigadas')
export class BrigadasController {
  constructor(private readonly brigadasService: BrigadasService) {}

  @Post()
  create(@Body() createBrigadaDto: CreateBrigadaDto) {
    return this.brigadasService.create(createBrigadaDto);
  }

  @Get()
  findAll() {
    return this.brigadasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brigadasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrigadaDto: UpdateBrigadaDto) {
    return this.brigadasService.update(+id, updateBrigadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brigadasService.remove(+id);
  }
}
