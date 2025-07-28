import { TransactionForm } from "@/components/dashboard/transaction-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AddIncomePage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold tracking-tight">Add Income</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Income</CardTitle>
          <CardDescription>
            Record a new source of income. Fill out the details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm type="income" />
        </CardContent>
      </Card>
    </div>
  );
}
