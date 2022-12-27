import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

const schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

export const User = model<IUser>("User", schema);
