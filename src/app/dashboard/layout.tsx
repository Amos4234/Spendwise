'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid,
  LogOut,
  TrendingDown,
  TrendingUp,
  History,
  Wallet2,
  Target,
  PiggyBank,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { TransactionProvider } from '@/context/TransactionContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    {
      href: '/dashboard/income',
      label: 'Add Income',
      icon: TrendingUp,
    },
    {
      href: '/dashboard/expenses',
      label: 'Add Expense',
      icon: TrendingDown,
    },
    {
      href: "/dashboard/budget",
      label: "Set Budget",
      icon: Target,
    },
    {
      href: "/dashboard/goal",
      label: "Goal Saving",
      icon: PiggyBank,
    },
    {
      href: '/dashboard/transactions',
      label: 'History',
      icon: History,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('spendwise-currentUser');
    router.push('/');
  };

  return (
    <TransactionProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Wallet2 className="h-6 w-6" />
                </div>
                <span className="font-bold text-lg text-foreground">Spendwise</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1">
            <DashboardHeader />
            <div className="p-4 sm:p-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </TransactionProvider>
  );
}
