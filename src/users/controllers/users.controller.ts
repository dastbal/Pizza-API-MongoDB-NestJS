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
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get(':userId')
  getPizza(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }
  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOrderByUser(userId);
  }

  @Get()
  getPizzas(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }
  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }
  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
