"use client";

import { useSearchParams } from "next/navigation";
import PlanCard from "../../../components/PlanCard";


export default function PremiumPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");
  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";


  return (
  <div className={`page-wrapper ${theme} standard`}>
    <PlanCard
      type="standard"
      title="Standard Trader"
      features={[
         "✔️ 17/25 Realtime-Signale",
                            "✔️ Equity-Kurve | €/%, Long/Short- und Asset Filter",
                            "✔️ Statistik | Basis-Performance",
                            " Winrate, Trades & Advanced Analyse",
                            " Profit Factor, Max DrowDown",
                            "✔️ Tradedetails | Entry, Stop, TP",
      ]}
      monthlyPriceId={process.env.NEXT_PUBLIC_PRICE_STANDARD_MONTHLY!}
      yearlyPriceId={process.env.NEXT_PUBLIC_PRICE_STANDARD_YEARLY!}
      userId={userId}
    />
    </div>
);

}
