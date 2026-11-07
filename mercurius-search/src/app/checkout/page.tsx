import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <main className="page">
      <div className="wrap">
        <CheckoutForm />
      </div>
    </main>
  );
}
