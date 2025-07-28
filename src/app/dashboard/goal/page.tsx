import { GoalSettings } from "@/components/dashboard/goal-settings";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function GoalPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold tracking-tight">Savings Goal</h1>
       <Card>
        <CardHeader>
          <CardTitle>Set Your Savings Goal</CardTitle>
          <CardDescription>
            Define your monthly savings target.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoalSettings />
        </Content>
      </Card>
    </div>
  );
}
