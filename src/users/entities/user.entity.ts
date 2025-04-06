import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  age: string;

  @Column({nullable: false})
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.USER],
    array: true,
  })
  roles: Role[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}