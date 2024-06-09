import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
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

    const { name, body: postBody } = body;

    if (!name || !postBody) {
        return NextResponse.json({ error: 'Name and body are required' }, { status: 400 });
    }

    try {
        const post = await prisma.post.create({
            data: {
                name: name,
                body: postBody,
                belongsToId: session.user.id,
            },
        });

        return NextResponse.json({ data: post }, { status: 201 });
    } catch (error) {
        console.error('Post creation error:', error);
        return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
    }
}
