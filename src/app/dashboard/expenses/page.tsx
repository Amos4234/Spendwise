import { TransactionForm } from "@/components/dashboard/transaction-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AddExpensePage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold tracking-tight">Add Expense</h1>
       <Card>
        <CardHeader>
          <CardTitle>New Expense</CardTitle>
          <CardDescription>
            Record a new expense. Fill out the details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm type="expense" />
        </CardContent>
      </Card>
    </div>
  );
}
