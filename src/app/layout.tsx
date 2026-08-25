'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-context';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import NextBreadcrumb from '@/components/layout/breadcrumb';
import breadcrumbStyles from '@/components/layout/breadcrumb.module.css';
import styles from './layout.module.css';

function LayoutContent({ children }: { children: React.ReactNode }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const isAuthRoute = pathname === '/login' || pathname === '/register';

    return (
        <div className={isAuthRoute ? styles.shell : styles.appShell}>
            <Navbar onToggleMenu={() => setIsMobileOpen(true)} />
            <Sidebar isMobileOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
            <main className={styles.main}>
                <div className={styles.mainInner}>
                    <NextBreadcrumb
                        homeElement={'Home'}
                        separator={<span className={styles.breadcrumbSeparator}> &gt; </span>}
                        activeClasses={breadcrumbStyles.itemActive}
                        containerClasses={breadcrumbStyles.list}
                        listClasses={breadcrumbStyles.item}
                        capitalizeLinks
                    />
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
                    }}
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <ThemeProvider>
                    <AuthProvider>
                        <LayoutContent>{children}</LayoutContent>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
