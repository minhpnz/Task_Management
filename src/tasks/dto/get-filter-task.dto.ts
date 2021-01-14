import { TaskStatus } from '../tasks.model';

export class getFilterTaskDto {
  status: TaskStatus;
  search: string;
}
