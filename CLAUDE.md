# Vida — Class Management System

Engineering handoff for the Vida class-management platform (formerly "Sayaw"). One database backs three surfaces: a desktop admin console, a parent-facing PWA, and a teacher mobile view. All three share the tokens, components, and patterns below.

**Tenant defaults in mocks:** brand "Vida", location "Cebu, Philippines", primary admin "Monica Villarica" (Center Admin). Branding is overrideable per tenant (see `Settings - Branding.html`).

---

## 1 · Design Tokens

All tokens are CSS custom properties declared in `:root`. Reference them by var, never hardcode hex.

### Color — primary & highlight

| Token | Hex | Use |
|---|---|---|
| `--accent` | `#1F1B3A` | Primary brand. Buttons, sidebar mark, active nav, headings ink. |
| `--accent-glow` | `#2D2750` | Primary hover. |
| `--accent-light` | `#ECE6F9` | Soft tint behind primary. Alias of `--highlight-soft`. |
| `--highlight` | `#C8B6F0` | Secondary accent (lavender). Selected tiles, progress fill, recital tags. |
| `--highlight-soft` | `#ECE6F9` | Focus rings, avatar fill, tag tint. |

### Color — pastel secondaries

| Token | Hex | Pair tint |
|---|---|---|
| `--peach` | `#F5C99A` | `--peach-bg #FBEFDF` |
| `--mint` | `#A8D2BA` | `--mint-bg #E2F1EA` |
| `--blush` | `#F1B8B0` | `--blush-bg #FBE5E2` |

Use pastels for category coding (class types, recital strips, info tiles). Never use them for status.

### Color — status

Status colors are the **only** ones permitted to convey state. Each comes with a tint:

| Token | Hex | Tint | Meaning |
|---|---|---|---|
| `--green` | `#2F7D5C` | `--green-bg #E2F1EA` | Paid, Active, On track |
| `--amber` | `#B45309` | `--amber-bg #FBEFDF` | Pending, Awaiting action |
| `--red` | `#B91C1C` | `--red-bg #FBE5E2` | Overdue, Error, Conflict |
| `--purple` | `#6D28D9` | `--purple-bg #ECE6F9` | Teacher / Payroll module |
| `--teal` | `#0E7C8A` | `--teal-bg #DBEEF0` | Adult learner / Messaging module |

### Color — neutrals (cool)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1A1A2E` | Body & headings. |
| `--ink-2` | `#3D3F58` | Secondary text. |
| `--ink-3` | `#6B6E85` | Labels, muted body. |
| `--ink-4` | `#A4A7BD` | Placeholder, disabled icon. |
| `--ink-5` | `#C9CBDB` | Disabled fill. |
| `--surface` | `#FFFFFF` | Cards, sidebar, topbar. |
| `--surface-2` | `#F5F6FA` | Page canvas. |
| `--surface-3` | `#ECEEF5` | Row hover, table zebra. |
| `--surface-4` | `#DFE2EC` | Disabled chrome. |
| `--border` | `#E4E7EE` | Standard 1px rule. |
| `--border-2` | `#D6DAE4` | Slightly stronger (inputs, dividers under load). |

### Typography

One family does every job — **DM Sans** (Google Fonts, opsz 9–40, weights 400 / 500 / 600 / 700 / 800, plus 400 italic).

```css
--font-body:  "DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--font-serif: "DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; /* alias */
--font-mono:  "DM Sans", ui-monospace, "JetBrains Mono", Menlo, monospace;        /* alias */
```

The `--font-serif` and `--font-mono` aliases exist for back-compat with older CSS — both point at DM Sans. In new code use `--font-body` only.

**Type scale** (all DM Sans):

| Class | Size / line | Weight | Tracking | Use |
|---|---|---|---|---|
| `.t-display` | 56 / 57 | 700 | -3.5% | Marketing hero, empty states |
| `.t-h1` | 36 / 40 | 700 | -2.8% | Page H1 |
| `.t-h2` | 26 / 30 | 700 | -2.2% | Section H2, modal titles |
| `.t-h3` | 20 / 25 | 700 | -1.2% | Card titles |
| `.t-h4` | 16 / 21 | 600 | -0.5% | Row titles |
| `.t-body` | 14.5 / 22 | 400 | -0.5% | Body copy |
| `.t-caption` | 12.5 / 17 | 500 | 0 | Captions |
| `.t-mono` (eyebrow / label) | 11 / 15 | 600 | +12% upper | Eyebrows, metadata, table headers |

