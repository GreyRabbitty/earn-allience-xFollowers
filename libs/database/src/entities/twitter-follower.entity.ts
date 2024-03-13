import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ITwitterFollower } from '../interfaces';

@Entity('twitter-followers')
export class TwitterFollowerRawData implements ITwitterFollower {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'game_id', type: 'uuid' })
  gameId: string;

  @Column({ name: 'follower_count' })
  followerCount: number;

  @Column({ name: 'follower_list'})
  followerList: Array<string>;

  @Column({ name: 'new_list'})
  newList: Array<string>;

  @Column({ name: 'removed_list'})
  removedList: Array<string>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  updateAt: Date;
}
