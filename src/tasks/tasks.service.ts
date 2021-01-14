import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as shortid from 'shortid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: shortid.generate(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  updateStatus(id: string, status: TaskStatus): Task {
    this.tasks.find((task) => task.id === id).status = status;
    return this.tasks.find((task) => task.id === id);
  }
}
