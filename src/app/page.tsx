"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const currentUser = localStorage.getItem('spendwise-currentUser');
    if (currentUser) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      {/* Optional: Add a loading indicator here */}
    </main>
  );
}
