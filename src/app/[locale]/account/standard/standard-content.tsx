"use client";

import { useSearchParams } from "next/navigation";
import PlanCard from "../../../../components/PlanCard";
import CheckIcon from "@mui/icons-material/Check";
console.log("MONTHLY:", process.env.NEXT_PUBLIC_PRICE_STANDARD_MONTHLY);
console.log("YEARLY:", process.env.NEXT_PUBLIC_PRICE_STANDARD_YEARLY);
import Image from "next/image";

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
                {
                  title: "17/25 Realtime-Signale",
                  subtitle: ""
                },
                {
                  title: "Equity-Kurve",
                  subtitle: "€/%, Long/Short- und Asset Filter"
                },
                {
                  title: "Statistik | Basis-Performance",
                  subtitle: "Winrate, Trades & Advanced Analyse, Profit Factor, Max DrowDown"
                },
                {
                  title: "Tradedetails | Entry, Stop, TP",
                  subtitle: ""
                },
      ]}
      monthlyPriceId={process.env.NEXT_PUBLIC_PRICE_STANDARD_MONTHLY!}
      yearlyPriceId={process.env.NEXT_PUBLIC_PRICE_STANDARD_YEARLY!}
      userId={userId}
    />
    </div>
);

}
