"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useTransactions } from "@/context/TransactionContext"

const formSchema = z.object({
  goal: z.coerce.number().positive({ message: "Savings goal must be a positive number." }),
})

export function GoalSettings() {
  const { toast } = useToast()
  const { savingsGoal, setSavingsGoal } = useTransactions()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: 0,
    },
  })

  useEffect(() => {
    if (savingsGoal !== null) {
      form.setValue("goal", savingsGoal);
    }
  }, [savingsGoal, form])
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSavingsGoal(values.goal)
    toast({
      title: "Savings Goal Updated",
      description: `Your new monthly savings goal is KES${values.goal.toLocaleString()}.`,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Savings Goal</FormLabel>
              <FormControl>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">KES</span>
                    <Input type="number" placeholder="10000" className="pl-12" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Set Goal</Button>
      </form>
    </Form>
  )
}
