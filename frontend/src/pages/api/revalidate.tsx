import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
        return res.status(401).json({ message: 'Invalid Token' })
    }

    try {
        const pathToRevalidate = req.query.path as string

        await res.revalidate(`/${pathToRevalidate}`)
        return res.json({ revalidated: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Error Revalidating')
    }
}