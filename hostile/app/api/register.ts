import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'User creation failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
