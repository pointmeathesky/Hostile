import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req,res) {
    console.log(res.params.slug)
    const id =res.params.slug

    const post = await prisma.post.findFirst({
        where: {
            id,
            // belongsToId: req.user.id

        },
        include: {
            belongsTo: {
                select:{
                    username: true
                }
            },
            comments: {
                include: {
                    belongsTo: {
                        select: {username: true}
                    }
                }
            }
        }
    })
    return new Response(JSON.stringify({data: post}))
    // return ({data: post})
}