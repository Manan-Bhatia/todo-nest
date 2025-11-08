import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly _taskRepository: Repository<Task>,
    private readonly _userService: UserService,
  ) {}

  async create(userId: string, title: string, description?: string) {
    const user = await this._userService.findbyUserId(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const task = this._taskRepository.create({ title, description, user });
    return this._taskRepository.save(task);
  }

  findAll(userId: string) {
    return this._taskRepository.find({ where: { userId } });
  }

  findOne(id: string) {
    return this._taskRepository.findOne({ where: { id } });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this._taskRepository.update({ id }, updateTaskDto);
  }

  remove(id: string) {
    return this._taskRepository.delete({ id });
  }
}