Body default for `<body>` is `14px / 1.5`, letter-spacing `-.005em`.

### Spacing scale

Base unit **4px**. Use these tokens via padding/margin/gap; do not invent in-between values.

| Token | px | Common use |
|---|---|---|
| `--space-1` | 4 | Hairline gap, tag padding inset |
| `--space-2` | 8 | Tight stack (avatar + label), button gap |
| `--space-3` | 12 | Default card-internal gap |
| `--space-4` | 16 | Section gap, table cell vertical |
| `--space-5` | 20 | Card padding |
| `--space-6` | 24 | Section header to body, table cell horizontal |
| `--space-7` | 32 | Page margins, header strip |
| `--space-8` | 48 | Major section spacing |

### Radius

| Token | px | Use |
|---|---|---|
| `--r-input` | 8 | Inputs, small buttons, tags (when squared) |
| `--r-card` | 12 | Standard card, alert |
| `--r-card-lg` | 18 | Major card (KPI, settings, hero) |
| `--r-modal` | 24 | Modal, sheet |

Pills: `border-radius: 99px` (not a token; semantically full-round).

### Shadow

| Token | Definition | Use |
|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(15,23,42,.05), 0 1px 3px rgba(15,23,42,.04)` | Resting card |
| `--shadow-hover` | `0 6px 18px rgba(15,23,42,.08), 0 2px 4px rgba(15,23,42,.04)` | Hover lift on interactive card |
| `--shadow-pop` | `0 12px 32px rgba(15,23,42,.10), 0 2px 6px rgba(15,23,42,.05)` | Popovers, modals |

---

## 2 · Component Spec

Every component below is documented as it exists in the mock HTML. Class names are exact — preserve them in production.

### 2.1 Sidebar nav (desktop)

```
.sidebar
├── .brand
│   ├── .brand-mark        // 34×34, var(--accent) bg, white "V" 700, -2% track
│   ├── .brand-name        // DM Sans 18 / 700 / -1.5% track, ink
│   └── .brand-sub         // 11px / 500 / ink-3 (e.g. "Cebu, Philippines")
├── .nav-section
│   ├── .nav-label         // 10.5px upper / 600 / +14% track / ink-4
│   └── .nav-item          // see states below
│       └── .nav-badge     // optional, 11px / 600, --highlight bg, --accent text
└── .sidebar-foot
    └── .user-pill
        ├── .avatar (32×32, --highlight-soft bg, --accent letter)
        ├── .user-name (13 / 600 / ink)
        └── .user-role (11 / 500 / ink-3)
```

| Prop | Value |
|---|---|
| Width | 220px (admin); 248px (settings) |
| Bg | `var(--surface)` |
| Border | `1px solid var(--border)` on right edge |
| Padding | `22px 14px 18px` |
| Position | sticky, `top: 0`, `height: 100vh` |

`.nav-item` states:

| State | Bg | Color | Notes |
|---|---|---|---|
| default | transparent | `--ink-2` | 8px radius, 13.5px / 500 |
| hover | `--surface-2` | `--ink` | icon → `--ink-2` |
| active | `--accent` | `#fff` | 600 weight, icon white |
| sub-item (`.nav-sub a`) | transparent | `--ink-3` | indented 28px, fills `--surface-2` on hover |
| current sub (`.is-current`) | `--highlight-soft` | `--ink` | 600 |

### 2.2 Top bar

```
.topbar
├── .top-title  (or crumbs row)
└── .topbar-actions
```

| Prop | Value |
|---|---|
| Height | 56px (admin) / 60px (settings) |
| Bg | `var(--surface)` |
| Border-bottom | `1px solid var(--border)` |
| Position | sticky, `top: 0`, `z-index: 10` |
| Padding | `0 28px` (admin) / `0 36px` (settings) |

