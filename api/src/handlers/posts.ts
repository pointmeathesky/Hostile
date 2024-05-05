import prisma from "../db"

//this one works, needs interface
export const getPost = async (req,res) => {
    const id = req.params.id

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

    res.json({data: post})
}

export const Posts = async (req,res)=> {

    const allPosts = await prisma.post.findMany({
        //without this it puts the oldest posts first which isn't helpful for a feed
        orderBy: {
            createdAt: 'desc' 
        },
        
        select: {
            name: true,
            body:true,
            id:true,
            belongsTo: {
                select:{
                    username: true
                }
            }
        }
 
    })
	res.json(allPosts);

}

//ths one works
export const getPosts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            posts: true
        }
    })

    res.json({data: user.posts})
}

//this one works
export const createPost = async (req, res) => {
    const post = await prisma.post.create({
        data: {
            name: req.body.name,
            body: req.body.body,
            belongsToId: req.user.id
        }
    })
    return res.redirect("/feed")
    // res.json({data: post})
}

export const createComment = async (req, res) => {
    try {

        if (!req.body.postId) {
            return res.status(400).json({ error: 'Post ID is required.' });
        }
        const comment = await prisma.comment.create({

            data: {
                body: req.body.comment,
                belongsToId: req.user.id,
                postId: req.body.postId
            }
        });

        return res.redirect(`/viewpost/?id=${req.body.postId}`);

    } catch (error) {

        console.error('Failed to create comment:', error);
        return res.status(500).json({ error: 'Failed to create comment' });
    }
}

//needs to be tested - needs interface
export const updatePost = async (req, res) => {
    const updated = await prisma.post.update({
        where: {
            id: req.body.id
        },

        data: {
            name: req.body.name,
            body: req.body.body
        }
    })
    res.json({data: updated})
}

//works
export const deletPost = async (req, res) => {
    const deleteComment = await prisma.comment.deleteMany ({
        where: {
            postId: req.body.postId
        }
    })
    const deleted = await prisma.post.delete({
        where: {
            id_belongsToId: {
                id: req.body.postId,
            belongsToId: req.user.id
            }
            
        }
    })

    return res.redirect('/api/profile')
}

export const deleteComment = async (req, res) => {
    const deleteComment = await prisma.comment.deleteMany ({
        where: {
            belongsToId: req.user.id,
            postId: req.body.postId
        }
    })
    res.json({data: deleteComment})
}