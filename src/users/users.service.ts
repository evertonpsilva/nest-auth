import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

    private readonly users: CreateUserDto[];

    constructor(){
        this.users = [
            {
                userId: 1,
                email: 'tonsilva99@gmail.com',
                password: '123456',
                name: "Everton"
            },
            {
                userId: 2,
                email: 'tonsilva99drive@gmail.com',
                password: 'everton',
                name: "Everton"
            },
            {
                userId: 3,
                email: '18tonsilva@gmail.com',
                password: 'silva',
                name: "Everton"
            },
        ];
    }

    async findOne(email: string): Promise<CreateUserDto | undefined>{
        return this.users.find((userFind) => userFind.email === email);
    }

    async loggedUserData(userId: number): Promise<CreateUserDto>{
        return this.users.find((userFind) => userFind.userId === userId);
    }

}
