import { LayoutDashboard, Wallet, ArrowUpCircle, ArrowDownCircle, PieChart, Target, CreditCard } from 'lucide-react';

export interface MenuItem {
    title: string;
    href?: string;
    icon?: React.ElementType;
    subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'Transações',
        icon: Wallet,
        href: '/transactions',
    },
    {
        title: 'Cartões',
        href: '/cards',
        icon: CreditCard,
    },
];
