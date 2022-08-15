import UserModel from "../models/user.model";

class UserService {
  constructor(private user: UserModel = user) {}

  async createUser(firstName: string, lastName: string, email: string) {
    const existUser = await this.user.getUserByEmail(email);
    if (existUser) {
      throw new Error("The user is already exist");
    }
    const user = new this.user.model({ firstName, lastName, email });
    return await user.save();
  }

  getUser(id: string) {
    return this.user.getUserById(id);
  }

  async getAllUsers() {
    return this.user.getAllUsers();
  }
}

export default UserService;
