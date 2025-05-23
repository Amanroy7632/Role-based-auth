import { sendMail } from "../config/email.config";
import { ACCOUNT_CREATE_SUCCESS_MAIL } from "../emailTemplates";
import { NODE_ENV } from "../config";
import IUserRepositoty, {
  FindUser,
} from "../interfaces/userRepository.interface";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service";
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
    const newUser = await this.repository.create(data);
    const token = tokenService.accountVerificationToken({
      email: newUser.email,
      id: newUser.id,
    });
     sendMail(
      newUser.email,
      "Account Registration and Verification",
      ACCOUNT_CREATE_SUCCESS_MAIL.replace("[USER]", newUser.name).replace(
        "[VERIFICATION_LINK]",
        `${
          NODE_ENV === "production"
            ? ""
            : `http://localhost:5173/verify-account?token=${token}`
        }`
      )
    );
    return newUser;
  }
  async updateUser(id: number, input: User): Promise<User> {
    return await this.repository.update(id, input);
  }
  async getUsers(limit: number, offset: number,search?:string): Promise<FindUser> {
    return await this.repository.find(limit, offset,search);
  }
  async getUserById(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }
  async deleteUser(id: number): Promise<User> {
    return await this.repository.delete(id);
  }
}
