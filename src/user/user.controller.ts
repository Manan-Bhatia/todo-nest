import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/global/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/global/decorators/user.decorator';
import type { JwtPayload } from 'src/auth/types/auth.types';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  private readonly _logger = new Logger(UserController.name);

  @Get()
  get(@User() userPayload: JwtPayload) {
    return this._userService.findbyUserId(userPayload.sub);
  }
}
