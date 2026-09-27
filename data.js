/**
 * Single source of truth for the Super Bowl LXI site.
 * When news drops (performer, teams, kickoff), update HERE.
 * status: "confirmed" | "tba"
 */
window.SB = {
  event: {
    officialName: "Super Bowl LXI",
    shortName: "LXI",
    number: 61,
    season: "2026",
    dateLabel: "Sunday, February 14, 2027",
    kickoffISO: "2027-02-14T15:30:00-08:00",
    kickoffNote: "Kickoff scheduled for 3:30 p.m. PT / 6:30 p.m. ET. Time still to be confirmed by the NFL.",
    city: "Los Angeles",
    tagline: "The first Super Bowl on Valentine’s Day.",
  },

  venue: {
    name: "SoFi Stadium",
    city: "Inglewood, California",
    address: "1001 S. Stadium Drive, Inglewood, CA 90301",
    capacity: "≈ 70,240 seats, expandable toward 100,000",
    tenants: "Los Angeles Rams & Los Angeles Chargers",
    previousSuperBowl: "Super Bowl LVI (2022) — Rams 23–20 Bengals",
    hostCount: "9th Super Bowl in Greater Los Angeles",
  },

  landing: {
    teams: ["TBA", "TBA"],
    performer: "TBA",
    status: "Tickets available",
    disclaimer: "Independent ticket marketplace. Not the official NFL or Super Bowl website.",
    faq: [
      { q: "When will the participating teams be announced?", a: "After the conference championships in late January 2027. Until then the matchup reads TBA vs TBA — your seats do not wait on the logos." },
      { q: "How do I choose my seats?", a: "Pick a category and section on the map, choose a quantity, add to cart. Seats are side by side — no row picking." },
      { q: "When will ticket prices be available?", a: "Early-access listings are live now on this page. Prices vary by section and category, and they can move." },
      { q: "Are prices guaranteed?", a: "The price you see when you add to cart is the price you check out at, for that hold window. Listings you have not reserved can change." },
      { q: "How are tickets delivered?", a: "E-tickets land in your inbox as soon as checkout clears. Unique QR, your name on the pass." },
      { q: "Can I purchase multiple tickets?", a: "Yes — up to six per listing, side by side guaranteed." },
      { q: "What payment methods are supported?", a: "Visa, Mastercard, American Express, Apple Pay, and Google Pay at checkout on this site." },
      { q: "How does customer support work?", a: "Use Contact Us in the footer. A person answers. You are not chasing a stranger named Steve." },
    ],
  },

  featured: [
    {
      rank: 1, slug: "lions-bills", match: "Lions @ Bills",
      away: "DET", home: "BUF", awayName: "Detroit Lions", homeName: "Buffalo Bills",
      date: "2026-09-17", time: "8:15 p.m.", venue: "Highmark Stadium", stadium: "highmark",
      location: "Buffalo", city: "Orchard Park, New York", type: "Hottest", demand: 5, ticket: 615,
    },
    {
      rank: 2, slug: "cowboys-packers", match: "Cowboys @ Packers",
      away: "DAL", home: "GB", awayName: "Dallas Cowboys", homeName: "Green Bay Packers",
      date: "2026-10-18", time: "4:25 p.m.", venue: "Lambeau Field", stadium: "lambeau",
      location: "Green Bay", city: "Green Bay, Wisconsin", type: "Hottest", demand: 5, ticket: 550,
    },
    {
      rank: 3, slug: "steelers-saints-paris", match: "Steelers vs Saints",
      away: "PIT", home: "NO", awayName: "Pittsburgh Steelers", homeName: "New Orleans Saints",
      date: "2026-10-25", time: "2:30 p.m.", venue: "Paris La Défense Arena", stadium: "paris",
      location: "Paris", city: "Paris, France", type: "Paris", demand: 5, ticket: 475,
    },
    {
      rank: 4, slug: "eagles-cowboys-thanksgiving", match: "Eagles @ Cowboys",
      away: "PHI", home: "DAL", awayName: "Philadelphia Eagles", homeName: "Dallas Cowboys",
      date: "2026-11-26", time: "3:30 p.m.", venue: "AT&T Stadium", stadium: "att",
      location: "Dallas", city: "Arlington, Texas", type: "Thanksgiving", demand: 5, ticket: 490,
    },
    {
      rank: 5, slug: "chiefs-bills-thanksgiving", match: "Chiefs @ Bills",
      away: "KC", home: "BUF", awayName: "Kansas City Chiefs", homeName: "Buffalo Bills",
      date: "2026-11-26", time: "8:20 p.m.", venue: "Highmark Stadium", stadium: "highmark",
      location: "Buffalo", city: "Orchard Park, New York", type: "Thanksgiving", demand: 5, ticket: 525,
    },
    {
      rank: 6, slug: "packers-bears-christmas", match: "Packers @ Bears",
      away: "GB", home: "CHI", awayName: "Green Bay Packers", homeName: "Chicago Bears",
      date: "2026-12-25", time: "3:00 p.m.", venue: "Soldier Field", stadium: "soldier",
      location: "Chicago", city: "Chicago, Illinois", type: "Christmas Day", demand: 5, ticket: 410,
    },
    {
      rank: 7, slug: "rams-seahawks-christmas", match: "Rams @ Seahawks",
      away: "LAR", home: "SEA", awayName: "Los Angeles Rams", homeName: "Seattle Seahawks",
      date: "2026-12-25", time: "7:15 p.m.", venue: "Lumen Field", stadium: "lumen",
      location: "Seattle", city: "Seattle, Washington", type: "Christmas", demand: 5, ticket: 390,
    },
    {
      rank: 8, slug: "cowboys-seahawks", match: "Cowboys @ Seahawks",
      away: "DAL", home: "SEA", awayName: "Dallas Cowboys", homeName: "Seattle Seahawks",
      date: "2026-12-07", time: "8:15 p.m.", venue: "Lumen Field", stadium: "lumen",
      location: "Seattle", city: "Seattle, Washington", type: "Primetime", demand: 5, ticket: 360,
    },
    {
      rank: 9, slug: "49ers-cowboys", match: "49ers @ Cowboys",
      away: "SF", home: "DAL", awayName: "San Francisco 49ers", homeName: "Dallas Cowboys",
      date: "2026-11-15", time: "4:25 p.m.", venue: "AT&T Stadium", stadium: "att",
      location: "Dallas", city: "Arlington, Texas", type: "Hottest", demand: 5, ticket: 425,
    },
    {
      rank: 10, slug: "vikings-49ers-mexico", match: "Vikings vs 49ers",
      away: "MIN", home: "SF", awayName: "Minnesota Vikings", homeName: "San Francisco 49ers",
      date: "2026-11-22", time: "3:00 p.m.", venue: "Estadio Azteca", stadium: "azteca",
      location: "Mexico City", city: "Mexico City, Mexico", type: "Mexico City", demand: 5, ticket: 350,
    },
    {
      rank: 11, slug: "bengals-falcons-madrid", match: "Bengals vs Falcons",
      away: "CIN", home: "ATL", awayName: "Cincinnati Bengals", homeName: "Atlanta Falcons",
      date: "2026-11-08", time: "2:30 p.m.", venue: "Santiago Bernabéu", stadium: "bernabeu",
      location: "Madrid", city: "Madrid, Spain", type: "Madrid", demand: 4, ticket: 310,
    },
    {
      rank: 12, slug: "patriots-lions-munich", match: "Patriots vs Lions",
      away: "NE", home: "DET", awayName: "New England Patriots", homeName: "Detroit Lions",
      date: "2026-11-15", time: "9:30 a.m.", venue: "Allianz Arena", stadium: "allianz",
      location: "Munich", city: "Munich, Germany", type: "Munich", demand: 4, ticket: 320,
    },
    {
      rank: 13, slug: "packers-rams-thanksgiving-eve", match: "Packers @ Rams",
      away: "GB", home: "LAR", awayName: "Green Bay Packers", homeName: "Los Angeles Rams",
      date: "2026-11-25", time: "5:00 p.m.", venue: "SoFi Stadium", stadium: "sofi",
      location: "Los Angeles", city: "Inglewood, California", type: "Thanksgiving Eve", demand: 4, ticket: 340,
    },
    {
      rank: 14, slug: "bills-packers", match: "Bills @ Packers",
      away: "BUF", home: "GB", awayName: "Buffalo Bills", homeName: "Green Bay Packers",
      date: "2026-12-13", time: "4:25 p.m.", venue: "Lambeau Field", stadium: "lambeau",
      location: "Green Bay", city: "Green Bay, Wisconsin", type: "High-demand", demand: 4, ticket: 350,
    },
    {
      rank: 15, slug: "chiefs-rams", match: "Chiefs @ Rams",
      away: "KC", home: "LAR", awayName: "Kansas City Chiefs", homeName: "Los Angeles Rams",
      date: "2026-12-03", time: "8:15 p.m.", venue: "SoFi Stadium", stadium: "sofi",
      location: "Los Angeles", city: "Inglewood, California", type: "High-demand", demand: 4, ticket: 330,
    },
    {
      rank: 16, slug: "bills-broncos-christmas", match: "Bills @ Broncos",
      away: "BUF", home: "DEN", awayName: "Buffalo Bills", homeName: "Denver Broncos",
      date: "2026-12-25", time: "1:00 p.m.", venue: "Empower Field at Mile High", stadium: "empower",
      location: "Denver", city: "Denver, Colorado", type: "Christmas", demand: 4, ticket: 320,
    },
    {
      rank: 17, slug: "eagles-jaguars-london", match: "Eagles vs Jaguars",
      away: "PHI", home: "JAX", awayName: "Philadelphia Eagles", homeName: "Jacksonville Jaguars",
      date: "2026-10-11", time: "9:30 a.m.", venue: "Wembley Stadium", stadium: "wembley",
      location: "London", city: "London, England", type: "London", demand: 4, ticket: 290,
    },
    {
      rank: 18, slug: "ravens-bills", match: "Ravens @ Bills",
      away: "BAL", home: "BUF", awayName: "Baltimore Ravens", homeName: "Buffalo Bills",
      date: "2026-11-01", time: "8:20 p.m.", venue: "Highmark Stadium", stadium: "highmark",
      location: "Buffalo", city: "Orchard Park, New York", type: "High-demand", demand: 4, ticket: 360,
    },
    {
      rank: 19, slug: "eagles-bears", match: "Eagles @ Bears",
      away: "PHI", home: "CHI", awayName: "Philadelphia Eagles", homeName: "Chicago Bears",
      date: "2026-09-28", time: "8:15 p.m.", venue: "Soldier Field", stadium: "soldier",
      location: "Chicago", city: "Chicago, Illinois", type: "High-demand", demand: 4, ticket: 325,
    },
    {
      rank: 20, slug: "chiefs-raiders", match: "Chiefs @ Raiders",
      away: "KC", home: "LV", awayName: "Kansas City Chiefs", homeName: "Las Vegas Raiders",
      date: "2026-10-04", time: "4:25 p.m.", venue: "Allegiant Stadium", stadium: "allegiant",
      location: "Las Vegas", city: "Las Vegas, Nevada", type: "Rising", demand: 3, ticket: 210,
    },
  ],

  bowl: {
    rank: 61,
    slug: "super-bowl-lxi",
    kind: "superbowl",
    match: "Super Bowl LXI",
    away: "AFC",
    home: "NFC",
    awayName: "AFC Champion",
    homeName: "NFC Champion",
    date: "2027-02-14",
    time: "3:30 p.m.",
    venue: "SoFi Stadium",
    stadium: "sofi",
    location: "Los Angeles",
    city: "Inglewood, California",
    type: "Early access",
    demand: 5,
    ticket: 4250,
  },

  known: [
    {
      label: "Date",
      value: "February 14, 2027",
      detail: "Valentine’s Day — a first",
    },
    {
      label: "Venue",
      value: "SoFi Stadium",
      detail: "Inglewood · Los Angeles",
    },
    {
      label: "U.S. TV",
      value: "ESPN + ABC",
      detail: "ESPN’s first Super Bowl",
    },
    {
      label: "International",
      value: "beIN SPORTS",
      detail: "Also slated for L’Équipe in France",
    },
  ],

  upcoming: [
    {
      id: "halftime",
      title: "Apple Music Halftime Show",
      when: "Announcement expected between late September and November 2026",
      note: "Bad Bunny was revealed in September for 2026. Nothing is official until the NFL, Apple Music, and the artist announce together.",
    },
    {
      id: "teams",
      title: "The two finalists",
      when: "After the conference championships · late January 2027",
      note: "AFC vs NFC. Current odds (Seahawks, Rams, Bills…) are not a prediction.",
    },
    {
      id: "tickets",
      title: "Public tickets",
      when: "Early access is open here now",
      note: "The NFL’s own public drop comes later. These seats are on sale on this site — pick a section, stay together, check out here.",
    },
    {
      id: "pregame",
      title: "Anthem, ceremony, Super Bowl Week",
      when: "Details through winter 2026–2027",
      note: "NFL Honors, Super Bowl Experience, Opening Night: the LA host committee will publish the calendar.",
    },
  ],

  watch: {
    france: [
      { name: "beIN SPORTS", detail: "Longtime NFL home in France — Super Bowl LXI announced" },
      { name: "L’Équipe", detail: "Free-to-air coverage expected" },
      { name: "NFL Game Pass", detail: "Game in original English" },
    ],
    usa: [
      { name: "ESPN + ABC", detail: "Simulcast — Joe Buck & Troy Aikman" },
      { name: "ESPN App / Disney+", detail: "Streaming + ManningCast alternate" },
    ],
  },

  timeline: [
    { date: "December 2023", title: "Site confirmed", text: "NFL owners vote SoFi Stadium to host Super Bowl LXI." },
    { date: "February 2026", title: "Handoff to Los Angeles", text: "The LA host committee formally takes over the event." },
    { date: "Fall 2026", title: "Halftime Show", text: "Usual window for the headliner announcement.", status: "tba" },
    { date: "January 2027", title: "NFL playoffs", text: "The field narrows through the conference championships." },
    { date: "Late January 2027", title: "Matchup set", text: "The two Super Bowl clubs are official.", status: "tba" },
    { date: "February 14, 2027", title: "Super Bowl LXI", text: "SoFi Stadium · Inglewood.", status: "next" },
  ],

  intrigue: {
    kicker: "The story · Super Bowl LXI",
    title: "The house, the wounded champion, a February 14.",
    lead: "We don’t know the two finalists yet. We already know the stage — and the season’s first chapter changed everything.",
    chapters: [
      {
        title: "Wednesday, September 9 · Seattle",
        text: "The Seahawks raise the Super Bowl LX banner. Ten minutes later, Sam Darnold is out with a hip injury. Drew Lock, three interceptions of Drake Maye, and a field goal: Seattle beats New England 13–10, a rematch of the last final. The champion starts the road to Los Angeles already patched up.",
      },
      {
        title: "Friday, September 11 · Melbourne Cricket Ground",
        text: "Fifteen thousand kilometers away at the MCG, the Rams — who will host Super Bowl LXI in their own stadium — get run over 27–7 by San Francisco. SoFi is their house. In February, it belongs to the NFL. If they want it back, seventeen games remain, then January.",
      },
      {
        title: "Between those two nights and Valentine’s Day",
        text: "270 games still to play. Nine international matchups, including Paris (Steelers–Saints, October 25). A Thanksgiving Eve in Los Angeles. Conference championship rematches: Denver at New England (Week 17), Rams vs Seattle (Weeks 16 and 18). Then six Wild Cards, four Divisional games, two conference titles.",
      },
      {
        title: "Sunday, February 14 · Inglewood",
        text: "First Super Bowl on February 14. First Super Bowl on ESPN. Ninth in Greater Los Angeles. Nobody knows who walks out of the tunnel. Everybody knows the date. AFC vs NFC, under the SoFi roof, for the Vince Lombardi Trophy.",
      },
    ],
  },

  faq: [
    {
      q: "How fast do the tickets land?",
      a: "The second checkout clears. E-tickets in your inbox, QR ready. No 'we'll email you later.' No waiting on a reseller to wake up.",
    },
    {
      q: "Will my crew sit together?",
      a: "That's the deal. Side-by-side seats, even for big groups. We don't split the party across the stadium.",
    },
    {
      q: "What if I tap the wrong section?",
      a: "Don't guess. Colored sections on the map have tickets. Click the section, pick your quantity — seats are side by side. If it's dark, it's not for sale here.",
    },
    {
      q: "Can I buy Super Bowl LXI itself yet?",
      a: "Yes — early access is open on the Super Bowl tab. The two finalists aren't named yet. Your seats are. The NFL's public drop still comes later.",
    },
    {
      q: "What if my Sunday explodes?",
      a: "Once you pay, the tickets are yours: your name, unique QR, in your inbox. Plans blow up? Hit us before kickoff and we'll move what we can. You're not chasing a stranger named Steve.",
    },
    {
      q: "Will I be watching this in the rain?",
      a: "Not the Super Bowl. SoFi has a roof. On the road: Green Bay in December is a personality test. Paris, London, Madrid — jacket, not an ark. Check the city, then check the fit.",
    },
  ],
};
