import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Room } from "./roomsModel";

@Entity()
export class Turnament extends BaseEntity {
  @PrimaryGeneratedColumn()
  "turnament_id": string;

  @Column()  
  "tournament_name": string;

  @Column({ type: 'varchar', nullable: false })  
  "creator_name": string;

  @Column({ type: 'varchar', nullable: true })  // Set nullable to true
  "winner_name": string;
  

  @OneToMany(() => Room, (room) => room.turnament, { cascade: true })
 "rooms": Room[];
}
