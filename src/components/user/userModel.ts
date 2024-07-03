import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    "user_id": string;
  
    @Column()
    "first_name": string;
  
    @Column()
    "last_name": string;
  
    @Column()
    "email": string;
  
    @Column()
   "phone": string;
  
    @Column({ type: "date" })
    "birthday": Date;
  
    @Column()
    'password'?: string;
  
    @CreateDateColumn({ type: "timestamp" })
    'created_at': Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    'last_modified': Date;
  }
  