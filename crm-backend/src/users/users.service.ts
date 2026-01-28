import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateRole(id: string, dto: UpdateRoleDto) {
    // Only update role
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { role: dto.role },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }
}
