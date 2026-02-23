"use client";
console.log ("SUPABASE: ", process.env.NEXT_PUBLIC_SUPABASE_URL)
import { Suspense } from "react";
import StandardContent from "./standard-content";

export default function StandardPage() {
  return (
    <Suspense fallback={<div>Lade...</div>}>
      <StandardContent />
    </Suspense>
  );
}
