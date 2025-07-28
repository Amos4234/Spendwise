import { TransactionHistory } from "@/components/dashboard/transaction-history";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
        <p className="text-muted-foreground">View and filter all your past transactions.</p>
        <TransactionHistory />
    </div>
  );
}
