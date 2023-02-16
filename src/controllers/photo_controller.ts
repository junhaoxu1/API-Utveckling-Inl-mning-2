import { Request, Response } from 'express'
import Debug from 'debug'
import prisma from '../prisma'

const debug = Debug('prisma-books:photo_controller')

export const getPhotos = async (req: Request, res: Response) => {

    try {
        const photos = await prisma.photo.findMany({
            where:{
                user_id: req.token!.sub
            }
        })

        res.send({
            status: 'Success',
            data: photos,
        })
    } catch (err) {
        debug("Error when finding photos", err)
        res.status(500).send({
            status: 'Error',
            message: 'Something went wrong'
        })
    }
}

export const show = async (req: Request, res: Response) => {
}


export const store = async (req: Request, res: Response) => {
}


export const update = async (req: Request, res: Response) => {
}