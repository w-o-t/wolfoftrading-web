"use client";

import { supabase } from "../../lib/supabase";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  const testConnection = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Magic Link gesendet!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <input
        type="email"
        placeholder="Deine Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={testConnection}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Supabase Test
      </button>
    </div>
  );
}
