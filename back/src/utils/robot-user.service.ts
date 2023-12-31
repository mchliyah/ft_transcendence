import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class RobotUserService {
  constructor(
    private readonly prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async createRobotUser() {
    let robotUser: User;
    robotUser = await this.prisma.user.findUnique({
      where: {
        username: 'ROBOT',
      },
    });
    if (robotUser) {
      return;
    }
    const avatar = this.config.get('ROBOT_AVATAR');
    robotUser = await this.prisma.user.create({
      data: {
        username: 'ROBOT',
        email: 'robot.fake@gmail.com',
        isEmailConfirmed: true,
        avatar,
        status: 'online',
      },
    });
    if (!robotUser) {
      throw new Error('Error creating robot user');
    }
  }
}
