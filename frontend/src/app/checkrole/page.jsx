"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CheckRole() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("SESSION:", session);
  }, [session]);

  return (
    <div>
      <h1>Kiểm tra session</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}