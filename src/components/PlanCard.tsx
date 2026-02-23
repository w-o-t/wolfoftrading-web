"use client";

import CheckIcon from "@mui/icons-material/Check";
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

  return (
    <div className={`plan-card ${isPremium ? "premium" : "standard"}`}>
      <div className="plan-header-wrapper">
  <div className={`plan-badge ${isPremium ? "premium" : "standard"}`}>
    <CheckIcon className='feature-icon'/>
    <span className="badge-icon">
      <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="badge-icon"
  >
    <path d="M12 2l2.39 4.84L20 7.27l-4 3.89.94 5.48L12 14.77l-4.94 2.87L8 11.16 4 7.27l5.61-.43L12 2z" />
  </svg>
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
        <ul> * Preis mtl. ist mtl. und jährl. ist jährl. kündbar. | Aktion: 10% auf den Standard Trader jährl. / 20% Premium Trader jährl.</ul>
      </div>
    </div>
  );
}
