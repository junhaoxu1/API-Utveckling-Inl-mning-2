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
  };

  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res.status(500).send({
      status: "error",
      message: "No access token secret defined",
    });
  }

  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h",
  });

  if (!process.env.REFRESH_TOKEN_SECRET) {
    return res.status(500).send({
      status: "Error",
      message: "No refresh token secret defined",
    });
  }

  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "1d",
  });
  res.send({
    status: "success",
    data: {
      access_token, // access_token: access_token
      refresh_token,
    },
  });
};
export const register = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

  const validatedData = matchedData(req)
  console.log("validatedData: ", validatedData)

  const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)
  console.log('Hashed password:', hashedPassword)

  validatedData.password = hashedPassword

  try {
    const user = await createUser({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: validatedData.email,
      password: validatedData.password,
    })

    res.status(201).send({ status: "success", data: user })

  } catch (err) {
		return res.status(500).send({ status: "error", message: "Could not create user in database" })
	}
};

export const store = async (req: Request, res: Response) => {};
