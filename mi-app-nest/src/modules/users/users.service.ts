export type IUser = { id: number, name: string, email: string, age: number };
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



@Injectable()
export class UsersService {
  private users: IUser[] = [
    { id: 1, name: 'paolar', email: 'paolar@correo.com', age: 28 },
    { id: 2, name: 'homero simpson', email: 'homerojs@gmail.com', age: 39 },
    { id: 3, name: 'andres', email: 'andres@hotmail.com', age: 25 }
  ];

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: number): IUser {
    const userFind = this.users.find((user) => user.id === id);
    if (!userFind) throw new NotFoundException(`User with id ${id} not found`);
    return userFind;
  }

  create(user: CreateUserDto): IUser {
    const newId = this.users.length > 0
      ? this.users[this.users.length - 1].id + 1
      : 1;

    const newUser: IUser = { id: newId, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, newUser: UpdateUserDto): IUser {
    const user = this.findOne(id);
    Object.assign(user, newUser);
    return user;
  }

  remove(id: number): { deleted: boolean } {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(this.users.indexOf(user), 1);
    return { deleted: true };
  }
}