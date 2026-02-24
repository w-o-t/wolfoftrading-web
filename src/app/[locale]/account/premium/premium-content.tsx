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
                {
                  title: "25/25 Realtime-Signale",
                  subtitle: ""
                },
                {
                  title: "Equity-Kurve & Profi Analytics",
                  subtitle: "€/% , Long/Short- und Asset Filter, Headmap, DD Analyse, Recovery Factor, Sharpe Ratio, Expectancy uvm."
                },
                {
                  title: "Statistik",
                  subtitle: "Highend- und UltraProp Analytics Winrate, Trades, Profit Factor, Max DrowDown uvm."
                },
                {
                  title: "Tradedetails",
                  subtitle: "Entry, Stop, TP & Realtime-Charts"
                },
                {
                  title: "Signal-Historie",
                  subtitle: "Datums-, Asset-, Statussuche."
                },
                {
                  title: "Pushes von professionellen Tradern",
                  subtitle: ""
                },
                {
                  title: "EA Copytrading",
                  subtitle: "automatisierter Handel über einen EA Robot"
                }
              ]}

      
      monthlyPriceId={process.env.NEXT_PUBLIC_PRICE_PREMIUM_MONTHLY!}
      yearlyPriceId={process.env.NEXT_PUBLIC_PRICE_PREMIUM_YEARLY!}
      userId={userId}
    />
    </div>
);

}
