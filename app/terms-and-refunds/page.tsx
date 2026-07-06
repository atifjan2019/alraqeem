import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Shared";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import { mapsLink } from "@/lib/site";
import { travelAgencySchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms and Refund Policy",
  description:
    "Booking, payment, refund, cancellation, and visa terms for Al Raqeem Travel & Tours, the Charsadda travel agency serving pilgrims and travelers across Pakistan.",
  alternates: { canonical: "/terms-and-refunds" },
  openGraph: { url: "/terms-and-refunds" },
};

// Plain, mechanism based policy. No prices and no invented figures, so the
// deposit and refund amounts stay described by how they work, not by a number.
const clauses = [
  {
    title: "Booking and confirmation",
    body: "A booking with Al Raqeem Travel & Tours is confirmed once you accept a written quote for your dates and pay the agreed deposit. Our team holds your seats, rooms, and visa slot only after the deposit reaches us, since airlines and hotels release unconfirmed holds without notice. Every confirmed arrangement is recorded in writing and shared with you on WhatsApp or in person at our Charsadda office.",
  },
  {
    title: "Quotes and pricing",
    body: "Every package is quoted on inquiry because airfare and hotel rates move weekly with availability. Our desk confirms the current best price for your exact travel dates before you pay, with no hidden charges added later. Once you accept a quote and pay the deposit, the quoted amount holds for the arrangements listed in it, subject to airline and government fee changes outside our control.",
  },
  {
    title: "Deposits and payment",
    body: "Payment runs through bank transfer or in person at our Charsadda office. A deposit secures your seats and rooms once you confirm, and the balance settles before departure. Our team records every amount in writing, and no payment is requested through channels other than the accounts our office states to you directly.",
  },
  {
    title: "Refunds and cancellations",
    body: "A cancellation request is handled from the day our office receives it in writing. Refunds follow the terms of the airline, hotel, and visa authorities involved, so the amount returned depends on what each supplier releases once tickets, rooms, and visas are booked. Airfare on issued tickets, confirmed non-refundable hotel nights, and filed visa fees are recovered only to the extent the supplier allows. Our team shows you the supplier terms in writing before you commit.",
  },
  {
    title: "Visa outcomes",
    body: "Our desk prepares and files your visa through the official system and checks every page before submission. Approval rests with the Saudi, UAE, or destination authorities, not with our office, so no agency guarantees a visa result. Visa and processing fees are non-refundable once a file is submitted, since the authority charges them at filing. Where a visa is refused, our team explains the recorded reason and the options for a fresh application.",
  },
  {
    title: "Changes and amendments",
    body: "A change to your dates, hotels, or route is arranged where the airline and hotel allow it, and any supplier difference in fare or rate is quoted to you in writing first. Our team confirms the revised itinerary before applying a change, so your booking stays clear at every step.",
  },
  {
    title: "Traveler responsibility",
    body: "Travelers hold a passport valid for at least six months, accurate personal details, and any vaccination the destination requires. Our team lists the documents for your trip and checks them before filing, and correct information from you keeps the file clean. Al Raqeem is not responsible for a refusal or delay caused by documents or details a traveler supplies incorrectly.",
  },
  {
    title: "Circumstances beyond our control",
    body: "Flight schedule changes, weather, government rulings, and other events outside our control affect travel from time to time. Where such an event disrupts a confirmed trip, our team works to rebook or recover what the suppliers release, though costs set by airlines, hotels, and authorities in those cases rest outside our office.",
  },
  {
    title: "Reaching us about a booking",
    body: "Questions about a booking, a refund, or these terms reach our team fastest on WhatsApp or at our Charsadda office. Office 1 and 2, First Floor, Aman Plaza, Mardan Road, Charsadda, open Monday to Saturday, 9 AM to 8 PM.",
  },
];

export default function TermsAndRefundsPage() {
  return (
    <>
      <JsonLd data={travelAgencySchema()} />
      <PageHero
        eyebrow="Policies"
        title="Terms and refund policy"
        description="How booking, payment, refunds, cancellations, and visa outcomes work with our desk, written plainly and quoted on inquiry."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <LastUpdated className="mb-8" />
          <p className="text-lg leading-relaxed text-slate-700">
            The terms below set how Al Raqeem Travel & Tours arranges your Umrah,
            Hajj, tour, and visa bookings, from the deposit that confirms a trip
            to the way refunds follow airline, hotel, and visa authority terms.
            Message our team for anything the page does not cover, and our desk
            answers in writing before you commit.
          </p>

          <div className="mt-10 space-y-8">
            {clauses.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-card"
              >
                <h2 className="font-display text-xl text-brand-blue-deep">
                  {c.title}
                </h2>
                <div className="gold-rule mt-3" />
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="A question before you book?"
        subtitle="Message our desk on WhatsApp or sit with our team in Charsadda, and we explain every cost and term in writing before you pay."
        officeHref={mapsLink()}
      />
    </>
  );
}
