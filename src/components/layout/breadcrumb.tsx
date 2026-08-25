'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { menuItems, MenuItem } from '@/config/menu';
import styles from './breadcrumb.module.css';

type TBreadCrumbProps = {
    homeElement: ReactNode;
    separator: ReactNode;
    containerClasses?: string;
    listClasses?: string;
    activeClasses?: string;
    capitalizeLinks?: boolean;
};

const NextBreadcrumb = ({
    homeElement,
    separator,
    containerClasses,
    listClasses,
    activeClasses,
    capitalizeLinks,
}: TBreadCrumbProps) => {
    const paths = usePathname();
    const pathNames = paths.split('/').filter((path) => path);

    return (
        <div className={styles.wrapper}>
            <ul className={containerClasses}>
                <li className={listClasses}>
                    <Link href={'/'}>{homeElement}</Link>
                </li>
                {pathNames.length > 0 && separator}
                {pathNames.map((link, index) => {
                    const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                    const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
                    let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link;

                    const menuItem = menuItems.find((item: MenuItem) => item.href === href);
                    if (menuItem) {
                        itemLink = menuItem.title;
                    }

                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses}>
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

export default NextBreadcrumb;
