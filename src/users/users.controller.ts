import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.js';
import { RolesGuard } from '../auth/role.guard.js';
import { Roles } from '../auth/role.decorator.js';


@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private readonly usersServices: UsersService,
  ){}

  @Get()
  @Roles("ADMIN", "STAFF")
  getAllUsers(){
    return this.usersServices.getAllUsers();
  }

  @Get(":id")
  @Roles("ADMIN", "STAFF")
  getUserById(
    @Param("id", ParseIntPipe) id : number,
  ){
    return this.usersServices.getUserById(id);
  }
}
