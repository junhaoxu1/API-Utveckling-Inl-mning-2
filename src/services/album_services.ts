import prisma from '../prisma'

export const getAlbums = async () => {
	return await prisma.album.findMany()
}

export const getAlbum = async (album_id: number) => {
    return await prisma.album.findUniqueOrThrow({
        where: {
            id: album_id,
        },
        include: {
            photos: true,
        }
    })
}