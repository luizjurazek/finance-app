'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MenuItem } from '@/config/menu';
import styles from './sidebarItem.module.css';

export const SidebarItem = ({
    item,
    level = 0,
    isCollapsed,
}: {
    item: MenuItem;
    level?: number;
    isCollapsed: boolean;
}) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const Icon = item.icon;
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + '/') : false;

    const toggleOpen = (e: React.MouseEvent) => {
        if (hasSubItems) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    const paddingLeft = isCollapsed ? '1rem' : `${1 + level * 0.75}rem`;

    return (
        <div>
            <Link
                href={item.href || '#'}
                onClick={hasSubItems ? toggleOpen : undefined}
                className={`${styles.link} ${isActive ? styles.linkActive : styles.linkInactive}`}
                style={{ paddingLeft }}
                title={isCollapsed ? item.title : undefined}
            >
                <div className={styles.content}>
                    {Icon && (
                        <Icon className={`${styles.icon} ${isActive ? styles.iconActive : styles.iconInactive}`} />
                    )}
                    {!isCollapsed && <span className={styles.title}>{item.title}</span>}
                </div>

                {!isCollapsed && hasSubItems && (
                    <div className={styles.chevron}>
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                )}
            </Link>

            {!isCollapsed && hasSubItems && isOpen && (
                <div className={styles.subItems}>
                    {item.subItems!.map((subItem, idx) => (
                        <SidebarItem key={idx} item={subItem} level={level + 1} isCollapsed={isCollapsed} />
                    ))}
                </div>
            )}
        </div>
    );
};
