import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../db';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const id = params.slug;

    try {
        const post = await prisma.post.findFirst({
            where: { id },
            include: {
                belongsTo: {
                    select: {
                        username: true
                    }
                },
                comments: {
                    include: {
                        belongsTo: {
                            select: { username: true }
                        }
                    }
                }
            }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ data: post });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
    }
}
