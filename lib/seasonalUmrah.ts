// Seasonal Umrah data, one entry per Islamic month season. Each page is an
// evergreen URL refreshed yearly with the current Hijri and Gregorian dates,
// never a year in the URL. The component reads this file, so adding a season is
// a data entry and only live seasons render. Real Hijri calendar only, no
// invented dates, the exact start of each month is set by the moon sighting, so
// the windows are stated with that caveat and confirmed at booking. Refresh the
// hijriYear and the windows each year, tracked in the gaps report.
export type SeasonSegment = { title: string; detail: string };

export type SeasonalUmrah = {
  slug: string; // ramadan-umrah
  season: string; // Ramadan
  hijriMonth: string; // descriptive
  hijriYear: string; // 1448 AH
  gregorianWindow: string; // around February to March 2027
  heroImage: "kaaba" | "madinah";
  heroCaption: string;
  significance: string; // the substantive entity passage
  datesNote: string; // when it falls, moon sighting, confirmed at booking
  demandNote: string; // honest demand and booking note
  planningTips: string; // practical planning
  bestFor: string[];
  subSegments: SeasonSegment[]; // Ramadan the Ashras and extras, others empty
  faqs: { q: string; a: string }[];
  live: boolean;
};

export const seasonalUmrah: SeasonalUmrah[] = [
  {
    slug: "ramadan-umrah",
    season: "Ramadan",
    hijriMonth: "the ninth month of the Islamic calendar, the month of fasting",
    hijriYear: "1448 AH",
    gregorianWindow: "around February to March 2027",
    heroImage: "kaaba",
    heroCaption: "Masjid al-Haram and the Kaaba during Ramadan",
    significance:
      "Ramadan is the month the Quran was revealed, a month of fasting from dawn to sunset, of long night prayers, and of drawing near to Allah. Umrah in Ramadan carries a special weight, since the Prophet, peace be upon him, said that an Umrah in Ramadan equals a Hajj in reward, narrated in Bukhari and Muslim. Pilgrims spend the days in worship near the Haram, break the fast within sight of the Kaaba, and pray the Taraweeh nights in Masjid al-Haram, an experience unlike any other month of the year.",
    datesNote:
      "Ramadan 1448 AH falls in around February to March 2027, with the first fast expected in mid February, subject to the moon sighting. The exact start is announced when the crescent is seen, and our desk confirms your travel dates around it.",
    demandNote:
      "Ramadan is the highest demand Umrah season of the year, and the last ten days sell out first and earliest. Book months ahead for the last Ashra, since hotels near the Haram and airline seats fill long before the month begins.",
    planningTips:
      "Fasting on a journey carries a concession in the Sharia, and our desk plans Suhoor and Iftar near the Haram, the Taraweeh nights, and rest through the day. The last ten days bring the largest crowds of the year, so we set hotels within easy reach of the mosque and a steady pace that holds up through the long nights.",
    bestFor: [
      "Pilgrims seeking the highest reward of the year",
      "Families and groups who plan well ahead",
      "Travelers seeking Laylat al-Qadr in the last ten days",
    ],
    subSegments: [
      {
        title: "The first Ashra, days 1 to 10, mercy",
        detail:
          "The first ten days of Ramadan, the days of mercy, ease you into the fast and the rhythm of worship near the Haram, quieter than the last ten and a gentler window for a first Ramadan Umrah.",
      },
      {
        title: "The middle Ashra, days 11 to 20, forgiveness",
        detail:
          "The middle ten days, the days of forgiveness, deepen the worship as the month builds toward its peak, still calmer than the final ten and easier to book.",
      },
      {
        title: "The last Ashra, days 21 to 30, Laylat al-Qadr",
        detail:
          "The last ten days hold Laylat al-Qadr, the Night of Decree, better than a thousand months, sought on the odd nights. The highest virtue of the year sits here, and so does the highest demand, the earliest to book and the fullest Haram.",
      },
      {
        title: "Itikaf in the last ten days",
        detail:
          "Itikaf, secluding in the mosque for worship through the last ten nights, is the practice of the Prophet, peace be upon him. Our desk arranges the stay and the guidance where the program and the mosque allow.",
      },
    ],
    faqs: [
      {
        q: "Is Umrah in Ramadan equal to Hajj in reward?",
        a: "The Prophet, peace be upon him, said that an Umrah in Ramadan equals a Hajj in reward, narrated in Bukhari and Muslim. The reward is immense, though it does not remove the separate obligation of Hajj for those able. Our desk arranges the Ramadan Umrah so you focus on the worship.",
      },
      {
        q: "What are the three Ashras of Ramadan?",
        a: "Ramadan divides into three Ashras of ten days each, the first the days of mercy, the middle the days of forgiveness, and the last ten holding Laylat al-Qadr, the Night of Decree. The last Ashra carries the highest virtue and the highest demand, so it books earliest.",
      },
      {
        q: "When is Laylat al-Qadr, and how do I plan for it?",
        a: "Laylat al-Qadr, better than a thousand months, is sought on the odd nights of the last ten days of Ramadan. Our desk sets your stay across the last Ashra with a hotel close to the Haram, so you reach the night prayers, and confirms the dates once the month is announced.",
      },
      {
        q: "Can I perform Itikaf during the Ramadan Umrah?",
        a: "Yes, where the program and the mosque allow. Itikaf is the practice of secluding in the mosque for worship through the last ten nights, followed by the Prophet, peace be upon him. Tell our desk you want Itikaf, and we arrange the stay and the guidance around it.",
      },
      {
        q: "How do I manage fasting while traveling for Umrah in Ramadan?",
        a: "Fasting on a journey carries a concession in the Sharia, so a traveler makes up missed days later where needed. Our desk plans Suhoor and Iftar near the Haram, rest through the day, and the Taraweeh nights, so the fast and the worship stay comfortable.",
      },
      {
        q: "Why does Ramadan Umrah cost more than other months?",
        a: "Ramadan is the peak Umrah season, so hotel rates near the Haram and airfares sit at their highest, and the last ten days are the highest of all. No number is published, since rates move, and our desk sends the current best price for your exact dates on inquiry, with the cost drivers explained.",
      },
    ],
    live: true,
  },
  {
    slug: "rabi-ul-awal-umrah",
    season: "Rabi ul Awal",
    hijriMonth: "the third month of the Islamic calendar",
    hijriYear: "1448 AH",
    gregorianWindow: "around late August to September 2026",
    heroImage: "madinah",
    heroCaption: "Masjid an-Nabawi in Madinah, the city of the Prophet",
    significance:
      "Rabi ul Awal is widely observed as the month of the birth of the Prophet Muhammad, peace be upon him, a time when many turn to his life, his character, and his teachings. An Umrah in Rabi ul Awal joins that reflection to the rites at Makkah and Madinah, with time at Masjid an-Nabawi in Madinah, the city of the Prophet, where the Prophet's Mosque and the Rawdah draw the heart.",
    datesNote:
      "Rabi ul Awal 1448 AH falls in around late August to September 2026, subject to the moon sighting. The twelfth of the month, observed by many as the Prophet's birth, falls in early September. Our desk confirms your travel dates around the month.",
    demandNote:
      "Rabi ul Awal draws steady demand, milder than Ramadan, so hotels near the Haram and the Prophet's Mosque are easier to secure, though the days around the twelfth book earlier. A few weeks ahead gives comfortable time.",
    planningTips:
      "Makkah and Madinah are warm in this window, so our desk sets an early and late day pace and hotels close to the mosques. Time in Madinah at Masjid an-Nabawi suits the month's reflection on the life of the Prophet, peace be upon him.",
    bestFor: [
      "Pilgrims drawn to the life of the Prophet, peace be upon him",
      "Travelers wanting time in Madinah",
      "Families seeking a calmer season than Ramadan",
    ],
    subSegments: [],
    faqs: [
      {
        q: "Why perform Umrah in Rabi ul Awal?",
        a: "Rabi ul Awal is widely observed as the month of the birth of the Prophet, peace be upon him, so many pilgrims choose it to reflect on his life alongside the Umrah, with time in Madinah at his mosque and the Rawdah. Our desk plans the Makkah and Madinah nights around the month.",
      },
      {
        q: "Is Rabi ul Awal a busy season for Umrah?",
        a: "Rabi ul Awal is calmer than Ramadan, so hotels near the Haram and the Prophet's Mosque are easier to secure, though the days around the twelfth of the month draw more travelers. A few weeks of lead time gives comfortable booking.",
      },
      {
        q: "Does the package include extra time in Madinah?",
        a: "Yes. The Rabi ul Awal Umrah splits nights between Makkah and Madinah, and our desk adds Madinah nights on request so you spend longer at Masjid an-Nabawi and the Rawdah. Tell us the balance you want and we shape the stay.",
      },
      {
        q: "What is the weather like for Rabi ul Awal Umrah this year?",
        a: "The late August to September window is warm in Makkah and Madinah, so our desk sets hotels close to the mosques and an early and late day pace, with rest through the midday heat. Assistance for elders is arranged where needed.",
      },
    ],
    live: true,
  },
  {
    slug: "rajab-umrah",
    season: "Rajab",
    hijriMonth: "the seventh month, one of the four sacred months of the Islamic calendar",
    hijriYear: "1448 AH",
    gregorianWindow: "around mid December 2026 to mid January 2027",
    heroImage: "kaaba",
    heroCaption: "The Kaaba in Masjid al-Haram in the cool Rajab season",
    significance:
      "Rajab is one of the four sacred months, in which worship carries extra weight, and many observe it as a month of turning toward Allah in preparation for Ramadan. The night journey and ascension, the Isra and Mi'raj, is associated with Rajab by many. An Umrah in Rajab meets a calm, cool season at the Haram, well before the Ramadan rush, a gentle time for Tawaf and Ziyarat.",
    datesNote:
      "Rajab 1448 AH falls in around mid December 2026 to mid January 2027, subject to the moon sighting. Our desk confirms your travel dates around the month.",
    demandNote:
      "Rajab is a quieter, comfortable Umrah season, so hotels near the Haram are easier to secure and the winter weather is cool. Demand rises toward Shaban and Ramadan, so early booking still helps for the closest hotels.",
    planningTips:
      "The cool winter weather in Makkah and Madinah makes Rajab gentle for elders and families, with comfortable days for Tawaf and Ziyarat. Our desk sets hotels close to the mosques and an easy pace, a restful season before the Ramadan crowds.",
    bestFor: [
      "Elders and families wanting cool, calm weather",
      "Pilgrims preparing for Ramadan",
      "Travelers seeking a quieter Haram",
    ],
    subSegments: [],
    faqs: [
      {
        q: "Why perform Umrah in Rajab?",
        a: "Rajab is one of the four sacred months, when worship carries extra weight, and its cool winter weather makes for a calm, comfortable Umrah well before the Ramadan rush. Many pilgrims choose it to prepare for Ramadan. Our desk arranges the season with hotels close to the Haram.",
      },
      {
        q: "Is Rajab a good, quiet time for a first Umrah?",
        a: "Yes. Rajab is one of the quieter, cooler Umrah seasons, so the Haram is calmer than in Ramadan and the days are comfortable for Tawaf and Ziyarat, gentle for a first Umrah or for elders. Our desk sets a steady pace and a nearby hotel.",
      },
      {
        q: "What is the weather like for Rajab Umrah?",
        a: "The mid December to mid January window is cool in Makkah and Madinah, the comfortable winter season, easy for the outdoor rites and the walking. Our desk plans hotels close to the mosques so the cool days stay restful for the whole group.",
      },
      {
        q: "Should I book Rajab Umrah early?",
        a: "Rajab is easier to book than Ramadan, though demand climbs toward Shaban and Ramadan, so a few weeks of lead time secures the closest hotels and the best fares. Message our desk with your dates and we confirm the plan.",
      },
    ],
    live: true,
  },
  {
    slug: "shaban-umrah",
    season: "Shaban",
    hijriMonth: "the eighth month, the month before Ramadan",
    hijriYear: "1448 AH",
    gregorianWindow: "around mid January to mid February 2027",
    heroImage: "kaaba",
    heroCaption: "The Kaaba in Masjid al-Haram before the Ramadan season",
    significance:
      "Shaban is the month before Ramadan, and the Prophet, peace be upon him, is reported to have fasted often in Shaban, narrated in Bukhari and Muslim, preparing for the fasting month. Many observe the fifteenth night of Shaban in worship. An Umrah in Shaban is a spiritual warm up to Ramadan, at the Haram while it is still calmer, before the great rush of the fasting month.",
    datesNote:
      "Shaban 1448 AH falls in around mid January to mid February 2027, subject to the moon sighting, ending as Ramadan begins. Our desk confirms your travel dates around the month.",
    demandNote:
      "Shaban is calmer than Ramadan, but demand climbs as the fasting month nears, and travelers who want the last quiet window before Ramadan book ahead. A late Shaban Umrah rolls into the first days of Ramadan for those who extend.",
    planningTips:
      "Shaban is cool and comfortable at the Haram, a gentler alternative to the Ramadan crowds, and our desk rolls a late Shaban Umrah into the start of Ramadan on request. Hotels close to the mosque and a steady pace suit the season.",
    bestFor: [
      "Pilgrims wanting the last calm window before Ramadan",
      "Travelers preparing for Ramadan",
      "Those extending into the first days of Ramadan",
    ],
    subSegments: [],
    faqs: [
      {
        q: "Why perform Umrah in Shaban?",
        a: "Shaban is the month before Ramadan, a season of preparation in which the Prophet, peace be upon him, fasted often, narrated in Bukhari and Muslim. An Umrah in Shaban is a calm, cool warm up to the fasting month, at the Haram before the great Ramadan rush. Our desk arranges the season around your dates.",
      },
      {
        q: "Can I extend a Shaban Umrah into Ramadan?",
        a: "Yes. Shaban ends as Ramadan begins, so a late Shaban Umrah rolls into the first days of the fasting month for travelers who extend. Tell our desk you want to cross into Ramadan, and we set the hotels and the length to match, confirmed for your dates.",
      },
      {
        q: "Is Shaban busier than Rajab for Umrah?",
        a: "Shaban is calmer than Ramadan but busier than Rajab, since demand climbs as the fasting month nears. Travelers who want the last quiet window book ahead for the closest hotels. Our desk confirms the current availability for your dates.",
      },
      {
        q: "What is the weather like for Shaban Umrah?",
        a: "The mid January to mid February window is cool and comfortable in Makkah and Madinah, easy for the outdoor rites. Our desk sets hotels close to the mosques and a steady pace, so the season stays restful before Ramadan.",
      },
    ],
    live: true,
  },
];

