(function () {
  const data = window.SB;
  if (!data) return;

  const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const QTY_OPTIONS = [0, 2, 3, 4, 6];
  const QTY_MAX = 6;
  const TEAM_COLORS = {
    ARI: { primary: "#97233f", secondary: "#000000" },
    ATL: { primary: "#a71930", secondary: "#000000" },
    BAL: { primary: "#241773", secondary: "#000000" },
    BUF: { primary: "#00338d", secondary: "#c60c30" },
    CAR: { primary: "#0085ca", secondary: "#101820" },
    CHI: { primary: "#0b162a", secondary: "#c83803" },
    CIN: { primary: "#fb4f14", secondary: "#000000" },
    CLE: { primary: "#311d00", secondary: "#ff3c00" },
    DAL: { primary: "#003594", secondary: "#869397" },
    DEN: { primary: "#fb4f14", secondary: "#002244" },
    DET: { primary: "#0076b6", secondary: "#b0b7bc" },
    GB: { primary: "#203731", secondary: "#ffb612" },
    HOU: { primary: "#03202f", secondary: "#a71930" },
    IND: { primary: "#002c5f", secondary: "#a2aaad" },
    JAX: { primary: "#006778", secondary: "#d7a22a" },
    KC: { primary: "#e31837", secondary: "#ffb81c" },
    LAC: { primary: "#0080c6", secondary: "#ffc20e" },
    LAR: { primary: "#003594", secondary: "#ffa300" },
    LV: { primary: "#000000", secondary: "#a5acaf" },
    MIA: { primary: "#008e97", secondary: "#fc4c02" },
    MIN: { primary: "#4f2683", secondary: "#ffc62f" },
    NE: { primary: "#002244", secondary: "#c60c30" },
    NO: { primary: "#101820", secondary: "#d3bc8d" },
    NYG: { primary: "#0b2265", secondary: "#a71930" },
    NYJ: { primary: "#125740", secondary: "#000000" },
    PHI: { primary: "#004c54", secondary: "#a5acaf" },
    PIT: { primary: "#101820", secondary: "#ffb612" },
    SEA: { primary: "#002244", secondary: "#69be28" },
    SF: { primary: "#aa0000", secondary: "#b3995d" },
    TB: { primary: "#d50a0a", secondary: "#ff7900" },
    TEN: { primary: "#0c2340", secondary: "#4b92db" },
    WAS: { primary: "#5a1414", secondary: "#ffb612" },
    BOWL: { primary: "#0b1f4a", secondary: "#d4c4a0" },
  };
  const PRICE_OPTIONS = [
    { id: "any", label: "Any price" },
    { id: "under500", label: "Under $500" },
    { id: "500-900", label: "$500 – $900" },
    { id: "900plus", label: "$900+" },
  ];
  const BOWL_OFFERS = [
    {
      id: "bowl-early-access",
      tier: "early",
      badge: "Early access",
      vibe: "First in line",
      title: "Early Access Ticket",
      blurb: "Upper bowl energy. Lock a seat before the logos hit the poster.",
      perks: [
        { icon: "seats", text: "Upper 300s category" },
        { icon: "together", text: "Side-by-side seats" },
        { icon: "ticket", text: "Instant e-ticket" },
      ],
      section: "300s",
      row: "EA",
      zone: "Early access · Upper",
      price: 1680,
      maxQty: 6,
      image: "/assets/bowl/pkg-early.jpg?v=2",
      accent: "#2ee6c5",
    },
    {
      id: "bowl-insured-pass",
      tier: "insured",
      badge: "Insured pass",
      vibe: "Sunday, covered",
      title: "Assured Event Pass",
      blurb: "Same game, plus a safety net. Plans explode? We rebook or refund before kickoff.",
      perks: [
        { icon: "shield", text: "Guaranteed fulfillment" },
        { icon: "refresh", text: "Change-of-plans cover" },
        { icon: "support", text: "Priority support" },
      ],
      section: "PASS",
      row: "INS",
      zone: "Insured event pass",
      price: 1925,
      maxQty: 6,
      image: "/assets/bowl/pkg-insured.jpg?v=2",
      accent: "#ffc857",
      featured: true,
    },
    {
      id: "bowl-club-mid",
      tier: "mid",
      badge: "Hospitality",
      vibe: "Club altitude",
      title: "Club Midfield",
      blurb: "Stadium club access, lounge energy, and all-inclusive hospitality — the full game-day lane.",
      perks: [
        { icon: "lounge", text: "Club lounge & midfield views" },
        { icon: "hospitality", text: "All-inclusive hospitality" },
        { icon: "plaza", text: "Outdoor plaza + bar access" },
        { icon: "ticket", text: "Official game ticket included" },
      ],
      section: "200s",
      row: "CL",
      zone: "Club · Intermediate",
      price: 3450,
      maxQty: 6,
      image: "/assets/bowl/pkg-club.jpg?v=2",
      video: "/assets/bowl/pkg-club-mobile.mp4",
      partnerLogo: "/assets/brand/on-location.png",
      accent: "#ff7a45",
      contactOnly: true,
    },
  ];

  const BOWL_HOSP = [
    {
      id: "hosp-touchdown",
      title: "Touchdown Club",
      blurb: "Pregame hospitality to kick off Super Bowl Sunday.",
      badge: "Choose Your Exact Seat",
      badgeTone: "seat",
      perks: [
        "Official Super Bowl LXI Game Ticket",
        "Pregame: All-Inclusive Outdoor Hospitality",
        "Elevated Tailgate Fare with Open Beer & Wine",
        "Live Musical Entertainment",
        "NFL Legend Appearances",
      ],
      moreLabel: "MORE DETAILS (+2)",
      price: 2680,
      priceLabel: "Starting at",
      cta: "view",
      ctaLabel: "View Package",
      image: "/assets/bowl/hosp-touchdown.jpg?v=2",
      plans: true,
    },
    {
      id: "hosp-champions-premier",
      title: "Champions Club Premier",
      blurb: "Premium hospitality before and during the game, plus a weekend event.",
      badge: "Choose Your Exact Seat",
      badgeTone: "seat",
      perks: [
        "Official Super Bowl LXI Game Ticket",
        "Weekend: Super Bowl LXI Studio 61 Access Pass (Friday OR Saturday)*",
        "Pregame: All-Inclusive Outdoor Hospitality",
        "In-Game: In-Stadium, Club-Level Hospitality",
        "Live Musical Entertainment",
      ],
      moreLabel: "MORE DETAILS (+2)",
      price: 6300,
      priceLabel: "Starting at",
      cta: "view",
      ctaLabel: "View Package",
      image: "/assets/bowl/hosp-champions-premier.jpg?v=2",
      plans: true,
    },
    {
      id: "hosp-club67",
      title: "Club 67",
      blurb: "Upscale gameday hospitality and a weekend of premium entertainment.",
      badge: "Almost Gone",
      badgeTone: "hot",
      perks: [
        "Official Super Bowl LXI Game Ticket",
        "Pregame & In-Game: All-Inclusive, In-Stadium, Club-Level Hospitality",
        "Gourmet Food Stations & Top-Shelf Cocktails",
        "Weekend: Super Bowl LXI Studio 61 Access Pass (Friday OR Saturday)*",
      ],
      price: null,
      cta: "call",
      ctaLabel: "Call 888-408-8715",
      ctaHref: "tel:8884088715",
      image: "/assets/bowl/hosp-club67.jpg?v=2",
      plans: true,
    },
    {
      id: "hosp-on-the-fifty",
      title: "On the Fifty",
      blurb: "Unmatched access before, during and, after the game, plus a VIP weekend event.",
      badge: "Almost Gone",
      badgeTone: "hot",
      perks: [
        "Official Super Bowl LXI Game Ticket",
        "Weekend: Super Bowl LXI Studio 61 VIP Experience (Friday OR Saturday)*",
        "Pregame: All-Inclusive, Open Air Hospitality",
        "In-Game: Field-Level Hospitality",
        "Postgame: On-Field Celebration & Extended Hospitality",
      ],
      moreLabel: "MORE DETAILS (+2)",
      price: null,
      cta: "call",
      ctaLabel: "Call 888-408-8715",
      ctaHref: "tel:8884088715",
      image: "/assets/bowl/hosp-on-the-fifty.jpg?v=2",
      plans: true,
    },
    {
      id: "hosp-champions-club",
      title: "Champions Club",
      blurb: "",
      badge: null,
      badgeTone: "sold",
      perks: [],
      price: null,
      cta: "sold",
      ctaLabel: "Sold Out",
      image: "/assets/bowl/hosp-champions-club.jpg?v=2",
      plans: false,
      soldOut: true,
      soldNote: "This item has been sold out and is no longer available",
    },
  ];
  const CART_KEY = "lxi_cart";
  const HOLD_KEY = "lxi_cart_deadline";
  const ORDER_KEY = "lxi_last_order";
  const HOLD_MS = 10 * 60 * 1000;
  const CART_EVENT = "lxi-cart-update";
  const VENUE_PHOTOS = {
    highmark: "/assets/venues/highmark.jpg",
    lambeau: "/assets/venues/lambeau.jpg",
    paris: "/assets/venues/paris.jpg",
    att: "/assets/venues/att.jpg",
    soldier: "/assets/venues/soldier.jpg",
    lumen: "/assets/venues/lumen.jpg",
    azteca: "/assets/venues/azteca.jpg",
    bernabeu: "/assets/venues/bernabeu.jpg",
    allianz: "/assets/venues/allianz.jpg",
    sofi: "/assets/venues/sofi.jpg",
    empower: "/assets/venues/empower.jpg",
    wembley: "/assets/venues/wembley.jpg",
    allegiant: "/assets/venues/allegiant.jpg",
  };
  const COUNTRIES = [
    ["US", "United States"],
    ["CA", "Canada"],
    ["GB", "United Kingdom"],
    ["FR", "France"],
    ["DE", "Germany"],
    ["ES", "Spain"],
    ["IT", "Italy"],
    ["BE", "Belgium"],
    ["CH", "Switzerland"],
    ["AU", "Australia"],
    ["MX", "Mexico"],
  ];

  const state = {
    query: "",
    page: "home",
    slug: null,
    qty: 0,
    price: "any",
    section: "",
    category: "",
    openId: null,
    addQty: 1,
    addingId: null,
    checkoutError: "",
    paying: false,
    payMethod: "card", // card | applepay | googlepay (Portinax-style)
    hospOpenId: null,
  };
  let lastSlug = undefined;

  const kickoff = new Date(data.event.kickoffISO);
  const ids = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    minutes: document.getElementById("cd-minutes"),
    seconds: document.getElementById("cd-seconds"),
  };
  const lxIds = {
    days: document.getElementById("lx-days"),
    hours: document.getElementById("lx-hours"),
    minutes: document.getElementById("lx-minutes"),
    seconds: document.getElementById("lx-seconds"),
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function setCount(el, value, wide) {
    if (!el) return;
    const next = wide ? String(value) : pad(value);
    if (el.textContent === next) return;
    el.textContent = next;
    const cell = el.parentElement;
    if (!cell) return;
    cell.classList.remove("is-flip");
    void cell.offsetWidth;
    cell.classList.add("is-flip");
  }

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, kickoff.getTime() - now);
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);
    setCount(ids.days, days, true);
    setCount(ids.hours, hours);
    setCount(ids.minutes, minutes);
    setCount(ids.seconds, seconds);
    if (data.event.kickoffISO) {
      setCount(lxIds.days, days, true);
      setCount(lxIds.hours, hours);
      setCount(lxIds.minutes, minutes);
      setCount(lxIds.seconds, seconds);
    }
  }

  tick();
  setInterval(tick, 1000);

  function money(n) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function parseDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function timeMinutes(t) {
    const m = String(t || "").match(/(\d+):(\d+)\s*(a\.m\.|p\.m\.)/i);
    if (!m) return 0;
    let h = Number(m[1]) % 12;
    if (/p/i.test(m[3])) h += 12;
    return h * 60 + Number(m[2]);
  }

  function weekday(iso) {
    return parseDate(iso).toLocaleDateString("en-US", { weekday: "short" });
  }

  function formatLong(iso, time) {
    const dt = parseDate(iso);
    const day = dt.toLocaleDateString("en-US", { weekday: "short" });
    return `${day} ${MONTHS_SHORT[dt.getMonth()]} ${dt.getDate()} at ${time.replace(" p.m.", "").replace(" a.m.", "")}`;
  }

  function seeded(n) {
    let x = (n * 9301 + 49297) >>> 0;
    return function rand() {
      x = (x * 1664525 + 1013904223) >>> 0;
      return x / 4294967296;
    };
  }

  function rowLabels(seat) {
    if (seat.rowKind === "letter") {
      return Array.from({ length: seat.rows }, (_, i) => String.fromCharCode(65 + i));
    }
    return Array.from({ length: seat.rows }, (_, i) => String(i + 1));
  }

  function rowIndex(row) {
    if (/^\d+$/.test(row)) return Number(row);
    let n = 0;
    for (const ch of String(row)) n = n * 26 + (ch.toUpperCase().charCodeAt(0) - 64);
    return n;
  }

  function sectionSort(a, b) {
    const as = String(a.section);
    const bs = String(b.section);
    const ap = as.replace(/\d+/g, "").trim();
    const bp = bs.replace(/\d+/g, "").trim();
    if (ap !== bp) return ap.localeCompare(bp);
    const an = Number((as.match(/\d+/) || ["0"])[0]);
    const bn = Number((bs.match(/\d+/) || ["0"])[0]);
    if (an !== bn) return an - bn;
    return rowIndex(a.row) - rowIndex(b.row);
  }

  function stadiumFor(game) {
    return (window.SB_STADIUMS && window.SB_STADIUMS[game.stadium]) || null;
  }

  function listingsFor(game) {
    const stadium = stadiumFor(game);
    if (!stadium) return [];
    const rand = seeded(game.rank * 97);
    const listings = [];
    stadium.sections.forEach((seat) => {
      if (!seat.listed) return;
      const base = Math.round(game.ticket * seat.mult);
      const price = Math.max(45, Math.round(base / 5) * 5);
      listings.push({
        id: `${game.slug}-${seat.id}`,
        section: seat.id,
        row: "T",
        zone: seat.zone,
        qty: QTY_MAX,
        instant: rand() > 0.35,
        deal: rand() > 0.55 ? "amazing" : "great",
        price,
      });
    });
    return ensureCategoryListings(game, listings).sort(sectionSort);
  }

  function gameBySlug(slug) {
    if (data.bowl && data.bowl.slug === slug) return data.bowl;
    return data.featured.find((g) => g.slug === slug);
  }

  function isBowl(game) {
    return !!(game && game.kind === "superbowl");
  }

  function gameTitle(game) {
    return isBowl(game) ? data.event.officialName : `${game.awayName} at ${game.homeName}`;
  }

  function gameHref(game) {
    return isBowl(game) ? "#superbowl" : `#event/${game.slug}`;
  }

  function priceOptionsFor(game) {
    return isBowl(game) ? BOWL_PRICE_OPTIONS : PRICE_OPTIONS;
  }

  function shopEls() {
    const bowl = state.page === "superbowl";
    return {
      filter: document.getElementById(bowl ? "bowl-filter-bar" : "filter-bar"),
      list: document.getElementById(bowl ? "bowl-listing-list" : "listing-list"),
      meta: document.getElementById(bowl ? "bowl-listing-meta" : "listing-meta"),
      banner: document.getElementById(bowl ? "bowl-banner" : "event-banner"),
      mapTitle: document.getElementById(bowl ? "bowl-map-title" : "map-title"),
      map: document.getElementById(bowl ? "bowl-stadium-map" : "stadium-map"),
      pins: document.getElementById(bowl ? "bowl-map-pins" : "map-pins"),
    };
  }

  function activeGame() {
    if (state.page === "superbowl") return data.bowl;
    return gameBySlug(state.slug);
  }

  function refreshShop() {
    if (state.page === "superbowl") renderSuperbowl();
    else if (state.page === "event") renderEvent();
  }

  function readCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const items = raw ? JSON.parse(raw) : [];
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
  }

  function readDeadline() {
    const t = Number(localStorage.getItem(HOLD_KEY));
    return Number.isFinite(t) ? t : null;
  }

  function cartCount(items) {
    return items.reduce((n, i) => n + i.qty, 0);
  }

  function cartTotal(items) {
    return items.reduce((n, i) => n + i.qty * i.price, 0);
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(HOLD_KEY);
    window.dispatchEvent(new Event(CART_EVENT));
  }

  function addToCart(item) {
    const items = readCart();
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
      existing.qty = Math.min(existing.qty + item.qty, existing.maxQty, QTY_MAX);
    } else {
      items.push(item);
    }
    if (!localStorage.getItem(HOLD_KEY)) {
      localStorage.setItem(HOLD_KEY, String(Date.now() + HOLD_MS));
    }
    writeCart(items);
  }

  function setCartQty(id, qty) {
    const items = readCart()
      .map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, i.maxQty, QTY_MAX)) } : i
      )
      .filter((i) => i.qty > 0);
    if (!items.length) localStorage.removeItem(HOLD_KEY);
    writeCart(items);
  }

  function removeCartLine(id) {
    const items = readCart().filter((i) => i.id !== id);
    if (!items.length) localStorage.removeItem(HOLD_KEY);
    writeCart(items);
  }

  function updateCartBadge() {
    const n = cartCount(readCart());
    const badge = document.getElementById("cart-badge");
    const link = document.getElementById("cart-link");
    if (badge) {
      badge.textContent = String(n);
      badge.classList.toggle("is-empty", n === 0);
    }
    if (link) link.setAttribute("aria-label", `Cart, ${n} ticket${n === 1 ? "" : "s"}`);
  }

  function formatHold(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
  }

  function defaultAddQty(row) {
    const max = Math.min(row.qty, QTY_MAX);
    if (state.qty && state.qty <= max) return state.qty;
    return Math.min(1, max);
  }

  const confirmed = document.getElementById("confirmed-list");
  if (confirmed) {
    confirmed.innerHTML = [
      ["Date", data.event.dateLabel],
      ["Stadium", `${data.venue.name} · ${data.venue.city}`],
      ["Capacity", data.venue.capacity],
      ["Home teams", data.venue.tenants],
      ["Last Super Bowl here", data.venue.previousSuperBowl],
      ["U.S. TV", "ESPN + ABC (Joe Buck & Troy Aikman)"],
    ]
      .map(([k, v]) => `<li><b>${k}</b><span>${v}</span></li>`)
      .join("");
  }

  const upcoming = document.getElementById("upcoming-list");
  if (upcoming) {
    upcoming.innerHTML = data.upcoming
      .map(
        (item) => `
        <article class="tba-item">
          <div class="when">${item.when}</div>
          <h3>${item.title}</h3>
          <p>${item.note}</p>
        </article>`
      )
      .join("");
  }

  const watchFr = document.getElementById("watch-fr");
  const watchUs = document.getElementById("watch-us");
  if (watchFr) {
    watchFr.innerHTML = data.watch.france
      .map((item) => `<li><b>${item.name}</b><span>${item.detail}</span></li>`)
      .join("");
  }
  if (watchUs) {
    watchUs.innerHTML = data.watch.usa
      .map((item) => `<li><b>${item.name}</b><span>${item.detail}</span></li>`)
      .join("");
  }

  const timeline = document.getElementById("timeline");
  if (timeline) {
    timeline.innerHTML = data.timeline
      .map((item) => {
        const cls = item.status === "tba" ? "tba" : item.status === "next" ? "next" : "";
        return `
          <article class="tl-item ${cls}">
            <div class="date">${item.date}</div>
            <div>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>
          </article>`;
      })
      .join("");
  }

  const faq = document.getElementById("faq-list");
  const faqBoard = document.querySelector(".faq-board");

  function pinFaqMedia() {
    if (!faqBoard || faqBoard.querySelector(".faq-item.is-open")) return;
    const height = faqBoard.offsetHeight;
    if (height < 40) return;
    faqBoard.style.setProperty("--faq-media-h", `${height}px`);
  }

  if (faq) {
    faq.innerHTML = data.faq
      .map(
        (item, i) => `
        <div class="faq-item">
          <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
            <span>${item.q}</span>
            <span class="faq-icon" aria-hidden="true"></span>
          </button>
          <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
            <div class="faq-a-inner">
              <p>${item.a}</p>
            </div>
          </div>
        </div>`
      )
      .join("");
    faq.addEventListener("click", (event) => {
      const btn = event.target.closest(".faq-q");
      if (!btn || !faq.contains(btn)) return;
      const item = btn.closest(".faq-item");
      const open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) pinFaqMedia();
    });
    requestAnimationFrame(pinFaqMedia);
    window.addEventListener("resize", pinFaqMedia);
  }

  const lxFaq = document.getElementById("lx-faq-list");
  if (lxFaq && data.landing && data.landing.faq) {
    lxFaq.innerHTML = data.landing.faq
      .map(
        (item, i) => `
        <div class="faq-item">
          <button class="faq-q" type="button" aria-expanded="false" aria-controls="lx-faq-a-${i}" id="lx-faq-q-${i}">
            <span>${item.q}</span>
            <span class="faq-icon" aria-hidden="true"></span>
          </button>
          <div class="faq-a" id="lx-faq-a-${i}" role="region" aria-labelledby="lx-faq-q-${i}">
            <div class="faq-a-inner">
              <p>${item.a}</p>
            </div>
          </div>
        </div>`
      )
      .join("");
    lxFaq.addEventListener("click", (event) => {
      const btn = event.target.closest(".faq-q");
      if (!btn || !lxFaq.contains(btn)) return;
      const item = btn.closest(".faq-item");
      const open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const intrigue = data.intrigue;
  const titleEl = document.getElementById("intrigue-title");
  const leadEl = document.getElementById("intrigue-lead");
  const chaptersEl = document.getElementById("intrigue-chapters");
  if (titleEl && intrigue) titleEl.textContent = intrigue.title;
  if (leadEl && intrigue) leadEl.textContent = intrigue.lead;
  if (chaptersEl && intrigue) {
    chaptersEl.innerHTML = intrigue.chapters
      .map(
        (ch) => `
        <article class="card intrigue-card">
          <p class="kicker">${ch.title}</p>
          <p>${ch.text}</p>
        </article>`
      )
      .join("");
  }

  function matchesQuery(g, q) {
    if (!q) return true;
    const hay = [g.match, g.awayName, g.homeName, g.venue, g.location, g.city, g.type].join(" ").toLowerCase();
    return hay.includes(q);
  }

  const STORY_HASHES = new Set(["story", "intrigue"]);
  const BOWL_HASHES = new Set(["superbowl", "bowl-tickets"]);
  const LEGAL_HASHES = {
    terms: { title: "Terms of Use", el: "legal-terms" },
    purchase: { title: "Purchase Policy", el: "legal-purchase" },
    privacy: { title: "Privacy Policy", el: "legal-privacy" },
  };

  function setView(name) {
    const views = {
      home: document.getElementById("view-home"),
      story: document.getElementById("view-story"),
      superbowl: document.getElementById("view-superbowl"),
      event: document.getElementById("view-event"),
      cart: document.getElementById("view-cart"),
      checkout: document.getElementById("view-checkout"),
      order: document.getElementById("view-order"),
      legal: document.getElementById("view-legal"),
    };
    Object.entries(views).forEach(([key, el]) => {
      if (!el) return;
      const on = key === name;
      el.hidden = !on;
      el.inert = !on;
    });
    const searchWrap = document.getElementById("home-search-wrap");
    if (searchWrap) searchWrap.style.display = name === "home" ? "" : "none";
    if (name === "home") requestAnimationFrame(pinFaqMedia);
  }

  function renderLegal(docKey) {
    const meta = LEGAL_HASHES[docKey] || LEGAL_HASHES.terms;
    setView("legal");
    const title = document.getElementById("legal-title");
    if (title) title.textContent = meta.title;
    Object.keys(LEGAL_HASHES).forEach((key) => {
      const article = document.getElementById(LEGAL_HASHES[key].el);
      if (article) article.hidden = key !== docKey;
    });
    document.querySelectorAll(".legal-tabs a").forEach((a) => {
      const on = a.getAttribute("data-legal") === docKey;
      a.setAttribute("aria-current", on ? "page" : "false");
      a.classList.toggle("is-active", on);
    });
    window.scrollTo(0, 0);
  }

  function scrollPageHash() {
    const id = location.hash.replace(/^#/, "");
    if (!id || id === "superbowl" || id === "story") {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }

  function teamLogo(code) {
    return `https://a.espncdn.com/i/teamlogos/nfl/500/${String(code || "").toLowerCase()}.png`;
  }

  function cartGame(item) {
    if (item.kind === "superbowl" || item.slug === "super-bowl-lxi") return data.bowl;
    return (data.featured || []).find((g) => g.slug === item.slug) || null;
  }

  function cartItemImage(item) {
    if (item.kind === "superbowl") {
      const offer = BOWL_OFFERS.find((o) => o.id === item.id || o.id === item.category);
      if (offer && offer.image) return offer.image;
      return "/assets/venues/sofi.jpg";
    }
    const game = cartGame(item);
    if (game && game.stadium && VENUE_PHOTOS[game.stadium]) return VENUE_PHOTOS[game.stadium];
    if (item.image && String(item.image).includes("/venues/")) return item.image;
    if (item.slug && VENUE_PHOTOS[item.slug]) return VENUE_PHOTOS[item.slug];
    return "/assets/venues/sofi.jpg";
  }

  function cartTitleHtml(item) {
    const isBowl = item.kind === "superbowl" || item.away === "BOWL" || item.home === "BOWL";
    if (isBowl) {
      return `
        <div class="pn-matchup pn-matchup--bowl">
          <span class="pn-bowl-mark" aria-hidden="true">
            <img src="/assets/brand/mark-trophy.png?v=137" alt="" width="28" height="32" />
          </span>
          <strong class="pn-bowl-title">${item.title.replace(/^[^·]+·\s*/, "") || item.title}</strong>
        </div>`;
    }
    const game = cartGame(item);
    const awayName = (game && game.awayName) || item.awayName || item.away || "Away";
    const homeName = (game && game.homeName) || item.homeName || item.home || "Home";
    const away = (game && game.away) || item.away;
    const home = (game && game.home) || item.home;
    return `
      <div class="pn-matchup">
        <div class="event-teams pn-event-teams">
          <span class="event-team-name">${awayName}</span>
          <span class="event-logos">
            <img src="${teamLogo(away)}" alt="" width="46" height="46" />
            <span class="event-vs">—</span>
            <img src="${teamLogo(home)}" alt="" width="46" height="46" />
          </span>
          <span class="event-team-name">${homeName}</span>
        </div>
      </div>`;
  }

  function payMarksHtml(extraClass = "") {
    const cls = extraClass ? `pn-pay ${extraClass}` : "pn-pay";
    return `
      <div class="${cls}" aria-label="Accepted payments">
        <span class="pay-visa" aria-label="Visa">VISA</span>
        <span class="pay-mc" aria-label="Mastercard"><i></i><i></i></span>
        <span class="pay-amex" aria-label="American Express"><span>AM</span><span>EX</span></span>
        <span class="pay-apay" aria-label="Apple Pay">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          <em>Pay</em>
        </span>
        <span class="pay-gpay" aria-label="Google Pay">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.35 11.1H12.18v2.96h5.27c-.23 1.22-1.4 3.58-5.27 3.58a5.8 5.8 0 0 1-5.76-5.85 5.8 5.8 0 0 1 5.76-5.85c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.54 3.04 14.4 2 12.18 2 6.97 2 2.77 6.2 2.77 11.4s4.2 9.4 9.41 9.4c5.43 0 9.02-3.81 9.02-9.17 0-.62-.07-1.08-.16-1.53z"/></svg>
          <em>Pay</em>
        </span>
      </div>`;
  }

  function teamColor(code) {
    return TEAM_COLORS[String(code || "").toUpperCase()] || { primary: "#1e3a8a", secondary: "#c4b5a0" };
  }

  function matchPalette(item) {
    if (item.kind === "superbowl" || item.slug === "super-bowl-lxi") {
      const c = teamColor("BOWL");
      return { c1: c.primary, c2: c.secondary, c3: "#172554" };
    }
    const home = teamColor(item.home);
    const away = teamColor(item.away);
    return { c1: home.primary, c2: away.primary, c3: home.secondary };
  }

  function newOrderId() {
    const t = Date.now().toString(36).toUpperCase();
    let r = "";
    if (window.crypto && crypto.getRandomValues) {
      const buf = new Uint8Array(4);
      crypto.getRandomValues(buf);
      r = [...buf].map((b) => b.toString(36).toUpperCase().padStart(2, "0")).join("");
    } else {
      r = Math.random().toString(36).slice(2, 8).toUpperCase();
    }
    return `LXI-${(t + r).replace(/[^A-Z0-9]/g, "").slice(0, 10)}`;
  }

  function ticketCode(orderId, index) {
    return `${orderId}-${String.fromCharCode(65 + (index % 26))}`;
  }

  function barcodeFromCode(code) {
    let h = 2166136261;
    for (let i = 0; i < code.length; i++) {
      h ^= code.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const n = (h >>> 0) % 1e12;
    return String(n).padStart(12, "0");
  }

  function qrPayload(code) {
    return `LXI-TICKET:${code}`;
  }

  function qrSrc(payload) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&margin=8&data=${encodeURIComponent(payload)}`;
  }

  function barcodeCss(digits) {
    const bits = String(digits)
      .split("")
      .map((d) => {
        const n = Number(d);
        return "1".repeat(1 + (n % 3)) + "0".repeat(1 + ((n + 1) % 2));
      })
      .join("");
    const stops = [];
    let pos = 0;
    const unit = 100 / Math.max(bits.length, 1);
    for (const b of bits) {
      const next = pos + unit;
      if (b === "1") stops.push(`#111 ${pos}%`, `#111 ${next}%`);
      else stops.push(`transparent ${pos}%`, `transparent ${next}%`);
      pos = next;
    }
    return `repeating-linear-gradient(90deg, ${stops.join(", ")})`;
  }

  function shortMatchTitle(item) {
    if (item.kind === "superbowl" || item.away === "BOWL") return "Super Bowl LXI";
    if (item.awayName && item.homeName) {
      return `${item.awayName.split(" ").pop()} at ${item.homeName.split(" ").pop()}`;
    }
    return item.title || "Event";
  }

  function expandPasses(order) {
    if (Array.isArray(order.passes) && order.passes.length) {
      return order.passes;
    }
    const passes = [];
    (order.items || []).forEach((item) => {
      const qty = Math.max(1, Number(item.qty) || 1);
      for (let i = 0; i < qty; i++) {
        const n = passes.length;
        const code = ticketCode(order.id, n);
        const barcode = barcodeFromCode(code);
        passes.push({
          ...item,
          passIndex: i + 1,
          passOfGroup: qty,
          passTotal: null,
          holder: i === 0 ? `${order.first} ${order.last}`.trim() : `Guest ${i}`,
          code,
          barcode,
          qrPayload: qrPayload(code),
          personLabel: "1 person",
        });
      }
    });
    passes.forEach((p) => {
      p.passTotal = passes.length;
    });
    return passes;
  }

  function buildOrderPasses(order) {
    const passes = expandPasses({ ...order, passes: null });
    order.passes = passes;
    return passes;
  }

  function confirmTicketHtml(pass, order) {
    const pal = matchPalette(pass);
    const together = pass.passOfGroup > 1;
    const code = pass.code || ticketCode(order.id, pass.passIndex - 1);
    const barcode = pass.barcode || barcodeFromCode(code);
    const qr = qrSrc(pass.qrPayload || qrPayload(code));
    const title = shortMatchTitle(pass);
    return `
      <article class="confirm-pass" style="--c1:${pal.c1};--c2:${pal.c2};--c3:${pal.c3}">
        <div class="confirm-pass-visual">
          <div class="confirm-live-ticket">
            <p class="confirm-live-num">Ticket ${pass.passIndex} of ${pass.passTotal} · 1 person</p>
            <img class="confirm-live-qr" src="${qr}" alt="QR ${code}" width="140" height="140" />
            <p class="confirm-live-scan">Scan here</p>
            <hr class="confirm-live-dash" />
            <strong class="confirm-live-title">${title}</strong>
            <span class="confirm-live-venue">${pass.venue || ""}</span>
            <div class="confirm-live-meta">
              <span><em>Sec</em><b>${pass.section}</b></span>
              <span><em>Zone</em><b>${pass.zone || "Seat"}</b></span>
            </div>
            <div class="confirm-live-barcode" style="background-image:${barcodeCss(barcode)}" aria-hidden="true"></div>
            <p class="confirm-live-bartext">${barcode.replace(/(\d{4})(?=\d)/g, "$1 ")}</p>
          </div>
        </div>
        <div class="confirm-pass-meta">
          <span class="confirm-pass-num">Ticket ${pass.passIndex} of ${pass.passTotal}</span>
          <strong>${pass.holder}</strong>
          <span>${pass.title}</span>
          <span>Sec ${pass.section} · ${pass.zone || "Seat"} · ${pass.personLabel}</span>
          <span class="confirm-pass-code">${code}</span>
          <span class="confirm-pass-barcode-label">Barcode ${barcode}</span>
          ${together ? `<span class="confirm-pass-together">Side by side with your group</span>` : ""}
        </div>
      </article>`;
  }

  function renderHome() {
    const list = document.getElementById("schedule-list");
    const meta = document.getElementById("sched-meta");
    const games = data.featured
      .filter((g) => matchesQuery(g, state.query))
      .slice()
      .sort((a, b) => {
        const byDate = a.date.localeCompare(b.date);
        if (byDate) return byDate;
        return timeMinutes(a.time) - timeMinutes(b.time);
      });
    if (!list) return;
    if (meta) {
      meta.textContent = `${games.length} events · prices from estimated ticket value`;
    }
    if (!games.length) {
      list.innerHTML = `<div class="empty"><h3>No matching games</h3><p>Try another team or city.</p></div>`;
      return;
    }
    list.innerHTML = games
      .map((g) => {
        const dt = parseDate(g.date);
        const done = g.status === "final" ? " is-final" : "";
        const priceLabel = g.status === "final" ? "Was" : "From";
        return `
          <a class="event-card${done}" href="#event/${g.slug}">
            <div class="event-date">
              <span class="mon">${MONTHS_SHORT[dt.getMonth()]}</span>
              <span class="day">${dt.getDate()}</span>
              <span class="dow">${weekday(g.date)}</span>
            </div>
            <div class="event-matchup">
              <div class="event-teams">
                <span class="event-team-name">${g.awayName}</span>
                <span class="event-logos">
                  <img src="${teamLogo(g.away)}" alt="${g.awayName}" width="48" height="48" />
                  <span class="event-vs">—</span>
                  <img src="${teamLogo(g.home)}" alt="${g.homeName}" width="48" height="48" />
                </span>
                <span class="event-team-name">${g.homeName}</span>
              </div>
              <p>${g.venue} · ${g.city}</p>
            </div>
            <div class="event-side">
              <div class="from-price">${money(g.ticket)}<small>${priceLabel} / ticket</small></div>
              <span class="type-pill">${g.status === "final" ? `Final ${g.awayScore}–${g.homeScore}` : g.type}</span>
            </div>
          </a>`;
      })
      .join("");
  }

  function chevron() {
    return `<svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4L5.125 7.125L2 4"/></svg>`;
  }

  function qtyLabel() {
    return state.qty ? `${state.qty} tickets` : "Quantity";
  }

  function priceLabel(game) {
    const options = priceOptionsFor(game || activeGame());
    const current = options.find((p) => p.id === state.price) || options[0];
    return current.label === "Any price" ? "Price" : current.label;
  }

  function inPriceBand(price, game) {
    if (isBowl(game)) {
      if (state.price === "under5k") return price < 5000;
      if (state.price === "5k-8k") return price >= 5000 && price <= 8000;
      if (state.price === "8kplus") return price >= 8000;
      return true;
    }
    if (state.price === "under500") return price < 500;
    if (state.price === "500-900") return price >= 500 && price <= 900;
    if (state.price === "900plus") return price >= 900;
    return true;
  }

  const SEAT_CATEGORIES = [
    { id: "lower", label: "Lower", hint: "Closest", accent: "#3ecf8e", mult: 0.86 },
    { id: "club", label: "Club", hint: "Mid bowl", accent: "#6ea8ff", mult: 1.16 },
    { id: "upper", label: "Upper", hint: "Best value", accent: "#ff8f6b", mult: 0.56 },
  ];

  function listingCategory(row) {
    const z = String((row && row.zone) || "").toLowerCase();
    if (/vip|suite|hospitality/.test(z)) return "club";
    if (/club|mezz|hall of fame|hof|\b200s?\b|\b600s?\b|level 2|\(n\)|middle tier/.test(z)) return "club";
    if (/upper|summit|\b300s?\b|\b400s?\b|\b700s?\b|superior|tercera|oberrang|general|level 3|level 4|\(p\)|\(q\)/.test(z)) {
      return "upper";
    }
    if (/lower|preferente|inferior|unterrang|sideline|fondo|level 1|\(m\)|100s?|north \/ south/.test(z)) {
      return "lower";
    }
    const n = parseInt(String((row && row.section) || "").replace(/\D/g, ""), 10);
    if (Number.isFinite(n) && n > 0) {
      if (n < 200) return "lower";
      if (n < 300) return "club";
      return "upper";
    }
    return "lower";
  }

  function sectionCategory(seat) {
    return listingCategory({ zone: seat.zone, section: seat.id });
  }

  function categoryFromPrice(game, cat, rows) {
    if (rows.length) return rows.reduce((min, r) => Math.min(min, r.price), Infinity);
    return Math.max(45, Math.round((game.ticket * cat.mult) / 5) * 5);
  }

  function ensureCategoryListings(game, listings) {
    const stadium = stadiumFor(game);
    if (!stadium) return listings;
    const rand = seeded(game.rank * 97 + 0xc47);
    SEAT_CATEGORIES.forEach((cat) => {
      if (listings.some((r) => listingCategory(r) === cat.id)) return;
      const seat =
        stadium.sections.find((s) => sectionCategory(s) === cat.id && s.listed) ||
        stadium.sections.find((s) => sectionCategory(s) === cat.id);
      if (!seat) return;
      if (listings.some((r) => r.section === seat.id)) return;
      const base = Math.round(game.ticket * (seat.mult || cat.mult));
      const price = Math.max(45, Math.round(base / 5) * 5);
      listings.push({
        id: `${game.slug}-${seat.id}`,
        section: seat.id,
        row: "T",
        zone: seat.zone,
        qty: QTY_MAX,
        instant: rand() > 0.35,
        deal: "amazing",
        price,
      });
    });
    return listings;
  }

  function categoriesFor(game) {
    const rows = listingsFor(game);
    return SEAT_CATEGORIES.map((cat) => {
      const match = rows.filter((r) => listingCategory(r) === cat.id);
      return {
        ...cat,
        from: categoryFromPrice(game, cat, match),
        count: match.length,
      };
    });
  }

  function filteredListings(game) {
    let rows = listingsFor(game);
    if (state.qty) rows = rows.filter((r) => r.qty >= state.qty);
    if (state.section) rows = rows.filter((r) => r.section === state.section);
    if (state.category) rows = rows.filter((r) => listingCategory(r) === state.category);
    rows = rows.filter((r) => inPriceBand(r.price, game));
    return rows.slice().sort(sectionSort);
  }

  function renderSeatCategories(game) {
    const root = document.getElementById("seat-categories");
    if (!root) return;
    const cats = categoriesFor(game);
    root.hidden = false;
    root.innerHTML = `
      <div class="seat-cats" role="tablist" aria-label="Seat category">
        <button class="seat-cat seat-cat--all${!state.category ? " is-active" : ""}" type="button" data-category="" role="tab" aria-selected="${!state.category}">
          <span class="seat-cat-swatch" aria-hidden="true"></span>
          <span class="seat-cat-label">All</span>
          <span class="seat-cat-from">Every level</span>
          <span class="seat-cat-hint">Full map</span>
        </button>
        ${cats
          .map(
            (cat) => `
          <button class="seat-cat seat-cat--${cat.id}${state.category === cat.id ? " is-active" : ""}" type="button" data-category="${cat.id}" role="tab" aria-selected="${state.category === cat.id}" style="--cat-accent:${cat.accent}">
            <span class="seat-cat-swatch" aria-hidden="true"></span>
            <span class="seat-cat-label">${cat.label}</span>
            <span class="seat-cat-from">from ${money(cat.from)}</span>
            <span class="seat-cat-hint">${cat.hint}</span>
          </button>`
          )
          .join("")}
      </div>`;
  }

  function renderFilters(game) {
    const bar = shopEls().filter;
    if (!bar) return;
    const options = priceOptionsFor(game);
    bar.innerHTML = `
      <div class="filter-menu" data-menu="qty">
        <button class="filter-pill" type="button" data-selected="${state.qty ? "true" : "false"}">${qtyLabel()}${chevron()}</button>
        <div class="filter-dropdown">
          ${QTY_OPTIONS.map(
            (n) =>
              `<button type="button" data-qty="${n}" data-selected="${state.qty === n}">${n ? n + " tickets" : "Any quantity"}</button>`
          ).join("")}
        </div>
      </div>
      <div class="filter-menu" data-menu="price">
        <button class="filter-pill" type="button" data-selected="${state.price !== "any" ? "true" : "false"}">${priceLabel(game)}${chevron()}</button>
        <div class="filter-dropdown">
          ${options.map(
            (p) =>
              `<button type="button" data-price="${p.id}" data-selected="${state.price === p.id}">${p.label}</button>`
          ).join("")}
        </div>
      </div>
      <span class="best-deal-chip">${isBowl(game) ? "Early access" : "Best Deal only"}</span>
    `;
  }

  function bowlPoint(cx, cy, rx, ry, n, scale, deg) {
    const a = (deg * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const m = 2 / n;
    const x = Math.sign(sin) * Math.pow(Math.abs(sin) || 0, m) * rx * scale;
    const y = -Math.sign(cos) * Math.pow(Math.abs(cos) || 0, m) * ry * scale;
    return [+(cx + x).toFixed(2), +(cy + y).toFixed(2)];
  }

  function sectionShape(cx, cy, rx, ry, n, s0, s1, a0, a1) {
    const gap = Math.min(0.45, Math.abs(a1 - a0) * 0.07);
    const start = a0 + gap;
    const end = a1 - gap;
    const steps = Math.max(5, Math.ceil(Math.abs(end - start) / 5));
    const outer = [];
    const inner = [];
    for (let i = 0; i <= steps; i++) {
      const a = start + ((end - start) * i) / steps;
      outer.push(bowlPoint(cx, cy, rx, ry, n, s1, a));
      inner.push(bowlPoint(cx, cy, rx, ry, n, s0, a));
    }
    return { outer, inner, pts: outer.concat(inner.slice().reverse()) };
  }

  function sectionPath(cx, cy, rx, ry, n, s0, s1, a0, a1) {
    const { pts } = sectionShape(cx, cy, rx, ry, n, s0, s1, a0, a1);
    return `M${pts.map((p) => p.join(",")).join("L")}Z`;
  }

  function polygonCentroid(pts) {
    let area = 0;
    let cx = 0;
    let cy = 0;
    const len = pts.length;
    for (let i = 0; i < len; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[(i + 1) % len];
      const cross = x0 * y1 - x1 * y0;
      area += cross;
      cx += (x0 + x1) * cross;
      cy += (y0 + y1) * cross;
    }
    area *= 0.5;
    if (Math.abs(area) < 1e-6) {
      const sx = pts.reduce((sum, p) => sum + p[0], 0);
      const sy = pts.reduce((sum, p) => sum + p[1], 0);
      return [+(sx / len).toFixed(2), +(sy / len).toFixed(2)];
    }
    return [+(cx / (6 * area)).toFixed(2), +(cy / (6 * area)).toFixed(2)];
  }

  function sectionLabelSize(shape, text) {
    const { outer, inner } = shape;
    const last = outer.length - 1;
    const mid = Math.floor(outer.length / 2);
    const thick = Math.hypot(outer[mid][0] - inner[mid][0], outer[mid][1] - inner[mid][1]);
    const mx0 = (outer[0][0] + inner[0][0]) / 2;
    const my0 = (outer[0][1] + inner[0][1]) / 2;
    const mx1 = (outer[last][0] + inner[last][0]) / 2;
    const my1 = (outer[last][1] + inner[last][1]) / 2;
    const width = Math.hypot(mx1 - mx0, my1 - my0);
    const chars = Math.max(2, String(text).length);
    const byW = (width * 0.74) / (chars * 0.54);
    const byH = thick * 0.52;
    return Math.min(5.8, byW, byH);
  }

  function bowlRingPath(cx, cy, rx, ry, n, scale) {
    const pts = [];
    for (let d = 0; d <= 360; d += 3) {
      pts.push(bowlPoint(cx, cy, rx, ry, n, scale, d));
    }
    return `M${pts.map((p) => p.join(",")).join("L")}Z`;
  }

  function nflFieldSvg(fx, fy, fw, fh) {
    const ez = fw * (10 / 120);
    const play = fw - 2 * ez;
    const midY = fy + fh / 2;
    const lines = [];
    const nums = [];
    for (let i = 0; i <= 20; i++) {
      const x = fx + ez + (play * i) / 20;
      const major = i % 2 === 0;
      lines.push(`<line class="${major ? "" : "field-minor"}" x1="${x}" y1="${fy}" x2="${x}" y2="${fy + fh}"/>`);
      if (major && i > 0 && i < 20) {
        const n = i <= 10 ? i * 5 : (20 - i) * 5;
        if (n % 10 === 0) {
          const big = n === 50 ? " is-50" : "";
          nums.push(`<text class="field-yard${big}" x="${x}" y="${midY + 2}" text-anchor="middle">${n}</text>`);
        }
      }
    }
    const hashT = midY - fh * 0.12;
    const hashB = midY + fh * 0.12;
    lines.push(
      `<line class="field-hash" x1="${fx + ez}" y1="${hashT}" x2="${fx + fw - ez}" y2="${hashT}"/>`,
      `<line class="field-hash" x1="${fx + ez}" y1="${hashB}" x2="${fx + fw - ez}" y2="${hashB}"/>`,
      `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="none" rx="2"/>`
    );
    return `
      <g class="pitch">
        <rect class="field-turf" x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="3"/>
        <rect class="field-ez" x="${fx}" y="${fy}" width="${ez}" height="${fh}" rx="3"/>
        <rect class="field-ez" x="${fx + fw - ez}" y="${fy}" width="${ez}" height="${fh}" rx="3"/>
        <g class="field-lines">${lines.join("")}</g>
        ${nums.join("")}
      </g>`;
  }

  function renderMap(game, listings, el) {
    const mapEl = el || shopEls().map;
    const stadium = stadiumFor(game);
    if (!mapEl || !stadium) {
      if (mapEl) mapEl.innerHTML = "";
      return;
    }
    const dealSections = new Set(listings.map((l) => l.section));
    const open = listings.find((l) => l.id === state.openId);
    const active = state.section || (open && open.section) || "";
    const cx = stadium.cx;
    const cy = stadium.cy;
    const rx = stadium.rx;
    const ry = stadium.ry;
    const n = stadium.n;
    const fx = cx - stadium.fw / 2;
    const fy = cy - stadium.fh / 2;
    const prepared = stadium.sections.map((sec) => {
      const shape = sectionShape(cx, cy, rx, ry, n, sec.r0, sec.r1, sec.a0, sec.a1);
      return { sec, shape };
    });
    const drawn = prepared.map((item) => {
      const { sec, shape } = item;
      const deal = dealSections.has(sec.id);
      const cat = sectionCategory(sec);
      const muted = !!(state.category && state.category !== cat);
      const cls = [
        "map-sec",
        `map-sec--${cat}`,
        deal ? "has-deal" : "",
        active === sec.id ? "is-active" : "",
        muted ? "is-dimmed" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const short = String(sec.id).length > 8 ? String(sec.id).replace(/^\D+/, "") : sec.id;
      const [tx, ty] = polygonCentroid(shape.pts);
      const fit = sectionLabelSize(shape, short);
      const isDeal = deal || active === sec.id;
      const size = isDeal ? Math.max(4.4, fit || 4.4) : fit >= 3.5 ? fit : 0;
      const labelCls = ["map-label", isDeal ? "is-deal" : "", `map-label--${cat}`, muted ? "is-dimmed" : ""]
        .filter(Boolean)
        .join(" ");
      return {
        path: `<path class="${cls}" data-section="${sec.id}" data-cat="${cat}" d="M${shape.pts.map((p) => p.join(",")).join("L")}Z"></path>`,
        label:
          size > 0
            ? `<text class="${labelCls}" x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="central" dy="0.05em" style="font-size:${size.toFixed(2)}px">${short}</text>`
            : "",
      };
    });
    const wedges = drawn.map((d) => d.path).join("");
    const labels = drawn.map((d) => d.label).join("");
    const field = nflFieldSvg(fx, fy, stadium.fw, stadium.fh);
    const colonnades =
      stadium.look === "soldier"
        ? `<g class="colonnade">
            <rect x="${cx - rx * 0.98}" y="${cy - 38}" width="10" height="76" rx="2"/>
            <rect x="${cx + rx * 0.9}" y="${cy - 38}" width="10" height="76" rx="2"/>
          </g>`
        : "";
    const [vb0, vb1, vbw, vbh] = stadium.view.split(" ");
    mapEl.innerHTML = `<svg viewBox="${stadium.view}" role="img" aria-label="${stadium.name} seating map">
        <defs>
          <linearGradient id="turf-grad-${game.slug}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#3a9a48"/>
            <stop offset="1" stop-color="#2a7a38"/>
          </linearGradient>
          <linearGradient id="ez-grad-${game.slug}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2f7d3c"/>
            <stop offset="1" stop-color="#246432"/>
          </linearGradient>
        </defs>
        <rect class="map-bg" x="${vb0}" y="${vb1}" width="${vbw}" height="${vbh}" rx="10"/>
        ${wedges}
        <path class="bowl-well" d="${bowlRingPath(cx, cy, rx, ry, n, 0.42)}"></path>
        ${labels}
        ${field}
        ${colonnades}
      </svg>`;
  }

  function recapHtml(items, cta) {
    const total = cartTotal(items);
    const tickets = items.reduce((n, item) => n + item.qty, 0);
    return `
      <aside class="pn-recap">
        <p class="pn-recap-kicker">Ready to pay</p>
        <h2>Order summary</h2>
        <p class="pn-recap-count">${tickets} ticket${tickets === 1 ? "" : "s"} · held while you check out</p>
        <dl>
          <div><dt>Subtotal</dt><dd>${money(total)}</dd></div>
          <div><dt>Booking fees</dt><dd class="pn-offert">Included</dd></div>
          <div class="pn-total"><dt>Total</dt><dd>${money(total)}</dd></div>
        </dl>
        ${cta}
        ${payMarksHtml()}
        <ul class="pn-guarantees">
          <li>
            <span class="pn-g-ico" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="1.2" fill="currentColor"/></svg>
            </span>
            Encrypted checkout on this site
          </li>
          <li>
            <span class="pn-g-ico" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            E-tickets sent to your email
          </li>
          <li>
            <span class="pn-g-ico" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8.2" r="2.2" stroke="currentColor" stroke-width="1.5"/><circle cx="15.2" cy="8.2" r="2.2" stroke="currentColor" stroke-width="1.5"/><path d="M4.8 17.5c.5-2 2-3.2 4.2-3.2 1.3 0 2.4.4 3.1 1.15.7-.7 1.75-1.15 3.1-1.15 2.2 0 3.7 1.2 4.2 3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            Seats side by side, guaranteed
          </li>
          <li>
            <span class="pn-g-ico" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3.5 18.5 6.1v5.5c0 3.9-2.6 6.6-6.5 7.7-3.9-1.1-6.5-3.8-6.5-7.7V6.1L12 3.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m9.3 11.9 1.8 1.8 3.7-3.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            100% buyer guarantee
          </li>
        </ul>
      </aside>`;
  }

  function fillTicketShop(game) {
    const els = shopEls();
    if (els.banner) {
      if (game.status === "final") {
        els.banner.innerHTML = `<div class="promo-banner ended-banner"><strong>This event has ended.</strong> Final score ${game.awayScore}–${game.homeScore}. Listings below are historical comparables.</div>`;
      } else if (isBowl(game)) {
        els.banner.innerHTML = `<div class="promo-banner"><strong>Early access is open.</strong> The two clubs aren’t named yet — your seats are. Check out on this site.</div>`;
      } else {
        els.banner.innerHTML = `<div class="promo-banner"><strong>Best deals only.</strong> Choose a quantity, add to cart, and check out on this site.</div>`;
      }
    }
    renderFilters(game);
    renderSeatCategories(game);
    const rows = filteredListings(game);
    const ended = game.status === "final";
    if (els.meta) {
      const cat = SEAT_CATEGORIES.find((c) => c.id === state.category);
      const catBit = cat ? `${cat.label} · ` : "";
      els.meta.textContent = isBowl(game)
        ? `${catBit}${rows.length} early-access listing${rows.length === 1 ? "" : "s"} · side by side · price per ticket`
        : `${catBit}${rows.length} listing${rows.length === 1 ? "" : "s"} · side by side · price per ticket`;
    }
    if (els.list) {
      if (!rows.length) {
        els.list.innerHTML = `<div class="empty"><h3>No tickets for these filters</h3><p>Try another quantity or clear the price filter.</p></div>`;
      } else {
        els.list.innerHTML = rows
          .map((row) => {
            const open = state.openId === row.id ? " is-open" : "";
            const tickets = row.qty === 1 ? "1 Ticket" : `${row.qty} Tickets`;
            const max = Math.min(row.qty, QTY_MAX);
            const qty = Math.max(1, Math.min(state.addQty, max));
            const adding = state.addingId === row.id;
            const catId = listingCategory(row);
            const cat = SEAT_CATEGORIES.find((c) => c.id === catId) || SEAT_CATEGORIES[0];
            return `
            <article class="listing listing--${cat.id}${open}" data-id="${row.id}" data-cat="${cat.id}">
              <button class="listing-row" type="button" data-toggle="${row.id}">
                <div>
                  <div class="listing-meta">
                    <span class="listing-cat listing-cat--${cat.id}" style="--cat-accent:${cat.accent}">
                      <span class="listing-cat-dot" aria-hidden="true"></span>
                      ${cat.label}
                      <span class="listing-cat-hint">${cat.hint}</span>
                    </span>
                    <span class="listing-seat">Sec ${row.section}</span>
                    <span class="listing-qty">${tickets}</span>
                    <span class="listing-together" title="Side by side" aria-label="Side by side">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="2.6" stroke="currentColor" stroke-width="1.7" />
                        <circle cx="16" cy="8" r="2.6" stroke="currentColor" stroke-width="1.7" />
                        <path d="M3.8 18.5c.6-2.6 2.6-4 4.2-4s3.6 1.4 4.2 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                        <path d="M11.8 18.5c.6-2.6 2.6-4 4.2-4s3.6 1.4 4.2 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                      </svg>
                    </span>
                  </div>
                  <div class="listing-zone">${row.zone}</div>
                  <div class="listing-badges">
                    <span class="deal ${row.deal}">${row.deal}</span>
                    ${row.instant ? `<span class="chip">Instant download</span>` : ""}
                    ${isBowl(game) ? `<span class="chip">Early access</span>` : ""}
                  </div>
                </div>
                <div class="listing-price-col">
                  <p class="listing-price">${money(row.price)}</p>
                  <span class="listing-each">each</span>
                </div>
              </button>
              <div class="cart-add">
                <div class="qty-stepper">
                  <button type="button" data-step="-1" aria-label="Remove a ticket" ${qty <= 1 ? "disabled" : ""}>−</button>
                  <output>${qty}</output>
                  <button type="button" data-step="1" aria-label="Add a ticket" ${qty >= max ? "disabled" : ""}>+</button>
                </div>
                <div class="cart-add-total">
                  <span>${qty} ticket${qty === 1 ? "" : "s"}</span>
                  <strong>${money(row.price * qty)}</strong>
                </div>
                <button class="btn btn-primary" type="button" data-add="${row.id}" ${ended || adding ? "disabled" : ""}>
                  ${ended ? "Ended" : adding ? "Added to cart…" : "Add to cart"}
                </button>
              </div>
            </article>`;
          })
          .join("");
      }
    }
    if (els.mapTitle) els.mapTitle.textContent = stadiumFor(game) ? stadiumFor(game).name : "Seating map";
    renderMap(game, listingsFor(game), els.map);
    if (els.pins) {
      const pool = listingsFor(game).filter((r) => !state.category || listingCategory(r) === state.category);
      const bySec = new Map();
      pool.forEach((r) => {
        const cat = listingCategory(r);
        const cur = bySec.get(r.section);
        if (!cur) bySec.set(r.section, { id: r.section, cat, from: r.price, count: 1 });
        else {
          cur.from = Math.min(cur.from, r.price);
          cur.count += 1;
        }
      });
      const choices = [...bySec.values()].sort((a, b) =>
        sectionSort({ section: a.id, row: "A" }, { section: b.id, row: "A" })
      );
      const selected = choices.find((c) => c.id === state.section);
      const catMeta = SEAT_CATEGORIES.find((c) => c.id === (selected && selected.cat));
      els.pins.innerHTML = `
        <div class="sec-picker">
          <div class="sec-picker-head">
            <div class="sec-picker-title">
              <span>Section</span>
              ${
                selected
                  ? `<strong class="sec-picker-active sec-picker-active--${selected.cat}" style="--cat-accent:${(catMeta && catMeta.accent) || "#9aa3b2"}">${selected.id}</strong>`
                  : `<em>All available</em>`
              }
            </div>
            ${
              state.section
                ? `<button class="sec-clear" type="button" data-section="">Clear</button>`
                : `<span class="sec-picker-hint">Map or list</span>`
            }
          </div>
          <div class="sec-picker-grid" role="listbox" aria-label="Available sections">
            <button class="sec-chip sec-chip--all${state.section === "" ? " is-active" : ""}" type="button" data-section="" role="option" aria-selected="${state.section === ""}">
              <span class="sec-chip-id">All</span>
              <span class="sec-chip-from">${choices.length}</span>
            </button>
            ${choices
              .map((c) => {
                const accent = (SEAT_CATEGORIES.find((x) => x.id === c.cat) || {}).accent || "#9aa3b2";
                return `
                <button class="sec-chip sec-chip--${c.cat}${state.section === c.id ? " is-active" : ""}" type="button" data-section="${c.id}" role="option" aria-selected="${state.section === c.id}" style="--cat-accent:${accent}">
                  <span class="sec-chip-id">${c.id}</span>
                  <span class="sec-chip-from">${money(c.from)}</span>
                </button>`;
              })
              .join("")}
          </div>
        </div>`;
    }
  }

  function renderEvent() {
    const game = gameBySlug(state.slug);
    if (!game || isBowl(game)) {
      setView("home");
      renderHome();
      return;
    }
    setView("event");
    document.getElementById("event-title").textContent = gameTitle(game);
    document.getElementById("event-sub").textContent =
      `${formatLong(game.date, game.time)} · ${game.venue}, ${game.city}`;
    const awayLogo = document.getElementById("event-logo-away");
    const homeLogo = document.getElementById("event-logo-home");
    if (awayLogo) awayLogo.src = teamLogo(game.away);
    if (homeLogo) homeLogo.src = teamLogo(game.home);
    const hero = document.getElementById("event-hero-media");
    const heroImg = document.getElementById("event-hero-img");
    const top = document.getElementById("event-top");
    const photo = VENUE_PHOTOS[game.stadium];
    if (hero && heroImg && top) {
      if (photo) {
        heroImg.src = photo;
        heroImg.alt = game.venue;
        hero.hidden = false;
        top.classList.add("has-hero");
      } else {
        heroImg.removeAttribute("src");
        heroImg.alt = "";
        hero.hidden = true;
        top.classList.remove("has-hero");
      }
    }
    fillTicketShop(game);
  }

  function cheapestZone(game, needle) {
    return listingsFor(game)
      .filter((row) => String(row.zone).toLowerCase().includes(needle))
      .reduce((min, row) => Math.min(min, row.price), Infinity);
  }

  function fillBowlOffers(game) {
    const grid = document.getElementById("bowl-offer-grid");
    if (!grid || !game) return;
    const perkIcon = (name) => {
      const icons = {
        seats: '<path d="M5 15.8V10.2c0-.9.7-1.6 1.6-1.6h10.8c.9 0 1.6.7 1.6 1.6v5.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 15.8h16M8.2 13.8V10.8M12 13.8V10.8M15.8 13.8V10.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
        together: '<circle cx="9" cy="8.3" r="2.3" stroke="currentColor" stroke-width="1.5"/><circle cx="15.2" cy="8.3" r="2.3" stroke="currentColor" stroke-width="1.5"/><path d="M4.6 17.5c.5-2 2-3.2 4.4-3.2 1.4 0 2.55.45 3.3 1.2.7-.7 1.8-1.2 3.2-1.2 2.4 0 3.9 1.2 4.4 3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
        ticket: '<path d="M4 8.5c0-.8.7-1.5 1.5-1.5h13c.8 0 1.5.7 1.5 1.5v2.1c-.9.2-1.5.9-1.5 1.75s.6 1.55 1.5 1.75v2.1c0 .8-.7 1.5-1.5 1.5h-13c-.8 0-1.5-.7-1.5-1.5v-2.1c.9-.2 1.5-.9 1.5-1.75S4.9 10.8 4 10.6V8.5z" stroke="currentColor" stroke-width="1.5"/><path d="M9.8 7.2v9.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="1.35 1.7"/>',
        shield: '<path d="M12 3.5 18.5 6.1v5.5c0 3.9-2.6 6.6-6.5 7.7-3.9-1.1-6.5-3.8-6.5-7.7V6.1L12 3.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.3 11.9 11.1 13.7 14.8 9.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
        refresh: '<path d="M18.6 12a6.6 6.6 0 1 1-1.9-4.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18.6 5.4V9h-3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
        support: '<path d="M12 4.2a5.6 5.6 0 0 0-5.6 5.6v1.6c0 .95-.4 1.85-1.1 2.4l-.45.35c-.55.4-.25 1.25.45 1.25h14.4c.7 0 1-.85.45-1.25l-.45-.35a3.1 3.1 0 0 1-1.1-2.4V9.8A5.6 5.6 0 0 0 12 4.2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10.3 17.8a1.7 1.7 0 0 0 3.4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
        lounge: '<path d="M5.5 14.4V10.8c0-.9.7-1.6 1.6-1.6h9.8c.9 0 1.6.7 1.6 1.6v3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4.2 14.4h15.6M6.6 17.2v-2.8M17.4 17.2v-2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8.8 9.2V7.8a3.2 3.2 0 0 1 6.4 0v1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
        hospitality: '<path d="M9.2 19 10.2 9.5h3.6L14.8 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.1 9.5c0-2.2.95-4.1 1.9-4.1s1.9 1.9 1.9 4.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10.7 13h2.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
        plaza: '<path d="M5 18.8V9.8L12 5.2l7 4.6v9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 18.8v-5h5v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
      };
      return `<svg class="bowl-offer-perk-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">${icons[name] || icons.ticket}</svg>`;
    };
    const adding = state.addingId;
    grid.innerHTML = BOWL_OFFERS.map((offer, i) => {
      const busy = adding === offer.id;
      const n = String(i + 1).padStart(2, "0");
      const featured = offer.featured ? " is-featured" : "";
      const media = offer.video
        ? `<video class="bowl-offer-video" src="${offer.video}" poster="${offer.image}" autoplay muted loop playsinline webkit-playsinline preload="auto" aria-hidden="true"></video>`
        : `<img src="${offer.image}" alt="" width="720" height="900" loading="lazy" />`;
      const partner = offer.partnerLogo
        ? `<p class="bowl-offer-partner">with <img class="bowl-offer-partner-logo" src="${offer.partnerLogo}" alt="" width="140" height="32" /></p>`
        : "";
      return `
        <article class="bowl-offer bowl-offer--${offer.tier}${featured}" style="--offer-accent:${offer.accent}; --offer-delay:${i * 80}ms">
          <div class="bowl-offer-media">
            ${media}
            <span class="bowl-offer-index" aria-hidden="true">${n}</span>
            <span class="bowl-offer-badge">${offer.badge}</span>
          </div>
          <div class="bowl-offer-body">
            <p class="bowl-offer-vibe">${offer.vibe}</p>
            <h3>${offer.title}</h3>
            ${partner}
            <p class="bowl-offer-blurb">${offer.blurb}</p>
            <ul class="bowl-offer-perks">
              ${offer.perks
                .map((p) => {
                  const text = typeof p === "string" ? p : p.text;
                  const icon = typeof p === "string" ? "ticket" : p.icon;
                  return `<li><span class="bowl-offer-perk-ico">${perkIcon(icon)}</span><span>${text}</span></li>`;
                })
                .join("")}
            </ul>
            <div class="bowl-offer-foot">
              <div class="bowl-offer-price">
                <span>From</span>
                <strong>${money(offer.price)}</strong>
                <em>per ticket</em>
              </div>
              ${
                offer.contactOnly
                  ? `<a class="bowl-offer-cta" href="#faq">Contact us</a>`
                  : `<button class="bowl-offer-cta" type="button" data-bowl-add="${offer.id}" ${busy ? "disabled" : ""}>
                ${busy ? "Added…" : "Add to cart"}
              </button>`
              }
            </div>
          </div>
        </article>`;
    }).join("");
    armBowlOfferVideos(grid);
  }

  function armBowlOfferVideos(root) {
    if (!root) return;
    const videos = root.querySelectorAll("video.bowl-offer-video");
    if (!videos.length) return;

    const kick = (video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      const run = video.play();
      if (run && typeof run.catch === "function") run.catch(() => {});
    };

    videos.forEach((video) => {
      kick(video);
      video.addEventListener("loadeddata", () => kick(video), { once: true });
      video.addEventListener(
        "canplay",
        () => {
          kick(video);
        },
        { once: true }
      );
    });

    if (!("IntersectionObserver" in window)) return;

    if (root._bowlVideoIo) root._bowlVideoIo.disconnect();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) kick(video);
          else if (!entry.isIntersecting) video.pause();
        });
      },
      { threshold: [0, 0.25, 0.5] }
    );
    root._bowlVideoIo = io;
    videos.forEach((video) => io.observe(video));
  }

  function moneyCents(n) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(n);
  }

  function fillBowlHospitality() {
    const grid = document.getElementById("bowl-hosp-grid");
    if (!grid) return;
    grid.innerHTML = BOWL_HOSP.map((pkg, i) => {
      const open = state.hospOpenId === pkg.id;
      const priceBlock =
        pkg.price != null
          ? `<div class="bowl-hosp-price"><span>${pkg.priceLabel}</span> <strong>${moneyCents(pkg.price)}</strong><em>/pp</em></div>`
          : pkg.soldOut
            ? ""
            : "";
      const cta =
        pkg.cta === "sold"
          ? `<button class="bowl-hosp-cta is-sold" type="button" disabled>${pkg.ctaLabel}</button>`
          : pkg.cta === "call"
            ? `<a class="bowl-hosp-cta" href="${pkg.ctaHref}">${pkg.ctaLabel}</a>`
            : `<a class="bowl-hosp-cta" href="#faq">${pkg.ctaLabel}</a>`;
      const badge =
        pkg.badge
          ? `<span class="bowl-hosp-badge bowl-hosp-badge--${pkg.badgeTone || "seat"}"><span class="bowl-hosp-badge-ico" aria-hidden="true"></span>${pkg.badge}</span>`
          : "";
      const moreBtn =
        pkg.moreLabel && !pkg.soldOut
          ? `<button class="bowl-hosp-more" type="button" data-hosp-more="${pkg.id}" aria-expanded="${open}">
              ${pkg.moreLabel}<span aria-hidden="true">${open ? " ▴" : " ▾"}</span>
            </button>`
          : "";
      return `
        <article class="bowl-hosp${pkg.soldOut ? " is-sold" : ""}" style="--hosp-delay:${i * 70}ms">
          <div class="bowl-hosp-media">
            <img src="${pkg.image}" alt="" width="960" height="540" loading="lazy" />
            ${badge}
            ${pkg.soldOut ? `<span class="bowl-hosp-sold-stamp">Sold Out</span>` : ""}
          </div>
          <div class="bowl-hosp-body">
            <h3>${pkg.title}</h3>
            ${
              pkg.soldOut
                ? `<p class="bowl-hosp-sold-note">${pkg.soldNote}</p>`
                : `<p>${pkg.blurb}</p>`
            }
            ${
              !pkg.soldOut && pkg.perks.length
                ? `<ul class="bowl-hosp-perks">${pkg.perks.map((p) => `<li>${p}</li>`).join("")}</ul>`
                : ""
            }
            ${moreBtn}
            ${priceBlock}
            ${pkg.plans && !pkg.soldOut ? `<p class="bowl-hosp-plans">Convenient payment plans available at checkout.</p>` : ""}
            ${cta}
          </div>
        </article>`;
    }).join("");
  }

  function fillLanding(game) {
    fillBowlOffers(game);
  }

  function renderSuperbowl() {
    const game = data.bowl;
    if (!game) {
      setView("home");
      renderHome();
      return;
    }
    setView("superbowl");
    fillLanding(game);
  }

  function renderCart() {
    setView("cart");
    const root = document.getElementById("cart-root");
    const items = readCart();
    if (!items.length) {
      root.innerHTML = `
        <div class="pn-empty">
          ${state.cartExpired ? `<p class="pn-expire">Your 10-minute hold expired. Tickets were released.</p>` : ""}
          <div class="pn-empty-mark" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M6 7h15l-1.4 8.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.6L5.2 4H3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="9" cy="20" r="1.3" fill="currentColor"/>
              <circle cx="18" cy="20" r="1.3" fill="currentColor"/>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Pick a matchup or lock Super Bowl early access — seats stay side by side.</p>
          <div class="pn-empty-actions">
            <a class="btn btn-primary" href="#tickets">See games</a>
            <a class="pn-empty-secondary" href="#superbowl">Super Bowl LXI</a>
          </div>
        </div>`;
      return;
    }
    const remain = (readDeadline() || 0) - Date.now();
    const urgent = remain > 0 && remain < 2 * 60 * 1000;
    const tickets = items.reduce((n, item) => n + item.qty, 0);
    root.innerHTML = `
      <div class="pn-grid">
        <div class="pn-main">
          ${
            remain > 0
              ? `<p class="pn-timer${urgent ? " is-urgent" : ""}" role="timer">
                  <span class="pn-timer-dot" aria-hidden="true"></span>
                  Tickets held for <strong>${formatHold(remain)}</strong>
                </p>`
              : ""
          }
          <div class="pn-list-head">
            <h2 class="pn-list-title">${tickets} ticket${tickets === 1 ? "" : "s"} in your cart</h2>
            <button class="pn-clear" type="button" data-clear>Empty cart</button>
          </div>
          ${items
            .map((item) => {
              const isBowl = item.kind === "superbowl";
              const visual = cartItemImage(item);
              return `
            <article class="pn-line${isBowl ? " pn-line--bowl" : ""}">
              <a class="pn-thumb" href="${item.href || `#event/${item.slug}`}">
                <img src="${visual}" alt="" width="176" height="176" loading="lazy" />
                <span class="pn-thumb-badge">${isBowl ? "LXI" : `Sec ${item.section}`}</span>
              </a>
              <div class="pn-body">
                ${cartTitleHtml(item)}
                <p class="pn-meta">${item.when}</p>
                <p class="pn-venue">${item.venue}</p>
                <div class="pn-facts">
                  <span>Sec ${item.section}</span>
                  ${item.row ? `<span>Row ${item.row}</span>` : ""}
                  <span>${item.zone}</span>
                  <span>${money(item.price)} each</span>
                </div>
              </div>
              <div class="pn-actions">
                <div class="qty-stepper" aria-label="Quantity">
                  <button type="button" data-cart-qty="${item.id}" data-next="${item.qty - 1}" ${item.qty <= 1 ? "disabled" : ""}>−</button>
                  <output>${item.qty}</output>
                  <button type="button" data-cart-qty="${item.id}" data-next="${item.qty + 1}" ${item.qty >= Math.min(item.maxQty, QTY_MAX) ? "disabled" : ""}>+</button>
                </div>
                <strong class="pn-line-total">${money(item.price * item.qty)}</strong>
                <button class="pn-remove" type="button" data-remove="${item.id}" aria-label="Remove">×</button>
              </div>
            </article>`;
            })
            .join("")}
        </div>
        ${recapHtml(
          items,
          `<a class="pn-checkout-cta" href="#checkout">Proceed to checkout</a><a class="pn-continue" href="#tickets">Continue shopping</a>`
        )}
      </div>`;
  }

  function renderCheckout() {
    const items = readCart();
    if (!items.length) {
      location.hash = "cart";
      return;
    }
    setView("checkout");
    const root = document.getElementById("checkout-root");
    const remain = (readDeadline() || 0) - Date.now();
    const urgent = remain > 0 && remain < 2 * 60 * 1000;
    root.innerHTML = `
      <div class="chk-grid">
        <form id="checkout-form" novalidate>
          ${
            remain > 0
              ? `<p class="pn-timer${urgent ? " is-urgent" : ""}" role="timer">Complete checkout in <strong>${formatHold(remain)}</strong></p>`
              : ""
          }
          <section class="chk-card">
            <h2>Your details</h2>
            <div class="chk-field">
              <label for="chk-email">Email</label>
              <input id="chk-email" name="email" type="email" autocomplete="email" required maxlength="120" placeholder="you@email.com" />
            </div>
            <div class="chk-row">
              <div class="chk-field">
                <label for="chk-first">First name</label>
                <input id="chk-first" name="first" type="text" autocomplete="given-name" required maxlength="50" />
              </div>
              <div class="chk-field">
                <label for="chk-last">Last name</label>
                <input id="chk-last" name="last" type="text" autocomplete="family-name" required maxlength="50" />
              </div>
            </div>
            <div class="chk-field">
              <label for="chk-phone">Phone</label>
              <input id="chk-phone" name="phone" type="tel" autocomplete="tel" required maxlength="20" placeholder="+1 555 000 0000" />
            </div>
          </section>
          <section class="chk-card">
            <h2>Billing address</h2>
            <div class="chk-field">
              <label for="chk-address">Address</label>
              <input id="chk-address" name="address" type="text" autocomplete="address-line1" required maxlength="120" />
            </div>
            <div class="chk-row">
              <div class="chk-field">
                <label for="chk-city">City</label>
                <input id="chk-city" name="city" type="text" autocomplete="address-level2" required maxlength="80" />
              </div>
              <div class="chk-field">
                <label for="chk-zip">ZIP / Postal code</label>
                <input id="chk-zip" name="zip" type="text" autocomplete="postal-code" required maxlength="12" />
              </div>
            </div>
            <div class="chk-row">
              <div class="chk-field">
                <label for="chk-state">State / Region</label>
                <input id="chk-state" name="state" type="text" autocomplete="address-level1" maxlength="80" />
              </div>
              <div class="chk-field">
                <label for="chk-country">Country</label>
                <select id="chk-country" name="country" required>
                  ${COUNTRIES.map(([code, name]) => `<option value="${code}" ${code === "US" ? "selected" : ""}>${name}</option>`).join("")}
                </select>
              </div>
            </div>
          </section>
          <section class="chk-card">
            <div class="chk-pay-head">
              <h2>Payment</h2>
              <span class="chk-secure">Encrypted · not stored</span>
            </div>
            <p class="chk-hint">Pay by card on this site. Your tickets are emailed as soon as the order is confirmed.</p>
            ${payMarksHtml("pn-pay--checkout")}
            ${state.checkoutError ? `<p class="chk-error" role="alert">${state.checkoutError}</p>` : ""}
            <div class="chk-field">
              <label for="chk-cardname">Name on card</label>
              <input id="chk-cardname" name="cardname" type="text" autocomplete="cc-name" required maxlength="80" />
            </div>
            <div class="chk-field">
              <label for="chk-card">Card number</label>
              <input id="chk-card" name="card" type="text" inputmode="numeric" autocomplete="cc-number" required maxlength="19" placeholder="ACCT-000015" />
            </div>
            <div class="chk-row">
              <div class="chk-field">
                <label for="chk-exp">Expiry</label>
                <input id="chk-exp" name="exp" type="text" inputmode="numeric" autocomplete="cc-exp" required maxlength="5" placeholder="MM/YY" />
              </div>
              <div class="chk-field">
                <label for="chk-cvc">CVC</label>
                <input id="chk-cvc" name="cvc" type="text" inputmode="numeric" autocomplete="cc-csc" required maxlength="4" placeholder="123" />
              </div>
            </div>
          </section>
        </form>
        ${recapHtml(
          items,
          `<button class="pn-checkout-cta" type="submit" form="checkout-form" ${state.paying ? "disabled" : ""}>${state.paying ? "Processing…" : "Pay " + money(cartTotal(items))}</button><a class="pn-continue" href="#cart">Back to cart</a>`
        )}
      </div>`;
  }

  function renderOrder() {
    setView("order");
    const root = document.getElementById("order-root");
    let order = null;
    try {
      order = JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
    } catch {
      order = null;
    }
    if (!order) {
      root.innerHTML = `<div class="pn-empty"><h2>No order found</h2><p>Your cart is ready when you are.</p><a class="btn btn-primary" href="#tickets">See games</a></div>`;
      return;
    }
    const passes = expandPasses(order);
    const multi = passes.length > 1;
    root.innerHTML = `
      <div class="order-confirm">
        <div class="order-confirm-head">
          <div class="order-ok" aria-hidden="true">✓</div>
          <h2>Thanks, ${order.first}</h2>
          <p>
            Order <strong>${order.id}</strong> is confirmed.
            Two emails are on the way to <strong>${order.email}</strong>:
            billing, then e-tickets.
          </p>
          <p class="order-confirm-rule">
            ${passes.length} ticket${passes.length === 1 ? "" : "s"} · 1 ticket = 1 person
            ${multi ? " · seats side by side" : ""}
          </p>
        </div>

        <div class="order-pass-grid">
          ${passes.map((pass) => confirmTicketHtml(pass, order)).join("")}
        </div>

        <div class="order-lines order-confirm-lines">
          ${order.items
            .map(
              (item) => `
            <div class="order-line">
              <span>${item.qty}× ${item.title}<br><small>Sec ${item.section} · ${item.qty > 1 ? "Side by side" : "1 person"}</small></span>
              <strong>${money(item.price * item.qty)}</strong>
            </div>`
            )
            .join("")}
          <div class="order-line pn-total"><span>Total</span><strong>${money(order.total)}</strong></div>
        </div>

        <a class="btn btn-primary" href="#tickets">Back to games</a>
        <div class="order-mail-links">
          <a href="emails/preview.html" target="_blank" rel="noopener">Preview both emails</a>
          <a href="emails/invoice.html" target="_blank" rel="noopener">1 · Billing</a>
          <a href="emails/eticket.html" target="_blank" rel="noopener">2 · E-tickets (HTML)</a>
        </div>
      </div>`;
  }

  function parseHash() {
    const hash = location.hash.replace(/^#/, "");
    const eventMatch = hash.match(/^event\/([a-z0-9-]+)/i);
    if (hash === "cart") state.page = "cart";
    else if (hash === "checkout") state.page = "checkout";
    else if (hash === "order") state.page = "order";
    else if (LEGAL_HASHES[hash]) {
      state.page = "legal";
      state.legalDoc = hash;
    } else if (STORY_HASHES.has(hash)) state.page = "story";
    else if (BOWL_HASHES.has(hash) || (eventMatch && eventMatch[1] === (data.bowl && data.bowl.slug))) {
      state.page = "superbowl";
      state.slug = data.bowl ? data.bowl.slug : null;
    } else if (eventMatch) {
      state.page = "event";
      state.slug = eventMatch[1];
    } else {
      state.page = "home";
      state.slug = null;
    }
    if (state.page !== "event" && state.page !== "superbowl") {
      if (state.page === "home") state.slug = null;
    }
    if (eventMatch && state.page === "event") state.slug = eventMatch[1];
    const shopKey = state.page === "superbowl" ? "bowl" : state.page === "event" ? state.slug : "";
    if (shopKey !== lastSlug) {
      lastSlug = shopKey;
      state.openId = null;
      state.section = "";
      state.category = "";
      state.qty = 0;
      state.price = "any";
      state.addQty = 1;
      if (state.page === "event" || state.page === "superbowl") window.scrollTo(0, 0);
    }
    if (state.page === "cart" || state.page === "checkout" || state.page === "order" || state.page === "legal") {
      window.scrollTo(0, 0);
    }
  }

  function route() {
    parseHash();
    if (state.page === "event") renderEvent();
    else if (state.page === "cart") renderCart();
    else if (state.page === "checkout") renderCheckout();
    else if (state.page === "order") renderOrder();
    else if (state.page === "legal") renderLegal(state.legalDoc || "terms");
    else if (state.page === "story") {
      setView("story");
      requestAnimationFrame(scrollPageHash);
    } else if (state.page === "superbowl") {
      renderSuperbowl();
      requestAnimationFrame(scrollPageHash);
    } else {
      setView("home");
      renderHome();
      requestAnimationFrame(scrollPageHash);
    }
  }

  const search = document.getElementById("event-search");
  if (search) {
    search.addEventListener("input", () => {
      state.query = search.value.trim().toLowerCase();
      if (state.page === "home") renderHome();
    });
  }

  function onFilterClick(e) {
    const catBtn = e.target.closest("[data-category]");
    if (catBtn && catBtn.hasAttribute("data-category")) {
      const next = catBtn.getAttribute("data-category") || "";
      state.category = state.category === next ? "" : next;
      if (state.category && state.section) {
        const game = activeGame();
        const still = game && listingsFor(game).some(
          (r) => r.section === state.section && listingCategory(r) === state.category
        );
        if (!still) state.section = "";
      }
      state.openId = null;
      refreshShop();
      return;
    }
    const qtyBtn = e.target.closest("[data-qty]");
    if (qtyBtn) {
      state.qty = Number(qtyBtn.getAttribute("data-qty"));
      document.querySelectorAll(".filter-menu").forEach((m) => m.classList.remove("is-open"));
      refreshShop();
      return;
    }
    const priceBtn = e.target.closest("[data-price]");
    if (priceBtn) {
      state.price = priceBtn.getAttribute("data-price");
      document.querySelectorAll(".filter-menu").forEach((m) => m.classList.remove("is-open"));
      refreshShop();
      return;
    }
    const pill = e.target.closest(".filter-pill");
    if (pill) {
      const menu = pill.closest(".filter-menu");
      const open = menu.classList.contains("is-open");
      document.querySelectorAll(".filter-menu").forEach((m) => m.classList.remove("is-open"));
      if (!open) menu.classList.add("is-open");
    }
  }

  function onBowlOfferClick(e) {
    const btn = e.target.closest("[data-bowl-add]");
    if (!btn) return;
    const game = data.bowl;
    const offer = BOWL_OFFERS.find((o) => o.id === btn.getAttribute("data-bowl-add"));
    if (!game || !offer) return;
    addToCart({
      id: offer.id,
      slug: game.slug,
      href: "#superbowl",
      kind: "superbowl",
      title: `${gameTitle(game)} · ${offer.title}`,
      when: formatLong(game.date, game.time),
      venue: `${game.venue}, ${game.city}`,
      section: offer.section,
      row: offer.row,
      zone: offer.zone,
      price: offer.price,
      qty: 2,
      maxQty: offer.maxQty,
      away: "BOWL",
      home: "BOWL",
      category: offer.id,
      image: offer.image,
    });
    state.addingId = offer.id;
    state.cartExpired = false;
    fillBowlOffers(game);
    window.setTimeout(() => {
      state.addingId = null;
      location.hash = "cart";
    }, 450);
  }

  function onListingClick(e) {
    const game = activeGame();
    const add = e.target.closest("[data-add]");
    if (add) {
      const row = game && listingsFor(game).find((r) => r.id === add.getAttribute("data-add"));
      if (!game || !row || game.status === "final") return;
      const qty = Math.max(1, Math.min(state.addQty, row.qty, QTY_MAX));
      addToCart({
        id: row.id,
        slug: game.slug,
        href: gameHref(game),
        kind: game.kind || "game",
        title: gameTitle(game),
        when: formatLong(game.date, game.time),
        venue: `${game.venue}, ${game.city}`,
        section: row.section,
        row: row.row,
        zone: row.zone,
        price: row.price,
        qty,
        maxQty: Math.min(row.qty, QTY_MAX),
        away: game.away,
        home: game.home,
        awayName: game.awayName,
        homeName: game.homeName,
        category: listingCategory(row),
        image: VENUE_PHOTOS[game.stadium] || "/assets/venues/sofi.jpg",
      });
      state.addingId = row.id;
      state.cartExpired = false;
      refreshShop();
      window.setTimeout(() => {
        state.addingId = null;
        location.hash = "cart";
      }, 450);
      return;
    }
    const step = e.target.closest("[data-step]");
    if (step) {
      const listing = game && listingsFor(game).find((r) => r.id === state.openId);
      const max = listing ? Math.min(listing.qty, QTY_MAX) : QTY_MAX;
      state.addQty = Math.max(1, Math.min(max, state.addQty + Number(step.getAttribute("data-step"))));
      refreshShop();
      return;
    }
    const toggle = e.target.closest("[data-toggle]");
    if (toggle) {
      const id = toggle.getAttribute("data-toggle");
      state.openId = state.openId === id ? null : id;
      const row = game && listingsFor(game).find((r) => r.id === id);
      if (row && state.openId) {
        state.section = row.section;
        state.addQty = defaultAddQty(row);
      }
      refreshShop();
    }
  }

  function onPinClick(e) {
    const pin = e.target.closest("[data-section]");
    if (!pin) return;
    state.section = pin.getAttribute("data-section");
    state.openId = null;
    refreshShop();
  }

  function onMapClick(e) {
    const sec = e.target.closest("[data-section]");
    if (!sec) return;
    const id = sec.getAttribute("data-section");
    state.section = state.section === id ? "" : id;
    state.openId = null;
    refreshShop();
  }

  ["filter-bar", "bowl-filter-bar"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", onFilterClick);
  });
  const seatCategories = document.getElementById("seat-categories");
  if (seatCategories) seatCategories.addEventListener("click", onFilterClick);
  ["listing-list", "bowl-listing-list"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", onListingClick);
  });
  const bowlOfferGrid = document.getElementById("bowl-offer-grid");
  if (bowlOfferGrid) bowlOfferGrid.addEventListener("click", onBowlOfferClick);
  const bowlHospGrid = document.getElementById("bowl-hosp-grid");
  if (bowlHospGrid) {
    bowlHospGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-hosp-more]");
      if (!btn) return;
      const id = btn.getAttribute("data-hosp-more");
      state.hospOpenId = state.hospOpenId === id ? null : id;
      fillBowlHospitality();
    });
  }
  ["map-pins", "bowl-map-pins"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", onPinClick);
  });
  ["stadium-map", "bowl-stadium-map"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", onMapClick);
  });

  document.getElementById("cart-root").addEventListener("click", (e) => {
    const qtyBtn = e.target.closest("[data-cart-qty]");
    if (qtyBtn) {
      setCartQty(qtyBtn.getAttribute("data-cart-qty"), Number(qtyBtn.getAttribute("data-next")));
      renderCart();
      return;
    }
    const remove = e.target.closest("[data-remove]");
    if (remove) {
      removeCartLine(remove.getAttribute("data-remove"));
      renderCart();
      return;
    }
    if (e.target.closest("[data-clear]")) {
      clearCart();
      renderCart();
    }
  });

  document.getElementById("checkout-root").addEventListener("input", (e) => {
    if (e.target.id === "chk-card") {
      const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
      e.target.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }
    if (e.target.id === "chk-exp") {
      const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
      e.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }
    if (e.target.id === "chk-cvc") {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    }
  });

  document.getElementById("checkout-root").addEventListener("submit", (e) => {
    e.preventDefault();
    const items = readCart();
    if (!items.length) {
      location.hash = "cart";
      return;
    }
    const form = e.target.closest("form") || document.getElementById("checkout-form");
    const get = (name) => (form.elements[name] && form.elements[name].value.trim()) || "";
    const email = get("email");
    const first = get("first");
    const last = get("last");
    const phone = get("phone");
    const address = get("address");
    const city = get("city");
    const zip = get("zip");
    const card = get("card").replace(/\s/g, "");
    const exp = get("exp");
    const cvc = get("cvc");
    const cardname = get("cardname");
    const [mm, yy] = exp.split("/");
    const expOk = mm && yy && Number(mm) >= 1 && Number(mm) <= 12 && Number("20" + yy) >= new Date().getFullYear();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || first.length < 2 || last.length < 2 || phone.length < 8) {
      state.checkoutError = "Check your email, name, and phone number.";
      renderCheckout();
      return;
    }
    if (address.length < 5 || city.length < 2 || zip.length < 3) {
      state.checkoutError = "Check your billing address.";
      renderCheckout();
      return;
    }
    if (cardname.length < 2 || card.length < 13 || card.length > 19 || !expOk || cvc.length < 3) {
      state.checkoutError = "Check the card number, expiry, and CVC.";
      renderCheckout();
      return;
    }
    state.checkoutError = "";
    state.paying = true;
    renderCheckout();
    window.setTimeout(() => {
      const order = {
        id: newOrderId(),
        createdAt: new Date().toISOString(),
        email,
        first,
        last,
        phone,
        address,
        city,
        zip,
        state: get("state"),
        country: get("country"),
        items,
        total: cartTotal(items),
      };
      buildOrderPasses(order);
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      clearCart();
      state.paying = false;
      location.hash = "order";
    }, 700);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-menu")) {
      document.querySelectorAll(".filter-menu").forEach((m) => m.classList.remove("is-open"));
    }
  });

  window.addEventListener(CART_EVENT, updateCartBadge);
  window.addEventListener("storage", updateCartBadge);
  updateCartBadge();

  setInterval(() => {
    const deadline = readDeadline();
    if (deadline && deadline <= Date.now() && readCart().length) {
      clearCart();
      state.cartExpired = true;
      if (state.page === "cart" || state.page === "checkout") route();
      return;
    }
    const remain = (deadline || 0) - Date.now();
    document.querySelectorAll(".pn-timer strong").forEach((el) => {
      el.textContent = formatHold(remain);
    });
    document.querySelectorAll(".pn-timer").forEach((el) => {
      el.classList.toggle("is-urgent", remain > 0 && remain < 2 * 60 * 1000);
    });
  }, 1000);

  window.addEventListener("hashchange", route);
  route();
})();
