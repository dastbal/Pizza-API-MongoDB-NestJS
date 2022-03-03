import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OrdersService } from '../services/orders.service';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrdersService) {}
  @Roles(Role.ADMIN)
  @Get('')
  getProfile(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return user;
  }
  @Roles(Role.ADMIN)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.findOne(user.sub);
  }
}
