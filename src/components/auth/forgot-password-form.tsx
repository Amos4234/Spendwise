"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const storedUsers = localStorage.getItem('spendwise-users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const userExists = users.some((u: any) => u.email === values.email);

      if (userExists) {
        // In a real app, you'd send an email. Here, we'll just show a toast.
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        toast({
          title: "Password Reset Sent",
          description: `A reset link has been sent to your email. Your verification code is ${verificationCode}`,
        });
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "User Not Found",
          description: "No account found with that email address.",
        });
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Request Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
         <Button variant="link" asChild>
            <Link href="/">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
