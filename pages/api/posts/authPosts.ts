import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const session = await getServerSession(req, res, authOptions);
		if (!session)
			return res
				.status(401)
				.json({ message: "Please sign in!" });

		// Get Auth users Posts
		try {
			const data = await prisma.user.findUnique({
				where: {
					email: session.user?.email!
				},
				include: {
					posts: {
						orderBy: {
							createdAt: "desc"
						},
						include: {
							comments: true
						}
					}
				}
			})

			return res.status(200).json(data)
		} catch(err){
			return res.status(403).json({ message: "An error occurred whilst making the post"})
		}
	}
}
