import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Room } from "./roomsModel";

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  "user_id": number;  

  @Column()
  "player_name": string;

  @Column({ type: "int", default: 0 })  
  "score": number;

  @ManyToOne(() => Room, (room) => room.players, { onDelete: "CASCADE" })
  "room": Room;
  @CreateDateColumn()  
  "created_at": Date;

  @UpdateDateColumn()  
  "updated_at": Date;
}

