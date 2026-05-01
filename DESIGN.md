---
name: Leech.ru Frontend
description: Product UI for medical leech education, ordering, and content editing
colors:
  action-olive: "#706900"
  action-olive-hover: "#807700"
  action-olive-pressed: "#918700"
  leech-hero-green: "#f4faef"
  leech-hero-mint: "#eef8f7"
  leech-hero-warm: "#fff7e8"
  leech-text-deep: "#203124"
  leech-text-muted: "#465247"
  leech-chip-active: "#f4f1cf"
typography:
  headline:
    fontFamily: "var(--tui-font-heading), var(--tui-font-text), system-ui, sans-serif"
    fontSize: "var(--tui-typography-heading-h2)"
    fontWeight: 800
  body:
    fontFamily: "var(--tui-font-text), system-ui, sans-serif"
    fontSize: "var(--tui-typography-text-m)"
    lineHeight: 1.65
  label:
    fontFamily: "var(--tui-font-text), system-ui, sans-serif"
    fontSize: "var(--tui-typography-ui-s)"
    fontWeight: 700
rounded:
  l: "var(--tui-radius-l)"
  xl: "var(--tui-radius-xl)"
  pill: "999rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.action-olive}"
    textColor: "#fbfbf7"
    rounded: "{rounded.l}"
    padding: "0 1rem"
  tabs-product:
    backgroundColor: "transparent"
    textColor: "{colors.leech-text-deep}"
    rounded: "0"
---

# Design System: Leech.ru Frontend

## 1. Overview

**Creative North Star: "The Calm Clinical Shelf"**

The product interface should feel like a reliable medical shelf in a real center: ordered, readable, factual, and still connected to living biological material. Taiga UI is the base vocabulary. Custom design should extend it through spacing, layout, text hierarchy, and a restrained olive accent, not through separate decorative widgets.

The system rejects esoteric cues, miracle-treatment language, marketplace urgency, discount noise, and excessive bordered cards. Long medical content should be easier to read than a cramped brochure: wide enough on desktop, structured with tabs and side contents, compact on mobile.

**Key Characteristics:**

- Product-first Taiga UI components with consistent tabs, buttons, forms, cards, and cells.
- Restrained olive accent for actions, active states, and key trust signals.
- Soft natural hero backgrounds only where the section needs context.
- Clear Russian copy, direct labels, no decorative complexity.

## 2. Colors

The palette is restrained: Taiga neutrals carry the interface, olive marks actions and active navigation, and leech-specific pages may use soft green, mint, and warm tints for natural context.

### Primary

- **Action Olive** (#706900): primary action color, active navigation, trusted emphasis.
- **Action Olive Hover** (#807700): hover state for links and primary controls.
- **Action Olive Pressed** (#918700): pressed state for primary controls.

### Neutral

- **Leech Deep Text** (#203124): headings on leech editorial surfaces.
- **Leech Muted Text** (#465247): long-form descriptions and secondary explanations.
- **Leech Hero Green** (#f4faef), **Mint** (#eef8f7), **Warm** (#fff7e8): soft contextual backgrounds for leech education, not general decoration.

### Named Rules

**The One Accent Rule.** Olive is for action, current position, and small trust signals. Do not scatter it as ornament.

## 3. Typography

**Display Font:** Taiga UI heading stack
**Body Font:** Taiga UI text stack
**Label/Mono Font:** Taiga UI text stack

**Character:** Use one product sans system. Hierarchy comes from Taiga type roles, weight, and whitespace rather than display-font personality.

### Hierarchy

- **Headline** (800, `var(--tui-typography-heading-h2)`): main leech section titles and page headings.
- **Title** (700, Taiga heading h5-h6): card headers, help blocks, subsection anchors.
- **Body** (regular, `var(--tui-typography-text-m)`, 1.6-1.75): long editorial content, capped by comfortable reading width.
- **Label** (700, `var(--tui-typography-ui-s)`): tabs, eyebrow labels, meta text, compact controls.

### Named Rules

**The Readability Rule.** Long article text gets the widest practical column before adding decoration. Do not sacrifice reading width to symmetrical sidebars.

## 4. Elevation

The system is mostly flat with Taiga surfaces, borders, and occasional soft shadows. Shadows are reserved for hero-level educational panels or existing Taiga floating cards. Product lists and form steps should use clear spacing and component states before adding new elevation.

### Shadow Vocabulary

- **Leech Hero Soft** (`0 1.5rem 4rem rgba(27, 43, 31, 0.08)`): only for large editorial hero panels.
- **Taiga Medium** (`var(--tui-shadow-medium)`): auth cards and Taiga floating surfaces.

### Named Rules

**The No Border Pile Rule.** Do not solve hierarchy by putting every block in a bordered box. Prefer tabs, headings, spacing, and Taiga cells.

## 5. Components

### Buttons

- **Shape:** Taiga default radius and sizing.
- **Primary:** action olive via global Taiga action variables.
- **Hover / Focus:** rely on Taiga states, preserve visible focus and contrast.
- **Secondary / Outline:** use Taiga appearances consistently.

### Tabs

- **Style:** use `tui-tabs`, `tuiTab`, and `tuiFade` for horizontal section navigation, matching the admin subheader pattern.
- **State:** active route is indicated by Taiga tab state, not custom pills unless the screen is mobile-only and tabs cannot fit.

### Cards / Containers

- **Corner Style:** Taiga `var(--tui-radius-l)` or `var(--tui-radius-xl)`.
- **Background:** Taiga base surfaces.
- **Shadow Strategy:** flat by default, floating only where Taiga already uses it.
- **Border:** one structural border per major surface when needed.
- **Internal Padding:** 1rem-2.5rem depending on density and screen size.

### Inputs / Fields

- **Style:** Taiga textfields and signal-form bindings.
- **Focus:** global Taiga action outline.
- **Error / Disabled:** Taiga validation states.

### Navigation

- **Style:** header navigation, admin tabs, and leech section tabs should share the same horizontal tab vocabulary where possible.
- **Mobile:** horizontal overflow is acceptable for tabs; avoid dense side navigation.

## 6. Do's and Don'ts

### Do:

- **Do** use Taiga UI patterns before custom components.
- **Do** keep leech article pages wide on desktop, with side metadata only where it helps.
- **Do** use olive for primary actions and active navigation.
- **Do** keep CMS-edited markdown readable and safe.
- **Do** make order steps understandable for private buyers first, while still usable by clinics.

### Don't:

- **Don't** make the interface look like эзотерика, народная магия, or miracle medicine.
- **Don't** use marketplace patterns: discount badges, urgency noise, crowded product cards.
- **Don't** create separate tab, pill, or navigation patterns when `tui-tabs` already fits.
- **Don't** use side-stripe borders as colored accents.
- **Don't** fill the page with identical bordered cards.
