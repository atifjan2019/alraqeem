import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { CtaBand, PageHero } from "@/components/Shared";
import FloatingInquiryWidget from "@/components/FloatingInquiryWidget";
import { images } from "@/lib/images";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visa Services",
  description:
    "Visit visa processing from Pakistan for UAE, Saudi Arabia, Turkey, Malaysia, Thailand, Azerbaijan and more. Document preparation and checking included.",
  alternates: { canonical: "/visa-services" },
  openGraph: { url: "/visa-services" },
};

const visas = [
  {
    country: "United Arab Emirates",
    image: "/images/tours/dubai/burj-khalifa.jpg",
    type: "30 / 60 day visit visa",
    time: "3 to 5 working days",
    note: "Single and multiple entry options. Hotel booking support included.",
  },
  {
    country: "Saudi Arabia",
    image: images.madinah,
    type: "Umrah e-visa & visit visa",
    time: "2 to 4 working days",
    note: "Processed with our Umrah packages or standalone for family visits.",
  },
  {
    country: "Turkey",
    image: "/images/tours/turkey/hagia-sophia.jpg",
    type: "e-Visa & sticker visa",
    time: "3 to 7 working days",
    note: "e-Visa for eligible travelers, full sticker visa filing for others.",
  },
  {
    country: "Malaysia",
    image: "/images/tours/malaysia/petronas.jpg",
    type: "eVisa / entry pass",
    time: "3 to 5 working days",
    note: "Single entry tourist eVisa with document checklist provided.",
  },
  {
    country: "Thailand",
    image: "/images/tours/thailand/wat-arun.jpg",
    type: "Tourist visa",
    time: "5 to 7 working days",
    note: "Bank statement and itinerary guidance included.",
  },
  {
    country: "Azerbaijan",
    image: "/images/tours/baku/flame-towers.jpg",
    type: "e-Visa",
    time: "2 to 4 working days",
    note: "One of the easiest visas for Pakistani passport holders.",
  },
  {
    country: "Schengen States",
    image: images.europe,
    type: "Tourist / visit visa",
    time: "15 to 30 working days",
    note: "Complete file preparation, appointment booking and interview guidance.",
  },
  {
    country: "United Kingdom",
    image: images.visa,
    type: "Standard visitor visa",
    time: "15 to 30 working days",
    note: "Document review and application support for family visits and tourism.",
  },
];

const included = [
  "Document checklist specific to your case",
  "Form filling and application submission",
  "Photograph and scan quality checking",
  "Hotel and ticket booking support where required",
  "Status updates on WhatsApp until decision",
];

export default function VisaServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Visa services"
        title="Visas approved start with files prepared right"
        description="Most visa rejections come from small document errors, not ineligibility. Our team checks every page of your file before it is submitted."
        image={images.visa}
      />

      <FloatingInquiryWidget />

      <section className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Destinations"
            title="Countries we process"
            description="Processing times are typical estimates and depend on embassy workload. Fees are quoted at the time of application since they change with exchange rates."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visas.map((v) => (
              <div
                key={v.country}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={v.image}
                    alt={`${v.country} visa destination`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/75 via-transparent to-transparent" />
                  <h3 className="absolute inset-x-0 bottom-0 p-5 text-xl text-white">
                    {v.country}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-brand-blue">
                    {v.type}
                  </p>
                  <p className="mt-3 text-sm text-slate-600">{v.note}</p>
                  <div className="mt-auto pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Typical processing
                    </p>
                    <p className="font-display text-lg text-brand-orange-dark">
                      {v.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="What's included"
            title="Every visa file gets the full service"
            description="One fee covers preparation, submission and follow-up. You are never left guessing about your application status."
          />
          <ul className="space-y-4">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-paper px-5 py-4 text-sm font-medium text-slate-700"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F58220" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
            <li>
              <a
                href={waLink("Assalam o Alaikum, I need help with a visit visa. Country: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange mt-2 w-full sm:w-auto"
              >
                Start My Visa Application
              </a>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not sure which visa you need?"
        subtitle="Send us your destination and purpose of travel. We will tell you exactly what applies to your case, free of charge."
      />
    </>
  );
}
