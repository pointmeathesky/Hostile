import prisma from "../../db"

export async function GET (req,res) {
    console.log(req.user)
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            posts: true
        }
    })

    // res.json({data: user.posts})
    const respond = JSON.stringify(user.posts)
    return new Response(respond)

}