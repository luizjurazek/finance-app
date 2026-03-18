'use client';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/protected-route';
import { useAuth } from '@/components/auth-context';

export default function Home() {
    const { user, logout } = useAuth();

    return (
        <ProtectedRoute>
            <div></div>
        </ProtectedRoute>
    );
}
