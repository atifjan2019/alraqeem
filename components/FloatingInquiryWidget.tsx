import SearchInquiryWidget from "@/components/SearchInquiryWidget";

/** Full-width quote widget shared by all hero pages. */
export default function FloatingInquiryWidget({
  whatsapp,
}: {
  whatsapp?: string;
}) {
  return (
    <div className="relative z-30 -mt-8 sm:-mt-12 lg:-mt-16">
      <div className="container-site">
        <SearchInquiryWidget whatsapp={whatsapp} />
      </div>
    </div>
  );
}
