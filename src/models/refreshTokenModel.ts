import mongoose, { Schema } from "mongoose";

export interface refreshToken {
  token: string;
  expires: Date;

}