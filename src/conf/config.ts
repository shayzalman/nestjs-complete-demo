import {Injectable} from "@nestjs/common";

var fs = require("fs");
const contents = fs.readFileSync("./config.json");
const configurations = JSON.parse(contents);
require("dotenv").config();

@Injectable()
export class Config {
  conf() {
    return configurations[process.env.NODE_ENV];
  }
}

export const conf = configurations[process.env.NODE_ENV];
