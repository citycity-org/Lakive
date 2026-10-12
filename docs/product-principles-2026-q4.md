# Lakive Product Principles — 2026 Q4

> Established: October 12, 2026  
> Owner: Lakive Research & Product  
> Status: Active — applies to all product decisions through Q4 2026

---

## Core Principle: Stability Before Complexity

**2026 Q4 is a stability quarter, not an expansion quarter.**

The goal is not to add new dimensions to the model. The goal is to make the existing three dimensions — City × Occupation × Property Type — accurate, consistent, explainable, and trustworthy.

Complexity added before reliability is achieved does not create a better product. It creates a more complicated one with the same underlying problems.

---

## Product Identity

Lakive is a **data-driven city life decision platform**.

- **Decision Engine** (core capability): Calculate, Ranking, Compare. Users input occupation, income, and housing conditions; the system returns city fit scores derived from a unified model.
- **Research & Intelligence** (credibility channel): Monthly Report, Quarterly Report, thematic studies, social content. These explain city economics and provide the context users need to interpret the Decision Engine's output.

The Decision Engine is the product. Research is how we earn the right to be trusted.

**Differentiation from WOWA**: WOWA's calculators solve specific real estate and financial problems (mortgage, affordability). Lakive's system serves cross-city, cross-occupation, comprehensive life decisions. These are different use cases — not competing answers to the same question.

---

## 2026 Q4 Scope Decisions

| Direction | Decision | Rationale |
|---|---|---|
| 现有数据一致性 | 优先完成 | Foundation for everything else |
| Calculate / Ranking / Compare 统一 | 优先完成 | Single source of truth via fit-engine.ts |
| 数据来源及版本管理 | 持续完善 | 可追溯性是信任的前提 |
| Household 维度 | **暂缓** | 增加维度前先解决现有三维的数据质量 |
| Property Type 细分 | 维持现有范围 | 5 types (1BR/2BR/3BR/Townhouse/Detached) is sufficient |
| 利率敏感性分析 | **保留研究方向，暂不开发交互功能** | Research first, validate, then productize if needed |
| Tier 1 图表归因 | 已完成 | ChartAttribution component on 4 surfaces |
| Tier 2/3 图表归因 | 待定 | Defer until content distribution is active |

---

## Data Quality Standard

Before adding any new model dimension or data source, the following four conditions must be met for existing data:

### 1. 一致性 (Consistency)
Calculate, Ranking, Compare, and City pages must use the same data version and computation logic. No page should derive scores independently of `lib/fit-engine.ts`.

**How we enforce it**: All score computations route through `computeScore()` and `buildCityMatrix()`. Pages that previously used hardcoded `FIT_MATRIX` values now override them at runtime using `buildCityMatrix()`.

### 2. 可追溯性 (Traceability)
Every displayed metric must be traceable to a data source, reference period, and geographic boundary.

**How we enforce it**: Data attribution footnotes added to Housing Reality section and City Index section on city pages (CA: CMHC/CREA/StatCan; US: BLS/Zillow/CareerOneStop). Monthly reports include a Data Sources section.

### 3. 可解释性 (Explainability)
Users must be able to understand what RPI, HPI, EOI, and other indices mean, and where their boundaries are.

**How we enforce it**: Methodology page documents indicator definitions, sources, update frequency, and model limitations. Exact scoring weights are not published (commercial IP). Monthly reports include the 指标分歧解释 (Indicator Divergence) module when indicators move in opposite directions.

### 4. 回归测试 (Regression Testing)
After any data or model update, an automated check must confirm that key city × occupation combinations have not shifted unexpectedly across pages.

**Status**: Not yet implemented. Planned as a CI script that computes a fixed set of reference scores after each fit-engine change and diffs against the previous version. Alert if any score changes by more than a defined threshold (e.g., ±3 points).

---

## Development Framework

> Research First → Validate the Model → Validate User Value → Build the Feature

Not every valuable research direction must become a new feature. The questions to ask before building:

1. **Research First**: Is there data that supports this direction? What does it show?
2. **Validate the Model**: Does the model produce stable, non-obvious results? (If every city scores the same, the model isn't useful.)
3. **Validate User Value**: Do users actually need to see this in the product, or is it sufficient as a research output?
4. **Build the Feature**: Only after the above three steps confirm the value.

### Applied to Rate Sensitivity Analysis

- **Research First**: Publish "How Mortgage Rates Change Housing Affordability Across Canadian Cities" — a report using uniform rate assumptions across cities.
- **Validate the Model**: Check whether rate changes produce meaningful ranking differences, or whether they affect all cities equally (in which case the ranking is rate-neutral and the current model is already correct).
- **Validate User Value**: If research shows users want to adjust rates themselves, add the interactive feature. If the model is rate-neutral, the research result itself is the value (demonstrates model robustness).
- **Build the Feature**: Only if step 3 confirms interactive need.

---

## IP Protection Rules

These rules apply to all published content (website, social, reports, PDF):

- **PUBLISH**: Indicator definitions, data sources, update frequency, model limitations, directional descriptions of what each factor captures.
- **DO NOT PUBLISH**: Exact weights between components, sub-index weights, numeric conversion tables (e.g., HPI tier thresholds), EOI numeric values.
- **Rationale**: The methodology can be transparent about what we measure and why. The commercial differentiation is in how we weight it.

Violation history: methodology page previously published full scoring formula and weights (Oct 10, 2026). Fixed in commits d166bb0 and 5b795fe.

---

## Open Items (not yet scheduled)

- [ ] Regression test CI script (回归测试 pillar)
- [ ] Rate sensitivity research report
- [ ] Tier 2 ChartAttribution (downloadable PNG) — defer until content distribution is active
- [ ] Halifax deep-dive report (mentioned in Sep 2026 monthly report)
- [ ] Improvement #4 (City × Occupation × Household × Property Type upgrade) — deferred to 2027

---

*This document should be updated whenever a major product or model decision is made. It is the single source of truth for "why we're not building X right now."*
