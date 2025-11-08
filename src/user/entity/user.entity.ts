import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { Task } from 'src/task/entities/task.entity';

@Entity()
@Unique(['userName'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column({ select: false })
  @Exclude()
  @ApiHideProperty()
  passwordHash: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
