import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IGameTwitterFollowersRawData } from '../interfaces';

@Entity('game-twitter-followers')
export class GameFollowersRawData implements IGameTwitterFollowersRawData {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'game_id', type: 'uuid' })
  gameId: string;

  @Column({ name: 'follower_count' })
  followerCount: number;

  @Column({ name: 'follower_list' })
  followerList: string[];

  @Column({ name: 'new_list' })
  newList: string[];

  @Column({ name: 'removed_list' })
  removeList: string[];

  @UpdateDateColumn({ name: 'update_at', type: 'timestamp with time zone' })
  updateAt: Date;
}
