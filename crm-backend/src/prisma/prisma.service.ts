import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  
  // Called automatically when the module is initialized
  async onModuleInit() {
    await this.$connect(); // Connect to the database
    console.log('Prisma connected to DB');
  }

  // Called automatically when the module is destroyed
  async onModuleDestroy() {
    await this.$disconnect(); // Disconnect from the database
    console.log('Prisma disconnected from DB');
  }
}
