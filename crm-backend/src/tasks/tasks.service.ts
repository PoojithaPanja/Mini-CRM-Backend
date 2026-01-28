import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // CREATE TASK (ADMIN ONLY)
  async create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status ?? 'PENDING',

        assignedTo: {
          connect: { id: dto.assignedToId }
        },

        customer: {
          connect: { id: dto.customerId }
        },
      },
      include: {
        assignedTo: true,
        customer: true,
      },
    });
  }

  // GET TASKS BASED ON ROLE
  async findAll(user: any) {
    // Admin sees all tasks
    if (user.role === 'ADMIN') {
      return this.prisma.task.findMany({
        include: {
          assignedTo: true,
          customer: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    // Employee sees only assigned tasks
    return this.prisma.task.findMany({
      where: {
        assignedToId: user.id,
      },
      include: {
        assignedTo: true,
        customer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // UPDATE TASK STATUS
  async updateStatus(id: string, dto: UpdateTaskStatusDto) {
    const task = await this.prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        status: dto.status,
      },
    });
  }
}
