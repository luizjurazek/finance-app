import { LayoutDashboard, Wallet, ArrowUpCircle, ArrowDownCircle, PieChart, Target } from 'lucide-react';

export interface MenuItem {
    title: string;
    href?: string;
    icon?: React.ElementType;
    subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'Transações',
        icon: Wallet,
        subItems: [
            {
                title: 'Receitas',
                href: '/transactions/income',
                icon: ArrowUpCircle,
            },
            {
                title: 'Despesas',
                href: '/transactions/expense',
                icon: ArrowDownCircle,
            },
        ],
    },
    {
        title: 'Relatórios',
        href: '/reports',
        icon: PieChart,
        subItems: [
            {
                title: 'Geral',
                href: '/reports/general',
            },
            {
                title: 'Metas',
                href: '/reports/goals',
                icon: Target,
            },
        ],
    },
];
