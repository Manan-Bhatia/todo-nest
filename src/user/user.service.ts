import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
  ) {}

  private readonly _logger = new Logger(UserService.name);

  async create(userName: string, password: string) {
    const isExisting = await this._userRepository.findOne({
      where: { userName },
    });
    if (isExisting) {
      throw new ConflictException('User with this username already exists');
    }

    const hashedP = await bcrypt.hash(password, 10);

    const user = this._userRepository.create({
      userName,
      passwordHash: hashedP,
    });
    return await this._userRepository.save(user);
  }

  findbyUserId(id: string) {
    return this._userRepository.findOne({ where: { id } });
  }

  findByUserName(userName: string) {
    return this._userRepository.findOne({
      where: { userName },
      select: ['id', 'userName', 'passwordHash'],
    });
  }
}
