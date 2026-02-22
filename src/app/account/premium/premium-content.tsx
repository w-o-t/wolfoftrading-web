"use client";

import { useSearchParams } from "next/navigation";

export default function PremiumPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");

  const startCheckout = async (priceId: string) => {
    if (!userId) {
      alert("User ID fehlt");
      return;
    }

    const res = await fetch(
      process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          userId,
        }),
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
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.title}>Premium Trader</div>

        <ul style={styles.list}>
          <li>🔥 20/20 Realtime-Signale</li>
          <li>🔥 Equity-Kurve & Profi Analytics</li>
          <li>🔥 Statistik (erweitert)</li>
          <li>🔥 Tradedetails (erweitert)</li>
          <li>🔥 Signal-Historie</li>
          <li>🔥 Priorisierte Pushes</li>
          <li>🔥🔥 EA Copytrading</li>
        </ul>

        <div style={styles.buttonRow}>
          <button
            style={styles.button}
            onClick={() =>
              startCheckout(
                process.env.NEXT_PUBLIC_PRICE_PREMIUM_MONTHLY!
              )
            }
          >
            Monatlich
          </button>

          <button
            style={styles.button}
            onClick={() =>
              startCheckout(
                process.env.NEXT_PUBLIC_PRICE_PREMIUM_YEARLY!
              )
            }
          >
            Jährlich
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  wrapper: {
    backgroundColor: "#0E0E0E",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1A1A1A",
    border: "2px solid #2ECC71",
    borderRadius: 20,
    padding: 30,
    width: 380,
    boxShadow: "0 0 25px rgba(46,204,113,0.4)",
    color: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2ECC71",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginBottom: 30,
    lineHeight: "32px",
    fontSize: 16,
  },
  buttonRow: {
    display: "flex",
    gap: 15,
  },
  button: {
    flex: 1,
    padding: "12px 0",
    borderRadius: 50,
    border: "none",
    background: "#121212",
    color: "white",
    cursor: "pointer",
    fontSize: 14,
  },
};
