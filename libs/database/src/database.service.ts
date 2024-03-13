import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { TwitterFollowerRawData } from './entities/twitter-follower.entity';

@Injectable()
// export class DatabaseService {
//     constructor(
//         @InjectRepository(TwitterFollowerRawData)
//         private twitterFollowerRepository: Repository<TwitterFollowerRawData>,
//     ) {}

//     async findAll(): Promise<TwitterFollowerRawData[]> {
//         return this.twitterFollowerRepository.find();
//     }

//     async findOne(id: number): Promise<TwitterFollowerRawData> {
//         return this.twitterFollowerRepository.findOne({ where: { id } });
//     }

//     async create(user: Partial<TwitterFollowerRawData>): Promise<TwitterFollowerRawData> {
//         const newFollowerData = this.twitterFollowerRepository.create(user);
//         return this.twitterFollowerRepository.save(newFollowerData);
//     }

//     async update(id: number, user: Partial<TwitterFollowerRawData>): Promise<TwitterFollowerRawData> {
//         await this.twitterFollowerRepository.update(id, user);
//         return this.twitterFollowerRepository.findOne({ where: { id } });
//     }
    
//     async delete(id: number): Promise<void> {
//         await this.twitterFollowerRepository.delete(id);
//     }
// }

export class DatabaseService {}
