export type PostType = {
	id: string
	title: string
	updatedAt?: string
	user: {
		id: string
		email: string
		image: string
		name: string
	}
	comments: {
		id: string
		createdAt?: string
		postId: string
		title: string
		userId: string
		user: {
			id: string
			image: string
			email: string
			name: string
		}
	}[]
}