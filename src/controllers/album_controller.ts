import { Request, Response } from "express";
import Debug from "debug";
import prisma from "../prisma";
import { validationResult } from "express-validator";

const debug = Debug("prisma-books:album_controller");

export const index = async (req: Request, res: Response) => {
  const albums = await prisma.album.findMany({
    where: {
      user_id: req.token!.sub,
    },
  });

  try {
    const albums = await prisma.album.findMany({
      where: {
        user_id: req.token!.sub,
      },
    });

    res.send({
      status: "Success",
      data: albums
    });
  } catch (err) {
    debug("Error when finding albums", err);
    res.status(500).send({status: "Error", message: albums,
    });
  }
};

export const show = async (req: Request, res: Response) => {
  const album_id = Number(req.params.album_id);

  try {
    const album = await prisma.album.findUniqueOrThrow({
      where: {
        id: album_id,
      },
      include: {
        photos: true,
      },
    });

    res.send({
      status: "success",
      data: album,
    });
  } catch (err) {
    debug(
      "Error thrown when finding album with id %o: %o",
      req.params.album_id,
      err
    );
    return res.status(404).send({ status: "error", message: "Album Not Found" });
  }
};

export const store = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).send({
      status: "fail",
      data: validationErrors.array(),
    });
  }

  try {
    const album = await prisma.album.create({
      data: {
        title: req.body.title,
        user: {
          connect: {
            email: req.token!.email,
          },
        },
      },
    });

    res.send({
      status: "Success",
      data: album,
    });
  } catch (err) {
    debug("Error thrown when creating a album %o: %o", req.body, err);
    res.status(500).send({ status: "error", message: "Could Not Create Album" });
  }
};

export const storePhoto = async (req: Request, res: Response) => {
  const album_id = Number(req.params.album_id);
  const { photo_id } = req.body;
  const user_id = req.token!.sub;

  try {
    const photo = await prisma.photo.findUnique({
      where: {
        id: photo_id,
      },
    });
    if (photo?.user_id !== user_id) {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }

    await prisma.album.update({
      where: {
        id: album_id,
      },
      data: {
        photos: {
          connect: {
            id: photo_id,
          },
        },
      },
    });

    res.send({
      status: "Success",
      data: null,
    });
  } catch (err) {
    debug("Error thrown when creating a album %o: %o", req.body, err);
    res.status(500).send({ status: "error", message: "Could not add photo to album" });
  }
};

export const update = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).send({
      status: "fail",
      data: validationErrors.array(),
    });
  }

  const album_id = Number(req.params.album_id);
  const user_id = req.token!.sub;

  try {
    const ownedAlbum = await prisma.album.findUnique({
      where: {
        id: album_id,
      },
    });

    if (ownedAlbum?.user_id !== user_id) {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }

    const album = await prisma.album.update({
      where: {
        id: album_id,
      },
      data: req.body,
    });

    return res.send(album);
  } catch (err) {
    console.log(album_id);
    return res.status(500).send({ message: "Could not patch album" });
  }
};
