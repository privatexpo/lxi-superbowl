/**
 * Real bowl layouts: elongated stadium rings + official-style section numbers.
 * listed: sections that actually have best-deal inventory.
 * Within each level, price varies by view: Midfield > Corner > End zone.
 */
window.SB_STADIUMS = (function () {
  function seq(from, to) {
    const ids = [];
    for (let i = from; i <= to; i++) ids.push(i);
    return ids;
  }

  function prefixed(prefix, from, to) {
    return seq(from, to).map((n) => prefix + n);
  }

  function normDeg(a) {
    return ((a % 360) + 360) % 360;
  }

  function angDist(a, b) {
    const d = Math.abs(normDeg(a) - normDeg(b));
    return Math.min(d, 360 - d);
  }

  /** Horizontal bowls: sideline midfield ~90°/270°, end zones ~0°/180°. */
  function seatLocation(a0, a1) {
    const mid = normDeg((a0 + a1) / 2);
    const dEnd = Math.min(angDist(mid, 0), angDist(mid, 180));
    const dSide = Math.min(angDist(mid, 90), angDist(mid, 270));
    if (dSide <= 28) return { key: "midfield", label: "Midfield", factor: 1.14 };
    if (dEnd <= 32) return { key: "endzone", label: "End zone", factor: 0.84 };
    return { key: "corner", label: "Corner", factor: 1.0 };
  }

  function ring(ids, r0, r1, zone, mult, rows, opt) {
    opt = opt || {};
    const listed = new Set((opt.listed || []).map(String));
    const origin = opt.start == null ? -6 : opt.start;
    const span = opt.span == null ? 360 : opt.span;
    const step = span / ids.length;
    return ids.map((id, i) => {
      const a0 = origin + i * step;
      const a1 = origin + (i + 1) * step;
      const loc = seatLocation(a0, a1);
      const m = Math.round(mult * loc.factor * 1000) / 1000;
      return {
        id: String(id),
        zone: `${zone} · ${loc.label}`,
        location: loc.key,
        r0,
        r1,
        a0,
        a1,
        mult: m,
        rows: rows || 3,
        rowKind: opt.rowKind || "num",
        listed: listed.has(String(id)),
      };
    });
  }

  const NFL = { sport: "nfl", n: 5.4, rx: 252, ry: 122, cx: 280, cy: 156, view: "0 0 560 312", fw: 186, fh: 78 };
  const SOCCER = { sport: "nfl", n: 4.0, rx: 228, ry: 156, cx: 270, cy: 188, view: "0 0 540 376", fw: 176, fh: 82 };
  const ARENA = { sport: "nfl", n: 2.7, rx: 220, ry: 158, cx: 270, cy: 188, view: "0 0 540 376", fw: 156, fh: 102 };

  function bowl(base, extra) {
    return Object.assign({ field: "FIELD", visitor: "VISITORS" }, base, extra);
  }

  return {
    highmark: bowl(NFL, {
      name: "Highmark Stadium",
      home: "BILLS",
      sections: [
        ...ring(seq(101, 142), 0.44, 0.62, "Lower bowl (100s)", 0.84, 3, {
          listed: [101, 104, 107, 110, 114, 118, 122, 126, 130, 134, 138, 142],
        }),
        ...ring(seq(201, 238), 0.655, 0.79, "Club level (200s)", 1.18, 3, {
          listed: [201, 208, 214, 222, 230, 238],
        }),
        ...ring(seq(301, 336), 0.81, 0.97, "Upper bowl (300s)", 0.6, 3, {
          listed: [306, 312, 318, 324, 330, 336],
        }),
      ],
    }),
    lambeau: bowl(NFL, {
      name: "Lambeau Field",
      home: "PACKERS",
      n: 6.4,
      rx: 248,
      ry: 112,
      sections: [
        ...ring(seq(101, 136), 0.44, 0.6, "100-level", 0.88, 3, {
          listed: [101, 107, 113, 119, 125, 131],
        }),
        ...ring(seq(301, 354), 0.63, 0.74, "300-level", 0.74, 3, {
          listed: [304, 320, 336, 350],
        }),
        ...ring(seq(630, 650), 0.76, 0.85, "Club / 600s", 1.16, 3, {
          listed: [632, 642, 648],
        }),
        ...ring(seq(730, 754), 0.87, 0.98, "700-level", 0.56, 3, {
          listed: [732, 738, 744, 750],
        }),
      ],
    }),
    lincoln: bowl(NFL, {
      name: "Lincoln Financial Field",
      home: "EAGLES",
      sections: [
        ...ring(seq(101, 142), 0.44, 0.62, "Lower bowl", 0.86, 3, { listed: [101, 108, 114, 120, 124, 130, 136, 142] }),
        ...ring(["C8", 201, "C16", 218, "C24", 234], 0.655, 0.79, "Club / mezzanine", 1.08, 3, {
          listed: ["C8", 201, "C16", 218, "C24", 234],
        }),
        ...ring(seq(301, 342), 0.81, 0.97, "Upper bowl", 0.58, 3, { listed: [309, 318, 330, 342] }),
      ],
    }),
    att: bowl(NFL, {
      name: "AT&T Stadium",
      home: "COWBOYS",
      n: 4.6,
      rx: 258,
      sections: [
        ...ring(prefixed("C", 107, 142), 0.44, 0.6, "Hall of Fame Club", 1.22, 3, { listed: ["C107", "C118", "C130", "C142"] }),
        ...ring(seq(201, 238), 0.63, 0.78, "Mezzanine", 1.08, 3, { listed: [214, 222, 230, 238] }),
        ...ring(seq(401, 448), 0.81, 0.97, "Upper 400s", 0.56, 3, { listed: [415, 425, 433, 440] }),
      ],
    }),
    lumen: bowl(NFL, {
      name: "Lumen Field",
      home: "SEAHAWKS",
      n: 4.8,
      rx: 256,
      sections: [
        ...ring(seq(100, 148), 0.44, 0.62, "Lower bowl", 0.86, 3, { listed: [100, 107, 114, 121, 130, 141, 148] }),
        ...ring(seq(200, 239), 0.655, 0.79, "Club / 200s", 1.16, 3, { listed: [210, 229] }),
        ...ring(seq(300, 339), 0.81, 0.97, "Summit 300s", 0.54, 3, { listed: [300, 308, 318, 330, 339] }),
      ],
    }),
    sofi: bowl(NFL, {
      name: "SoFi Stadium",
      home: "RAMS",
      n: 3.2,
      rx: 248,
      ry: 132,
      sections: [
        ...ring(seq(101, 142), 0.42, 0.58, "Lower bowl", 0.9, 3, { listed: [101, 108, 120, 132, 140] }),
        ...ring(seq(201, 248), 0.61, 0.76, "Club / 200s", 1.18, 3, { listed: [214, 226, 238] }),
        ...ring(seq(301, 342), 0.79, 0.96, "Upper 300s", 0.56, 3, { listed: [318, 330, 342] }),
      ],
    }),
    soldier: bowl(NFL, {
      name: "Soldier Field",
      home: "BEARS",
      n: 6.2,
      look: "soldier",
      sections: [
        ...ring(seq(120, 150), 0.44, 0.64, "Sideline 100s / 200s", 0.88, 3, {
          start: -38,
          span: 76,
          listed: [120, 130, 140, 150],
        }),
        ...ring(seq(220, 250), 0.44, 0.64, "Sideline 100s / 200s", 0.88, 3, {
          start: 142,
          span: 76,
          listed: [232, 242],
        }),
        ...ring(seq(101, 118), 0.44, 0.58, "North / south 100s", 0.82, 3, { start: 52, span: 76, listed: [] }),
        ...ring(seq(151, 168), 0.44, 0.58, "North / south 100s", 0.82, 3, { start: 232, span: 76, listed: [] }),
        ...ring(seq(340, 356), 0.7, 0.88, "Upper 300s / 400s", 0.58, 3, {
          start: -36,
          span: 72,
          listed: [340, 348],
        }),
        ...ring(seq(440, 456), 0.7, 0.88, "Upper 300s / 400s", 0.58, 3, {
          start: 144,
          span: 72,
          listed: [440, 448],
        }),
      ],
    }),
    allegiant: bowl(NFL, {
      name: "Allegiant Stadium",
      home: "RAIDERS",
      n: 4.2,
      sections: [
        ...ring(prefixed("C", 101, 145), 0.44, 0.6, "Club lower", 1.12, 3, { listed: ["C109", "C121", "C133", "C145"] }),
        ...ring(seq(201, 239), 0.63, 0.78, "200-level", 0.86, 3, { listed: [201, 213, 225] }),
        ...ring(seq(301, 339), 0.81, 0.97, "300-level", 0.54, 3, { listed: [309, 321, 333] }),
      ],
    }),
    empower: bowl(NFL, {
      name: "Empower Field at Mile High",
      home: "BRONCOS",
      sections: [
        ...ring(seq(101, 142), 0.44, 0.62, "Lower bowl", 0.86, 3, { listed: [114, 122, 130, 138] }),
        ...ring(seq(201, 238), 0.655, 0.79, "Club", 1.14, 3, { listed: [222, 230, 238] }),
        ...ring(seq(301, 338), 0.81, 0.9, "Upper bowl", 0.52, 3, { listed: [330, 338] }),
        ...ring(seq(501, 520), 0.91, 0.98, "Upper bowl", 0.52, 3, { listed: [504] }),
      ],
    }),
    paris: bowl(ARENA, {
      name: "Paris La Défense Arena",
      home: "NFL",
      visitor: "PARIS",
      field: "FIELD",
      sections: [
        ...ring(seq(101, 126), 0.48, 0.7, "Lower bowl", 0.92, 3, { listed: [101, 110, 118, 126] }),
        ...ring(seq(201, 218), 0.74, 0.96, "Upper bowl", 0.58, 3, { listed: [201, 210, 218] }),
      ],
    }),
    azteca: bowl(SOCCER, {
      name: "Estadio Azteca",
      home: "NFL",
      visitor: "MEXICO",
      field: "FIELD",
      n: 3.1,
      sections: [
        ...ring(seq(101, 146), 0.46, 0.68, "Preferente", 0.88, 3, { listed: [110, 122, 134, 146] }),
        ...ring(seq(301, 334), 0.74, 0.97, "General", 0.5, 3, { listed: [310, 322, 334] }),
      ],
    }),
    bernabeu: bowl(SOCCER, {
      name: "Santiago Bernabéu",
      home: "NFL",
      visitor: "MADRID",
      field: "FIELD",
      n: 6.2,
      sections: [
        ...ring(seq(101, 140), 0.46, 0.68, "Fondo / Lateral", 0.9, 3, { listed: [110, 120, 130, 140] }),
        ...ring(seq(401, 430), 0.74, 0.97, "Tercera", 0.52, 3, { listed: [410, 420, 430] }),
      ],
    }),
    allianz: bowl(SOCCER, {
      name: "Allianz Arena",
      home: "NFL",
      visitor: "MUNICH",
      field: "FIELD",
      n: 3.4,
      sections: [
        ...ring(seq(101, 148), 0.46, 0.68, "Unterrang", 0.88, 3, { listed: [112, 124, 136, 148] }),
        ...ring(seq(301, 336), 0.74, 0.97, "Oberrang", 0.54, 3, { listed: [312, 324, 336] }),
      ],
    }),
    wembley: bowl(SOCCER, {
      name: "Wembley Stadium",
      home: "NFL",
      visitor: "LONDON",
      field: "FIELD",
      n: 3.8,
      sections: [
        ...ring(seq(101, 141), 0.46, 0.66, "Lower tier", 0.9, 3, { listed: [101, 112, 124, 136] }),
        ...ring(seq(201, 232), 0.68, 0.8, "Middle tier", 0.7, 3, { listed: [] }),
        ...ring(seq(501, 532), 0.83, 0.97, "Upper tier", 0.52, 3, { listed: [501, 512, 524] }),
      ],
    }),
    mcg: bowl(SOCCER, {
      name: "Melbourne Cricket Ground",
      home: "RAMS",
      visitor: "49ERS",
      field: "MCG",
      n: 2.5,
      sections: [
        ...ring(["M10", "M18", "M26", "M32"], 0.46, 0.64, "Level 1 (M)", 0.9, 3, {
          rowKind: "letter",
          listed: ["M10", "M18", "M26", "M32"],
        }),
        ...ring(["N14", "N22"], 0.67, 0.78, "Level 2 (N)", 0.76, 3, { rowKind: "letter", listed: ["N14", "N22"] }),
        ...ring(["P16", "P28"], 0.8, 0.88, "Level 3 (P)", 0.6, 3, { rowKind: "letter", listed: ["P16", "P28"] }),
        ...ring(["Q20", "Q30"], 0.9, 0.98, "Level 4 (Q)", 0.48, 3, { rowKind: "letter", listed: ["Q20", "Q30"] }),
      ],
    }),
    maracana: bowl(SOCCER, {
      name: "Maracanã Stadium",
      home: "COWBOYS",
      visitor: "RAVENS",
      field: "FIELD",
      n: 3.2,
      sections: [
        ...ring(["Oeste 6", "Oeste 12", "Norte 8", "Norte 14", "Leste 10", "Leste 16", "Sul 4", "Sul 11"], 0.46, 0.7, "Inferior", 0.84, 3, {
          listed: ["Oeste 6", "Oeste 12", "Norte 8", "Norte 14", "Leste 10", "Leste 16", "Sul 4", "Sul 11"],
        }),
        ...ring(["Oeste Sup 5", "Norte Sup 9", "Leste Sup 7", "Sul Sup 3"], 0.76, 0.97, "Superior", 0.5, 3, {
          listed: ["Oeste Sup 5", "Norte Sup 9", "Leste Sup 7", "Sul Sup 3"],
        }),
      ],
    }),
  };
})();
