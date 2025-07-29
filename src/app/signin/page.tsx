import { AuthTabs } from '@/components/auth/auth-tabs';

export default function SignInPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <AuthTabs />
      </div>
    </main>
  );
}
