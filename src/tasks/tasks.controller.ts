import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { getFilterTaskDto } from './dto/get-filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  // @UsePipes(ValidationPipe)
  getTasks(@Query() getFilterTaskDto: getFilterTaskDto): Task[] {
    console.log(getFilterTaskDto);
    if (Object.keys(getFilterTaskDto).length) {
      console.log('chay 1');
      return this.tasksService.getTaskbyFilter(getFilterTaskDto);
    } else {
      console.log('chay 2');
      return this.tasksService.getAllTasks();
    }
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  @Post('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateStatus(id, status);
  }
}
