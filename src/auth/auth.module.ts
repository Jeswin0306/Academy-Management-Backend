import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './jwt.strategy.js';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './role.guard.js';
import passport from 'passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn : "1hr",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
  ],
  exports :[
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}
