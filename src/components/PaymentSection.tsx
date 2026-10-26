"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
CreditCard,
Smartphone,
Building2,
Wallet,
CheckCircle2,
} from "lucide-react";

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";

const paymentMethods: {
id: PaymentMethod;
label: string;
description: string;
icon: typeof Smartphone;
}[] = [
{
id: "upi",
label: "UPI",
description: "Google Pay, PhonePe, or UPI ID",
icon: Smartphone,
},
{
id: "card",
label: "Credit / Debit Card",
description: "Visa, Mastercard, or RuPay",
icon: CreditCard,
},
{
id: "netbanking",
label: "Net Banking",
description: "Pay through your bank",
icon: Building2,
},
{
id: "wallet",
label: "Wallet",
description: "Choose your preferred wallet",
icon: Wallet,
},
];

interface PaymentSectionProps {
  totalAmount: number;
  movieId: string;
  cinemaID: string;
  cinemaName: string;
  showtimeId: string;
  date: string;
  seats: string[];
}


export default function PaymentSection({
  totalAmount,
  movieId,
  cinemaID,
  cinemaName,
  showtimeId,
  date,
  seats,
}: PaymentSectionProps) {
const [selectedMethod, setSelectedMethod] =
useState<PaymentMethod>("upi");

const router = useRouter();

return ( <section className="mt-8 rounded-2xl border border-white/10 bg-[#17171D] p-6 sm:p-8"> <h2 className="text-xl font-semibold">Payment method</h2>


  <p className="mt-2 text-sm text-[#A5A1AD]">
    Choose how you would like to pay.
  </p>

  <div className="mt-6 space-y-3">
    {paymentMethods.map((method) => {
      const Icon = method.icon;
      const isSelected = selectedMethod === method.id;

      return (
        <button
          key={method.id}
          type="button"
          onClick={() => setSelectedMethod(method.id)}
          aria-pressed={isSelected}
          className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
            isSelected
              ? "border-violet-400 bg-violet-500/10"
              : "border-white/10 bg-[#101014] hover:border-white/20"
          }`}
        >
          <Icon className="h-6 w-6 shrink-0 text-violet-300" />

          <span className="flex-1">
            <span className="block font-medium">
              {method.label}
            </span>
            <span className="mt-1 block text-sm text-[#A5A1AD]">
              {method.description}
            </span>
          </span>

          {isSelected && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-violet-300" />
          )}
        </button>
      );
    })}
  </div>

  <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
    Demo only: selecting a payment method will not charge you or initiate
    a real transaction.
  </div>

  <p className="mt-4 text-sm text-[#A5A1AD]">
    Selected method:{" "}
    <span className="font-medium text-white">
      {
        paymentMethods.find(
          (method) => method.id === selectedMethod
        )?.label
      }
    </span>
  </p>

  <button
  type="button"
  onClick={() => {
  const query = new URLSearchParams({
    bookingId: crypto.randomUUID(),
    method: selectedMethod,
    total: String(totalAmount),
    movieId,
    cinemaID,
    cinemaName,
    showtimeId,
    date,
    seats: seats.join(","),
  });

  router.push(`/booking/confirmation?${query.toString()}`);
}}

  className="mt-6 w-full rounded-xl bg-violet-500 px-5 py-4 font-semibold text-white transition hover:bg-violet-400"
>
  Pay ₹{totalAmount} Now
</button>
</section>


);
}
