"use client";

import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
type PaymentCategory = "domestic" | "international";

export default function PaymentForm() {
  const [category, setCategory] = useState<PaymentCategory>("domestic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      amount: Number(form.get("amount")),
      productinfo: String(form.get("productinfo")),
      firstname: String(form.get("firstname")),
      lastname: String(form.get("lastname") || ""),
      email: String(form.get("email")),
      phone: String(form.get("phone")),
      payment_category: category,
      address1: String(form.get("address1") || ""),
      address2: String(form.get("address2") || ""),
      city: String(form.get("city") || ""),
      state: String(form.get("state") || ""),
      country: String(form.get("country") || ""),
      zipcode: String(form.get("zipcode") || "")
    };

    try {
      const response = await fetch(`${API_URL}/api/payments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Could not create payment");

      const payuForm = document.createElement("form");
      payuForm.method = "POST";
      payuForm.action = data.payu_url;

      Object.entries(data.fields as Record<string, string>).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        payuForm.appendChild(input);
      });

      document.body.appendChild(payuForm);
      payuForm.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={submitPayment}>
      <div className="tabs">
        <button type="button" className={category === "domestic" ? "tab active" : "tab"} onClick={() => setCategory("domestic")}>Domestic</button>
        <button type="button" className={category === "international" ? "tab active" : "tab"} onClick={() => setCategory("international")}>International</button>
      </div>

      <label>Amount (INR)<input name="amount" type="number" min="1" step="0.01" defaultValue="10" required /></label>
      <label>Product / Service<input name="productinfo" defaultValue="SigmaValue Test Payment" required /></label>

      <div className="grid">
        <label>First name<input name="firstname" required /></label>
        <label>Last name<input name="lastname" /></label>
      </div>

      <div className="grid">
        <label>Email<input name="email" type="email" required /></label>
        <label>Phone<input name="phone" required /></label>
      </div>

      {category === "international" ? (
        <div className="international-box">
          <p>International / cross-border details</p>
          <div className="grid">
            <label>Address<input name="address1" required /></label>
            <label>Address 2<input name="address2" /></label>
          </div>
          <div className="grid">
            <label>City<input name="city" required /></label>
            <label>State<input name="state" required /></label>
          </div>
          <div className="grid">
            <label>Country<input name="country" required /></label>
            <label>ZIP / Postal code<input name="zipcode" required /></label>
          </div>
        </div>
      ) : null}

      {error ? <div className="error">{error}</div> : null}
      <button className="button" disabled={loading} type="submit">
        {loading ? "Creating payment..." : "Pay with PayU"}
      </button>
      <p className="small">Test integration only. PayU credentials stay on the FastAPI server.</p>
    </form>
  );
}
