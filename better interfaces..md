---
title: UI/UX Detailing & Micro-Interactions
description: Engineering guidelines for typography, surfaces, animations, and performance to create highly polished interfaces.
tags: [css, tailwind, ui, ux, animation, framer-motion, frontend]
---

# UI/UX Detailing Guidelines

This document outlines the specific rendering details, physical rules, and animation parameters that make interfaces feel premium and polished. 

## 1. Typography

### Text Wrapping
*   **`text-wrap: balance`:** Distributes text evenly across lines. **Only use on blocks of 6 lines or fewer** (headings, titles). Do not use on long paragraphs.
    *   *Tailwind:* `text-balance`
*   **`text-wrap: pretty`:** Prevents orphaned words on the last line. Does not equalize line length. Use as the **default for short-to-medium text** (paragraphs, descriptions, captions, list items).
    *   *Tailwind:* `text-pretty`
*   **Long Text (10+ lines):** Use neither. Leave default wrapping to avoid unnecessary layout cost.

### Font Smoothing (macOS)
Apply antialiased smoothing universally at the root to prevent text from rendering heavier than intended on macOS.
```tsx
// Tailwind
<html className="antialiased">
```
```css
/* CSS */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Tabular Numbers
Use `font-variant-numeric: tabular-nums` (`tabular-nums` in Tailwind) when numbers update dynamically to prevent layout shift.
*   **DO use for:** Counters, timers, live prices, table columns, scoreboards.
*   **DON'T use for:** Static display numbers, decorative numbers, phone numbers, version numbers.
*   *Caveat:* Some fonts (like Inter) will visually alter the digit `1` (wider, centered) when tabular numbers are enabled. This is expected.

---

## 2. Surfaces

### Concentric Border Radius
When nesting rounded elements, calculate the inner radius concentrically. 
**Formula:** `outerRadius = innerRadius + padding`
*   *Exception:* If padding is > `24px`, treat layers as separate surfaces and choose radii independently.
```tsx
// Good: 16px (2xl) = 8px (lg) + 8px (p-2)
<div className="rounded-2xl p-2">
  <div className="rounded-lg">...</div>
</div>
```

### Optical Alignment
When geometric centering looks off, manually adjust for visual balance.
*   **Buttons with Text + Icon:** `icon-side padding = text-side padding - 2px`
*   **Play Buttons:** Shift the triangle slightly to the right (`margin-left: 2px`).
*   **Asymmetric Icons (Stars, Carets):** Fix within the SVG viewBox whenever possible, otherwise adjust via margin.

### Shadows Instead of Borders
For buttons, cards, and containers using borders for depth, replace them with a subtle `box-shadow`. Shadows adapt to any background; solid borders do not.
*   **DO NOT** use shadows for layout dividers (`border-b`, table cells). Keep those as solid borders.

**Light Mode Shadow Layers:**
```css
:root {
  --shadow-border:
    0px 0px 0px 1px rgba(0, 0, 0, 0.06),
    0px 1px 2px -1px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.04);
}
```
**Dark Mode Shadow Layers:** (Single white ring, depth shadows invisible in dark mode)
```css
:root {
  --shadow-border: 0 0 0 1px rgba(255, 255, 255, 0.08);
}
```

### Image Outlines
Add a subtle `1px` outline with low opacity to images to create consistent depth.
*   **Light Mode (Non-negotiable):** Pure black — `rgba(0, 0, 0, 0.1)` or `outline-black/10`
*   **Dark Mode (Non-negotiable):** Pure white — `rgba(255, 255, 255, 0.1)` or `outline-white/10`
*   **Rules:** NEVER use a tinted scale (slate, zinc, project accents). It reads as dirt on the edge of the image. Always use `outline-offset: -1px` so it stays inset and doesn't affect layout.

### Minimum Hit Area
Interactive elements must have a minimum hit area of `44x44px` (or `40x40px`). If the visual element is smaller, extend the hit area via a pseudo-element.
```tsx
// Tailwind example extending a 20x20 button to 40x40
<button className="relative size-5 after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-1/2">
  <Icon />
</button>
```
*   *Collision Rule:* Hit areas of neighboring interactive elements must never overlap. Shrink the pseudo-element if necessary.

---

## 3. Animations

### Interruptible Animations
Always prefer CSS transitions for interactive elements (hover, toggle, open/close). Reserve CSS keyframes for one-shot sequences (loading, initial enter).
*   Transitions interpolate to the latest state gracefully if a user changes intent mid-animation. Keyframes snap or restart.

### Enter Animations: Split and Stagger
1.  **Split** into logical groups (title, description, buttons).
2.  **Stagger** with ~100ms delay between groups.
3.  **Combine** `opacity`, `blur`, and `translateY` for the enter effect.

### Exit Animations
Exit animations should be shorter, softer, and less attention-grabbing than enter animations (e.g., 150ms exit vs 300ms enter).
*   Use a small fixed `translateY` (e.g., `-12px`) instead of a full screen transition to indicate direction without stealing focus.

### Contextual Icon Animations
When animating icons on state changes (hover, active), strictly adhere to these parameters:
*   **Scale:** `0.25` → `1` (Never use 0.5 or 0.6)
*   **Opacity:** `0` → `1`
*   **Filter:** `blur(4px)` → `blur(0px)`
*   **Physics (Motion):** `{ type: "spring", duration: 0.3, bounce: 0 }` (**bounce must always be 0**)

**Implementation:**
*   *With Framer Motion:* Use `<AnimatePresence mode="popLayout">`.
*   *Without Motion:* Use absolute positioning to stack the icons and cross-fade them using CSS transitions with `cubic-bezier(0.2, 0, 0, 1)`.

### Scale on Press
Add tactile feedback to buttons with a subtle scale-down effect.
*   **Rule:** Always use `scale(0.96)`. Never use a value smaller than `0.95`.
*   *Implementation:* Use `transition-transform duration-150 ease-out active:scale-[0.96]`. Provide a `static` prop to disable this if the motion is distracting.

### Skip Animation on Page Load
Use `initial={false}` on `AnimatePresence` for elements that shouldn't animate in on page load (e.g., toggles, tabs, icons in default states).
*   *Warning:* Do not use `initial={false}` on staggered hero text or loading states where the initial sequence is the entire point.

---

## 4. Performance

### Transition Only What Changes
**Never use `transition: all` or Tailwind's `transition` shorthand.**
*   Always specify exact properties: `transition-[scale,background-color]`.
*   *Note:* Tailwind's `transition-transform` safely covers transform, translate, scale, and rotate. Use this if only animating transforms.

### Use `will-change` Sparingly
Only use `will-change` when you notice first-frame micro-stutters (especially in Safari).
*   **Valid properties:** `transform`, `opacity`, `filter`, `clip-path` (GPU-compositable).
*   **Invalid properties:** `all`, `top`, `left`, `width`, `height`, `background-color` (Not GPU-compositable, wastes memory).
```css
/* Good */
.animated-card { will-change: transform, opacity; }

/* Bad */
.animated-card { will-change: all; }
```
```

