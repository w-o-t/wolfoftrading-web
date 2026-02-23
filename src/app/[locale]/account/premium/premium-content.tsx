"use client";

import { useSearchParams } from "next/navigation";
import PlanCard from "../../../../components/PlanCard";

export default function PremiumPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");
  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";
  return (
  <div className={`page-wrapper ${theme} premium`}>
    <PlanCard
      type="premium"
      title="Premium Trader"
      features={[
        "25/25 Realtime-Signale",
        "Equity-Kurve & Profi Analytics",
        "€/% , Long/Short- und Asset Filter, Headmap, DD Analyse, /nRecovery Factor, Sharpe Ratio, Expectancy uvm.",
        "DD Analyse, Recovery Factor, Sharpe Ratio, Expectancy uvm.",
        "Statistik",
        "Equity-Kurve & Profi Analytics",
        "25/25 Realtime-Signale",
        "Equity-Kurve & Profi Analytics",
        
      ]}   
      monthlyPriceId={process.env.NEXT_PUBLIC_PRICE_PREMIUM_MONTHLY!}
      yearlyPriceId={process.env.NEXT_PUBLIC_PRICE_PREMIUM_YEARLY!}
      userId={userId}
    />
    </div>
);

}
