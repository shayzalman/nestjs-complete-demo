import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../user/schemas/user.schema';
import {RefreshTokenSchema} from './schemas/refresh-token.schema';
import {conf} from "../../conf/config";
import {GqlGuard} from "./guards/gql.guard";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: conf.auth.secret,
      signOptions: { expiresIn: conf.auth.jwt_exp },
    }),
  ],
  providers: [AuthService, JwtStrategy, GqlGuard],
  exports: [AuthService],
})
export class AuthModule {}
