"use client";

import { useSearchParams } from "next/navigation";
import PlanCard from "../../../../components/PlanCard";
import {useTranslations} from 'next-intl';

export default function PremiumPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");
  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";
  const t = useTranslations('pricing');

  return (
  <div className={`page-wrapper ${theme} premium`}>
    <PlanCard
      type="premium"
      title="Premium Trader"
      features={[
                {
                  title: t('upgradeBottomSheetPremiumText1'),
                  subtitle: ""
                },
                {
                  title: t('upgradeBottomSheetPremiumText2'),
                  subtitle: t('upgradeBottomSheetPremiumText3'),
                },
                {
                  title: t('upgradeBottomSheetPremiumText5'),
                  subtitle: t('upgradeBottomSheetPremiumText6'),
                },
                {
                  title: t('upgradeBottomSheetPremiumText10'),
                  subtitle: t('upgradeBottomSheetPremiumText11'),
                },
                {
                  title: t('upgradeBottomSheetPremiumText8'),
                  subtitle: t('upgradeBottomSheetPremiumText9'),
                },
                {
                  title: t('upgradeBottomSheetPremiumText12'),
                  subtitle: ""
                },
                {
                  title: t('upgradeBottomSheetPremiumText13'),
                  subtitle: t('upgradeBottomSheetPremiumText14'),
                }
              ]}

      
      monthlyPriceId={process.env.NEXT_PUBLIC_PRICE_PREMIUM_MONTHLY!}
      yearlyPriceId={process.env.NEXT_PUBLIC_PRICE_PREMIUM_YEARLY!}
      userId={userId}
    />
    </div>
);

}
