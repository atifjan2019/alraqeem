// Umrah Plus combo data, one entry per destination. An Umrah Plus page is
// Umrah led, the pilgrimage is the anchor, and the destination is a heritage
// and leisure extension on one booking. The component reads this file, so
// adding a combo is a data entry and only live combos render. Real routing and
// inclusions only, no invented flight times, schedules, or fares, those are
// inquiry. The tourHref bridges sideways to the matching tour page where one
// exists.
export type UmrahPlusEntity = {
  name: string;
  caption: string;
  detail: string;
};

export type UmrahPlus = {
  slug: string; // umrah-plus-baku
  destination: string; // Baku
  region: string; // Azerbaijan
  tourHref?: string; // matching /tours page, when it exists
  umrahMakkahNights: number;
  umrahMadinahNights: number;
  destinationNights: number;
  heroCaption: string;
  overview: string; // combined trip, Umrah first
  islamicHeritage: string; // the Muslim heritage angle for the pilgrim
  routing: string; // real airline and stopover logic
  bestTime: string;
  destinationEntities: UmrahPlusEntity[];
  destinationVisa: { label: string; href: string };
  whoFor: string[];
  faqs: { q: string; a: string }[];
  live: boolean;
};

export const umrahPlus: UmrahPlus[] = [
  {
    slug: "umrah-plus-baku",
    destination: "Baku",
    region: "Azerbaijan",
    tourHref: "/tours/baku",
    umrahMakkahNights: 4,
    umrahMadinahNights: 3,
    destinationNights: 3,
    heroCaption: "The Flame Towers over Baku, the Land of Fire extension after Umrah",
    overview:
      "Umrah Plus Baku joins the pilgrimage to a short escape in the Land of Fire. You perform Umrah in Makkah and Madinah first, with hotels near the Haram and the Prophet's Mosque and guided Ziyarat, then fly on to Baku for the Old City, the Flame Towers, and the fire sites, all halal and easy in a Muslim majority country, one booking from Peshawar or Islamabad.",
    islamicHeritage:
      "Baku sits easy for a pilgrim. Azerbaijan is a Muslim majority country, so halal food is everywhere and prayer is simple, and the Bibi Heybat Mosque on the Caspian shore and the Taza Pir Mosque in the city carry the faith into the sightseeing. Urdu is understood in the tourist areas, and a familiar warmth toward visitors from Pakistan makes Baku a gentle extension after the intensity of the Haram.",
    routing:
      "Baku sits naturally on the Umrah journey, a short three and a half hour hop reached through the Gulf on carriers such as Saudia, flynas, or a Gulf airline. Our desk books the pilgrimage legs and the Baku leg as one booking, with the Azerbaijan e visa arranged alongside the Saudi Umrah visa, and confirms the real routing for your dates in writing rather than a fixed schedule.",
    bestTime:
      "Spring and autumn are mildest in Baku, and the extension runs comfortably year round after Umrah in any season.",
    destinationEntities: [
      {
        name: "The Bibi Heybat Mosque",
        caption: "The Bibi Heybat Mosque on the Caspian shore near Baku",
        detail:
          "A restored mosque on the Caspian shore, first built in the thirteenth century over the tomb of a descendant of the Prophet's family. A place of prayer and reflection that ties the Baku extension to the pilgrimage.",
      },
      {
        name: "Icherisheher, the Old City",
        caption: "The Maiden Tower in the walled Old City of Baku",
        detail:
          "The walled Old City of Baku, a UNESCO site of cobbled lanes, the Maiden Tower, and the Shirvanshah Palace. A calm, walkable heart to the city.",
      },
      {
        name: "The Flame Towers",
        caption: "The Flame Towers lit above Baku at night",
        detail:
          "Three flame shaped towers that rise over the city and light up after dark, the modern symbol of the Land of Fire, seen best from Highland Park.",
      },
      {
        name: "The fire sites, Ateshgah and Yanardag",
        caption: "The eternal flame at the Ateshgah near Baku",
        detail:
          "The Ateshgah fire temple and the burning hillside of Yanardag on the Absheron peninsula, natural gas flames that give Azerbaijan its name, an easy half day from the city.",
      },
    ],
    destinationVisa: { label: "Azerbaijan ASAN e visa portal", href: "https://evisa.gov.az" },
    whoFor: [
      "Pilgrims wanting a short, halal easy escape after Umrah",
      "Families combining the pilgrimage with a first trip abroad",
      "Couples seeking a gentle extension in a Muslim country",
    ],
    faqs: [
      {
        q: "Why add Baku to an Umrah?",
        a: "Baku is a short three and a half hour hop, and Azerbaijan is a Muslim majority country where halal food is everywhere and prayer is simple, so the extension stays gentle after the Haram. Our desk pairs the pilgrimage with three days in the Old City, the Flame Towers, and the fire sites on one booking.",
      },
      {
        q: "Is Baku halal friendly for a pilgrim?",
        a: "Yes. Azerbaijan is a majority Muslim country, so halal food is widely available across Baku, and mosques like the Bibi Heybat and the Taza Pir sit on the sightseeing route. Our team plans the meals and prayer stops so the extension stays comfortable.",
      },
      {
        q: "How many days does Umrah Plus Baku take?",
        a: "The trip runs the Umrah nights in Makkah and Madinah, then three nights in Baku, arranged around your dates. Our desk shapes the split and the length for your group, and adds a night for Gabala or Sheki on request, quoted for your exact dates.",
      },
      {
        q: "Do you also run a pure Baku tour without Umrah?",
        a: "Yes. Our Baku tour runs on its own for travelers who want the Land of Fire without the pilgrimage. Compare the pure Baku tour to weigh the two, and our desk quotes either for your dates.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-plus-turkey",
    destination: "Turkey",
    region: "Istanbul and beyond",
    tourHref: "/tours/turkey",
    umrahMakkahNights: 4,
    umrahMadinahNights: 3,
    destinationNights: 4,
    heroCaption: "The Ottoman mosques of Istanbul, the heritage extension after Umrah",
    overview:
      "Umrah Plus Turkey joins the pilgrimage to the heart of the Ottoman world. You perform Umrah in Makkah and Madinah first, with hotels near the Haram and the Prophet's Mosque and guided Ziyarat, then fly on to Istanbul for the imperial mosques, the Bosphorus, and the old city, a deep Islamic heritage extension on one booking from Peshawar or Islamabad.",
    islamicHeritage:
      "Turkey carries the strongest Islamic heritage tie of any extension. Istanbul was the seat of the Ottoman Caliphate, and the Blue Mosque, the Suleymaniye, and the Eyup Sultan Mosque, built over the resting place of a companion of the Prophet, draw pilgrims as much as travelers. Halal food is easy throughout, and the call to prayer across the city makes the extension a continuation of the journey of faith rather than a break from it.",
    routing:
      "Istanbul is a natural stopover on the Umrah journey, since Turkish Airlines and the Gulf carriers connect Pakistan, Jeddah, and Istanbul on one routing. Our desk books the pilgrimage legs and the Turkey leg together, with Turkey visa support arranged alongside the Saudi Umrah visa, and confirms the real routing for your dates in writing rather than a fixed schedule.",
    bestTime:
      "Spring and autumn bring the mildest weather in Istanbul, and the extension runs year round after Umrah, with a snowy Cappadocia option in winter.",
    destinationEntities: [
      {
        name: "The Blue Mosque and Hagia Sophia",
        caption: "The Blue Mosque in Sultanahmet, Istanbul",
        detail:
          "The Sultan Ahmed Mosque, famed for its blue Iznik tiles and six minarets, faces Hagia Sophia across Sultanahmet, the two great monuments of Byzantine and Ottoman Istanbul, both places of prayer and history.",
      },
      {
        name: "The Eyup Sultan Mosque",
        caption: "The Eyup Sultan Mosque above the Golden Horn",
        detail:
          "Built over the resting place of Abu Ayyub al Ansari, a companion of the Prophet, the Eyup Sultan Mosque is one of the most revered sites in Istanbul, a place of quiet ziyarat above the Golden Horn.",
      },
      {
        name: "The Suleymaniye Mosque",
        caption: "The Suleymaniye Mosque on the Istanbul skyline",
        detail:
          "The grand imperial mosque of Sultan Suleiman, the masterpiece of the architect Sinan, crowning the third hill with wide views over the Golden Horn and the Bosphorus.",
      },
      {
        name: "The Bosphorus and Topkapi Palace",
        caption: "A Bosphorus cruise between Europe and Asia",
        detail:
          "A cruise on the strait between two continents, and the Topkapi Palace of the Ottoman sultans, home to sacred relics of the Prophet. A longer extension adds Cappadocia and its valleys.",
      },
    ],
    destinationVisa: { label: "Turkey e visa portal", href: "https://www.evisa.gov.tr" },
    whoFor: [
      "Pilgrims drawn to Ottoman and Islamic heritage",
      "Families and couples combining Umrah with Istanbul",
      "Groups wanting the pilgrimage and a heritage tour together",
    ],
    faqs: [
      {
        q: "Why add Turkey to an Umrah?",
        a: "Istanbul was the seat of the Ottoman Caliphate, so the extension carries deep Islamic heritage, the Blue Mosque, the Suleymaniye, and the Eyup Sultan Mosque over the resting place of a companion of the Prophet. Our desk pairs the pilgrimage with four nights in Istanbul on one booking, a continuation of the journey of faith.",
      },
      {
        q: "Do I need a separate Turkey visa on an Umrah Plus trip?",
        a: "Yes. The Saudi Umrah visa and the Turkey visa are separate, and our team arranges both. Most Pakistani travelers need a Turkey sticker visa, since the Turkey e visa applies only with a valid Schengen, UK, US, or Ireland visa. Verify the current rules at the official Turkey portal, and our desk files the right visa.",
      },
      {
        q: "Can the Istanbul leg include Cappadocia?",
        a: "Yes. A longer Turkey extension adds Cappadocia and its valleys after Istanbul, with the internal flight arranged in the same booking. Tell our desk the days you have, and we shape the heritage and the landscape around your Umrah dates.",
      },
      {
        q: "Do you also run a pure Turkey tour without Umrah?",
        a: "Yes. Our Turkey tour runs on its own for travelers who want Istanbul and Cappadocia without the pilgrimage. Compare the pure Turkey tour, and our desk quotes either for your dates.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-plus-dubai",
    destination: "Dubai",
    region: "United Arab Emirates",
    tourHref: "/tours/dubai",
    umrahMakkahNights: 4,
    umrahMadinahNights: 3,
    destinationNights: 3,
    heroCaption: "The Sheikh Zayed Grand Mosque, the Dubai extension after Umrah",
    overview:
      "Umrah Plus Dubai joins the pilgrimage to the common Gulf stopover. You perform Umrah in Makkah and Madinah first, with hotels near the Haram and the Prophet's Mosque and guided Ziyarat, then break the journey in Dubai for the Sheikh Zayed Grand Mosque, the modern city, and the desert, an easy extension on one booking from Peshawar or Islamabad.",
    islamicHeritage:
      "Dubai and Abu Dhabi carry the faith into a modern setting. The Sheikh Zayed Grand Mosque in Abu Dhabi, one of the largest in the world in white marble, and the Jumeirah Mosque in Dubai stand alongside the skyline, and halal food is the default across the Emirates. A short prayer easy break in the Gulf suits a pilgrim wanting comfort and ease after the Haram.",
    routing:
      "Dubai is the most common connecting hub on the Umrah journey, since Emirates, flydubai, and the Gulf carriers link Pakistan, Jeddah, and Dubai on one routing. Our desk books the pilgrimage legs and the Dubai stopover together, with the UAE visit visa arranged alongside the Saudi Umrah visa, and confirms the real routing for your dates in writing.",
    bestTime:
      "November to March is the cool, comfortable season in Dubai, and the extension runs year round after Umrah, with indoor sights through the summer heat.",
    destinationEntities: [
      {
        name: "The Sheikh Zayed Grand Mosque",
        caption: "The white marble Sheikh Zayed Grand Mosque in Abu Dhabi",
        detail:
          "The vast white marble grand mosque of Abu Dhabi, one of the largest in the world, with its many domes and reflecting pools, a day trip from Dubai and a highlight for a pilgrim.",
      },
      {
        name: "The Jumeirah Mosque",
        caption: "The Jumeirah Mosque in Dubai",
        detail:
          "One of the few Dubai mosques open to visitors, a graceful stone mosque in the Fatimid style, offering a welcome and an understanding of Islam in the Emirates.",
      },
      {
        name: "The Burj Khalifa and Downtown",
        caption: "The Burj Khalifa above Downtown Dubai",
        detail:
          "The tallest building in the world above the Dubai Mall and the fountain, the classic first sight of the modern city on the extension.",
      },
      {
        name: "The desert safari",
        caption: "A desert safari in the dunes near Dubai",
        detail:
          "An afternoon in the red dunes with a drive, a camel ride, and a barbecue dinner under the stars, a relaxed close to a Gulf break.",
      },
    ],
    destinationVisa: { label: "UAE government portal", href: "https://u.ae" },
    whoFor: [
      "Pilgrims wanting an easy, prayer friendly Gulf break",
      "Families combining Umrah with the Dubai sights",
      "Travelers already connecting through Dubai on the Umrah routing",
    ],
    faqs: [
      {
        q: "Why add Dubai to an Umrah?",
        a: "Dubai is the most common connecting hub on the Umrah routing, so breaking the journey there is natural, and the Sheikh Zayed Grand Mosque in Abu Dhabi and the Jumeirah Mosque keep the extension prayer easy. Our desk pairs the pilgrimage with three nights in Dubai on one booking.",
      },
      {
        q: "Does a Dubai visa cover my Umrah, or are they separate?",
        a: "They are separate. A UAE visit visa covers Dubai only, and the Saudi Umrah visa is filed through Nusuk, and our team arranges both on the one booking. Verify the current UAE rules at the official government portal, and our desk handles the filing.",
      },
      {
        q: "Is the Abu Dhabi grand mosque included?",
        a: "A day trip to the Sheikh Zayed Grand Mosque in Abu Dhabi is arranged on the Dubai extension on request, alongside the Corniche and the modern sights. Tell our desk you want it, and we build it into the plan.",
      },
      {
        q: "Do you also run a pure Dubai tour without Umrah?",
        a: "Yes. Our Dubai tour runs on its own for travelers who want the city, the desert, and Abu Dhabi without the pilgrimage. Compare the pure Dubai tour, and our desk quotes either for your dates.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-plus-qatar",
    destination: "Qatar",
    region: "Doha",
    umrahMakkahNights: 4,
    umrahMadinahNights: 3,
    destinationNights: 2,
    heroCaption: "The Museum of Islamic Art in Doha, the Qatar extension after Umrah",
    overview:
      "Umrah Plus Qatar joins the pilgrimage to an elegant short stopover in Doha. You perform Umrah in Makkah and Madinah first, with hotels near the Haram and the Prophet's Mosque and guided Ziyarat, then break the journey in Qatar for the Museum of Islamic Art, Katara, and the State Mosque, a refined extension on one booking from Peshawar or Islamabad.",
    islamicHeritage:
      "Doha wears the faith with elegance. The State Mosque, named for Imam Muhammad ibn Abdul Wahhab, is among the largest in the Gulf, and the Museum of Islamic Art holds one of the world's finest collections of Islamic art across fourteen centuries. Halal food is the default, and the short, calm stopover suits a pilgrim who wants heritage and ease after the Haram.",
    routing:
      "Doha is a natural stopover on the Umrah journey, since Qatar Airways links Pakistan, Jeddah, and Doha on one routing through its hub. Our desk books the pilgrimage legs and the Doha stopover together, with the Qatar e visa arranged alongside the Saudi Umrah visa, and confirms the real routing for your dates in writing.",
    bestTime:
      "November to March is the comfortable season in Doha, and the short extension runs year round after Umrah, with the museums and souqs pleasant through the heat.",
    destinationEntities: [
      {
        name: "The State Mosque, Imam Muhammad ibn Abdul Wahhab",
        caption: "The State Mosque of Qatar in Doha",
        detail:
          "The grand State Mosque of Qatar, named for Imam Muhammad ibn Abdul Wahhab, among the largest in the Gulf with its many domes, open for prayer on the extension.",
      },
      {
        name: "The Museum of Islamic Art",
        caption: "The Museum of Islamic Art on the Doha waterfront",
        detail:
          "The landmark museum on the Corniche, holding one of the finest collections of Islamic art across fourteen centuries, from manuscripts to ceramics, in a building by I M Pei.",
      },
      {
        name: "Katara Cultural Village",
        caption: "The Katara Cultural Village in Doha",
        detail:
          "A cultural quarter of galleries, the golden mosque, an amphitheatre, and the beach, a relaxed evening on the Doha extension.",
      },
      {
        name: "Souq Waqif and the Corniche",
        caption: "Souq Waqif in the heart of Doha",
        detail:
          "The restored old market of spices, textiles, and cafes, and the sweeping Corniche along the bay with the Doha skyline, an easy walk on the stopover.",
      },
    ],
    destinationVisa: { label: "Qatar visa portal", href: "https://portal.moi.gov.qa" },
    whoFor: [
      "Pilgrims wanting a short, elegant heritage stopover",
      "Couples and families combining Umrah with Doha",
      "Travelers connecting through Doha on the Umrah routing",
    ],
    faqs: [
      {
        q: "Why add Qatar to an Umrah?",
        a: "Doha is a natural Qatar Airways stopover on the Umrah routing, and its heritage suits a pilgrim, the State Mosque named for Imam Muhammad ibn Abdul Wahhab and the Museum of Islamic Art across fourteen centuries of the faith. Our desk pairs the pilgrimage with a short Doha stopover on one booking.",
      },
      {
        q: "Do I need a Qatar visa as well as the Umrah visa?",
        a: "Yes. The Saudi Umrah visa and the Qatar e visa are separate, and our team arranges both on the one booking. Verify the current Qatar rules at the official portal, and our desk handles the filing alongside the Nusuk Umrah visa.",
      },
      {
        q: "How long is the Doha stopover?",
        a: "The Doha extension is a short, elegant break of about two nights after the Umrah, enough for the State Mosque, the Museum of Islamic Art, Katara, and Souq Waqif. Our desk shapes the length around your dates and the flight routing.",
      },
      {
        q: "Is Doha comfortable for a family after Umrah?",
        a: "Yes. Doha is calm, safe, and prayer easy, with halal food the default and short drives between the sights. Our team sets a gentle pace and family rooms, so the stopover rests the group after the Haram.",
      },
    ],
    live: true,
  },
  {
    slug: "umrah-plus-egypt",
    destination: "Egypt",
    region: "Cairo",
    umrahMakkahNights: 4,
    umrahMadinahNights: 3,
    destinationNights: 4,
    heroCaption: "Islamic Cairo and Al Azhar, the Egypt extension after Umrah",
    overview:
      "Umrah Plus Egypt joins the pilgrimage to the living heritage of Islamic Cairo. You perform Umrah in Makkah and Madinah first, with hotels near the Haram and the Prophet's Mosque and guided Ziyarat, then fly on to Cairo for Al Azhar, the old Islamic city, and the pyramids, a rich heritage extension on one booking from Peshawar or Islamabad.",
    islamicHeritage:
      "Cairo holds more than a thousand years of Islamic learning and architecture. Al Azhar, founded in the tenth century, is among the oldest universities in the world and a seat of Islamic scholarship, and the Amr ibn al As Mosque was the first mosque built in Africa. The lanes of Islamic Cairo, the minarets, and the madrasas make the extension a journey through the history of the faith.",
    routing:
      "Cairo sits on the Umrah journey through the Gulf and the direct links, on carriers such as EgyptAir, Saudia, and the Gulf airlines. Our desk books the pilgrimage legs and the Egypt leg together, with the Egypt e visa arranged alongside the Saudi Umrah visa, and confirms the real routing for your dates in writing rather than a fixed schedule.",
    bestTime:
      "October to April is the comfortable season in Cairo, and the extension runs year round after Umrah, with early starts in the warmer months.",
    destinationEntities: [
      {
        name: "Al Azhar Mosque and Islamic Cairo",
        caption: "The Al Azhar Mosque in Islamic Cairo",
        detail:
          "The tenth century mosque and university of Al Azhar, a seat of Islamic learning for over a thousand years, at the heart of the medieval lanes, minarets, and madrasas of Islamic Cairo.",
      },
      {
        name: "The Amr ibn al As Mosque",
        caption: "The Amr ibn al As Mosque in old Cairo",
        detail:
          "The first mosque built in Egypt and in Africa, founded by the companion Amr ibn al As in the seventh century, a place of deep history for a pilgrim.",
      },
      {
        name: "The Pyramids of Giza and the Sphinx",
        caption: "The Pyramids of Giza and the Sphinx",
        detail:
          "The last standing wonder of the ancient world on the edge of Cairo, the three great pyramids and the Sphinx, a half day that every Egypt trip carries.",
      },
      {
        name: "Khan el Khalili and the Citadel",
        caption: "The Khan el Khalili bazaar in Cairo",
        detail:
          "The historic Khan el Khalili bazaar and the Citadel of Salah al Din with the Muhammad Ali Mosque above the city, the heritage heart of old Cairo.",
      },
    ],
    destinationVisa: { label: "Egypt e visa portal", href: "https://visa2egypt.gov.eg" },
    whoFor: [
      "Pilgrims drawn to Islamic heritage and history",
      "Families combining Umrah with Cairo and the pyramids",
      "Groups wanting the pilgrimage and a heritage tour together",
    ],
    faqs: [
      {
        q: "Why add Egypt to an Umrah?",
        a: "Cairo holds over a thousand years of Islamic heritage, Al Azhar among the oldest universities in the world, the Amr ibn al As Mosque the first in Africa, and the lanes of Islamic Cairo, alongside the pyramids. Our desk pairs the pilgrimage with four nights in Cairo on one booking, a journey through the history of the faith.",
      },
      {
        q: "Do I need an Egypt visa with the Umrah visa?",
        a: "Yes. The Saudi Umrah visa and the Egypt e visa are separate, and our team arranges both on the one booking. Verify the current Egypt rules at the official portal, and our desk files the e visa alongside the Nusuk Umrah visa.",
      },
      {
        q: "Does the Egypt extension include the pyramids?",
        a: "Yes. The Giza pyramids and the Sphinx are part of the Cairo extension, alongside Islamic Cairo, Al Azhar, and Khan el Khalili. Our desk sets the sightseeing around your Umrah dates and the flight routing.",
      },
      {
        q: "Is Cairo comfortable for a Muslim family after Umrah?",
        a: "Yes. Egypt is a Muslim majority country, so halal food is everywhere and mosques are on every route, and our team plans the pace, the prayer stops, and family rooms so the extension rests the group after the Haram.",
      },
    ],
    live: true,
  },
  {
    // Optional, held until access and routing are confirmed. Renders only when
    // live is set to true.
    slug: "umrah-plus-jordan",
    destination: "Jordan",
    region: "Amman and beyond",
    umrahMakkahNights: 4,
    umrahMadinahNights: 3,
    destinationNights: 3,
    heroCaption: "The heritage of Jordan, an extension after Umrah",
    overview:
      "Umrah Plus Jordan joins the pilgrimage to the heritage of the Levant, held until the routing and access are confirmed.",
    islamicHeritage:
      "Jordan carries deep Islamic and prophetic heritage, the shrines of the companions and the sites of the early Muslim conquests, offered where access allows.",
    routing:
      "Held until the real routing and access are confirmed, since arrangements shift with the region.",
    bestTime: "Spring and autumn are mildest in Jordan.",
    destinationEntities: [],
    destinationVisa: { label: "Jordan e visa portal", href: "https://www.gate2jo.gov.jo" },
    whoFor: ["Pilgrims drawn to the heritage of the Levant"],
    faqs: [],
    live: false,
  },
];

// Real photos for the combo hero and each destination entity, aligned to the
// destinationEntities order. Overlapping sights reuse the tour photos already
// downloaded, the mosque and heritage sights use their own. An empty string
// falls back to the branded panel, so nothing breaks. Umrah stages use the
// shared Haram and Madinah images.
const T = "/images/tours";
export const comboHeroImage: Record<string, string> = {
  "umrah-plus-baku": `${T}/baku/flame-towers.jpg`,
  "umrah-plus-turkey": `${T}/turkey/blue-mosque.jpg`,
  "umrah-plus-dubai": `${T}/dubai/abu-dhabi-mosque.jpg`,
  "umrah-plus-qatar": `${T}/umrah-plus/museum-islamic-art.jpg`,
  "umrah-plus-egypt": `${T}/umrah-plus/al-azhar.jpg`,
};
export const comboEntityImages: Record<string, string[]> = {
  "umrah-plus-baku": [
    `${T}/umrah-plus/bibi-heybat.jpg`,
    `${T}/baku/old-city.jpg`,
    `${T}/baku/flame-towers.jpg`,
    `${T}/baku/ateshgah.jpg`,
  ],
  "umrah-plus-turkey": [
    `${T}/turkey/blue-mosque.jpg`,
    `${T}/umrah-plus/eyup-sultan.jpg`,
    `${T}/umrah-plus/suleymaniye.jpg`,
    `${T}/turkey/bosphorus.jpg`,
  ],
  "umrah-plus-dubai": [
    `${T}/dubai/abu-dhabi-mosque.jpg`,
    `${T}/umrah-plus/jumeirah-mosque.jpg`,
    `${T}/dubai/burj-khalifa.jpg`,
    `${T}/dubai/desert-safari.jpg`,
  ],
  "umrah-plus-qatar": [
    "",
    `${T}/umrah-plus/museum-islamic-art.jpg`,
    `${T}/umrah-plus/katara.jpg`,
    `${T}/umrah-plus/souq-waqif.jpg`,
  ],
  "umrah-plus-egypt": [
    `${T}/umrah-plus/al-azhar.jpg`,
    `${T}/umrah-plus/amr-ibn-al-as.jpg`,
    `${T}/umrah-plus/giza-pyramids.jpg`,
    `${T}/umrah-plus/khan-el-khalili.jpg`,
  ],
};

export function liveUmrahPlus(): UmrahPlus[] {
  return umrahPlus.filter((c) => c.live);
}

export function getUmrahPlus(slug: string): UmrahPlus | undefined {
  return umrahPlus.find((c) => c.slug === slug);
}

// Combined FAQ set: the hand written combo FAQs, then combo data driven ones
// that name the real destination, routing, and both visas, so each set is
// genuinely combo specific and none reads identical to another. 10 to 15 band.
export function umrahPlusFaqs(c: UmrahPlus): { q: string; a: string }[] {
  const nights = `${c.umrahMakkahNights} nights in Makkah, ${c.umrahMadinahNights} in Madinah, and ${c.destinationNights} in ${c.destination}`;
  const generated: { q: string; a: string }[] = [
    {
      q: `Do I need two visas for Umrah Plus ${c.destination}?`,
      a: `Yes. The Saudi Umrah visa, filed through Nusuk, and the ${c.destination} visa are separate, and our team arranges both on the one booking. Each links to its official source on this page, and our desk checks every document before filing.`,
    },
    {
      q: `How does the routing work for Umrah Plus ${c.destination}?`,
      a: `${c.routing} No flight times or schedules are fixed here, since fares and timings move, and our desk sends the current best routing for your dates.`,
    },
    {
      q: `How many nights is Umrah Plus ${c.destination}?`,
      a: `A typical Umrah Plus ${c.destination} runs about ${nights}, arranged around your dates. Our desk adjusts the split, the hotels, and the length for your group, and quotes the current best price for your exact dates.`,
    },
    {
      q: `Do I perform Umrah first or visit ${c.destination} first?`,
      a: `The Umrah comes first, the anchor of the journey, with the ${c.destination} leg as the extension on the return. Our desk arranges the order to suit the flight routing and your dates, and confirms it in writing.`,
    },
    {
      q: `How much does Umrah Plus ${c.destination} cost?`,
      a: `Umrah Plus ${c.destination} is quoted on inquiry, since airfare and hotel rates move every week. The quote reflects the season, the airline and routing, the hotel category on both legs, and your group size. Our desk sends the current best price for your exact dates on WhatsApp, with no hidden charges.`,
    },
    {
      q: `Do you arrange Umrah Plus ${c.destination} for families and groups?`,
      a: `Yes. Our desk builds Umrah Plus ${c.destination} for families, couples, and community groups of any size, with connected rooms near the Haram and in ${c.destination}, a steady pace, and assistance for elders. Share your group size and dates, and we seat everyone together and send one quote for the trip.`,
    },
  ];
  return [...c.faqs, ...generated];
}
