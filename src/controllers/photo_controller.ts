import { Request, Response } from "express";
import Debug from "debug";
import prisma from "../prisma";
import { validationResult } from "express-validator";

const debug = Debug("prisma-books:photo_controller");

export const index = async (req: Request, res: Response) => {
  try {
    const photos = await prisma.photo.findMany({
      where: {
        user_id: req.token!.sub,
      },
    });

    res.send({
      status: "Success",
      data: photos,
    });
  } catch (err) {
    debug("Error when finding photos", err);
    res.status(500).send({
      status: "Error",
      message: "Something went wrong",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  const photo_id = Number(req.params.photo_id);

  try {
    const photo = await prisma.photo.findUniqueOrThrow({
      where: {
        id: photo_id,
      },
    });

    res.send({
      status: "success",
      data: photo,
    });
  } catch (err) {
    debug(
      "Error thrown when finding photo with id %o: %o",
      req.params.photo_id,
      err
    );
    return res.status(404).send({ status: "error", message: "Not found" });
  }
};

export const store = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

  try {
    const photo = await prisma.photo.create({
      data: {
        title: req.body.title,
        url: req.body.url,
        comment: req.body.comment,
        user: {
          connect: {
            email: req.token!.email,
          },
        },
      },
    });

    res.send({
      status: "Success",
      data: photo,
    });
  } catch (err) {
    debug("Error thrown when creating a book %o: %o", req.body, err);
    res.status(500).send({ status: "error", message: "Something went wrong" });
  }
};

export const update = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

  const photo_id = Number(req.params.photo_id)
  const user_id = req.token!.sub

	try {
    const ownedPhoto = await prisma.photo.findUnique({ 
      where: { 
          id: photo_id 
      }, 
    })

    if (ownedPhoto?.user_id !== user_id) {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }

		const photo = await prisma.photo.update({
			where: {
				id: photo_id,
			},
			data: req.body,
		})

		return res.send(photo)

	} catch (err) {
		return res.status(500).send({ message: "Something went wrong" })
	}
};