`.top-title` is DM Sans 20 / 700 / -1.8% track. Crumbs (`.crumbs`) is 13 / 500 / `--ink-3`, with `.cur` 600 / `--ink`.

### 2.3 Stat / KPI card

```
.stat[.is-blue|.is-green|.is-amber|.is-purple]
├── .stat-top  (icon + period chip)
│   ├── .stat-icon[.is-green|.is-amber|.is-purple]
│   └── .stat-period
├── .stat-label  (eyebrow)
├── .stat-value  (number, optional .currency)
└── .stat-foot   (.stat-delta + .stat-note)
```

| Prop | Value |
|---|---|
| Bg | `var(--surface)` |
| Border | `1px solid var(--border)` |
| Radius | `var(--r-card-lg)` (18px) |
| Padding | `18px 20px 20px` |
| Shadow | `var(--shadow-card)` → `var(--shadow-hover)` on hover (`translateY(-1px)`) |

`.stat-icon` is 36×36, radius 10px. Color pairs:

- `.is-blue` → `--accent-light` bg, `--accent` icon
- `.is-green` → `--green-bg`, `--green`
- `.is-amber` → `--amber-bg`, `--amber`
- `.is-purple` → `--purple-bg`, `--purple`

`.stat-value` is DM Sans 34 / 1 / 700 / -2.5%. `.stat-delta` is a 11.5px pill, `--green-bg` / `--green` by default; `.is-down` → red pair; `.is-flat` → `--surface-3` / `--ink-3`. Layout: 4-up on desktop, 2-up under 768px.

### 2.4 Data table

```
.tbl-wrap          → border, surface, radius var(--r-card-lg), overflow hidden, shadow-card
└── table.tbl
    ├── thead th   → eyebrow style (11/600/upper/.1em track)
    └── tbody td   → 14/22, ink
```

| Prop | Value |
|---|---|
| Header bg | `var(--surface)` |
| Header border-bottom | `1px solid var(--border)` |
| Header padding | `14px 18px` |
| Row padding | `14px 18px` |
| Row border-bottom | `1px solid var(--border)` (none on last) |
| Even row bg | `var(--surface-2)` (zebra) |
| Row hover bg | `var(--surface-3)` |

Specialized cells: `.col-num` (12.5 / 500 / ink-3, tabular-nums), `.col-amt` (right-aligned, 600, tabular-nums), `.name-cell` (flex, avatar 10px gap, then text).

### 2.5 Status badge / tag

```
.tag.tag-[green|amber|red|blue|teal|purple|gray]
.tag.tag-outline.tag-[green|amber]
```

| Prop | Value |
|---|---|
| Shape | pill (`border-radius: 99px`) |
| Padding | `5px 10px` |
| Font | DM Sans 11 / 600 / upper / +6% track |
| Optional `.dot` | 6×6 round, `background: currentColor`, sits before label |

Variants (bg / fg):

- `tag-green` → `--green-bg` / `--green`
- `tag-amber` → `--amber-bg` / `--amber`
- `tag-red` → `--red-bg` / `--red`
- `tag-blue` → `--accent-light` / `--accent`
- `tag-teal` → `--teal-bg` / `--teal`
- `tag-purple` → `--purple-bg` / `--purple`
- `tag-gray` → `--surface-3` / `--ink-2`
- `tag-outline` → transparent bg + 1px currentColor border (combine with color modifier)

### 2.6 Buttons

```
.btn
.btn-primary | .btn-ghost | .btn-secondary | .btn-danger[.is-outline]
.btn-icon                  // square 36×36
.btn-sm | .btn-lg          // size mods
```

Base `.btn`: DM Sans 13.5 / 600 / -0.5%, padding `10px 16px`, radius `var(--r-input)` (8px), gap 8 between icon + label, transitions 120ms.

| Variant | Default | Hover | Disabled |
|---|---|---|---|
| `btn-primary` | `--accent` bg, `#fff` text, subtle inner highlight | bg → `--accent-glow` | bg `--ink-5`, no shadow |
| `btn-ghost` | `--surface` bg, `--ink-2` text, `--border-2` border | bg → `--surface-2`, border `--ink-5`, text `--ink` | text/border `--ink-5` |
| `btn-secondary` | `--highlight` bg, `--accent` text | bg `#B59FE7` | n/a |
| `btn-danger` | `--red` bg, `#fff` text | bg `#A01818` | `.is-outline` flips to transparent + `--red` text/border |
| `btn-icon` | square, ghost-style | same | `--ink-5` |

