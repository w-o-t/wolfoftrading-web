"use client";
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
    console.log("PID:", priceId);
    console.log("userID:", userId);

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

  return (
    <div className={`plan-card ${isPremium ? "premium" : "standard"}`}>
      <div className="plan-header">{title}</div>
      <ul className="plan-list">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <div className="plan-buttons">
        <button onClick={() => startCheckout(monthlyPriceId)}>
          Monatlich
        </button>
        <button onClick={() => startCheckout(yearlyPriceId)}>
          Jährlich
        </button>
      </div>
    </div>
  );
}
