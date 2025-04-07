import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { compareSync } from 'bcryptjs';
import { Role } from './enums/role.enum';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) 
  private usersRepository: Repository<User>){}

  getHashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, password, name } = createUserDto;
      
      // Kiểm tra email đã tồn tại
      const existingUser = await this.usersRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      
      const hashPassword = this.getHashPassword(password);
      const user = this.usersRepository.create({
        email, 
        password: hashPassword, 
        name
      });
      
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    if(isNaN(id)||id <=0) {
      throw new BadRequestException('Invalid user ID')
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user){
      throw new NotFoundException()
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({where: {id}})
  }
  async updateRoles(id: number, roles: Role[]) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    user.roles = roles;
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user){
      throw new NotFoundException()
    }
    return this.usersRepository.delete(id);
  }

async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<User> {
  const user = await this.findOne(id);
  
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  
  // Cập nhật thông tin cá nhân
  Object.assign(user, updateProfileDto);
  
  return this.usersRepository.save(user);
}

  //Hàm dùng trong auth module
  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({where: { email: username }});
  }

  IsValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
}
