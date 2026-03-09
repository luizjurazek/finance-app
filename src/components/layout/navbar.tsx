'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';

interface NavbarProps {
    onToggleMenu: () => void;
}

export function Navbar({ onToggleMenu }: NavbarProps) {
    const pathname = usePathname();

    if (pathname === '/login' || pathname === '/register') {
        return null;
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <div className={styles.logoBadge}>
                    <span className={styles.logoText}>F</span>
                </div>
                <span className={styles.appName}>Finance App</span>
            </div>

            <button onClick={onToggleMenu} className={styles.menuToggle} aria-label="Abrir menu">
                <Menu className={styles.menuIcon} />
            </button>
        </nav>
    );
}