Focus: 3px ring of `var(--highlight)` (offset 1px) plus the variant's standard border. Mobile tap target min 44×44 — pad via line-height + padding when the visual size is smaller.

`.btn-sm` shrinks padding to `7px 12px`, font 12.5. `.btn-lg` grows to `13px 22px`, font 14.5. `.btn-full` makes it `width: 100%`.

### 2.7 Form input

```
.field
├── .field-label  (12.5 / 600 / ink-2)
├── .input | .select | .textarea
└── .field-help   (12 / ink-3; .is-error → red)
```

| State | Border | Bg | Shadow |
|---|---|---|---|
| default | `--border-2` | `--surface` | — |
| hover | `--ink-5` | `--surface` | — |
| focus / `.is-focus` | `--accent` | `--surface` | `0 0 0 3px var(--highlight-soft)` |
| `.is-error` | `--red` | `#FFF8F8` | `0 0 0 3px rgba(185,28,28,.12)` |
| disabled | `--border` | `--surface-3` | text `--ink-3`, cursor not-allowed |

`.select` reuses `.input` plus a chevron SVG injected via `background-image`, padded `padding-right: 36px`.

Inputs are radius 8 (`--r-input`), padding `9px 12px`, font 14.

### 2.8 Schedule grid (admin schedule plotter)

```
.grid                     // grid-template-columns: 88px repeat(6, 1fr)
├── .ghdr                 // day column header
├── .gtime                // time row label (88px col)
└── .gcell[.is-today][.is-empty]
    └── .blk[.is-ballet|.is-hiphop|.is-contemp|.is-jazz|.is-adults][.is-conflict]
```

Cell:

| Prop | Value |
|---|---|
| Padding | `8px` |
| Min height | `108px` |
| Borders | right + bottom 1px `--border` |
| `.is-today` | bg `rgba(232,238,255,.18)` |
| `.is-empty` | diagonal hatch via two linear-gradients; hover reveals `.empty-add` (+ icon) |

Class block (`.blk`):

| Prop | Value |
|---|---|
| Radius | 10px |
| Bg | per-category (`--blk-bg`, set by `.is-*` modifier) |
| Border-left | 3px solid `var(--blk-border)` |
| Padding | `8px 10px` |
| Hover | `translateY(-1px)` + shadow `0 4px 14px rgba(15,23,42,.08)` |
| `.is-conflict` | red 2px outer ring + small red badge dot at top-right |

Category palette tokens (defined in schedule scope, kept legacy-named for layout stability):

| Modifier | Bg / Text / Border |
|---|---|
| `.is-ballet` | `#DBEAFE / #1E40AF / #3B82F6` |
| `.is-hiphop` | `#EDE9FE / #5B21B6 / #8B5CF6` |
| `.is-contemp` | `#DCFCE7 / #166534 / #22C55E` |
| `.is-jazz` | `#FEF3C7 / #92400E / #F59E0B` |
| `.is-adults` | `#E0F2FE / #0C4A6E / #0EA5E9` |

> For multi-discipline tenants, repurpose category tokens by remapping the `.is-*` modifier names per content config. Treat the visual palette as fixed; only the labels change.

### 2.9 Invoice row

```
.pay-row
├── .pay-method-ic[.is-gcash|.is-maya|.is-cash|.is-over]
├── .pay-body
│   ├── .pay-name (13.5 / 600)
│   └── .pay-sub  (mono-style label, 11 / 600 / upper / +4% track / ink-3)
└── .pay-right (.pay-amt + .tag)
```

| Prop | Value |
|---|---|
| Padding | `14px 22px` |
| Border-bottom | `1px solid var(--border)` (none on last child) |
| Hover bg | `var(--surface-2)` |
| `.pay-method-ic` | 36×36, radius 8, bg per provider — `is-gcash #DDF1F7 / #0078A8`, `is-maya #E2DEFB / #4F2BCE`, `is-cash --green-bg / --green`, `is-over --red-bg / --red` |
| `.pay-amt` | 13 / 600, tabular-nums |

