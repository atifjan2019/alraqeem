"use client";

import { useState } from "react";

export default function InquiryForm({
  packageOptions = [],
}: {
  packageOptions?: string[];
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    service: "Umrah Package",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
    setSuccess("");
  }

  async function submit() {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please enter your name and phone number so we can reach you.");
      return;
    }

    setSending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Failed to send your inquiry. Please try again.");
        return;
      }
      setSuccess("Your inquiry has been sent. Our team will contact you soon.");
      setForm({
        name: "",
        phone: "",
        city: "",
        email: "",
        service: "Umrah Package",
        message: "",
      });
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-2xl">Send an Inquiry</h3>
      <p className="mt-2 text-sm text-slate-600">
        Fill this form and it sends directly to our team by email. We reply
        within business hours, usually within minutes.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone / WhatsApp *</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="03XX XXXXXXX"
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="city">Your City</label>
          <input
            id="city"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="e.g. Charsadda, Peshawar, Islamabad"
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label htmlFor="email">Email (optional)</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="service">I am interested in</label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option>Umrah Package</option>
            <option>Hajj Package</option>
            <option>Visa Services</option>
            <option>Air Ticketing</option>
            {packageOptions.map((title) => (
              <option key={title}>{title}</option>
            ))}
            <option>Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message">Message (optional)</label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Travel dates, number of people, questions..."
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {success}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={sending}
        className="btn-orange mt-6 w-full disabled:opacity-70 sm:w-auto"
      >
        {sending ? "Sending..." : "Send Inquiry"}
      </button>
    </div>
  );
}
