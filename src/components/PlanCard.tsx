"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import { useState } from "react";

type FeatureItem = {
  title: string;
  subtitle?: string;
};

type PlanCardProps = {
  type: "standard" | "premium";
  title: string;
  features: FeatureItem[];
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
  const t = useTranslations("pricing");
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");

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
        body: JSON.stringify({
          priceId,
          userId,
          promoCode: null,
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

  const mtlPrice = isPremium
    ? `99,00 € / ${t("month")}*`
    : `49,00 € / ${t("month")}*`;

  const yrlPrice = isPremium
    ? `950,40 € / ${t("year")}*`
    : `529,20 € / ${t("year")}*`;

  const badgeImages = {
    premium: "/images/premium.png",
    standard: "/images/standard.png",
  };

  const badgeAlt = isPremium
    ? "Premium Trader"
    : "Standard Trader";

  return (
    <div className={`plan-card ${isPremium ? "premium" : "standard"}`}>

      {/* HEADER */}
      <div className="plan-header-wrapper">
        <div className={`plan-badge ${isPremium ? "premium" : "standard"}`}>
          <span className="badge-icon">
            <Image
              src={badgeImages[isPremium ? "premium" : "standard"]}
              alt={badgeAlt}
              width={22}
              height={22}
            />
          </span>
          <span>{title}</span>
        </div>
      </div>

      {/* FEATURES */}
      <ul className="plan-list">
        {features.map((f, i) => (
          <li key={i} className="plan-feature">
            <div className="feature-title">
              <span className="feature-icon">
                {isPremium ? "🔥" : "✔️"}
              </span>
              <span>{f.title}</span>
            </div>

            {f.subtitle && (
              <div className="feature-subtitle">
                {f.subtitle}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* PRICING SELECTION */}
      <div className="pricing-section">

        {/* MONTHLY */}
        <div
          className={`pricing-box ${selectedPlan === "monthly" ? "active" : ""}`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <div className="discount-badge">
            30% OFF – nur im ersten Monat
          </div>

          <div className="pricing-left">
            <div className="radio-circle">
              {selectedPlan === "monthly" && <div className="radio-dot" />}
            </div>
            <div className="pricing-text">
              {mtlPrice}
            </div>
          </div>
        </div>

        {/* YEARLY */}
        <div
          className={`pricing-box ${selectedPlan === "yearly" ? "active" : ""}`}
          onClick={() => setSelectedPlan("yearly")}
        >

          <div className="discount-badge">
            20% OFF – nur im ersten Monat
          </div>

          <div className="pricing-left">
            <div className="radio-circle">
              {selectedPlan === "yearly" && <div className="radio-dot" />}
            </div>
            <div className="pricing-text">
              {yrlPrice}
            </div>
          </div>
        </div>

        {/* MAIN BUTTON */}
        <button
          className="pricing-main-button"
          onClick={() =>
            startCheckout(
              selectedPlan === "monthly" ? monthlyPriceId : yearlyPriceId
            )
          }
        >
          Jetzt buchen
        </button>

      </div>

      <ul className="plan-list-short">
        {t("coupon")}
      </ul>

    </div>
  );
}
