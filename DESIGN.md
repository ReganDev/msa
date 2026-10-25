---
name: Knight Osteopathy
description: Calm, clinical marketing site for an Orpington osteopath and sports massage therapist.
colors:
  cool-paper: "#f7f9fa"
  mist: "#eef3f4"
  surface: "#ffffff"
  slate-ink: "#1e2a32"
  slate-soft: "#3f4d56"
  clinic-teal: "#2f7d8a"
  deep-teal: "#24616b"
  sage: "#7fa6a0"
  sage-wash: "#dce8e7"
  hairline: "#e3e9ec"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.3rem, 5.4vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1.08
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.05rem, 4.6vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.12
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 500
    letterSpacing: "0.22em"
  price:
    fontFamily: "Newsreader, Georgia, serif"
    fontWeight: 500
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  pill: "999px"
spacing:
  container: "1120px"
  gutter: "1.25rem"
  section: "clamp(4rem, 9vw, 6.5rem)"
components:
  button-book:
    backgroundColor: "{colors.clinic-teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    height: "48px"
  button-book-hover:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.surface}"
  button-primary:
    backgroundColor: "{colors.clinic-teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.6rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.6rem"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
  panel-note:
    backgroundColor: "{colors.sage-wash}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.md}"
    padding: "1.35rem 1.5rem"
---

# Design System: Knight Osteopathy

## Overview

**Creative North Star: "The Calm Clinic"**

A quiet, well-lit treatment room. The site is a cool off-white ground with slate ink and one calm teal accent, so it reads as clean and unhurried rather than clinical-cold. Headings are set in Cormorant Garamond, which brings warmth and a sense of care; everything a patient has to read or act on is set in Jost, which keeps it plain and legible.

Density is comfortable, never packed: generous section padding, split section headings (title left, lead offset right) instead of centred stacks, and surfaces that rest rather than lift. Motion is short and opacity-led. Booking is the one action that is allowed to look different from everything else.

