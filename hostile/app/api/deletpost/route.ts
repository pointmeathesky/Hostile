import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import prisma from '../../db';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error('JSON parsing error:', error);
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { postId } = body;

    if (!postId) {
        return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { belongsToId: true },
        });

        if (!post || post.belongsToId !== session.user.id) {
            return NextResponse.json({ error: 'Post not found or unauthorized' }, { status: 404 });
        }

        // Delete comments associated with the post
        await prisma.comment.deleteMany({
            where: {
                postId: postId,
            },
        });

        // Delete the post
        await prisma.post.delete({
            where: { id: postId },
        });

        return NextResponse.json({ message: 'Post and associated comments deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
    }
}