export function liveSeasonalUmrah(): SeasonalUmrah[] {
  return seasonalUmrah.filter((s) => s.live);
}

export function getSeasonalUmrah(slug: string): SeasonalUmrah | undefined {
  return seasonalUmrah.find((s) => s.slug === slug);
}

// Full FAQ set per season, the hand written season FAQs then season data driven
// ones that carry the real month, dates, and inclusions, so each set is
// genuinely season specific and none reads identical to another season.
export function seasonalFaqs(s: SeasonalUmrah): { q: string; a: string }[] {
  const generated: { q: string; a: string }[] = [
    {
      q: `When does ${s.season} Umrah fall, and when should I book?`,
      a: `${s.datesNote} ${s.demandNote}`,
    },
    {
      q: `What is included in a ${s.season} Umrah package?`,
      a: `A ${s.season} Umrah package covers the Saudi Umrah e-visa through Nusuk, return flights from Peshawar or Islamabad, hotels near the Haram in Makkah and Madinah, ground transport between the two cities, and guided Ziyarat. Our desk confirms every inclusion in writing before you pay.`,
    },
    {
      q: `Which tier fits a ${s.season} Umrah, economy, premium, or five star?`,
      a: `Every tier runs in ${s.season}, economy with hotels a short walk or shuttle from the Haram, premium and five star near or facing it. Compare the tiers on the Umrah hub, and our desk quotes the tier you choose for your ${s.season} dates on inquiry.`,
    },
    {
      q: `Do you arrange ${s.season} Umrah for families and groups?`,
      a: `Yes. Our desk builds ${s.season} Umrah for families, couples, and community groups of any size, with connected rooms near the Haram and assistance for elders. Share your group size and dates, and we send one quote for the group.`,
    },
    {
      q: `How does the Nusuk visa work for a ${s.season} Umrah?`,
      a: `The Saudi Umrah e-visa for your ${s.season} Umrah is prepared and filed by our team through the official Nusuk platform, and we check every page before submission. Verify the current rules at the official Saudi source, and the visa arrives inside your package with the flights and hotels.`,
    },
    {
      q: `How do I book a ${s.season} Umrah, and what is the deposit?`,
      a: `Booking a ${s.season} Umrah starts with one WhatsApp message or a visit to our Charsadda office. Our team sends options and a quote for your dates, a deposit secures your seats and rooms, and the balance settles before departure, every amount confirmed in writing.`,
    },
  ];
  return [...s.faqs, ...generated];
}
