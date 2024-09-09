import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Player } from './playerModel';
import { Turnament } from './turnamentModel';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  "room_id": string;

  @Column({ type: 'varchar', nullable: false })
 "room_name": string;

  @ManyToOne(() => Turnament, (turnament) => turnament.rooms, { onDelete: "CASCADE" })
  "turnament": Turnament;

  @OneToMany(() => Player, (player) => player.room, { cascade: true })
 "players": Player[];
}
