
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    const token = req.cookies.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/landing', req.url));
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.next();
    } catch (e) {
        console.error(e);
        return NextResponse.redirect(new URL('/landing', req.url));
    }
}
