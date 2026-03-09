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
    const [isHovered, setIsHovered] = React.useState(false);
    const itemRef = React.useRef<HTMLDivElement>(null);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const isAnySubItemActive =
        hasSubItems &&
        item.subItems!.some((sub) => sub.href && (pathname === sub.href || pathname.startsWith(sub.href + '/')));

    const [isOpen, setIsOpen] = useState(isAnySubItemActive);
    const Icon = item.icon;

    const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + '/') : false;

    React.useEffect(() => {
        if (isAnySubItemActive) {
            setIsOpen(true);
        }
    }, [isAnySubItemActive, pathname]);

    const toggleOpen = (e: React.MouseEvent) => {
        if (hasSubItems) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    const paddingLeft = isCollapsed ? '0' : `${1 + level * 0.75}rem`;

    // Calculate position for floating menu
    const getFloatingMenuStyles = () => {
        if (!itemRef.current) return {};
        const rect = itemRef.current.getBoundingClientRect();
        return {
            top: `${rect.top}px`,
        };
    };

    return (
        <div
            ref={itemRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
        >
            <Link
                href={item.href || '#'}
                onClick={hasSubItems ? toggleOpen : undefined}
                className={`${styles.link} ${isActive ? styles.linkActive : styles.linkInactive} ${
                    isCollapsed ? styles.linkCollapsed : ''
                }`}
                style={isCollapsed ? {} : { paddingLeft }}
                title={isCollapsed ? item.title : undefined}
            >
                <div className={`${styles.content} ${isCollapsed ? styles.contentCollapsed : ''}`}>
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

            {/* Normal sub-items when expanded */}
            {!isCollapsed && hasSubItems && isOpen && (
                <div className={styles.subItems}>
                    {item.subItems!.map((subItem, idx) => (
                        <SidebarItem key={idx} item={subItem} level={level + 1} isCollapsed={isCollapsed} />
                    ))}
                </div>
            )}

            {/* Floating sub-menu when collapsed */}
            {isCollapsed && isHovered && hasSubItems && (
                <div className={styles.floatingMenu} style={getFloatingMenuStyles()}>
                    <div className={styles.floatingTitle}>{item.title}</div>
                    {item.subItems!.map((subItem, idx) => (
                        <SidebarItem key={idx} item={subItem} level={0} isCollapsed={false} />
                    ))}
                </div>
            )}
        </div>
    );
};
