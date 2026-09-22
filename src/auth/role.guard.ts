import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role.decorator.js";

@Injectable()
export class RolesGuard implements CanActivate{
  constructor(private reflector : Reflector){}

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.get < string[]>(
      "roles",
      context.getHandler(),
    );

    if(!requiredRoles){
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if(!user){
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}