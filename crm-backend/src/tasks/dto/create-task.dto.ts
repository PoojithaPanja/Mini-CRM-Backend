import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  assignedToId: string;

  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
