import { Controller, Get, Post, HttpCode, Body, Put, Param, ValidationPipe, Res, HttpStatus, ForbiddenException, UsePipes, ParseIntPipe, UseGuards, UseInterceptors,  } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface'
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { createCatSchema } from './schema/create-cat.schema';
import { CatByNamePipe } from './cat-by-name.pipe';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { CacheInterceptor } from '../common/interceptors/cache.interceptor';
import { TimeoutInterceptor } from '../common/interceptors/timeout.interceptor';
import { User } from '../common/decorators/user.decorator';
import { wait } from '../common/utils/helpers';

@Controller('cats')
@UseInterceptors(TimeoutInterceptor, LoggingInterceptor, CacheInterceptor)
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Cat[]> {
    throw new ForbiddenException();
    return this.catsService.findAll();
  }
  
  @Get('2')
  get2(): Observable<any[]> {
    return of(this.catsService.findAll());
  }

  @Get('timeout')
  async getTimeout(): Promise<string> {
    await wait(5000)

    return 'success query';
  }

  @Get('cat/:id')
  findOne(@Res() res, @Param('id', CatByNamePipe) catEntity: CreateCatDto) {
    res.status(HttpStatus.OK).send(catEntity);
  }

  // @UsePipes(new JoiValidationPipe(createCatSchema))
  @Post() @HttpCode(201) @Roles('admin')
  async create( @User() user, @Body(new JoiValidationPipe(createCatSchema)) createCatDto: CreateCatDto ) {
    this.catsService.create(createCatDto);
    
    console.log(user);

    return 'create cats success';
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  put1( @Param('id', new ParseIntPipe()) id: number, @Body() body: CreateCatDto, ) {
    return `@put ${id}` + body.breed;
  }
}
