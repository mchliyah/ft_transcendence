import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmailConfirmationGuard } from 'src/guards/email-confirmation.guard';
import JwtAuthenticationGuard from 'src/guards/jwt-authentication.guard';
import { UserService } from './user.service';
import { TwoFaVerificationGuard } from 'src/guards/two-fa-verification.guard';
import { User } from '@prisma/client';
import { ChangePasswordDto, TChangePassword, Tname, NameDto } from 'src/dto';
import { UseZodGuard } from 'nestjs-zod';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(TwoFaVerificationGuard)
@UseGuards(EmailConfirmationGuard)
@UseGuards(JwtAuthenticationGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('search-users/:beginWith')
  async searchUsers(
    @Req() request: { user: User },
    @Param('beginWith') beginWith: string,
  ) {
    const users = await this.userService.searchUsers(beginWith, request.user);

    return users;
  }

  @UseZodGuard('body', NameDto)
  @Post('change-username')
  async changeUsername(@Req() request: { user: User }, @Body() dto: Tname) {
    return this.userService.changeUsername(dto.name, request.user);
  }

  @UseZodGuard('body', ChangePasswordDto)
  @Post('change-password')
  async changePassword(
    @Req() request: { user: User },
    @Body() dto: TChangePassword,
  ) {
    return await this.userService.changePassword(dto, request.user);
  }

  @Get('pending-friend-requests')
  async getPendingFriendRequests(@Req() request: { user: User }) {
    return await this.userService.getPendingFriendRequests(request.user);
  }

  @Get('pending-invitaions')
  async getPendingInvitations(@Req() request: { user: User }) {
    return await this.userService.getPendingInvitations(request.user);
  }

  @Get('match-history/:username')
  async getMatchHistory(@Param('username') username: string) {
    return await this.userService.getMatchHistory(username);
  }

  @Get('achievements/:username')
  async getAchievements(@Param('username') username: string) {
    return await this.userService.getAchievements(username);
  }
  @Get('leader-board')
  async getLeaderBoard() {
    return await this.userService.getLeaderBoard();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.getUser(id);
  }
}
