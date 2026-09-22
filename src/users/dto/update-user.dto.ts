import { IsBoolean, IsEmail, IsEnum,IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto{
  @IsOptional()
  @IsString()
  @MinLength(3)
  name : string;

  @IsOptional()
  @IsEmail()
  email?:string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: String;

  @IsOptional()
  @IsEnum(["ADMIN", "STAFF", "TEACHER", "STUDENT"])
    role?: "ADMIN" | "STAFF" | "TEACHER" | "STUDENT";

  @IsOptional()
  @IsBoolean()
  isActice?: boolean;
}