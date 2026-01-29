import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { FilesUpload } from 'src/common/decorators/files-upload.decorator';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { DeleteSuperheroParams } from './dto/delete-superhero.dto';
import {
  UpdateSuperheroDto,
  UpdateSuperheroParams,
} from './dto/update-superhero.dto';
import { SuperheroMapper } from './mappers/superhero.mapper';
import { CreateUseCase } from './use-cases/create.use-case';
import { DeleteUseCase } from './use-cases/delete.use-case';
import { UpdateUseCase } from './use-cases/update.use-case';
import { FindOneUseCase } from './use-cases/find-one.use-case';
import { FindManySuperheroesQuery } from './dto/find-many-superheroes.dto';
import { FindManyUseCase } from './use-cases/find-many.use-case';

function getFilesUploadOptions(fieldName: string) {
  return {
    fieldName,
    destination: './uploads',
    maxCount: 10,
    sizeLimit: 1024 * 1024 * 5,
    allowedFileTypes: 'image/(jpeg|jpg)',
  };
}

@Controller('superhero')
export class SuperheroController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
    private readonly findOneUseCase: FindOneUseCase,
    private readonly findManyUseCase: FindManyUseCase,
  ) {}

  @Post()
  @FilesUpload(getFilesUploadOptions('images'))
  async create(
    @Body() createSuperheroDto: CreateSuperheroDto,
    @UploadedFiles()
    images?: Array<Express.Multer.File>,
  ) {
    const command = SuperheroMapper.toCreateCommand(createSuperheroDto, images);
    const superhero = await this.createUseCase.execute(command);
    return SuperheroMapper.toResponse(superhero);
  }

  @Put(':id')
  @FilesUpload(getFilesUploadOptions('newImages'))
  async update(
    @Param() params: UpdateSuperheroParams,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
    @UploadedFiles()
    newImages?: Array<Express.Multer.File>,
  ) {
    const command = SuperheroMapper.toUpdateCommand(
      params,
      updateSuperheroDto,
      newImages,
    );
    const updatedSuperhero = await this.updateUseCase.execute(command);
    return SuperheroMapper.toResponse(updatedSuperhero);
  }

  @Delete(':id')
  async remove(@Param() params: DeleteSuperheroParams) {
    const command = SuperheroMapper.toDeleteCommand(params);
    const updatedSuperhero = await this.deleteUseCase.execute(command);
    return SuperheroMapper.toResponse(updatedSuperhero);
  }

  @Get(':id')
  async findOne(@Param() params: DeleteSuperheroParams) {
    const command = SuperheroMapper.toFindOneCommand(params);
    const updatedSuperhero = await this.findOneUseCase.execute(command);
    return SuperheroMapper.toResponse(updatedSuperhero);
  }

  @Get()
  async findMany(@Query() query: FindManySuperheroesQuery) {
    const command = SuperheroMapper.toFindManyCommand(query);
    const responsePayload = await this.findManyUseCase.execute(command);
    return SuperheroMapper.payloadOfManyToResponse(responsePayload);
  }
}
