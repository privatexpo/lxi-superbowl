/**
 * Shared order helpers for email previews.
 * Reads the last paid order from localStorage (same key as the site).
 */
window.LXI_MAIL = (function () {
  const ORDER_KEY = "lxi_last_order";
  const TEAM_COLORS = {
    ARI: { primary: "#97233f", secondary: "#000000" },
    ATL: { primary: "#a71930", secondary: "#000000" },
    BAL: { primary: "#241773", secondary: "#000000" },
    BUF: { primary: "#00338d", secondary: "#c60c30" },
    CHI: { primary: "#0b162a", secondary: "#c83803" },
    CIN: { primary: "#fb4f14", secondary: "#000000" },
    DAL: { primary: "#003594", secondary: "#869397" },
    DEN: { primary: "#fb4f14", secondary: "#002244" },
    DET: { primary: "#0076b6", secondary: "#b0b7bc" },
    GB: { primary: "#203731", secondary: "#ffb612" },
    JAX: { primary: "#006778", secondary: "#d7a22a" },
    KC: { primary: "#e31837", secondary: "#ffb81c" },
    LAR: { primary: "#003594", secondary: "#ffa300" },
    LV: { primary: "#000000", secondary: "#a5acaf" },
    MIN: { primary: "#4f2683", secondary: "#ffc62f" },
    NE: { primary: "#002244", secondary: "#c60c30" },
    NO: { primary: "#101820", secondary: "#d3bc8d" },
    PHI: { primary: "#004c54", secondary: "#a5acaf" },
    PIT: { primary: "#101820", secondary: "#ffb612" },
    SEA: { primary: "#002244", secondary: "#69be28" },
    SF: { primary: "#aa0000", secondary: "#b3995d" },
    BOWL: { primary: "#0b1f4a", secondary: "#d4c4a0" },
  };

  function readOrder() {
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function newOrderId() {
    const t = Date.now().toString(36).toUpperCase();
    const r = Math.random().toString(36).slice(2, 8).toUpperCase();
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
    return String((h >>> 0) % 1e12).padStart(12, "0");
  }

  function qrPayload(code) {
    return `LXI-TICKET:${code}`;
  }

  function qrSrc(payload) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&margin=8&data=${encodeURIComponent(payload)}`;
  }

  function money(n) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
  }

  function moneyCents(n) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(n);
  }

  function teamColor(code) {
    return TEAM_COLORS[String(code || "").toUpperCase()] || { primary: "#1e3a8a", secondary: "#c4b5a0" };
  }

  function palette(item) {
    if (item.kind === "superbowl" || item.away === "BOWL") {
      const c = teamColor("BOWL");
      return { c1: c.primary, c2: c.secondary };
    }
    return { c1: teamColor(item.home).primary, c2: teamColor(item.away).primary };
  }

  function ensurePasses(order) {
    if (Array.isArray(order.passes) && order.passes.length) return order.passes;
    const passes = [];
    (order.items || []).forEach((item) => {
      const qty = Math.max(1, Number(item.qty) || 1);
      for (let i = 0; i < qty; i++) {
        const n = passes.length;
        const code = ticketCode(order.id, n);
        passes.push({
          ...item,
          passIndex: i + 1,
          passOfGroup: qty,
          passTotal: null,
          holder: i === 0 ? `${order.first} ${order.last}`.trim() : `Guest ${i}`,
          code,
          barcode: barcodeFromCode(code),
          qrPayload: qrPayload(code),
          personLabel: "1 person",
        });
      }
    });
    passes.forEach((p) => {
      p.passTotal = passes.length;
    });
    order.passes = passes;
    return passes;
  }

  function demoOrder() {
    const id = newOrderId();
    const order = {
      id,
      createdAt: new Date().toISOString(),
      email: "alex.martin@email.com",
      first: "Alex",
      last: "Martin",
      city: "Los Angeles",
      zip: "90001",
      state: "CA",
      country: "US",
      items: [
        {
          title: "Detroit Lions at Buffalo Bills",
          awayName: "Detroit Lions",
          homeName: "Buffalo Bills",
          away: "DET",
          home: "BUF",
          venue: "Highmark Stadium",
          section: "118",
          zone: "Lower bowl (100s) · Midfield",
          qty: 2,
          price: 515,
        },
      ],
      total: 1030,
    };
    ensurePasses(order);
    return order;
  }

  function getOrder() {
    const order = readOrder();
    if (order && order.id && (order.items || order.passes)) {
      ensurePasses(order);
      return order;
    }
    return demoOrder();
  }

  function shortTitle(item) {
    if (item.kind === "superbowl" || item.away === "BOWL") return "Super Bowl LXI";
    if (item.awayName && item.homeName) {
      return `${item.awayName.split(" ").pop()} at ${item.homeName.split(" ").pop()}`;
    }
    return item.title || "Event";
  }

  function fmtDate(iso) {
    if (!iso) return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return {
    ORDER_KEY,
    getOrder,
    ensurePasses,
    demoOrder,
    money,
    moneyCents,
    palette,
    shortTitle,
    qrSrc,
    qrPayload,
    barcodeFromCode,
    ticketCode,
    newOrderId,
    fmtDate,
    teamColor,
  };
})();
