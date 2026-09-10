# Lakive Data Week — September 07, 2026

Week of Mon Sep 7 – Fri Sep 11 (Mon is Labour Day; StatCan/BoC closed).

## ✅ Released This Week

None so far (Mon). Carry-over from last week, not yet reflected in this brief cycle:

- **StatCan LFS, August 2026** (released Fri Sep 4) — 🔴 P0
  Unemployment 6.4% (unchanged). Employment −42,000 (−0.2%). Employment rate 60.8% (−0.1 pt). Youth 12.9%; 55+ 5.1%.
  Modules: Database, Compare, Ranking, City Pulse.
- **Bank of Canada** (Wed Sep 2) — 🟡 P2
  Policy rate held at 2.25% (7th consecutive hold). Prime 4.45%. Next decision Oct 28, 2026.
  Modules: Calculate (mortgage/affordability inputs), Guide.

## 🔜 Coming Soon

- **Rentals.ca × Urbanation National Rent Report** (August data) — expected **Tue Sep 8** — 🔴 P0 on release
  Prior (July data): national avg asking rent $2,037, −4.0% y/y (22nd straight annual decline), +0.2% m/m. Toronto −0.8% y/y, +1.5% m/m.
  Modules on release: Database, Compare, Ranking, Calculate, Guide, Report, City Pulse.
- **StatCan CPI (August)** — Sep 15–18 (next week) — 🟠 P1
- **CREA (August home sales/prices)** — Sep 15–18 (next week) — 🟠 P1

## ⚠️ Action Required

1. 🔴 Confirm LFS August figures are loaded in Database/City Pulse (city-level unemployment rates for CMAs).
2. 🔴 Tue Sep 8: pull Rentals.ca report on release; update city rent tables and Ranking; refresh rent-vs-income in Calculate.
3. 🟡 Verify Calculate uses 2.25% policy rate / 4.45% prime; no change needed if already set post-Jul 29.
4. Note: direct fetch of rentals.ca and statcan.gc.ca is blocked in this environment; figures above sourced via search. Verify against official pages before publishing.

Sources: [StatCan LFS Aug 2026](https://www150.statcan.gc.ca/n1/daily-quotidien/260904/dq260904a-eng.htm) · [BoC Sep 2 release](https://www.bankofcanada.ca/2026/09/fad-press-release-2026-09-02/) · [Rentals.ca National Rent Report](https://rentals.ca/national-rent-report)
