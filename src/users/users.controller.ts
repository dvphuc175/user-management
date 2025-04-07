import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from './enums/role.enum';
import { IsSelfGuard } from '../auth/isSelf.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(
    // @Body("email") email: string,
    // // = const email: string = req.body.email
    // @Body("password") password: string,
    // @Body("name") name: string
    @Body() createUserDto: CreateUserDto
    ) {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  @Roles(Role.ADMIN)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(+id);
  }

  @Patch(':id/roles')
  @Roles(Role.ADMIN)
  updateRoles(@Param('id') id: string, @Body('roles') roles: Role[]): Promise<User> {
    return this.usersService.updateRoles(+id, roles);
  }

  @Patch(':id/profile')
  @Roles(Role.USER)
  @UseGuards(IsSelfGuard)
  updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<User> {
  return this.usersService.updateProfile(+id, updateProfileDto);
}
}
