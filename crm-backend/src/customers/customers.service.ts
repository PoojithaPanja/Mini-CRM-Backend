import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    try {
      return await this.prisma.customer.create({ data: dto });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('Email or phone already exists');
      }
      throw e;
    }
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const totalRecords = await this.prisma.customer.count();
    const data = await this.prisma.customer.findMany({
      skip,
      take: limit,
    });

    return {
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      data,
    };
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data: dto,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('Email or phone already exists');
      }
      throw new NotFoundException('Customer not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.customer.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Customer not found');
    }
  }
}