### 2.10 Mobile top bar (portal)

```
.nav
├── .nav-btn (left back/menu)
├── .nav-title (DM Sans 19 / 700 / -1.2%)
│   └── .nav-sub (11 / 600 / upper / +12% / ink-3)
└── .nav-btn (right notif)
```

| Prop | Value |
|---|---|
| Bg | `var(--surface)` (parent portal) or `var(--accent)` (teacher view) |
| Padding | `56px 16px 14px` (56px = status-bar safe area) |
| Border-bottom | `1px solid var(--border)` |
| Z-index | 5 |

`.nav-btn` is 36×36 round, ghost-styled. Notification dot is 8×8 absolute, `--red` fill, 2px ring matching the bar bg.

### 2.11 Day-selector pill bar

```
.days  (horizontal scroll container)
└── .day[.is-active][.has-class]
    ├── .d-name (11 / 600 / upper / +12% / ink-3)
    └── .d-num  (18 / 700 / ink)
```

| Prop | Value |
|---|---|
| Container | flex, gap 8, `overflow-x: auto`, scrollbar hidden |
| Container padding | `28px 16px 14px` |
| Container bg | `var(--surface-2)` |
| Pill bg | `var(--surface)` |
| Pill border | `1px solid var(--border)` |
| Pill radius | 10px |
| Pill min-width | 52px |
| `.is-active` | bg `var(--accent)`, border same; `.d-name` → `rgba(255,255,255,.85)`, `.d-num` → `#fff` |
| `.has-class` | adds a 4px dot bottom-center, `--accent` color (flips to `#fff` when active) |

### 2.12 Schedule timeline card (mobile)

```
.timeline
└── .row[.gap]
    ├── .time (56px col, right-aligned: .t mono + .ampm)
    └── .card[.is-jazz|.is-ballet|.is-hiphop|.is-contemp|.is-adults]
        ├── .card-top   (.card-tag + .card-time)
        ├── .card-title
        ├── .card-sub
        └── .card-foot  (.ring progress + .card-progress + .card-chev)
```

| Prop | Value |
|---|---|
| Card bg | linear-gradient(180deg, `var(--<kind>-bg)`, light pair) |
| Card border-left | 4px solid `var(--<kind>-border)` |
| Card radius | 14px |
| Card padding | `14px 16px` |
| Active state | `:active` → `transform: scale(.99)` |
| `.lunch` chip | between rows, `--peach-bg`, `--peach` text, radius 99 |
| Row gap | `14px`; `.row.gap + .row` → `8px` |

Progress ring is a 36×36 SVG, stroke 3, color = category text token, bg track tinted at 22% of the same hue.

### 2.13 Bottom nav bar (mobile)

```
.tabs
└── .tab[.is-active]
    ├── svg.tab-ic (20×20)
    └── span.tab-lbl (10.5 / 600)
```

| Prop | Value |
|---|---|
| Bg | `var(--surface)` |
| Border-top | `1px solid var(--border)` |
| Shadow | `0 -2px 8px rgba(15,23,42,.03)` |
| Height | `safe-area-inset-bottom + 56px` (account for iOS home indicator) |
| Layout | flex, 4 tabs, equal-width |
| Padding | `8px 4px` per tab |
| Active | icon + label → `--accent`; inactive → `--ink-3` |
| Tap target | full tab area, min 64×56 |

### 2.14 Fork selection card (enrollment)

```
.fork-card
├── ::before (3px gradient strip top: accent → accent-glow → teal)
├── .fork-eyebrow (.pip + label, 11 / 600 / upper / +12%)
├── .fork-q  (DM Sans 26 / 700 / -2.2%)
├── .fork-sub
└── .fork-options
    └── .fork-option[.is-recommended]
```

| Prop | Value |
|---|---|
| Card bg | `var(--surface)` |
| Card radius | `var(--r-card-lg)` (18px) |
| Card shadow | `var(--shadow-pop)` |
| Card padding | `40px 40px 32px` (desktop) / `28px 22px 24px` (mobile) |
| Option default | transparent border, 2px `--border`, padding `16px 18px`, radius 12 |
| Option hover | border `--ink-5`, bg `--surface-2` |
| Option selected | border `--accent`, bg `--highlight-soft` |
| Recommended ribbon | top-right corner, `--highlight` bg, `--accent` text, 10 / 700 / upper |

