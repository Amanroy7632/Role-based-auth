import { PrismaClient, Prisma } from "../../generated/prisma";
import IUserRepositoty, {
  FindUser,
} from "../interfaces/userRepository.interface";
import User from "../models/user.model";
import { ApiError } from "../utils";
export default class UserRepositoy implements IUserRepositoty {
  private _prisma: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this._prisma = prismaClient;
  }
  async create(input: User): Promise<User> {
    const existingUser = await this._prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists.");
    }
    const created = await this._prisma.user.create({
      data: input,
    });
    const data = { ...input, id: created.id };
    return data;
  }
  async update(id: number, input: User): Promise<User> {
    const isUser = await this._prisma.user.findUnique({ where: { id } });
    if (!isUser) {
      throw new ApiError(404, "User not found");
    }
    const updatedUser = await this._prisma.user.update({
      data: input,
      where: { id },
    });
    return { ...updatedUser, password: "" } as User;
  }
  async findOne(id: number): Promise<User> {
    const user = await this._prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return { ...user, password: "" } as User;
  }
  async find(limit: number, offset: number): Promise<FindUser> {
    const [users, totalUsers] = await Promise.all([
      this._prisma.user.findMany({
        skip: offset,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          profileImg: true,
          mobile: true,
        },
        orderBy: {
          id: "asc",
        },
      }),
      this._prisma.user.count(),
    ]);
    return { users, totalUsers };
  }
  async delete(id: number): Promise<User> {
    const isUser = await this._prisma.user.findUnique({ where: { id } });
    if (!isUser) {
      throw new ApiError(404, "User not found");
    }
    const user = await this._prisma.user.delete({ where: { id } });
    return { ...user, password: "" } as User;
  }
}
