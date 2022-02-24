import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
  Get,
  Query,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import {
  CreateUserDto,
  FilterUserDto,
  UpdateUserDto,
} from 'src/users/dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get(':userId')
  getUser(@Param('userId', MongoIdPipe) userId: string) {
    return this.userService.findOne(userId);
  }
  @Get(':userId/orders')
  getOrdersById(@Param('userId') userId: string) {
    return this.userService.getOrderByUser(userId);
  }

  @Get()
  getOrders(@Query() params: FilterUserDto) {
    return this.userService.findAll(params);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }
  @Put(':userId')
  update(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }
  @Delete(':userId')
  delete(@Param('userId', MongoIdPipe) userId: string) {
    return this.userService.delete(userId);
  }
}
