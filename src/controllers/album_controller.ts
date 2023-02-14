import { getAlbum, getAlbums } from "../services/album_services"
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

export const index = async (req: Request, res: Response) => {
    try {
        const albums = await getAlbums()
        res.send({
            status: 'Success',
            data: albums
        })
    } catch {
        res.status(500).send({ status: "error", message: "Couldn't find albums" })
    }
}

export const show = async (req: Request, res: Response) => {
    const album_id = Number(req.params.album_id)

    try {
        const album = await getAlbum(album_id)
        res.send({
            status: 'Success',
            data: album
        })
    } catch {
        res.status(500).send({ status: "error", message: "Couldn't find album" })
    }
}


export const store = async (req: Request, res: Response) => {
}


export const update = async (req: Request, res: Response) => {
}