### 2.15 Payment method card

```
.methods
└── .method[.is-selected]
    ├── .method-logo[.gcash|.maya|.qrph|.grab|.card|.cash]
    ├── .method-body (.method-name + .method-sub)
    └── .m-radio (custom 20×20 ring; inner dot when selected)
```

| Prop | Value |
|---|---|
| Card bg | `var(--surface)` |
| Border | 2px solid `--border` (note: 2px on this card, not 1px) |
| Radius | 14px |
| Padding | `14px 16px` |
| Hover border | `#C8D4FF` |
| Selected | border `--accent`, bg linear-gradient(135deg, `--accent-light`, `--surface` 80%) |
| Radio ring (default) | 2px `--border-2` |
| Radio ring (selected) | `--accent` with 10×10 `--accent` dot center |

### 2.16 Progress bar / skill row

Two patterns ship:

**Inline thin bar** (used in tables, drawers):
```
.bar
└── .bar i  (filled segment)
```
- Track: 36×4, `--surface-3`, radius 99
- Fill: `width: N%`, bg `var(--accent)` (or status color when contextual)

**Skill row** (portal student progress):
```
.skill-row
├── .skill-label
├── .skill-bar
│   └── .skill-fill (gradient: --accent → --highlight)
└── .skill-val  (right-aligned, 12.5 / 600)
```
- Bar: full-width 6px, radius 99, bg `--surface-3`
- Fill: linear-gradient(90deg, `--accent`, `--highlight`)

### 2.17 Teacher note card

```
.note
├── .note-head
│   ├── .note-author (12.5 / 600)
│   └── .note-time (11 / 500 / ink-3)
└── .note-body (14 / 22)
```

| Prop | Value |
|---|---|
| Bg | `var(--surface)` |
| Border-left | 3px solid `--purple` (teacher accent) |
| Radius | 12 |
| Padding | `14px 16px` |
| Stack gap | 12 between notes |
| Optional reaction strip | `.note-foot` with tag-style chips |

---

## 3 · Layout Spec

### 3.1 Admin dashboard

```
.shell                     // grid: 220px sidebar | 1fr main
├── .sidebar               // sticky, 100vh
└── .main
    ├── .topbar            // sticky, 56px height
    └── .content           // padding 24 28 56, max-width 1280
        ├── .greeting      // h2 + meta strip
        ├── .school-type-row (optional)
        ├── .stat-grid     // grid: repeat(4, 1fr), gap 14
        ├── .grid-2-1      // grid: 2fr 1fr, gap 18 — main content + side rail
        │   ├── .col (main)
        │   │   ├── card: Today's Classes (table)
        │   │   └── card: Waitlist
        │   └── .col (rail)
        │       ├── card: Recent Payments
        │       ├── card: Quick Actions (.qa-grid: 1fr 1fr, gap 8)
        │       └── card: Messages
        └── ...
```

Card internal padding: header strip `14px 22px`, table cells `14px 18px`, list rows `14px 22px`. Card-to-card gap inside a column: 18.

### 3.2 Mobile portal layout

```
.screen                            // 100vh column
├── .nav                           // sticky top, 56px safe area + 14 padding
├── .hero (optional)               // brand-colored section, rounds into content
├── .content                       // flex: 1, scroll, padding 16 20 24
│   ├── greeting / quick stats
│   ├── primary card stack         // gap 12, card padding 14 16
│   └── secondary lists            // .list-row, padding 12 16
└── .tabs                          // sticky bottom nav, h: safe-area + 56
```

Max viewport for PWA layout: **680px** (anything wider letterboxes via centered card). Content area scrolls; nav + tabs are fixed-height.

### 3.3 Schedule plotter grid

```
.shell (220 | 1fr)
└── .main
    ├── .topbar
    ├── .page-head        // title row + term picker + actions
    ├── .legend           // chip strip
    ├── .summary          // grid: repeat(4, 1fr), gap 12, KPI strip for the week
    └── .grid             // grid-template-columns: 88px repeat(6, 1fr)
        ├── header row    // .ghdr × 6 + 88px spacer
        └── time rows     // .gtime + .gcell × 6, per time slot
```

