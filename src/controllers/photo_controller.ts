import { Request, Response } from 'express'
import Debug from 'debug'
import prisma from '../prisma'

const debug = Debug('prisma-books:photo_controller')

export const index = async (req: Request, res: Response) => {

    req.token

    try {
        const photos = await prisma.photo.findMany()
        

        res.send({
            status: 'Success',
            data: photos,
        })
    } catch (err) {
        debug('Error thrown when finding photos', err)
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