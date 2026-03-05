---
description: Rule for keeping the finance app design system consistent.
---

# Design System Rules

All code changes related to the UI of this Finance App MUST strictly adhere to the following design system rules:

## 🎨 Color Palette
- **Primary**: Emerald 600 (`#059669`) / Emerald 500 (`#10b981`) for dark mode. Always use for primary actions.
- **Backgrounds**: Use `var(--background)` for pages and `var(--card)` for surfaces.
- **Neutrals**: Rely on the Zinc-based palette (`var(--muted)`, `var(--accent)`, `var(--border)`).
- **Semantic States**:
    - **Success**: Emerald/Teal variants (`var(--success)`).
    - **Warning**: Amber/Orange variants (`var(--warning)`).
    - **Destructive**: Rose/Red variants (`var(--destructive)`).

## 🧱 Component Guidelines
- **Border Radius**: Always use `rounded-xl` (12px) for cards, buttons, and inputs to maintain a modern, friendly feel.
- **Spacing**: Use standard Tailwind spacing scales. Ensure generous white space to prevent visual clutter.
- **Transitions**: Every interactive element must have a smooth transition (e.g., `transition-all duration-200`).

## 🌗 Dark Mode
- Ensure dark mode support by using Tailwind's `dark:` prefix.
- Background in dark mode: `Zinc 950`.
- Emerald colors should remain consistent as the primary accent.

## 🌑 Elevation and Shadows
- **Buttons**: Buttons and other interactive elements MUST NOT have shadows.
- **Vibrant Shadows**: DO NOT use colored or "neon" shadows. Shadows must always be dark/neutral (black or dark-tinted variants of the background).
- **Depth Use Case**: Shadows are reserved ONLY for creating a sense of depth and layer separation (e.g., between a menu/header and the page content).

## 🚫 Prohibitions
- DO NOT use plain red, blue, or green. Use only the emerald/zinc palette defined.
- DO NOT use sharp corners (default `rounded-none`).
- DO NOT use font-weights heavier than `semibold` (600) for standard headings.
- DO NOT use shadows for decoration; use them only for structural depth.
