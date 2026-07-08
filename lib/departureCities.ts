// Departure city data for the Umrah city pages, one entry per city. The real
// information gain per city lives here: the actual airport, the real routing,
// and our local service, not the city name swapped into an identical body. A
// city renders only when live is true, so adding a city is a data entry. No
// invented flight times, schedules, or fares, those are inquiry. Tier 1 cities
// have their own airport with direct Saudi flights, Tier 2 KPK cities carry the
// service difference, our pickup and the transfer to the nearest airport.
export type DepartureCity = {
  slug: string; // umrah-packages-karachi
  city: string; // display name
  tier: 1 | 2;
  region: string;
  hasAirport: boolean;
  airportName: string; // own airport (tier 1) or nearest (tier 2)
  airportCode: string;
  nearestAirportCity?: string; // tier 2, where the nearest airport is
  distanceNote?: string; // tier 2, how far and how
  flightType: "direct" | "connecting";
  heroCaption: string;
  // Genuinely city specific paragraphs, the anti doorway information gain.
  departure: string;
  service: string;
  // City tailored FAQs, five hand written per city, none duplicated across cities.
  faqs: { q: string; a: string }[];
  live: boolean;
};

export const departureCities: DepartureCity[] = [
  // ---------- Tier 1, airport cities, direct Saudi flights ----------
  {
    slug: "umrah-packages-karachi",
    city: "Karachi",
    tier: 1,
    region: "Sindh",
    hasAirport: true,
    airportName: "Jinnah International Airport",
    airportCode: "KHI",
    flightType: "direct",
    heroCaption: "Jinnah International Airport in Karachi, the departure gate for Umrah",
    departure:
      "Karachi flies from Jinnah International Airport, the busiest gateway in the country, with direct flights to both Jeddah and Madinah on Saudia, PIA, airblue, and flynas. A wide daily schedule out of Karachi brings more date choices and often the keenest Umrah fares. Our desk books the carrier and the arrival city, Jeddah for Makkah first or Madinah first, that fits your plan, and confirms the routing in writing before you pay.",
    service:
      "For Karachi pilgrims our desk runs the whole journey on WhatsApp and through our Charsadda office, from the Nusuk visa to the return. Our team prepares your documents, books the hotel near the Haram, and arranges the transfer at Jinnah International, and stays reachable throughout the trip. Travelers across Karachi, from Gulshan to DHA and Malir, book without a single office visit, since every step is handled online and confirmed in writing.",
    faqs: [
      {
        q: "Are Umrah fares cheaper from Karachi than other cities?",
        a: "Karachi carries the widest flight schedule in the country, so the choice of dates is largest and the fares are often the keenest of any departure city. Our desk checks live fares across Saudia, PIA, airblue, and flynas for your exact dates and sends the current best on WhatsApp, quoted on inquiry rather than a stale published number.",
      },
      {
        q: "Can I fly into Madinah first from Karachi?",
        a: "Yes. Karachi runs direct flights to both Jeddah and Madinah, so you begin in Makkah or in Madinah as your itinerary prefers. Our desk books the arrival city that suits your dates and hotel plan, and confirms the routing in writing before you pay.",
      },
      {
        q: "Do you handle Karachi pilgrims without an office visit?",
        a: "Yes. Our desk arranges the full Umrah for Karachi travelers on WhatsApp, the Nusuk visa, the hotels near the Haram, and the Jinnah International transfer, with nothing that needs a trip to our Charsadda office. Every arrangement is confirmed in writing, so a Karachi family books from home.",
      },
      {
        q: "Which airlines fly Umrah from Karachi?",
        a: "Direct flights from Jinnah International to Jeddah and Madinah run on Saudia, PIA, airblue, and flynas, among others. Our team books the carrier with the best fare and schedule for your dates rather than a fixed airline, and confirms the booking in writing.",
      },
      {
        q: "Do you arrange group Umrah from Karachi?",
        a: "Yes. Our desk builds group Umrah for Karachi families, offices, and community jamaats of any size, with connected rooms near the Haram and assistance for elders. Share your group size and dates, and we seat the group and quote one price for everyone.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-lahore",
    city: "Lahore",
    tier: 1,
    region: "Punjab",
    hasAirport: true,
    airportName: "Allama Iqbal International Airport",
    airportCode: "LHE",
    flightType: "direct",
    heroCaption: "Allama Iqbal International Airport in Lahore, the departure gate for Umrah",
    departure:
      "Lahore flies from Allama Iqbal International Airport, a major northern hub with direct flights to Jeddah and Madinah on Saudia, PIA, airblue, and flynas. A strong Lahore schedule suits families and large groups, with room to seat everyone on one flight. Our desk books the carrier and the arrival city that fits your dates, and confirms the routing in writing before you pay.",
    service:
      "For Lahore pilgrims our desk arranges the full journey on WhatsApp and through our Charsadda office, the Nusuk visa, the hotels near the Haram, and the transfer at Allama Iqbal International. Our team handles bookings from DHA, Gulberg, Johar Town, and across the city, with connected rooms and assistance for elders. Every step is confirmed in writing, so a Lahore family books without chasing separate suppliers.",
    faqs: [
      {
        q: "Is there a direct Umrah flight from Lahore?",
        a: "Yes. Allama Iqbal International runs direct flights to both Jeddah and Madinah, so Lahore pilgrims reach the holy cities without a connection. Our desk books the arrival city and carrier that fit your dates, and confirms the routing in writing before you pay.",
      },
      {
        q: "Can you seat a large Lahore family group on one flight?",
        a: "Yes. Lahore's strong schedule leaves room to seat a large group together, and our desk books the block of seats early for your dates. Share your group size, and our team holds connected rooms near the Haram to match, confirmed in writing.",
      },
      {
        q: "Do you arrange Ziyarat for Lahore pilgrims in both cities?",
        a: "Yes. Every Lahore Umrah package includes guided Ziyarat in Makkah and Madinah, planned around your prayers at the two holy mosques. Our team sets the schedule for your travel dates and confirms it in writing.",
      },
      {
        q: "Do you offer assisted Umrah for elders from Lahore?",
        a: "Yes. Our desk arranges wheelchair assistance at Allama Iqbal International and in the Haramain, hotels close to the mosque entrances, and a steady pace for senior pilgrims from Lahore. Tell us the needs of your elders and we build the trip around them.",
      },
      {
        q: "Do you handle Lahore bookings online or in person?",
        a: "Both. Our desk runs the Lahore Umrah on WhatsApp end to end, and our Charsadda office is open for anyone who prefers to sit with our team. Every arrangement is confirmed in writing whichever way you book.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-islamabad",
    city: "Islamabad",
    tier: 1,
    region: "Islamabad Capital Territory",
    hasAirport: true,
    airportName: "Islamabad International Airport",
    airportCode: "ISB",
    flightType: "direct",
    heroCaption: "Islamabad International Airport, the departure gate for Umrah",
    departure:
      "Islamabad flies from Islamabad International Airport, the modern gateway for the capital and the north, with direct flights to Jeddah and Madinah. Islamabad suits travelers from Rawalpindi and the northern districts, a short motorway drive to the terminal. Our desk books the carrier and the arrival city for your dates and confirms the routing in writing before you pay.",
    service:
      "For Islamabad pilgrims our desk runs the journey on WhatsApp and from our Charsadda office, a short drive up the motorway. Our team prepares the Nusuk visa, books the hotels near the Haram, and arranges the transfer at Islamabad International, with pickup from Rawalpindi and the twin cities. Everything is confirmed in writing, so a family from the capital books with one point of contact.",
    faqs: [
      {
        q: "Is there a direct Umrah flight from Islamabad?",
        a: "Yes. Islamabad International runs direct flights to Jeddah and Madinah, so pilgrims from the capital fly without a connection. Our desk books the arrival city and carrier that suit your dates and confirms the routing in writing.",
      },
      {
        q: "Do you pick up from Rawalpindi for an Islamabad departure?",
        a: "Yes. Our team arranges pickup across Rawalpindi and the twin cities and the transfer to Islamabad International, since the terminal serves both. Tell us your area and we set the pickup for your flight time.",
      },
      {
        q: "How far is Islamabad International from the city?",
        a: "Islamabad International sits on the motorway southwest of the city, a straightforward drive from Islamabad and Rawalpindi. Our team times the transfer to your flight with room for the airport formalities, arranged as part of the package.",
      },
      {
        q: "Do you handle overseas Pakistani families booking for parents in Islamabad?",
        a: "Yes. Our desk arranges Umrah for parents in Islamabad on behalf of overseas children, all on WhatsApp, with assisted travel, hotels near the Haram, and updates through the trip. Message us with the details and we handle the rest from Pakistan.",
      },
      {
        q: "Is the Nusuk visa handled for Islamabad pilgrims?",
        a: "Yes. Our team prepares and files the Saudi Umrah e-visa through the official Nusuk platform for Islamabad travelers, and checks every document before submission. Verify the current rules at the official Saudi source, and our desk handles the filing.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-peshawar",
    city: "Peshawar",
    tier: 1,
    region: "Khyber Pakhtunkhwa",
    hasAirport: true,
    airportName: "Bacha Khan International Airport",
    airportCode: "PEW",
    flightType: "direct",
    heroCaption: "Bacha Khan International Airport in Peshawar, our home departure gate",
    departure:
      "Peshawar flies from Bacha Khan International Airport, the gateway of Khyber Pakhtunkhwa, with direct Umrah flights to Jeddah and Madinah. Bacha Khan is the airport our own travelers use, a short drive from our Charsadda base, so we know its Umrah schedule, its terminal, and its transfer routine closely. Our desk books the carrier and the arrival city for your dates and confirms the routing in writing.",
    service:
      "Peshawar is our home ground. Our office sits a short drive away in Charsadda, so our desk meets Peshawar pilgrims in person or on WhatsApp, prepares the Nusuk visa, books the hotels near the Haram, and drives you to Bacha Khan International itself. Our team has arranged Umrah for Peshawar families for years, with door pickup across the city and assistance for elders, real local service rather than a booking passed to a distant handler.",
    faqs: [
      {
        q: "Is there a direct Umrah flight from Peshawar?",
        a: "Yes. Bacha Khan International runs direct Umrah flights to Jeddah and Madinah, so Peshawar pilgrims fly without a connection. Bacha Khan is the airport closest to our Charsadda base, so our desk knows its schedule well, and confirms your routing in writing.",
      },
      {
        q: "Why book Umrah from Peshawar with a Charsadda based agency?",
        a: "Peshawar is our home region, so our office is a short drive away and our team meets you in person, drives you to Bacha Khan International, and stays reachable through the trip. Years of arranging Umrah for Peshawar families sit behind every departure, real local service close to home.",
      },
      {
        q: "Do you offer door pickup across Peshawar?",
        a: "Yes. Our team picks up from anywhere in Peshawar and the cantonment for the short drive to Bacha Khan International, timed to your flight. Tell us your area, and we set the pickup as part of the package.",
      },
      {
        q: "Do you arrange assisted Umrah for elders from Peshawar?",
        a: "Yes. Our desk arranges wheelchair assistance at Bacha Khan International and in the Haramain, hotels near the mosque entrances, and a gentle pace for senior pilgrims from Peshawar. Share their needs and our team builds the trip around them.",
      },
      {
        q: "Can I visit your office to book an Umrah near Peshawar?",
        a: "Yes. Our office is in Charsadda, a short drive from Peshawar, so you sit with our team, review the plan, and file the documents in person, or handle it all on WhatsApp. Every arrangement is confirmed in writing either way.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-multan",
    city: "Multan",
    tier: 1,
    region: "Punjab",
    hasAirport: true,
    airportName: "Multan International Airport",
    airportCode: "MUX",
    flightType: "direct",
    heroCaption: "Multan International Airport, the departure gate for south Punjab Umrah",
    departure:
      "Multan flies from Multan International Airport, the hub of south Punjab, with direct Umrah flights to Jeddah and Madinah. A local departure from Multan saves the long road to Lahore or Karachi for pilgrims across the southern districts. Our desk books the carrier and the arrival city for your dates and confirms the routing in writing before you pay.",
    service:
      "For Multan pilgrims our desk arranges the whole journey on WhatsApp and through our Charsadda office, the Nusuk visa, the hotels near the Haram, and the transfer at Multan International. Our team handles families and community groups from Multan and the surrounding districts, with connected rooms and elder assistance, every step confirmed in writing so nobody chases separate suppliers.",
    faqs: [
      {
        q: "Is there a direct Umrah flight from Multan?",
        a: "Yes. Multan International runs direct Umrah flights to Jeddah and Madinah, so pilgrims from south Punjab fly without the long road to Lahore or Karachi. Our desk books the arrival city and carrier for your dates and confirms the routing in writing.",
      },
      {
        q: "Does departing from Multan save the drive to Lahore?",
        a: "Yes. A direct departure from Multan International keeps southern Punjab pilgrims close to home rather than travelling to Lahore or Karachi to fly. Our desk books the local Multan flight when the dates and fare suit, and confirms it in writing.",
      },
      {
        q: "Do you serve districts around Multan for Umrah?",
        a: "Yes. Our desk arranges Umrah for travelers across the Multan division, with the Nusuk visa, hotels near the Haram, and the Multan International transfer handled online. Message us your town and dates, and our team sets the plan.",
      },
      {
        q: "Do you arrange group Umrah from Multan?",
        a: "Yes. Our desk builds group Umrah for Multan families and community groups, with connected rooms near the Haram and one quote for the group. Share your numbers and dates, and we seat the group together on the Multan flight.",
      },
      {
        q: "Is the Nusuk visa handled for Multan pilgrims?",
        a: "Yes. Our team prepares and files the Saudi Umrah e-visa through the official Nusuk platform for Multan travelers, checking every document first. Verify the current rules at the official Saudi source, and our desk handles the filing.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-faisalabad",
    city: "Faisalabad",
    tier: 1,
    region: "Punjab",
    hasAirport: true,
    airportName: "Faisalabad International Airport",
    airportCode: "LYP",
    flightType: "direct",
    heroCaption: "Faisalabad International Airport, the departure gate for central Punjab Umrah",
    departure:
      "Faisalabad flies from Faisalabad International Airport, serving central Punjab, with direct Umrah flights to Jeddah and Madinah. A departure from Faisalabad keeps the city's pilgrims close to home rather than driving to Lahore. Our desk books the carrier and the arrival city for your dates and confirms the routing in writing before you pay.",
    service:
      "For Faisalabad pilgrims our desk arranges the full journey on WhatsApp and through our Charsadda office, the Nusuk visa, the hotels near the Haram, and the transfer at Faisalabad International. Our team handles families and factory and community groups from across the city, with connected rooms and elder assistance, every step confirmed in writing.",
    faqs: [
      {
        q: "Is there a direct Umrah flight from Faisalabad?",
        a: "Yes. Faisalabad International runs direct Umrah flights to Jeddah and Madinah, so central Punjab pilgrims fly from home rather than driving to Lahore. Our desk books the arrival city and carrier for your dates and confirms the routing in writing.",
      },
      {
        q: "Does departing from Faisalabad save the drive to Lahore?",
        a: "Yes. A local departure from Faisalabad International keeps the city's pilgrims off the Lahore road on travel day. Our desk books the Faisalabad flight when the dates and fare suit, and confirms it in writing.",
      },
      {
        q: "Do you arrange community and office group Umrah from Faisalabad?",
        a: "Yes. Our desk builds group Umrah for Faisalabad families, mills, and community jamaats, with connected rooms near the Haram and one quote for the group. Share your numbers and dates, and our team seats everyone together.",
      },
      {
        q: "Do you handle Faisalabad bookings online?",
        a: "Yes. Our desk runs the Faisalabad Umrah on WhatsApp, the Nusuk visa, the hotels, and the airport transfer, with no office visit needed. Every arrangement is confirmed in writing before you pay.",
      },
      {
        q: "Do you arrange assisted travel for elders from Faisalabad?",
        a: "Yes. Our team arranges wheelchair assistance at Faisalabad International and in the Haramain, hotels near the mosque entrances, and a steady pace for senior pilgrims. Tell us their needs and we shape the trip around them.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-sialkot",
    city: "Sialkot",
    tier: 1,
    region: "Punjab",
    hasAirport: true,
    airportName: "Sialkot International Airport",
    airportCode: "SKT",
    flightType: "direct",
    heroCaption: "Sialkot International Airport, the departure gate for north Punjab Umrah",
    departure:
      "Sialkot flies from Sialkot International Airport, the privately run airport of north Punjab, with direct Umrah flights to Jeddah and Madinah. Sialkot serves the city and the wider Gujranwala division, a local departure for the northern Punjab districts. Our desk books the carrier and the arrival city for your dates and confirms the routing in writing before you pay.",
    service:
      "For Sialkot pilgrims our desk arranges the whole journey on WhatsApp and through our Charsadda office, the Nusuk visa, the hotels near the Haram, and the transfer at Sialkot International. Our team handles families and community groups from Sialkot, Gujranwala, and Gujrat, with connected rooms and elder assistance, every step confirmed in writing.",
    faqs: [
      {
        q: "Is there a direct Umrah flight from Sialkot?",
        a: "Yes. Sialkot International runs direct Umrah flights to Jeddah and Madinah, so north Punjab pilgrims fly from home rather than driving to Lahore. Our desk books the arrival city and carrier for your dates and confirms the routing in writing.",
      },
      {
        q: "Do you serve Gujranwala and Gujrat from Sialkot airport?",
        a: "Yes. Sialkot International is the natural departure for the wider Gujranwala division, and our desk arranges Umrah for travelers from Gujranwala and Gujrat through it. Message us your town and dates, and our team sets the plan and the transfer.",
      },
      {
        q: "Does departing from Sialkot save the drive to Lahore?",
        a: "Yes. A local departure from Sialkot International keeps north Punjab pilgrims off the Lahore road on travel day. Our desk books the Sialkot flight when the dates and fare suit, and confirms it in writing.",
      },
      {
        q: "Do you arrange group Umrah from Sialkot?",
        a: "Yes. Our desk builds group Umrah for Sialkot families and community jamaats, with connected rooms near the Haram and one quote for the group. Share your numbers and dates, and our team seats everyone together.",
      },
      {
        q: "Is the Nusuk visa handled for Sialkot pilgrims?",
        a: "Yes. Our team prepares and files the Saudi Umrah e-visa through the official Nusuk platform for Sialkot travelers, checking every document first. Verify the current rules at the official Saudi source, and our desk handles the filing.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-quetta",
    city: "Quetta",
    tier: 1,
    region: "Balochistan",
    hasAirport: true,
    airportName: "Quetta International Airport",
    airportCode: "UET",
    flightType: "connecting",
    heroCaption: "Quetta International Airport, the departure gate for Balochistan Umrah",
    departure:
      "Quetta flies from Quetta International Airport, the gateway of Balochistan. Direct Umrah flights from Quetta run on a lighter, seasonal schedule, so many pilgrims connect through Karachi for the wider choice of dates and fares. Our desk checks the current Quetta options for your dates, books the best routing, direct where it runs or through Karachi, and confirms it in writing before you pay.",
    service:
      "For Quetta pilgrims our desk arranges the whole journey on WhatsApp and through our Charsadda office, the Nusuk visa, the hotels near the Haram, and the airport transfer at Quetta International. Our team handles families and community groups from Quetta and across Balochistan, and sets an honest routing for the season, every step confirmed in writing.",
    faqs: [
      {
        q: "Is there a direct Umrah flight from Quetta?",
        a: "Quetta International runs Umrah flights on a lighter, seasonal schedule, so a direct flight is not always available for every date. When a direct flight does not suit, our desk routes you through Karachi for the wider choice, and confirms the honest routing in writing before you pay.",
      },
      {
        q: "Do most Quetta pilgrims connect through Karachi?",
        a: "Often, yes. Karachi carries the widest schedule and the keenest fares, so many Quetta pilgrims fly the short leg to Karachi and connect to Jeddah or Madinah. Our desk compares the direct Quetta option with the Karachi routing for your dates and books the better one.",
      },
      {
        q: "Do you serve Balochistan districts from Quetta for Umrah?",
        a: "Yes. Our desk arranges Umrah for travelers across Balochistan through Quetta International, with the Nusuk visa, hotels near the Haram, and the transfer handled online. Message us your town and dates, and our team sets the plan.",
      },
      {
        q: "Do you arrange group Umrah from Quetta?",
        a: "Yes. Our desk builds group Umrah for Quetta families and community groups, with connected rooms near the Haram and one quote for the group. Share your numbers and dates, and our team sets the routing and the seats together.",
      },
      {
        q: "Is the Nusuk visa handled for Quetta pilgrims?",
        a: "Yes. Our team prepares and files the Saudi Umrah e-visa through the official Nusuk platform for Quetta travelers, checking every document first. Verify the current rules at the official Saudi source, and our desk handles the filing.",
      },
    ],
    live: true,
  },

  // ---------- Tier 2, KPK wedge, service difference, nearest airport ----------
  {
    slug: "umrah-packages-charsadda",
    city: "Charsadda",
    tier: 2,
    region: "Khyber Pakhtunkhwa",
    hasAirport: false,
    airportName: "Bacha Khan International Airport",
    airportCode: "PEW",
    nearestAirportCity: "Peshawar",
    distanceNote: "about thirty five kilometres, under an hour",
    flightType: "direct",
    heroCaption: "Our Charsadda office, the home base for every Umrah we arrange",
    departure:
      "Charsadda has no airport of its own, and the nearest is Bacha Khan International in Peshawar, about thirty five kilometres and under an hour away. Our desk books your direct Umrah flight from Peshawar to Jeddah or Madinah, and our team drives you from Charsadda to the terminal itself. A Charsadda pilgrim keeps the whole journey local, from our office to the airport.",
    service:
      "Charsadda is our home. Our office is here, so our desk meets you in person, prepares the Nusuk visa across the counter or on WhatsApp, and books the hotels near the Haram, with door pickup anywhere in Charsadda and the transfer to Bacha Khan International in Peshawar. Our team has arranged Umrah for Charsadda families for years, the closest and most personal service we offer, real people you meet rather than a booking passed to a distant handler.",
    faqs: [
      {
        q: "Does Charsadda have an airport for Umrah?",
        a: "No. Charsadda has no airport, and the nearest is Bacha Khan International in Peshawar, about thirty five kilometres and under an hour away. Our desk books your direct Umrah flight from Peshawar and our team drives you to the terminal, so the whole journey stays local.",
      },
      {
        q: "Where is your office in Charsadda?",
        a: "Our office is in Charsadda, the home base for every Umrah we arrange. You sit with our team, review the plan, and file the documents across the counter, or handle it all on WhatsApp. Message us or visit, and our desk sets your Umrah in person.",
      },
      {
        q: "Do you pick up from home in Charsadda for the airport?",
        a: "Yes. Our team arranges door pickup anywhere in Charsadda and the drive to Bacha Khan International in Peshawar, timed to your flight. A Charsadda pilgrim travels from home to the terminal with our desk handling every step.",
      },
      {
        q: "Why is Charsadda your closest Umrah service?",
        a: "Charsadda is our home city, so our office, our team, and our drivers are all here, and we meet you face to face. Years of arranging Umrah for Charsadda families sit behind every departure, the closest and most personal service we offer.",
      },
      {
        q: "Can elders from Charsadda travel with assistance?",
        a: "Yes. Our team arranges wheelchair assistance at Bacha Khan International and in the Haramain, hotels near the mosque entrances, and a gentle pace for senior pilgrims from Charsadda, with the whole family looked after from home to the holy cities.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-mardan",
    city: "Mardan",
    tier: 2,
    region: "Khyber Pakhtunkhwa",
    hasAirport: false,
    airportName: "Bacha Khan International Airport",
    airportCode: "PEW",
    nearestAirportCity: "Peshawar",
    distanceNote: "about sixty kilometres by the motorway",
    flightType: "direct",
    heroCaption: "The Mardan road to Peshawar, the route to the Umrah departure airport",
    departure:
      "Mardan has no airport, and the nearest is Bacha Khan International in Peshawar, about sixty kilometres by the motorway, with Islamabad International a longer option for a wider schedule. Our desk books your direct Umrah flight from Peshawar or Islamabad, whichever carries the better fare and dates, and our team arranges the transfer from Mardan to the terminal. A Mardan pilgrim starts close to our Charsadda base.",
    service:
      "Mardan sits next door to our Charsadda office, so our desk runs the journey in person or on WhatsApp, prepares the Nusuk visa, books the hotels near the Haram, and picks you up in Mardan for the drive to Peshawar or Islamabad airport. Our team knows the Mardan road and the transfer timing closely, real local service from a base a short drive away rather than a booking passed to a distant handler.",
    faqs: [
      {
        q: "Which airport do I fly from for Umrah from Mardan?",
        a: "Mardan has no airport, so pilgrims fly from Bacha Khan International in Peshawar, about sixty kilometres away, or from Islamabad International for a wider schedule. Our desk books whichever carries the better fare and dates, and our team arranges the transfer from Mardan.",
      },
      {
        q: "Do you pick up from Mardan for the airport?",
        a: "Yes. Our team picks up in Mardan and drives you to Bacha Khan International in Peshawar or on to Islamabad, timed to your flight. Mardan is next door to our Charsadda base, so the pickup and the timing are handled closely.",
      },
      {
        q: "Is Peshawar or Islamabad better for a Mardan Umrah?",
        a: "Peshawar is nearer, and Islamabad offers a wider schedule and more date choices. Our desk compares the fare, the dates, and the drive for your trip and books the airport that suits, with the transfer from Mardan arranged either way.",
      },
      {
        q: "Do you have a local team near Mardan?",
        a: "Yes. Our office is a short drive away in Charsadda, so our team serves Mardan families in person or on WhatsApp and knows the road and the transfer timing well. Real local service from close to home sits behind every Mardan departure.",
      },
      {
        q: "Is the Nusuk visa handled for Mardan pilgrims?",
        a: "Yes. Our team prepares and files the Saudi Umrah e-visa through the official Nusuk platform for Mardan travelers, checking every document first. Verify the current rules at the official Saudi source, and our desk handles the filing.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-nowshera",
    city: "Nowshera",
    tier: 2,
    region: "Khyber Pakhtunkhwa",
    hasAirport: false,
    airportName: "Bacha Khan International Airport",
    airportCode: "PEW",
    nearestAirportCity: "Peshawar",
    distanceNote: "about forty kilometres on the motorway",
    flightType: "direct",
    heroCaption: "The M1 motorway at Nowshera, between the two Umrah departure airports",
    departure:
      "Nowshera has no airport, and it sits on the M1 motorway between two, Bacha Khan International in Peshawar about forty kilometres west, and Islamabad International to the east for a wider schedule. Our desk books your direct Umrah flight from whichever suits your dates and fare, and our team arranges the transfer from Nowshera to the terminal. The motorway keeps both airports within an easy drive.",
    service:
      "Nowshera is a short run from our Charsadda office, so our desk arranges the journey in person or on WhatsApp, prepares the Nusuk visa, books the hotels near the Haram, and picks you up in Nowshera for the drive to Peshawar or Islamabad airport. Our team knows the motorway timing to both terminals, real local service from close to home rather than a booking passed to a distant handler.",
    faqs: [
      {
        q: "Which airport do I fly from for Umrah from Nowshera?",
        a: "Nowshera sits between two, Bacha Khan International in Peshawar about forty kilometres west, and Islamabad International to the east. Our desk books whichever carries the better fare and dates, and our team arranges the transfer from Nowshera along the motorway.",
      },
      {
        q: "Do you pick up from Nowshera for the airport?",
        a: "Yes. Our team picks up in Nowshera and drives you to Bacha Khan International or Islamabad International, timed to your flight. The M1 motorway keeps both terminals within an easy drive, arranged as part of the package.",
      },
      {
        q: "Is Peshawar or Islamabad better for a Nowshera Umrah?",
        a: "Peshawar is a little nearer, and Islamabad offers a wider schedule. Our desk weighs the fare, the dates, and the motorway drive for your trip and books the airport that fits, with the Nowshera transfer arranged either way.",
      },
      {
        q: "Do you serve Nowshera families locally?",
        a: "Yes. Our office is a short run away in Charsadda, so our team serves Nowshera families in person or on WhatsApp and knows the motorway timing to both airports. Local service from close to home sits behind every Nowshera departure.",
      },
      {
        q: "Is the Nusuk visa handled for Nowshera pilgrims?",
        a: "Yes. Our team prepares and files the Saudi Umrah e-visa through the official Nusuk platform for Nowshera travelers, checking every document first. Verify the current rules at the official Saudi source, and our desk handles the filing.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-swabi",
    city: "Swabi",
    tier: 2,
    region: "Khyber Pakhtunkhwa",
    hasAirport: false,
    airportName: "Islamabad International Airport",
    airportCode: "ISB",
    nearestAirportCity: "Islamabad",
    distanceNote: "about ninety kilometres on the motorway",
    flightType: "direct",
    heroCaption: "The M1 motorway at Swabi, the route to the Umrah departure airport",
    departure:
      "Swabi has no airport, and it sits on the M1 motorway roughly midway, with Islamabad International about ninety kilometres east and Bacha Khan International in Peshawar to the west. Our desk books your direct Umrah flight from whichever airport carries the better fare and dates, and our team arranges the transfer from Swabi along the motorway to the terminal.",
    service:
      "Swabi is a straightforward run from our Charsadda office, so our desk arranges the journey in person or on WhatsApp, prepares the Nusuk visa, books the hotels near the Haram, and picks you up in Swabi for the drive to Islamabad or Peshawar airport. Our team knows the motorway timing to both terminals, real local service from close to home rather than a booking passed to a distant handler.",
    faqs: [
      {
        q: "Which airport do I fly from for Umrah from Swabi?",
        a: "Swabi sits midway on the M1, with Islamabad International about ninety kilometres east and Bacha Khan International in Peshawar to the west. Our desk books whichever carries the better fare and dates, and our team arranges the transfer from Swabi.",
      },
      {
        q: "Do you pick up from Swabi for the airport?",
        a: "Yes. Our team picks up in Swabi and drives you to Islamabad International or Bacha Khan International, timed to your flight along the motorway. The transfer is arranged as part of the package.",
      },
      {
        q: "Is Islamabad the usual airport for a Swabi Umrah?",
        a: "Often, since Islamabad International offers the wider schedule and more date choices, and the motorway drive is direct. Our desk still compares Peshawar for the fare and dates, and books the airport that suits your trip.",
      },
      {
        q: "Do you serve Swabi families locally?",
        a: "Yes. Our office is a short run away in Charsadda, so our team serves Swabi families in person or on WhatsApp and knows the motorway timing to both airports. Local service from close to home sits behind every Swabi departure.",
      },
      {
        q: "Is the Nusuk visa handled for Swabi pilgrims?",
        a: "Yes. Our team prepares and files the Saudi Umrah e-visa through the official Nusuk platform for Swabi travelers, checking every document first. Verify the current rules at the official Saudi source, and our desk handles the filing.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-packages-swat",
    city: "Mingora and Swat",
    tier: 2,
    region: "Khyber Pakhtunkhwa",
    hasAirport: false,
    airportName: "Bacha Khan International Airport",
    airportCode: "PEW",
    nearestAirportCity: "Peshawar",
    distanceNote: "down the Swat Expressway",
    flightType: "direct",
    heroCaption: "The Swat Expressway down to the Umrah departure airport",
    departure:
      "Mingora and the Swat valley have no Umrah airport of their own, so pilgrims drive down the Swat Expressway to Bacha Khan International in Peshawar or on to Islamabad International, whichever carries the better schedule. Our desk books your direct Umrah flight from Peshawar or Islamabad, and our team arranges the transfer from Swat down to the terminal. The Expressway keeps the drive smooth and quick.",
    service:
      "Swat is our own northern region, so our desk arranges the journey on WhatsApp and from our Charsadda office, prepares the Nusuk visa, books the hotels near the Haram, and coordinates the pickup in Mingora for the drive down to Peshawar or Islamabad. Our team knows the Swat Expressway and the transfer timing closely, real local service for the valley rather than a booking passed to a distant handler.",
    faqs: [
      {
        q: "Which airport do I fly from for Umrah from Swat?",
        a: "Mingora and Swat have no airport, so pilgrims drive down the Swat Expressway to Bacha Khan International in Peshawar or on to Islamabad International. Our desk books whichever carries the better schedule and fare, and our team arranges the transfer from Swat.",
      },
      {
        q: "How do I get from Mingora to the airport for Umrah?",
        a: "The Swat Expressway runs smooth and quick from Mingora down toward Peshawar and Islamabad, and our team arranges the transfer to your departure airport, timed to the flight. A Swat pilgrim travels from the valley to the terminal with our desk handling every step.",
      },
      {
        q: "Do you serve the Swat valley for Umrah?",
        a: "Yes. Swat is part of our own northern region, so our desk arranges Umrah for Mingora and the valley on WhatsApp and from our Charsadda base, with the visa, hotels, and transfer handled. Message us your dates and our team sets the plan.",
      },
      {
        q: "Is Peshawar or Islamabad the airport for a Swat Umrah?",
        a: "Both work off the Swat Expressway, Peshawar a little nearer and Islamabad with the wider schedule. Our desk compares the fare, the dates, and the drive for your trip and books the airport that suits, with the transfer from Swat arranged either way.",
      },
      {
        q: "Is the Nusuk visa handled for Swat pilgrims?",
        a: "Yes. Our team prepares and files the Saudi Umrah e-visa through the official Nusuk platform for Swat travelers, checking every document first. Verify the current rules at the official Saudi source, and our desk handles the filing.",
      },
    ],
    live: true,
  },
];

export function liveDepartureCities(tier?: 1 | 2): DepartureCity[] {
  return departureCities.filter((c) => c.live && (tier ? c.tier === tier : true));
}

export function getDepartureCity(slug: string): DepartureCity | undefined {
  return departureCities.find((c) => c.slug === slug);
}

// Flight origin phrasing, city specific so no two cities read the same.
function flightOrigin(c: DepartureCity): string {
  return c.tier === 1
    ? c.airportName
    : `${c.airportName} in ${c.nearestAirportCity}`;
}
function routingPhrase(c: DepartureCity): string {
  return c.flightType === "direct"
    ? "direct to Jeddah and Madinah"
    : "to Jeddah and Madinah, direct where the season runs it or connecting through Karachi";
}

// Full FAQ set per city: five hand written, then city data driven ones that
// carry the real airport and routing, so each set is genuinely city specific
// and none reads identical to another city. Capped for the 10 to 15 band.
export function cityFaqs(c: DepartureCity): { q: string; a: string }[] {
  const origin = flightOrigin(c);
  const generated: { q: string; a: string }[] = [
    {
      q: `What does an Umrah package from ${c.city} include?`,
      a: `An Umrah package from ${c.city} covers return flights ${routingPhrase(
        c
      )} from ${origin}, the Saudi Nusuk visa, hotels near the Haram, ground transport between Makkah and Madinah, and guided Ziyarat at both holy sites. Our desk confirms every inclusion in writing before you pay, so nothing on the journey surprises you.`,
    },
    {
      q: `How much does an Umrah from ${c.city} cost?`,
      a: `Umrah from ${c.city} is quoted on inquiry, since airfare and hotel rates move every week. The quote reflects the season, the airline and routing from ${origin}, the hotel category and its distance from the Haram, and your group size. Our desk sends the current best price for your exact dates on WhatsApp, with no hidden charges and no stale published number.`,
    },
    {
      q: `How early should I book an Umrah from ${c.city}?`,
      a: `Book your Umrah from ${c.city} as early as your dates allow, since hotels near the Haram and airline seats fill months ahead. Ramadan Umrah fills first and the last Ashra sells out earliest. For a regular Umrah, three to six weeks gives comfortable time for the Nusuk visa and the best fares.`,
    },
    {
      q: `How do I get a quote and book an Umrah from ${c.city}?`,
      a: `To book your Umrah from ${c.city}, send our desk one WhatsApp message with your dates, group size, and the tier you want. Our team replies with options and a quote for your exact dates, a deposit secures your seats and rooms, and the balance settles before departure, every amount confirmed in writing.`,
    },
    {
      q: `Do you arrange hotels near the Haram for ${c.city} pilgrims?`,
      a: `Yes. For ${c.city} travelers our desk books hotels near the Haram in Makkah and Madinah, from walking or shuttle distance on the economy tier to hotels near or facing the mosque on the premium and five star tiers. Exact hotel names and room sharing are confirmed for your dates before you pay, since the closest options fill early.`,
    },
  ];
  return [...c.faqs, ...generated];
}
