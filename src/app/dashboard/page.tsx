'use client'
import { StatCard } from "@/components/dashboard/stat-card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { Wallet, TrendingUp, TrendingDown, Landmark } from "lucide-react"
import { useTransactions } from "@/context/TransactionContext";

export default function DashboardPage() {
  const { transactions } = useTransactions();
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
    
  const balance = totalIncome - totalExpenses

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Balance"
          value={formatCurrency(balance)}
          icon={<Landmark className="h-5 w-5 text-muted-foreground" />}
          description="Total balance available"
        />
        <StatCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
          description="Income from all sources"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={<TrendingDown className="h-5 w-5 text-muted-foreground" />}
          description="Expenses from all categories"
        />
        <StatCard
          title="Transactions"
          value={transactions.length.toString()}
          icon={<Wallet className="h-5 w-5 text-muted-foreground" />}
          description="Total number of transactions"
        />
      </div>

      <div>
        <OverviewChart data={transactions} />
      </div>
    </div>
  )
}
