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

## 🛠 Styling Methodology
- **Vanilla CSS Priority**: Prioritize manual CSS styles over Tailwind utility classes. Use Tailwind only for quick layout adjustments if absolutely necessary.
- **CSS Variables**: ALWAYS use the defined CSS variables (`var(--primary)`, `var(--background)`, etc.) for colors, spacing, and other design tokens. DO NOT use hardcoded hex values or ad-hoc Tailwind colors.
- **Organization**: Create scoped CSS files or use module-based CSS when possible to keep styles organized and maintainable.

## 📱 Responsiveness
- **Mobile-First**: All layouts MUST be designed with a mobile-first approach.
- **Breakpoints**: Use standard breakpoints to ensure seamless transitions between mobile, tablet, and desktop views.
- **Fluidity**: Prefer fluid layouts (percentages, flexbox, grid) over fixed pixel widths to adapt to different screen sizes.
- **Touch Targets**: Ensure interactive elements are easily tappable on mobile devices (minimum size 44x44px where possible).

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
