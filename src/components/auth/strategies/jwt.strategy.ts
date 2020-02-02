import {JwtPayload} from '../interfaces/jwt-payload.interface';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {conf} from "../../../conf/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: conf.auth.secret,
    });
  }

  async validate(jwtPayload: JwtPayload) {
    const user = await this.authService.validateUser(jwtPayload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
