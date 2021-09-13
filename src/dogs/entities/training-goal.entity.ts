import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dog } from './dog.entity';
import { TrainingGoalTask } from './training-goal-task.entity';

@Entity()
export class TrainingGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  dogId: number;

  @ManyToOne(() => Dog)
  dog: Dog;

  @OneToMany((type) => TrainingGoalTask, (task) => task.goal)
  tasks: TrainingGoalTask[];
}
