import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const data = await prisma.post.findUnique({
			where: {
				id: req.query.details
			},
			include: {
				user: true,
				comments: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						user: true
					}
				}
			}
		})

		return res.status(200).json(data)
	} catch (err) {
		return res
			.status(403)
			.json({ message: "An error occurred whilst making the post" });
	}
}
