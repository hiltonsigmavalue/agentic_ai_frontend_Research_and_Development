import Link from "next/link";

type Props = {
  searchParams: Promise<{ status?: string; txnid?: string; message?: string }>;
};

export default async function PaymentResult({ searchParams }: Props) {
  const params = await searchParams;
  const success = params.status === "success";

  return (
    <main className="page">
      <section className="card result-card">
        <div className={success ? "result success" : "result failure"}>
          {success ? "Payment successful" : "Payment not successful"}
        </div>
        <h1>{success ? "Payment completed" : "Payment failed"}</h1>
        <div className="result-details">
          <div><span>Transaction ID</span><strong>{params.txnid || "—"}</strong></div>
          {params.message ? <div><span>Message</span><strong>{params.message}</strong></div> : null}
        </div>
        <Link className="button secondary" href="/">Back to payment</Link>
      </section>
    </main>
  );
}
