import prisma from "../prisma";
import { CreateUserData } from "../types";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const createUser = async (data: CreateUserData) => {
  return await prisma.user.create({
    data: data,
  });
};