**Key Characteristics:**
- Cool paper ground (#f7f9fa), slate ink (#1e2a32), one teal accent (#2f7d8a).
- Serif headings for warmth, sans body for clarity.
- Soft, ink-tinted shadows; nothing glows.
- Rounded but not bubbly: three radius steps by surface rank.
- A single distinctive control: the split-capsule Book button.

## Colors

A restrained, cool palette: neutrals carry the page and teal is reserved for action, links and the few marks of emphasis.

### Primary
- **Clinic Teal** (#2f7d8a): the Book button, primary buttons, focus rings, active nav underline, list markers.
- **Deep Teal** (#24616b): link text, eyebrows and kickers, hover fill on the Book button, emphasis text on light grounds.

### Secondary
- **Sage** (#7fa6a0): decorative only — hover borders, quote marks. Never body text; it fails contrast.
- **Sage Wash** (#dce8e7): quiet emphasis panels (consult notes, red-flag notes), icon wells.

### Neutral
- **Cool Paper** (#f7f9fa): page background.
- **Mist** (#eef3f4): alternate sections, the CTA band, the blog's author panel.
- **Surface** (#ffffff): cards, framed photo borders, controls.
- **Slate Ink** (#1e2a32): body and heading text; the footer ground.
- **Slate Soft** (#3f4d56): secondary text, meta lines.
- **Hairline** (#e3e9ec): borders and dividers.

**The One Accent Rule.** Teal is the only hue. New UI uses the existing palette roles; it does not introduce a second accent.

## Typography

**Display Font:** Cormorant Garamond (with Georgia)
**Body Font:** Jost (with system-ui)
**Price Font:** Newsreader, subset to digits and £ — used for prices on /booking only.

**Character:** A literary serif for headings softens a clinical subject; a geometric sans for body keeps instructions and prices unambiguous.

### Hierarchy
- **Display** (600, clamp(2.3rem, 5.4vw, 3.6rem), 1.08): page hero titles.
- **Headline** (600, clamp(2.05rem, 4.6vw, 3rem), 1.12): section titles, balanced.
- **Title** (600, ~1.5rem, 1.2): card titles, blog list titles, article h2s.
- **Body** (400, 1rem–1.1rem, 1.65–1.7): running text; prose capped near 62–68ch.
- **Label** (500, 0.82rem, 0.22em tracking, uppercase): one eyebrow per hero, nav links (0.9rem, 0.06em).

**The Serif-For-Headings Rule.** Cormorant never sets body copy, buttons, or form text; Jost never sets display headings.

## Layout

Single centred container (`min(1120px, 100% - 2.5rem)`). Sections pad `clamp(4rem, 9vw, 6.5rem)` vertically and alternate Cool Paper and Mist. Section headings split into two columns from 861px (title left, lead right, aligned to the bottom) and stack below. Interior pages open with `.page-hero`: copy left, framed 4:5 photo right, clearing the fixed 84px nav. Reading surfaces (articles, the blog) narrow to a ~700px column. The full nav collapses to a menu below 1160px.

## Elevation & Depth

Hybrid: tonal layering does most of the work (Paper → Mist → Surface), with soft, ink-tinted shadows to seat cards and framed images. Cards do not lift on hover; buttons press on `:active`.

### Shadow Vocabulary
- **Soft** (`0 20px 45px -22px rgba(30, 55, 66, 0.32)`): framed hero photos, hovered cards.
- **Card** (`0 12px 30px -18px rgba(30, 55, 66, 0.22)`): resting cards.
- **Button** (`0 8px 18px -14px rgba(30, 55, 66, 0.5)`): primary and Book buttons.

**The Ink Shadow Rule.** Shadows are tinted with the ink, never with teal. A coloured shadow reads as a glow, not a surface.

## Shapes

Three radius steps by surface rank: large framed panels and photos (24px), cards and notes (16px), small controls and thumbnails (10px). Buttons and chips are full pills. Borders are 1px hairlines; framed photos get a 6px white border.

## Components

### Buttons
- **Shape:** full pill (999px), 48px tall (54px large).
- **Book (signature):** split capsule — label left, a 40px Deep Teal node with an arrow inset right. On hover a Deep Teal wipe sweeps leftward from the node and the arrow steps 2px forward. The only control with this treatment.
- **Primary:** Clinic Teal fill, white text, button shadow; hover to Deep Teal.
- **Ghost:** transparent with an ink border; hover fills ink.
- **Light:** white with hairline border and Deep Teal text.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Surface on Paper or Mist grounds.
- **Shadow Strategy:** Card at rest; hover changes border to Sage and shadow to Soft — no lift.
- **Border:** 1px hairline.

### Notes / Callouts
- **Style:** Sage Wash panel, 16px radius, 1px hairline, body-size text. Red-flag "get urgent help" notes use this treatment and are never collapsed.

### Navigation
- Fixed bar, transparent over the hero, turning translucent Paper with blur and a hairline once scrolled. Uppercase Jost links with a teal underline that scales in on hover and stays for the current page. Instagram circle and a compact Book button on the right; a menu toggle below 1160px.

### Blog article (signature)
- Text-first, ~700px column. Matthew's title, byline (48px circular photo, name, "Posted 2 weeks ago · 4 min read") and body sit together in one Mist panel with a 24px radius to mark them as his writing.

## Do's and Don'ts

### Do:
- **Do** keep teal for action and emphasis; let neutrals carry the page.
- **Do** use the split-capsule Book button for booking and nothing else.
- **Do** tint shadows with the ink (rgba(30, 55, 66, …)).
- **Do** keep red-flag safety notes visible and uncollapsed.
- **Do** respect `prefers-reduced-motion`; motion is opacity-led and under ~600ms.

### Don't:
- **Don't** introduce a second accent hue, gradients on text, or glows.
- **Don't** set body copy in Cormorant or headings in Jost.
- **Don't** make cards lift on hover.
- **Don't** add eyebrows to every section; one per hero.
- **Don't** fabricate testimonials, reviews or statistics to fill a layout.
