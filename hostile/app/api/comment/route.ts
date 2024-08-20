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

    const { postId, content } = body;

    if (!postId || !content) {
        return NextResponse.json({ error: 'Post ID and content are required' }, { status: 400 });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                body: content,
                postId: postId,
                belongsToId: session.user.id,
            },
            include: {
                belongsTo: {
                    select: { username: true }
                }
            }
        });

        return NextResponse.json({ data: comment }, { status: 201 });
    } catch (error) {
        console.error('Comment creation error:', error);
        return NextResponse.json({ error: 'Error creating comment' }, { status: 500 });
    }
}
