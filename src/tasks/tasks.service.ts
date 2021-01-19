import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as shortid from 'shortid';
import { CreateTaskDto } from './dto/create-task.dto';
import { getFilterTaskDto } from './dto/get-filter-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskbyFilter(getFilterTaskDto: getFilterTaskDto): Task[] {
    const { status, ...search } = getFilterTaskDto;
    const { title, description }: any = search;
    let task = this.getAllTasks();
    if (status) {
      task = task.filter((item) => item.status === status);
    }

    if (Object.keys(search).length) {
      console.log('chay searh', search);
      task = task.filter(
        (item) =>
          item.title.includes(title) || item.description.includes(description),
      );
    }
    console.log('taks: ', task);
    return task;
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
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} is not found`);
    }
    return found;
  }
  updateStatus(id: string, status: TaskStatus): Task {
    this.tasks.find((task) => task.id === id).status = status;
    return this.tasks.find((task) => task.id === id);
  }
}
