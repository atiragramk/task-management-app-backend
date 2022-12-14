import { Schema } from "mongoose";
import ModelMixIn from "../mixIns";
import { User } from "../types";

export const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email required"],
      validate: {
        validator: (value: string) => {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: () => "Email is invalid",
      },
    },
    password: { type: String },
    color: { type: String, required: true },
    token: { type: String },
  },
  { timestamps: true }
);

class UserModel extends ModelMixIn<User>("user", userSchema) {
  getAllUsers() {
    return this.model.aggregate([{ $project: { "password": 0 } }]);

  }

  getUserByEmail(email: string) {
    return this.model.findOne({ email });
  }

  getUserById(id: string) {
    return this.model.findById(id);
  }
}

export default UserModel;
