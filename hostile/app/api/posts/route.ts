import prisma from "../../db"

export  async function GET(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const allPosts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                name: true,
                body: true,
                id: true,
                belongsTo: {
                    select: {
                        username: true
                    }
                }
            }
        });
        const data = JSON.stringify(allPosts);
        return new Response(data);
        // return res.json(allPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(  'Internal Server Error' );
        // return res.json({ error: 'Internal Server Error' });

    }
}
