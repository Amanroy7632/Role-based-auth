import IUserRepositoty, { FindUser } from "../interfaces/userRepository.interface";
import User from "../models/user.model";
import bcrypt from "bcrypt";
export default class UserService {
  private repository: IUserRepositoty;
  constructor(repository: IUserRepositoty) {
    this.repository = repository;
  }
  async createUser(input: User): Promise<User> {
    const password = bcrypt.hashSync(input.password, 10);
    const data = {
      ...input,
      password,
    };
    return await this.repository.create(data);
  }
  async updateUser(id: number, input: User): Promise<User> {
    return await this.repository.update(id, input);
  }
  async getUsers(limit: number, offset: number): Promise<FindUser> {
    return await this.repository.find(limit, offset);
  }
  async getUserById(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }
  async deleteUser(id: number): Promise<User> {
    return await this.repository.delete(id);
  }
}
