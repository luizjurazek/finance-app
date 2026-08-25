'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { menuItems } from '@/config/menu';
import { useAuth } from '@/components/auth-context';
import { SidebarItem } from './sidebarItem';
import styles from './sidebar.module.css';
import { ThemeToggle } from '../theme-toggle';

interface SidebarProps {
    isMobileOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { logout } = useAuth();
    const pathname = usePathname();

    if (pathname === '/login' || pathname === '/register') {
        return null;
    }

    return (
        <>
            {/* Backdrop for mobile */}
            <div className={`${styles.backdrop} ${isMobileOpen ? styles.backdropVisible : ''}`} onClick={onClose} />

            <aside
                className={`${styles.sidebar} ${
                    isCollapsed ? styles.sidebarCollapsed + ' sidebar-collapsed' : styles.sidebarExpanded
                } ${isMobileOpen ? styles.sidebarMobileOpen : ''}`}
            >
                <button onClick={() => setIsCollapsed(!isCollapsed)} className={styles.toggleBtn}>
                    {isCollapsed ? (
                        <ChevronRight size={14} />
                    ) : (
                        <ChevronDown size={14} className={styles.toggleIconRotated} />
                    )}
                </button>

                <div className={`${styles.header} ${isCollapsed ? styles.headerCollapsed : styles.headerExpanded}`}>
                    <div className={styles.logoContainer}>
                        <div className={styles.logoBadge}>
                            <span className={styles.logoText}>F</span>
                        </div>
                        {!isCollapsed && <span className={styles.appName}>Finance App</span>}
                    </div>
                </div>

                <div className={styles.menuContainer}>
                    {menuItems.map((item, idx) => (
                        <SidebarItem key={idx} item={item} isCollapsed={isCollapsed} />
                    ))}
                </div>

                <div className={styles.footer}>
                    <ThemeToggle />
                    <Link
                        href="/settings"
                        className={styles.settingsLink}
                        title={isCollapsed ? 'Configurações' : undefined}
                    >
                        <Settings className={styles.settingsIcon} />
                        {!isCollapsed && <span className={styles.settingsText}>Configurações</span>}
                    </Link>
                    <button onClick={logout} className={styles.logoutBtn} title={isCollapsed ? 'Sair' : undefined}>
                        <LogOut className={styles.logoutIcon} />
                        {!isCollapsed && <span className={styles.logoutText}>Sair</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
