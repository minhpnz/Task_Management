import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Pipe } from 'stream';
import { TaskStatus } from '../tasks.model';
// import { PipeTransform } from '@nestjs/common';
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    console.log(value);
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
