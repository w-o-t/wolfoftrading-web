"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") === "dark" ? "" : "light";

  const startCheckout = async (priceId: string) => {

    if (!userId) {
      alert("User ID fehlt");
      return;
    }
    let promo: string | null = null;

    if(priceId === process.env.NEXT_PUBLIC_PRICE_PREMIUM_MONTHLY ||
        priceId === process.env.NEXT_PUBLIC_PRICE_STANDARD_MONTHLY){
          promo = process.env.NEXT_PUBLIC_PROMO_CODE_MONTHLY ?? null;
    }

    const res = await fetch(
      process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL!,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          userId,
          promoCode: promo,
          locale: t('locale'),
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
    ? `69,30 € / ${t("month")}*`
    : `34,30 € / ${t("month")}*`;

  const yrlPrice = isPremium
    ? `950,40 € / ${t("year")}*`
    : `529,20 € / ${t("year")}*`;

    const mtlBadge = isPremium
    ? `${t("mtlBadgePremium")}`
    : `${t("mtlBadgeStandard")}`;

    const yrlBadge = isPremium
    ? `${t("yrlBadgePremium")}`
    : `${t("yrlBadgeStandard")}`;

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
          className={`pricing-box ${selectedPlan === "monthly" ? "active" : ""} ${theme}`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <div className={`discount-badge ${theme}`}>
            {mtlBadge}
          </div>

          <div className="pricing-left">
            <div className={`radio-circle ${theme}`}>
              {selectedPlan === "monthly" && <div className={`radio-dot ${theme}`} />}
            </div>
            <div className="pricing-text">
              {mtlPrice}
            </div>
          </div>
        </div>

        {/* YEARLY */}
        <div
          className={`pricing-box ${selectedPlan === "yearly" ? "active" : ""} ${theme}`}
          onClick={() => setSelectedPlan("yearly")}
        >

          <div className={`discount-badge ${theme}`}>
            {yrlBadge}
          </div>

          <div className="pricing-left">
            <div className={`radio-circle ${theme}`}>
              {selectedPlan === "yearly" && <div className={`radio-dot ${theme}`} />}
            </div>
            <div className="pricing-text">
              {yrlPrice}
            </div>
          </div>
        </div>

        {/* MAIN BUTTON */}
        <button
          className={`pricing-main-button ${theme}`}
          onClick={() =>
            startCheckout(
              selectedPlan === "monthly" ? monthlyPriceId : yearlyPriceId
            )
          }
        >
          {t("registNow")}
        </button>

      </div>
      <ul></ul>
      <ul className="plan-list-short">
        {t("coupon")}
      </ul>

    </div>
  );
}
