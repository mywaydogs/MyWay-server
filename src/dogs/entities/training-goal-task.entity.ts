import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrainingGoal } from './training-goal.entity';

@Entity()
export class TrainingGoalTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  goalId: number;

  @ManyToOne(() => TrainingGoal, (trainingGoal) => trainingGoal.tasks)
  goal: TrainingGoal;

  @Column({ nullable: true })
  startingTraining: number;

  @Column({ nullable: true })
  endingTraining: number;
}
