import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from "../db/db.js";
import { users } from "../db/schema.js";
import { eq } from 'drizzle-orm';
import { UpdateUserDto } from './dto/update-user.dto.js';
@Injectable()
export class UsersService {
  async getAllUsers(){
    return await db
    .select({
      id: users.id,
      name : users.name,
      email: users.email,
      role : users.role,
      isActive : users.is_active,
      createdAt : users.created_at,
      updatedAt: users.updated_at,
    })
    .from(users);
  }

  async getUserById(id : number){
    const result = await db
    .select({
      id: users.id,
      name : users.name,
      email: users.email,
      role : users.role,
      isActive : users.is_active,
      createdAt : users.created_at,
      updatedAt: users.updated_at,
    })
    .from(users)
    .where(eq(users.id, id));

    if(result.length === 0){
      throw new NotFoundException("User not found");
    }
    return result[0];
  }  
  async updateUser(id: number, updateUserDto: UpdateUserDto) {

  const [updatedUser] = await db
    .update(users)
    .set({
      name: updateUserDto.name,
      email: updateUserDto.email,
      role: updateUserDto.role,
      is_active: updateUserDto.isActice,
      updated_at: new Date(),
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isActive: users.is_active,
      createdAt: users.created_at,
      updatedAt: users.updated_at,
    });

  if (!updatedUser) {
    throw new NotFoundException("User not found");
  }

  return updatedUser;
}
}
