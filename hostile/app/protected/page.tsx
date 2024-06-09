'use client';

import { useSession, signIn } from 'next-auth/react';

export default function ProtectedPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        signIn();
        return <p>Redirecting...</p>;
    }

    return <div>Protected content for {session.user?.name}</div>;
}
