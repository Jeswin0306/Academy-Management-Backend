import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { users } from "../db/schema.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService,) {}

  async register(registerDto: RegisterDto) {

    // 1. Check whether email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, registerDto.email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new ConflictException("Email already exists");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      10,
    );

    // 3. Insert user
    const [user] = await db
      .insert(users)
      .values({
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
        role: registerDto.role as "ADMIN" | "STAFF" | "TEACHER" | "STUDENT",
      })
      .returning();

    // 4. Send safe response
    return {
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login (loginDto : LoginDto){
    const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, loginDto.email))
    .limit(1);

    if(existingUser.length === 0){
      throw new UnauthorizedException("Invalid email or password");
    }

    const user = existingUser[0];

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if(!isPasswordValid) {
      throw new UnauthorizedException("invalid email or password");
    }

    const accessToken = this.jwtService.sign({
      sub : user.id,
      email : user.email,
      role : user.role,
    })

    return{
      message : "Login successful",
      token : accessToken,
      users: {
        id : user.id,
        name : user.name,
        email : user.email,
        role : user.role,
      },
    };
  }
}