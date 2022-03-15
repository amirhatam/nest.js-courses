import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name?: string): User[] {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User, description: 'the user' })
  @ApiNotFoundResponse() //documentation for API response
  @Get(':id')
  getUsersById(@Param('id', ParseIntPipe) id: number): User {
    // auto parse ID
    // console.log('--->', typeof id);
    const user = this.usersService.findById(id);

    if (!user) {
      //"message": "Not Found"
      throw new NotFoundException();
    }
    return;
  }

  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse() //documentation for API response
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
