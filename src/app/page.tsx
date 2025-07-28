import { AuthTabs } from '@/components/auth/auth-tabs';
import { Wallet2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Wallet2 className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-foreground">
            Spendwise
            </h1>
            <p className="mt-2 text-muted-foreground">
            Your personal finance tracker.
            </p>
        </div>
        <AuthTabs />
      </div>
    </main>
  );
}
