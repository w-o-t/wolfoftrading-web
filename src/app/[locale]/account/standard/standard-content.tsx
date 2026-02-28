"use client";

import { useSearchParams } from "next/navigation";
import PlanCard from "../../../../components/PlanCard";
import CheckIcon from "@mui/icons-material/Check";
import {useTranslations} from 'next-intl';
import Image from "next/image";

export default function PremiumPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");
  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";
  const t = useTranslations('pricing');

  return (
  <div className={`page-wrapper ${theme} standard`}>
    <PlanCard
      type="standard"
      title="Standard Trader"
      features={[
                {
                  title: t('upgradeBottomSheetStandardText1'),
                  subtitle: ""
                },
                {
                  title: t('upgradeBottomSheetStandardText2'),
                  subtitle: "",
                },
                {
                  title: t('upgradeBottomSheetStandardText3'),
                  subtitle: t('upgradeBottomSheetStandardText4'),
                },
                {
                  title: t('upgradeBottomSheetStandardText6'),
                  subtitle: ""
                },
      ]}
      monthlyPriceId={process.env.NEXT_PUBLIC_PRICE_STANDARD_MONTHLY!}
      yearlyPriceId={process.env.NEXT_PUBLIC_PRICE_STANDARD_YEARLY!}
      userId={userId}
    />
    </div>
);

}
