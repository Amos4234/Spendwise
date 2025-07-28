"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Transaction } from "@/lib/types"
import { format } from "date-fns"

interface OverviewChartProps {
  data: Transaction[]
}

export function OverviewChart({ data }: OverviewChartProps) {
  const processData = () => {
    const monthlyData: { [key: string]: { name: string; income: number; expense: number } } = {}

    data.forEach(transaction => {
      // Dates are 'yyyy-MM-dd'. We parse it as a local date to avoid timezone shifts.
      const dateParts = transaction.date.split('-').map(Number);
      const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

      const month = format(date, 'MMM');
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      if (!monthlyData[key]) {
        monthlyData[key] = { name: month, income: 0, expense: 0 }
      }

      if (transaction.type === 'income') {
        monthlyData[key].income += transaction.amount
      } else {
        monthlyData[key].expense += transaction.amount
      }
    })

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return Object.values(monthlyData).sort((a, b) => {
        const monthA = monthOrder.indexOf(a.name);
        const monthB = monthOrder.indexOf(b.name);
        // This assumes data is for the same year, which might need adjustment for multi-year data.
        // For this app, it's a reasonable assumption for the chart.
        return monthA - monthB;
    });
  }

  const chartData = processData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>A summary of your income and expenses over time.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              cursor={{ fill: 'hsl(var(--accent))' }}
            />
            <Legend />
            <Bar dataKey="income" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
