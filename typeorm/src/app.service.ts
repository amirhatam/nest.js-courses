import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  //Injecting Repositories into Providers
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find(); // SELECT * from user
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = this.usersRepository.findOneOrFail(id); // SELECT * from user WHERE user id = id;
      return user;
    } catch (error) {
      throw error;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
