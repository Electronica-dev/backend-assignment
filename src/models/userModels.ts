import mongoose, { Schema } from "mongoose";

export interface User {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
