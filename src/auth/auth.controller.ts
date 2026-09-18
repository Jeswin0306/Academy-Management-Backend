import { Controller, Body, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './jwt-auth-guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService){}

  @Post("register")
  register(@Body() registerDto: RegisterDto){
    return this.authServices.register(registerDto);
  }

  @Post("login")
  login(@Body() loginDto : LoginDto){
    return this.authServices.login(loginDto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any){
    return {
      message : "You are authenticated",
      user: req.user,
    };
  }
}
