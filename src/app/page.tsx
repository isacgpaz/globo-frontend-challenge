'use client'

import { useAuthContext } from "@/contexts/auth-context";

export default function Home() {
  const { user } = useAuthContext()

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto p-6 ">
        {user ? (
          <div>
            Olá,
            <br />
            <span className="font-medium text-xl">
              {user?.name}
            </span>
          </div>
        ) : (
          <div>
            <span>Faça login para acessar sua conta.</span>
          </div>
        )}
      </div>
    </div>
  );
}
