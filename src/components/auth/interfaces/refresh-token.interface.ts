import {Document} from 'mongoose';
import {User} from "../../user/interfaces/user.interface";

export interface RefreshToken extends Document {
    userId: User;
    refreshToken: string;
    ip: string;
    browser: string;
    country: string;
}
