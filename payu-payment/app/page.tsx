import PaymentForm from "../components/PaymentForm";

export default function HomePage() {
  return (
    <main className="page">
      <section className="card">
        <div className="brand">SigmaValue</div>
        <h1>PayU Payment Test</h1>
        <p className="muted">
          Next.js frontend → FastAPI backend → PayU Hosted Checkout
        </p>
        <PaymentForm />
      </section>
    </main>
  );
}