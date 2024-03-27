'use client'

import { useAuthContext } from "@/contexts/auth-context";

export default function Home() {
  const { user } = useAuthContext()

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {user?.name}
    </div>
  );
}
