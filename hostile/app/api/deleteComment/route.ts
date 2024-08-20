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

    const { commentId } = body;

    if (!commentId) {
        return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            select: { belongsToId: true },
        });

        if (!comment || comment.belongsToId !== session.user.id) {
            return NextResponse.json({ error: 'Comment not found or unauthorized' }, { status: 404 });
        }


        // Delete the post
        await prisma.comment.delete({
            where: { id: commentId },
        });

        return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Error deleting comment' }, { status: 500 });
    }
}
