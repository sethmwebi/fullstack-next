import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		
		// fetch all posts
		try {
			const data = await prisma.post.findMany({
				include: {
					user: true,
					comments: true
				},
				orderBy: {
					createdAt: "desc"
				}
			})

			return res.status(200).json(data)
		} catch(err){
			return res.status(403).json({ message: "Error fetching posts"})
		}
	}
}
