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
- **CSS only — no Tailwind.** This project does not use Tailwind CSS. Style components with plain CSS.
- **CSS Modules per component**: every component that needs its own styling gets a co-located `ComponentName.module.css` (see `src/components/layout/sidebar.tsx` + `sidebar.module.css` for the reference pattern). Import it as `styles` and compose classes with `clsx` (`import clsx from 'clsx'`), e.g. `clsx(styles.root, isActive && styles.active, className)`.
- **`globals.css`** (`src/app/globals.css`) is reserved for: the `:root`/`.dark` design-token variables, the base reset, and the small set of already-shared semantic classes (`.btn`, `.btn-primary`, `.btn-outline`, `.card`, `.input-field`, `.alert*`, `.text-link`, `.field-group`, table element selectors). Do not add component-specific rules there — put them in that component's own module instead.
- **CSS Variables**: ALWAYS use the defined CSS variables (`var(--primary)`, `var(--background)`, etc.) for colors. DO NOT use hardcoded hex values for anything that has a token.
- **Variant/size axes** (e.g. a button's `variant`/`size` props): one CSS class per value (`.variantOutline`, `.sizeSm`, ...) picked via a small lookup object in the component, not a class-variance-authority-style helper.
- **Dark mode overrides**: the app toggles a literal `.dark` class on `<html>` (see `theme-provider.tsx`). Inside a CSS Module, target it with `:global(.dark) .yourClass { ... }` (see `sidebar.module.css` for examples). Prefer letting color tokens (`var(--*)`) do the work automatically — only reach for an explicit `:global(.dark)` override when a value isn't already token-driven.
- **Radix UI primitives** (`radix-ui` package, used under `src/components/ui/*`): style open/closed and other data-attribute states directly with attribute selectors in the component's module CSS, e.g. `.content[data-state="open"] { animation: ... }`. Radix's own runtime CSS variables (`--radix-select-trigger-width`, etc.) are plain CSS custom properties and can be used with `var(...)` directly.

## 📱 Responsiveness
- **Mobile-First**: All layouts MUST be designed with a mobile-first approach.
- **Breakpoints**: Use plain `@media (min-width: ...)` queries; match the existing breakpoints already used across the codebase (640px, 768px, 1024px, 1280px) rather than inventing new ones.
- **Fluidity**: Prefer fluid layouts (percentages, flexbox, grid) over fixed pixel widths to adapt to different screen sizes.
- **Touch Targets**: Ensure interactive elements are easily tappable on mobile devices (minimum size 44x44px where possible).

## 🧱 Component Guidelines
- **Border Radius**: Use the `--radius` token (0.625rem) as the base, or the existing `0.75rem`/`1rem` values already used by `.card`/`.input-field`/`.btn`, to maintain a modern, friendly feel. Never use sharp corners (`border-radius: 0`).
- **Spacing**: Use a plain rem-based scale (0.25rem increments, matching the values already used throughout `globals.css` and the component modules). Ensure generous white space to prevent visual clutter.
- **Transitions**: Every interactive element must have a smooth transition (e.g., `transition: all 0.2s ease;`).

## 🌗 Dark Mode
- Ensure dark mode support by relying on the CSS variable tokens, which already redefine themselves inside `.dark { ... }` in `globals.css`. Only add an explicit `:global(.dark) ...` selector in a component's module when a value genuinely isn't token-driven (e.g. a hardcoded decorative color).
- Background in dark mode: `var(--background)` (`#09090b`).
- Emerald colors should remain consistent as the primary accent.

## 🌑 Elevation and Shadows
- **Buttons**: Buttons and other interactive elements MUST NOT have shadows.
- **Vibrant Shadows**: DO NOT use colored or "neon" shadows. Shadows must always be dark/neutral (black or dark-tinted variants of the background).
- **Depth Use Case**: Shadows are reserved ONLY for creating a sense of depth and layer separation (e.g., between a menu/header and the page content, or a modal over its overlay).

## 🚫 Prohibitions
- DO NOT use Tailwind utility classes, `class-variance-authority`, or `tailwind-merge` — none of these are dependencies of this project anymore.
- DO NOT use plain red, blue, or green. Use only the emerald/zinc palette defined.
- DO NOT use sharp corners (`border-radius: 0`).
- DO NOT use font-weights heavier than `semibold` (600) for standard headings.
- DO NOT use shadows for decoration; use them only for structural depth.
