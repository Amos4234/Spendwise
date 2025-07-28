import { BudgetSettings } from "@/components/dashboard/budget-settings";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BudgetPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold tracking-tight">Budget Settings</h1>
       <Card>
        <CardHeader>
          <CardTitle>Set Your Budget</CardTitle>
          <CardDescription>
            Define your monthly spending limit to stay on track.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetSettings />
        </CardContent>
      </Card>
    </div>
  );
}
