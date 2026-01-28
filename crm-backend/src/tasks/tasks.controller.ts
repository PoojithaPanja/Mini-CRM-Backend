import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
  import { JwtAuthGuard } from '../common/guards/jwt.guard';
  import { Roles } from '../common/decorators/roles.decorator';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Tasks')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    @Roles('ADMIN')
    create(@Body() dto: CreateTaskDto) {
      return this.tasksService.create(dto);
    }
  
    @Get()
    findAll(@Req() req) {
      return this.tasksService.findAll(req.user);
    }
  
    @Patch(':id/status')
    updateStatus(
      @Param('id') id: string,
      @Body() dto: UpdateTaskStatusDto
    ) {
      return this.tasksService.updateStatus(id, dto);
    }
  }
  