import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  LoggerService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Logger } from '@nestjs/common';
import { ErrorResponseDto } from '../error/dto/error-response.dto';

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성' })
  // @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    description: '유저를 생성했음',
    type: User,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: '이미 존재하는 유저',
    type: ErrorResponseDto,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
