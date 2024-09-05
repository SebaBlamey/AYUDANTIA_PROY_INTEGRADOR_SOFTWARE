import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = createUserDto;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<User> {
    const userExisting = await this.userRepository.findOneBy({ id });
    if (!userExisting) {
      throw new Error('No se encontro usuario');
    }
    return userExisting;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userExisting = await this.userRepository.findOneBy({ id });
    if (!userExisting) {
      throw new Error('No se encontro usuario');
    }
    return this.userRepository.save({ ...userExisting, ...updateUserDto });
  }

  async remove(id: number): Promise<User> {
    const userExisting = await this.userRepository.findOneBy({ id });
    if (!userExisting) {
      throw new Error('No se encontro usuario');
    }
    userExisting.isActive = false;
    return this.userRepository.save(userExisting);
  }
}
