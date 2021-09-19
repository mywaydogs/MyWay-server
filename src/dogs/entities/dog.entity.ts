import { Customer } from 'src/customers/entities/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DogMultipleChoiceDto } from '../dto/dog-multiple-choice.dto';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column()
  breed: string;

  @Column()
  socialization: string;

  @Column()
  litterSeparation: string;

  @Column()
  origin: string;

  @Column()
  healthIssues: string;

  @Column()
  foodDrive: DogMultipleChoiceDto;

  @Column()
  preyDrive: DogMultipleChoiceDto;

  @Column()
  currentSchedule: string;

  @Column()
  energyLevel: DogMultipleChoiceDto;

  @Column()
  homeBehaviours: string;

  @Column()
  outsideBehaviours: string;

  @Column()
  customerId: number;

  @ManyToOne((type) => Customer)
  customer: Customer;
}
