'use client';

import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './protected-route.module.css';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
