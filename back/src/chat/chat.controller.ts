import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { DMService } from './dm.service';
import JwtAuthenticationGuard from 'src/guards/jwt-authentication.guard';
import { EmailConfirmationGuard } from 'src/guards/email-confirmation.guard';
import { TwoFaVerificationGuard } from 'src/guards/two-fa-verification.guard';
import { ChannelService } from './channel.service';
import { User } from '@prisma/client';
import { FriendsService } from './friends.service';

@Controller('chat')
@UseGuards(EmailConfirmationGuard)
@UseGuards(TwoFaVerificationGuard)
@UseGuards(JwtAuthenticationGuard)
export class ChatController {
  constructor(
    private dmService: DMService,
    private channelService: ChannelService,
    private friendsService: FriendsService,
  ) {}

  @Get('dms/:id')
  async getDms(@Param('id') id: number, @Req() request: { user: User }) {
    console.log("This is the id", id);
    console.log("This is the type", typeof id);
    return this.dmService.getDmConversation(Number(id), request.user);
  }
  @Delete('dms/:id')
  async deleteDm(@Param('id') id: number, @Req() request: { user: User }) {
    return this.dmService.deleteDm(id, request.user);
  }

  @Get('channels/:channelName')
  async getChannelMessages(
    @Param('channelName') channelName: string,
    @Req() request: { user: User },
  ) {
    return this.channelService.getChannelMessages(channelName, request.user);
  }
  @Get('friends')
  async getFriends(@Req() request: { user: User }) {
    return this.friendsService.getFriends(request.user);
  }
  @Get('blocked')
  async getBlockedUsers(@Req() request: { user: User }) {
    return this.friendsService.getBlockedUsers(request.user);
  }
  @Get('mutual-friends/:id')
  async getMutualFriends(
    @Param('id') id: number,
    @Req() request: { user: User },
  ) {
    return this.friendsService.getMutualFriends(id, request.user);
  }
  @Get('dms-list')
  async getDmsList(@Req() request: { user: User }) {
    return this.dmService.getDmsList(request.user);
  }
  @Get('my-channels-list')
  async getMyChannelsList(@Req() request: { user: User }) {
    return this.channelService.getMyChannelsList(request.user);
  }
  @Get('browse-channels-list')
  async getBrowseChannelsList(@Req() request: { user: User }) {
    return this.channelService.getBrowseChannelsList(request.user);
  }
}
