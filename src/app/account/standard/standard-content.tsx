"use client";

import { useSearchParams } from "next/navigation";

export default function StandardContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");

  const startCheckout = async (priceId: string) => {
    if (!userId) {
      alert("User ID fehlt.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
        body: JSON.stringify({
          priceId,
          userId,
        }),
      }
    );

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Stripe konnte nicht gestartet werden.");
      console.error(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Standard Trader</h1>

      <div className="space-y-4 mb-8 text-center">
        <p>✓ 7/20 Realtime Signale</p>
        <p>✓ Equity Kurve</p>
        <p>✓ Statistik</p>
        <p>✓ Tradedetails</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() =>
            startCheckout(
              process.env.NEXT_PUBLIC_STANDARD_MONTHLY_PRICE!
            )
          }
          className="bg-blue-500 text-white px-6 py-3 rounded-xl"
        >
          Monatlich
        </button>

        <button
          onClick={() =>
            startCheckout(
              process.env.NEXT_PUBLIC_STANDARD_YEARLY_PRICE!
            )
          }
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Jährlich
        </button>
      </div>
    </div>
  );
}
