import { Suspense } from "react";
import { OrderConfirmation } from "@/components/OrderConfirmation";

export const metadata = {
  title: "Order confirmation",
};

export default function ConfirmationPage() {
  return (
    <main className="page">
      <div className="wrap">
        <Suspense fallback={<p className="lede">Loading confirmation…</p>}>
          <OrderConfirmation />
        </Suspense>
      </div>
    </main>
  );
}
