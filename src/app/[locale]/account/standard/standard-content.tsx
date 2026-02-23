"use client";

import { useSearchParams } from "next/navigation";
import PlanCard from "../../../../components/PlanCard";
import CheckIcon from "@mui/icons-material/Check";

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
         "<Image src='images/check.png' width='22' height='22'/> 17/25 Realtime-Signale",
         "<Image src='images/check.png' width='22' height='22'/> Equity-Kurve | €/%, Long/Short- und Asset Filter",
         "<Image src='images/check.png' width='22' height='22'/> Statistik | Basis-Performance",
         " Winrate, Trades & Advanced Analyse",
         " Profit Factor, Max DrowDown",
         "<Image src='images/check.png' width='22' height='22'/> Tradedetails | Entry, Stop, TP",
      ]}
      monthlyPriceId={process.env.NEXT_PUBLIC_PRICE_STANDARD_MONTHLY!}
      yearlyPriceId={process.env.NEXT_PUBLIC_PRICE_STANDARD_YEARLY!}
      userId={userId}
    />
    </div>
);

}
