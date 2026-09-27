#!/usr/bin/env python3
"""Parse the official 2026 NFL schedule dump into schedule.js."""
import json
import re
from pathlib import Path

SRC = Path("/Users/muller/.cursor/projects/Users-muller-Documents-Superbowl/agent-tools/e9099a13-e19b-4607-b3b1-523fd7e49dc3.txt")
OUT = Path("/Users/muller/Documents/Superbowl/schedule.js")

ABBR = {
    "Arizona Cardinals": "ARI",
    "Atlanta Falcons": "ATL",
    "Baltimore Ravens": "BAL",
    "Buffalo Bills": "BUF",
    "Carolina Panthers": "CAR",
    "Chicago Bears": "CHI",
    "Cincinnati Bengals": "CIN",
    "Cleveland Browns": "CLE",
    "Dallas Cowboys": "DAL",
    "Denver Broncos": "DEN",
    "Detroit Lions": "DET",
    "Green Bay Packers": "GB",
    "Houston Texans": "HOU",
    "Indianapolis Colts": "IND",
    "Jacksonville Jaguars": "JAX",
    "Kansas City Chiefs": "KC",
    "Las Vegas Raiders": "LV",
    "Los Angeles Chargers": "LAC",
    "Los Angeles Rams": "LAR",
    "Miami Dolphins": "MIA",
    "Minnesota Vikings": "MIN",
    "New England Patriots": "NE",
    "New Orleans Saints": "NO",
    "New York Giants": "NYG",
    "New York Jets": "NYJ",
    "Philadelphia Eagles": "PHI",
    "Pittsburgh Steelers": "PIT",
    "San Francisco 49ers": "SF",
    "Seattle Seahawks": "SEA",
    "Tampa Bay Buccaneers": "TB",
    "Tennessee Titans": "TEN",
    "Washington Commanders": "WSH",
}

VENUES = {
    "Melbourne": "MCG, Melbourne",
    "Paris": "Stade de France, Paris",
    "Rio de Janeiro": "Maracanã, Rio de Janeiro",
    "Tottenham": "Tottenham Hotspur Stadium, London",
    "Wembley": "Wembley Stadium, London",
    "Madrid": "Santiago Bernabéu, Madrid",
    "Munich": "Allianz Arena, Munich",
    "Mexico City": "Estadio Banorte, Mexico",
}

SCORES = {
    ("New England Patriots", "Seattle Seahawks"): {"away": 10, "home": 13, "status": "final"},
    ("San Francisco 49ers", "Los Angeles Rams"): {"away": 27, "home": 7, "status": "final", "neutral": True},
}

MONTHS = {
    "Jan": 1, "January": 1,
    "Feb": 2, "February": 2,
    "Mar": 3, "March": 3,
    "Apr": 4, "April": 4,
    "May": 5,
    "Jun": 6, "June": 6,
    "Jul": 7, "July": 7,
    "Aug": 8, "August": 8,
    "Sep": 9, "Sept": 9, "September": 9,
    "Oct": 10, "October": 10,
    "Nov": 11, "November": 11,
    "Dec": 12, "December": 12,
}

text = SRC.read_text()
start = text.find("WEEK 1 (Sept. 9–14)")
end = text.find("#### 2026 NFL International Games")
block = text[start:end]

week_re = re.compile(r"^WEEK (\d+)(?:\s+\(([^)]+)\))?\s*$", re.M)
day_re = re.compile(
    r"^(Wednesday|Thursday|Friday|Saturday|Sunday|Monday|Date TBD),?\s*(?:([A-Za-z]+)\.?\s+(\d+),?\s*(\d{4}))?\s*$"
)
row_re = re.compile(r"^\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$")
skip_header = re.compile(r"^\|\s*---")

weeks_seen = set()
current_week = None
current_day = None
current_date = None
games = []
gid = 1

