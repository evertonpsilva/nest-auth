import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from './auth.service';
import { ModuleRef, ContextIdFactory } from "@nestjs/core";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthService, private moduleRef: ModuleRef){
        super({
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(request: Request, email: string, password: string): Promise<any>{

        const contextId = ContextIdFactory.getByRequest(request);
        const authService = await this.moduleRef.resolve(AuthService, contextId);

        const user = await this.authService.validateUser(email, password);
        if(!user){
            console.log(email, password, user);
            throw new UnauthorizedException();
        }

        return user;

    }

}