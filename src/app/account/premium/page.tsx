"use client";

import { Suspense } from "react";
import PremiumContent from "./premium-content";

export default function PremiumPage() {
  return (
    <Suspense fallback={<div>Lade...</div>}>
      <PremiumContent />
    </Suspense>
  );
}
