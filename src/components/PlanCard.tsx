"use client";

import Image from "next/image";

console.log("PLAN LOADED");
type PlanCardProps = {
  type: "standard" | "premium";
  title: string;
  features: string[];
  monthlyPriceId: string;
  yearlyPriceId: string;
  userId: string | null;
};

export default function PlanCard({
  type,
  title,
  features,
  monthlyPriceId,
  yearlyPriceId,
  userId,
}: PlanCardProps) {
  const isPremium = type === "premium";

  const startCheckout = async (priceId: string) => {
    if (!userId) {
      alert("User ID fehlt");
      return;
    }
  
    

    const res = await fetch(
      process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL!,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, userId }),
      }
    );

    const data = await res.json();
    if (!data.url) {
      alert("Stripe konnte nicht gestartet werden.");
      return;
    }

    window.location.href = data.url;
  };

  const mtlPrice = isPremium ? "99,00 € / Monat*" : "49,00 € / Monat*"
  const yrlPrice = isPremium ? "950,40 € / Jahr*" : "529,20 € / Jahr*"

  const badgeImage = isPremium
  ? "/images/premium.png"
  : "/images/standard.png";

const badgeAlt = isPremium
  ? "Premium Trader"
  : "Standard Trader";

  const badgeImages = {
    premium: "/images/premium.png",
    standard: "/images/standard.png",
  }

  return (
    <div className={`plan-card ${isPremium ? "premium" : "standard"}`}>
      <div className="plan-header-wrapper">
  <div className={`plan-badge ${isPremium ? "premium" : "standard"}`}>
    
   <span className="badge-icon">
    <Image
    src={badgeImages[isPremium ? "premium" : "standard"]}
    alt="{badgeAlt}"
    width={22}
    height={22}
  />
</span>

    <span>{title}</span>
  </div>
</div>      
      <ul className="plan-list">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <div className="plan-buttons">
        <button onClick={() => startCheckout(monthlyPriceId)}>
          ${mtlPrice}
        </button>
        <button onClick={() => startCheckout(yearlyPriceId)}>
          ${yrlPrice}
        </button>
      </div>
       <div>
        <ul> </ul>
        <ul className="plan-list-short"> * Preis mtl. ist mtl. und jährl. ist jährl. kündbar. | Aktion: 10% auf den Standard Trader jährl. / 20% Premium Trader jährl.</ul>
      </div>
    </div>
   
  );
}
