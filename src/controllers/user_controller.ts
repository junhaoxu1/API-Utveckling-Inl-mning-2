import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { JwtPayload } from "../types";
import { createUser, getUserByEmail } from "./../services/user_service";

const debug = Debug("prisma-books:user_controller");

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).send({
      status: "Fail",
      message: "Authorization required",
    });
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(401).send({
      status: "Fail",
      message: "Authroization required",
    });
  }
  const payload: JwtPayload = {
    sub: user.id,
    first_name: user.first_name,
    email: user.email,
  }
};

export const show = async (req: Request, res: Response) => {};

export const store = async (req: Request, res: Response) => {};

export const update = async (req: Request, res: Response) => {};
