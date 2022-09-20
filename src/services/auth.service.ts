import UserModel from "../models/user.model";
import { User, UserInput } from "../types";
import { Document, Types } from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  constructor(private user: UserModel = user) { }

  async getUserByEmail(email: string) {
    return await this.user.getUserByEmail(email);
  }

  async getUser(id: string) {
    return this.user.getUserById(id);
  }

  async getAllUsers() {
    return this.user.getAllUsers();
  }

  async registerUser(params: User) {
    try {
      const existedUser = await this.getUserByEmail(params.email);
      if (existedUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await this.hashPassword(params.password);
      const user = new this.user.model({
        firstName: params.firstName,
        lastName: params.lastName,
        color: params.color,
        email: params.email,
        password: hashedPassword,
      });
      await user.save();
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color,
        email: user.email,
        password: ''
      };
    } catch (error) {
      throw error;
    }
  }

  public async loginUser(params: UserInput) {
    try {
      const user = await this.user.getUserByEmail(params.email);
      if (!user) {
        throw new Error("User not found");
      }
      const isValid = await this.comparePassword(
        params.password,
        user.password
      );

      if (!isValid) {
        throw new Error("Invalid password");
      }
      const token = await this.generateToken(user);
      user.token = String(token);
      await user.save();
      const { _id, firstName, lastName, email } = user;
      return { token, _id, firstName, lastName, email };
    } catch (error) {
      throw error;
    }
  }

  public async logoutUser(
    user: Document<unknown, any, User> &
      User &
      Required<{ _id: Types.ObjectId }>
  ) {
    try {
      user.token = "";
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  private async comparePassword(password: string, hashedPassword: string) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  private async hashPassword(password: string) {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw error;
    }
  }

  private async generateToken(user: User) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    } catch (error) {
      throw error;
    }
  }

  public verifyToken(token: string): any {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
