import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { RolesGuard } from '../auth/role.guard.js';

@Module({
  imports:[AuthModule],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard]
})
export class UsersModule {}
