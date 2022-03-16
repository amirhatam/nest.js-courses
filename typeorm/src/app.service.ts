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
    return this.usersRepository.find({
      relations: ['pets'],
    }); // SELECT * from user Join pets
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = this.usersRepository.findOneOrFail(id); // SELECT * from user WHERE user id = id;
      return user;
    } catch (error) {
      throw error;
    }
  }

  createUser(name: string): Promise<User> {
    //Or:  .insert
    const newUser = this.usersRepository.create({ name }); // const newUser = new User() ; newUser.name = name;
    return this.usersRepository.save(newUser); //INSERT
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);

    user.name = name;

    return this.usersRepository.save(user); //UPDATE
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);

    //Or:  .delete
    return this.usersRepository.remove(user);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