for raw in block.splitlines():
    line = raw.strip()
    if not line:
        continue
    wm = week_re.match(line)
    if wm:
        w = int(wm.group(1))
        if w in weeks_seen:
            current_week = None
            continue
        weeks_seen.add(w)
        current_week = w
        current_day = None
        current_date = None
        continue
    if current_week is None:
        continue
    dm = day_re.match(line)
    if dm:
        current_day = dm.group(1)
        if dm.group(2):
            month = MONTHS[dm.group(2).rstrip(".")]
            current_date = f"{int(dm.group(4)):04d}-{month:02d}-{int(dm.group(3)):02d}"
        else:
            current_date = None
        continue
    if skip_header.match(line) or line.startswith("| ---"):
        continue
    rm = row_re.match(line)
    if not rm:
        continue
    matchup, time, network = [p.strip() for p in rm.groups()]
    if matchup in ("---",) or matchup.startswith("Date"):
        continue
    if matchup == "TBD":
        continue
    mm = re.match(r"^(.+?) (at|vs\.?|vs) (.+?)(?: \((.+)\))?$", matchup)
    if not mm:
        continue
    away, prep, home, loc = mm.group(1).strip(), mm.group(2), mm.group(3).strip(), mm.group(4)
    if away not in ABBR or home not in ABBR:
        raise SystemExit(f"Unknown team in: {matchup}")
    score = SCORES.get((away, home))
    game = {
        "id": f"g{gid}",
        "week": current_week,
        "phase": "regular",
        "date": current_date,
        "day": current_day,
        "kickoffEt": None if time.upper() == "TBD" else time.replace("p", " PM ET").replace("a", " AM ET"),
        "network": None if network.upper() == "TBD" else network.replace("*", "").replace("AMZ", "Amazon Prime").replace("NFLN", "NFL Network"),
        "away": {"name": away, "abbr": ABBR[away]},
        "home": {"name": home, "abbr": ABBR[home]},
        "neutral": bool(loc) or prep.startswith("vs"),
        "note": loc,
        "venue": VENUES.get(loc) if loc else None,
        "status": "scheduled",
    }
    if score:
        game["status"] = "final"
        game["away"]["score"] = score["away"]
        game["home"]["score"] = score["home"]
        if score.get("neutral"):
            game["neutral"] = True
    games.append(game)
    gid += 1

playoffs = [
    {
        "id": "wc",
        "week": 19,
        "phase": "playoff",
        "round": "Wild Card",
        "roundFr": "Wild Card round",
        "dateLabel": "January 16–18, 2027",
        "count": 6,
        "note": "Six games · 3 AFC + 3 NFC. The No. 1 seed in each conference gets a bye.",
        "status": "tba",
    },
    {
        "id": "div",
        "week": 20,
        "phase": "playoff",
        "round": "Divisional",
        "roundFr": "Divisional round",
        "dateLabel": "January 23–24, 2027",
        "count": 4,
        "note": "The No. 1 seed plays the lowest remaining seed.",
        "status": "tba",
    },
    {
        "id": "conf",
        "week": 21,
        "phase": "playoff",
        "round": "Conference",
        "roundFr": "Conference championships",
        "dateLabel": "Sunday, January 31, 2027",
        "count": 2,
        "note": "AFC Championship and NFC Championship. The winners meet in the Super Bowl.",
        "status": "tba",
        "games": [
            {"id": "afc-c", "name": "AFC Championship", "status": "tba"},
            {"id": "nfc-c", "name": "NFC Championship", "status": "tba"},
        ],
    },
    {
        "id": "sb",
        "week": 22,
        "phase": "superbowl",
        "round": "Super Bowl LXI",
        "roundFr": "Super Bowl LXI",
        "date": "2027-02-14",
        "dateLabel": "Sunday, February 14, 2027",
        "kickoffEt": "6:30 PM ET",
        "network": "ESPN / ABC",
        "venue": "SoFi Stadium, Inglewood",
        "away": {"name": "NFC champion", "abbr": "NFC"},
        "home": {"name": "AFC champion", "abbr": "AFC"},
        "status": "tba",
        "note": "First Super Bowl on February 14. First Super Bowl on ESPN.",
    },
]

by_week = {}
for g in games:
    by_week.setdefault(str(g["week"]), 0)
    by_week[str(g["week"])] += 1

payload = {
    "season": 2026,
    "source": "NFL Football Operations — official 2026 schedule",
    "regularSeason": "September 9, 2026 – January 10, 2027",
    "gameCount": len(games),
    "weeks": by_week,
    "games": games,
    "playoffs": playoffs,
}

OUT.write_text("window.SB_SCHEDULE = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n")
print(f"{len(games)} regular-season games")
print("weeks", json.dumps(by_week, sort_keys=True))
print("sum", sum(by_week.values()))
print("finals", [(g["away"]["abbr"], g["home"]["abbr"], g["away"].get("score"), g["home"].get("score")) for g in games if g["status"] == "final"])