Each `.gcell` is 108px min-height. Drag a `.blk` between `.gcell` to reschedule (drag-and-drop API; on drop, target highlights with `--highlight-soft` bg).

### 3.4 Card internal padding & gap system

| Surface | Padding | Internal gap |
|---|---|---|
| Standard card | `22px` | 14 (header → body) |
| KPI / stat card | `18px 20px 20px` | 14 (top row → label) |
| List item row | `14px 22px` | 12 (avatar → text) |
| Modal / fork card | `40px 40px 32px` | 24 (q → options) |
| Mobile timeline card | `14px 16px` | 8 (title → sub), 12 (body → foot) |

---

## 4 · Interaction Notes

### Hover

- **Cards** (clickable): `translateY(-1px)` + shadow swap from `--shadow-card` → `--shadow-hover`. 150ms ease.
- **Nav items**: bg `--surface-2`, text `--ink`. Icon brightens from `--ink-4` → `--ink-2`. No transform.
- **Table rows**: bg `--surface-3` (overrides any zebra). No transform.
- **Buttons**: see button spec — bg shifts to next-darker token; no transform.
- **Schedule blocks**: `translateY(-1px)` + 4px 14px shadow.

### Focus rings

All focusable elements: `outline: 3px solid var(--highlight); outline-offset: 1px;`

Inputs also add `box-shadow: 0 0 0 3px var(--highlight-soft)` on `:focus` along with `border-color: var(--accent)`. (Both are present so the ring reads on adjacent-bordered surfaces.)

Tab-only focus is preserved via `:focus-visible`. Don't strip outlines for mouse users either — we want it visible on click too for accessibility.

### Transitions

- **Fast** (color, bg, border-color): `120ms` ease
- **Default** (transform, shadow): `150ms` ease
- **Layout / page** (height, max-height for accordion, modal enter): `200ms` ease-out

### Page-load animation

