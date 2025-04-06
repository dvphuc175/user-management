import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from './enums/role.enum';

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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch(':id/roles')
  @Roles(Role.ADMIN)
  updateRoles(@Param('id') id: string, @Body('roles') roles: Role[]) {
    return this.usersService.updateRoles(+id, roles);
  }
}
