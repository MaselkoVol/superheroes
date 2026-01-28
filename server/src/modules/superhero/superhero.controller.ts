import { Body, Controller, Post } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { SuperheroService } from './superhero.service';

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroService.create(createSuperheroDto);
  }

  // @Get()
  // findAll() {
  //   return this.superheroService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.superheroService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSuperheroDto: UpdateSuperheroDto) {
  //   return this.superheroService.update(+id, updateSuperheroDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.superheroService.remove(+id);
  // }
}