Stagger child reveal on initial load only:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.content > *  { animation: fadeUp 320ms ease-out both; }
.content > *:nth-child(1) { animation-delay: 0ms; }
.content > *:nth-child(2) { animation-delay: 40ms; }
.content > *:nth-child(3) { animation-delay: 80ms; }
/* …+40ms per child, cap at child 8 (320ms total) */
```

Disable when `prefers-reduced-motion: reduce` is set.

### Mobile tap targets

Minimum **44×44px** for any tappable surface. When the visual control is smaller (e.g. an 18px icon), expand the hit area via padding or an absolutely-positioned `::after` zone — don't enlarge the icon itself.

### Drag

Schedule blocks (`.blk`) are draggable. While dragging:
- Source cell: `opacity: 0.5`, `cursor: grabbing`
- Valid drop targets: `.gcell` bg → `--highlight-soft`, border becomes 2px dashed `--accent`
- Conflicts: bg `--red-bg`, border 2px dashed `--red`

---

## 5 · Screen Inventory

All routes are dev-facing names; production routing follows the React Router structure.

| Route | Roles | Primary entity (PRD §8) | Key interactions |
|---|---|---|---|
| `/admin/dashboard` | Admin, Staff | KPI rollups · `Class`, `Invoice`, `Enrollment`, `Message` | View today's classes, log a payment, jump to enrollment, scan waitlist, open messages |
| `/admin/schedule` | Admin, Staff (write); Teacher (read own) | `Class`, `Session`, `Room` | Drag-drop class blocks, resolve conflicts, add empty slots, filter by teacher / room |
| `/admin/enrollment/new` | Admin, Staff | `Student`, `Enrollment`, `Account` | Fork: New family vs. returning vs. adult learner; assign class; review fees; confirm |
| `/admin/billing` | Admin, Staff | `Invoice`, `Payment`, `Account` | Filter by status, log cash payment, send reminders, reconcile GCash, export term |
| `/admin/messaging` | Admin, Staff, Teacher | `Message`, `Thread` | Reply inline, broadcast to class, attach invoice, archive |
| `/admin/payroll` | Admin | `Teacher`, `Session`, `PayPeriod` | Generate period, review per-teacher hours + class rate, mark paid, export PDF |
| `/admin/accounting` | Admin | `Invoice`, `Payment`, `Expense`, `Account` | Term P&L, payment-method breakdown, outstanding A/R, export to BIR-formatted CSV |
| `/portal` | Client (parent / adult student) | `Student`, `Class`, `Invoice` (own) | View upcoming classes, pay outstanding invoice, message teacher, RSVP recital |
| `/portal/progress/:studentId` | Client | `Student`, `SkillAssessment`, `TeacherNote` | Read skill bars, scroll teacher notes, share milestone card |
| `/portal/pay/:invoiceId` | Client | `Invoice`, `Payment` | Pick method, redirect to provider (GCash/Maya/Card/QRPH/Grab) or get cash instructions |
| `/settings/branding` | Admin | `Tenant` | Upload wordmark + favicon, pick theme preset, fine-tune hex, live-preview across admin + parent app |

---

## 6 · Breakpoints

| Breakpoint | min-width | Surface |
|---|---|---|
| Desktop admin | **1024px** | All `/admin/*` routes. Below this, show a "use a larger screen" stub for admin (only the schedule plotter is the genuine constraint). |
| Tablet teacher | **768–1023px** | Teacher view collapses the sidebar to a bottom nav at this range. Admin shows a condensed sidebar (icons only, 64px). |
| Mobile / PWA | **≤ 680px** | `/portal/*` is mobile-first within a 680px max. Teacher mobile view (`/admin/schedule` filtered to own classes) targets this. |

Implementation rules:

- Author mobile-first for `/portal/*` and any teacher route.
- Author desktop-first for `/admin/*` (except teacher schedule).
- Sidebar collapses to bottom nav at `(max-width: 767px)` for the teacher view only — admin doesn't collapse, it gates.
- Schedule plotter requires **min 1280px** effective viewport; below that, show a horizontally-scrollable container with a notice strip.

---

## 7 · File map (where the mocks live)

| File | Surface |
|---|---|
| `Vida Design System.html` | Canonical token + component reference |
| `Admin Dashboard.html` | `/admin/dashboard` |
| `Schedule Plotter.html` | `/admin/schedule` |
| `Enrollment - Account Type.html` | `/admin/enrollment/new` (step 1: fork) |
| `Enrollment - Registration.html` | `/admin/enrollment/new` (step 2: form) |
| `Billing & Invoices.html` | `/admin/billing` |
| `Settings - Branding.html` | `/settings/branding` |
| `Client Portal Home.html` | `/portal` |
| `Pay Invoice (Mobile).html` | `/portal/pay/:invoiceId` |
| `Teacher Schedule (Mobile).html` | Teacher mobile schedule view |

`client-portal.css` and `client-portal.jsx` hold the React-flavored mock of the parent portal — use these as the kernel when implementing `/portal/*` in production React.

---

## Production notes

1. **Tokens go to a single source** — extract everything in §1 into `src/styles/tokens.css` (or `tokens.ts` if generating from JS). Do not re-declare per-component.
2. **Class names are contracts** — preserve `.stat-grid`, `.gcell`, `.blk.is-*`, `.method.is-selected`, etc. They're referenced by JS interaction code in some mocks.
3. **Sans-only is intentional** — don't reintroduce DM Serif Display or DM Mono. Hierarchy is carried by weight + size + tracking, not family contrast.
4. **Status colors are reserved** — never use `--green / --amber / --red` for branding or category coding. They mean state.
5. **Branding overrides** — the tenant theme system (see `Settings - Branding.html`) writes overrides to `--accent`, `--accent-glow`, `--highlight`, `--highlight-soft`, and `--surface-2` (canvas). All other tokens stay tenant-stable.
6. **Currency / numbers** — always tabular-nums, DM Sans 600 weight. Peso glyph is regular weight.
7. **Avatars** — initial letter at DM Sans 700 / -1.5% track, no italic. Color = `--accent` on `--highlight-soft` for users; status-colored variants exist for badges (`.avatar.is-teal`, etc.).

Welcome aboard — go build it.
