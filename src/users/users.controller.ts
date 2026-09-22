import { Controller, Body, Get, Put, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.js';
import { RolesGuard } from '../auth/role.guard.js';
import { Roles } from '../auth/role.decorator.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Update } from 'drizzle-orm';


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

  @Put(":id")
  @Roles("ADMIN")
  updateUSer(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto : UpdateUserDto,
  ) {
    return this.usersServices.updateUser(id, updateUserDto);
  }
}
