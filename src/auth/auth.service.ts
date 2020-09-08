import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){

    }

    async validateUser(email: string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(email);
        if(user && user.password === pass){
            const {password, ...result} = user;
            return result;
        }else if(user && user.password != pass){
            throw new UnauthorizedException('Invalid password');
        }else if(!user){
            throw new UnauthorizedException('User not found');
        }
        throw new UnauthorizedException();
    }

    async login(user: any){
        const payload = {username: user.username, sub: user.userId};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

}
