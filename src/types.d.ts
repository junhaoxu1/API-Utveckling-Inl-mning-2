export type CreatePhotoData = {
	title: string,
	url: string,
	comment?: string,
}

export type UpdatePhotoData = {
	title?: string,
	url?: string,
	comment?: string,
}

export type CreateAlbumData = {
    title: string,
}

export type UpdateAlbumData = {
	title?: string,
}

export type CreateUserData = {
	email: string,
	password: string,
	first_name: string,
	last_name: string,
}

export type JwtPayload = {
	sub: number,
	first_name: string,
	email: string,
	iat?: number,
	exp?: number,
}