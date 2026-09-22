import { IsBoolean, IsEmail, IsEnum,IsOptional, IsString, MinLength } from "class-validator";

export class updateUserDto{
  @IsOptional()
  @IsString()
  name : string;

  @IsOptional()
  @IsEmail()
  email?:string;

  @IsOptional()
  @IsEnum(["ADMIN", "STAFF", "TEACHER", "STUDENT"])
    role?: "ADMIN" | "STAFF" | "TEACHER" | "STUDENT";

  @IsOptional()
  @IsBoolean()
  isActice?: boolean;
}