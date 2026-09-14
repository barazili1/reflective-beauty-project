import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import cashLogo from "@/assets/kashla-logo.asset.json";
import cashWatermark from "@/assets/cash-watermark.png.asset.json";
import loadingLogo from "@/assets/vodafone-loading-logo.png.asset.json";

export const Route = createFileRoute("/success")({
  validateSearch: (search: Record<string, unknown>) => ({
    amount: Number(search["amount"]) || 0,
    phone: String(search["phone"] ?? ""),
    senderName: String(search["senderName"] ?? ""),
  }),
  head: () => ({
    meta: [
      { title: "تم التحويل بنجاح | محفظتي" },
      { name: "description", content: "تمت عملية التحويل بنجاح" },
      { property: "og:title", content: "تم التحويل بنجاح | محفظتي" },
      { property: "og:description", content: "تمت عملية التحويل بنجاح" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SuccessPage,
});

const arabicMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

function SuccessPage() {
  const { amount, phone, senderName } = Route.useSearch();
  const [date, setDate] = useState("");
  const txNumber = useMemo(
    () => String(Math.floor(Math.random() * 900000000000) + 100000000000),
    [],
  );
  const total = amount.toFixed(1);

  useEffect(() => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    setDate(
      `${now.getDate()} ${arabicMonths[now.getMonth()]} ${now.getFullYear()} ${h}:${m}`,
    );
  }, []);

  return (
    <main
      dir="rtl"
      className="mx-auto flex h-dvh max-w-[430px] flex-col overflow-hidden bg-[#f2f2f4] text-foreground shadow-2xl"
    >
      {/* Header */}
      <header className="relative flex h-[52px] shrink-0 items-center justify-center bg-white">
        <h1 className="text-[20px] font-normal">تم بنجاح</h1>
        <Link
          to="/"
          aria-label="رجوع"
          className="absolute right-4 top-1/2 grid size-[46px] -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_1px_6px_rgba(0,0,0,0.12)]"
        >
          <ChevronRight size={26} strokeWidth={2.5} />
        </Link>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-4">
        {/* Success icon */}
        <div className="mt-6 flex justify-center">
          <div className="grid size-[80px] place-items-center rounded-full bg-[#34B561]">
            <Check size={36} strokeWidth={3} className="text-white" />
          </div>
        </div>
        <p className="mt-3 text-center text-[16px] font-medium">
          تم التحويل بنجاح
        </p>

        {/* Amount */}
        <div className="mt-4 flex items-baseline justify-center gap-2">
          <span className="text-[40px] font-bold leading-none text-[#2e8b9a]">
            {amount}
          </span>
          <span className="text-[28px] font-bold leading-none">جنيه</span>
        </div>
        <p className="mt-1 text-center text-[14px] text-foreground/45">
          مبلغ التحويل
        </p>

        {/* From / To card */}
        <div className="relative mt-4 overflow-hidden rounded-[18px] bg-white px-4">
          <img
            src={cashWatermark.url}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.08]"
          />
          <div className="relative flex items-center justify-start gap-3 py-2.5">
            <img
              src={cashLogo.url}
              alt="كاشلا"
              width={68}
              height={100}
              className="h-[68px] w-auto object-contain"
            />
            <div className="text-right">
              <p className="text-[13px] text-foreground/45">من</p>
              <p
                className="mt-1 text-[16px] font-bold tracking-wide"
                dir="ltr"
              >
                01087163221
              </p>
            </div>
          </div>
          <div className="relative h-px bg-foreground/10" />
          <div className="relative flex items-center justify-start gap-3 py-2.5">
            <img
              src={cashLogo.url}
              alt="كاشلا"
              width={68}
              height={100}
              className="h-[68px] w-auto object-contain"
            />
            <div className="text-right">
              <p className="text-[13px] text-foreground/45">إلى</p>
              <p
                className="mt-1 text-right text-[16px] font-bold tracking-wide"
                dir="ltr"
              >
                {phone || "01087163221"}
              </p>
              <p
                className="mt-1 text-left text-[14px] text-foreground/60"
                dir="ltr"
              >
                {senderName}
              </p>
            </div>
          </div>
        </div>

        {/* Fees card */}
        <div className="mt-3 rounded-[18px] bg-white px-4">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[15px]">الرسوم</span>
            <span className="text-[15px] font-bold">0.0 جنيه</span>
          </div>
          <div className="flex items-center justify-between pb-2.5">
            <span className="text-[15px]">المبلغ الكلي المستحق</span>
            <span className="text-[15px] font-bold">{total} جنيه</span>
          </div>
        </div>

        {/* Transaction info card */}
        <div className="mt-3 rounded-[18px] bg-white px-4">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[15px]">تاريخ العملية</span>
            <span className="text-[15px] font-bold" dir="ltr">
              {date || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between pb-2.5">
            <span className="text-[15px]">رقم العملية</span>
            <span className="text-[15px] font-bold" dir="ltr">
              {txNumber}
            </span>
          </div>
        </div>

        <div className="flex-1" />
      </div>

      {/* Footer logos + buttons */}
      <div className="shrink-0 px-5 pb-3 pt-2">
        <div className="mb-3 flex items-center justify-center gap-3">
          <img
            src={loadingLogo.url}
            alt=""
            className="h-[40px] w-auto object-contain"
          />
          <img
            src={cashLogo.url}
            alt="كاشلا"
            className="h-[40px] w-auto object-contain"
          />
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#e60000] text-[16px] font-normal text-white transition-transform active:scale-[0.98]"
          >
            <Share2 size={20} className="text-white" />
            شارك
          </button>
          <Link
            to="/"
            className="grid h-[52px] flex-1 place-items-center rounded-[14px] border border-foreground/80 bg-white text-[16px] font-normal text-foreground transition-transform active:scale-[0.98]"
          >
            تم
          </Link>
        </div>
      </div>
    </main>
  );
}
