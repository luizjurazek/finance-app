import { LayoutDashboard, Wallet, ArrowUpCircle, ArrowDownCircle, PieChart, Target, CreditCard } from 'lucide-react';

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
        title: 'Cartões',
        href: '/cards',
        icon: CreditCard,
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
                icon: PieChart,
            },
            {
                title: 'Metas',
                href: '/reports/goals',
                icon: Target,
            },
        ],
    },
];
