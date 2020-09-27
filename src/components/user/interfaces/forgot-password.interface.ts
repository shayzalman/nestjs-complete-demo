import {Document} from "mongoose";

export interface ForgotPassword extends Document {
  email: string;
  verification: string;
  firstUsed: boolean;
  finalUsed: boolean;
  expires: Date;
  ip: string;
  ipRequest: string;
  browser: string;
  browserRequest: string;
  country: string;
  countryRequest: string;
  ipChanged: string;
  browserChanged: string;
  countryChanged: string;
}
