import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    response.cookies.set('next-auth.session-token', '', { path: '/', expires: new Date(0) });
    return response;
}
