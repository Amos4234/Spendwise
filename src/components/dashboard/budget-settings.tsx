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
  budget: z.coerce.number().positive({ message: "Budget must be a positive number." }),
})

export function BudgetSettings() {
  const { toast } = useToast()
  const { budget, setBudget } = useTransactions()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 0,
    },
  })

  useEffect(() => {
    if (budget !== null) {
      form.setValue("budget", budget);
    }
  }, [budget, form])
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setBudget(values.budget)
    toast({
      title: "Budget Updated",
      description: `Your new monthly budget is KES${values.budget.toLocaleString()}.`,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Budget Amount</FormLabel>
              <FormControl>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">KES</span>
                    <Input type="number" placeholder="50000" className="pl-12" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Set Budget</Button>
      </form>
    </Form>
  )
}
