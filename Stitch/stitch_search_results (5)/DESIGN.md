---
name: Classified Marketplace System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#414849'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f0'
  outline: '#717879'
  outline-variant: '#c0c8c9'
  surface-tint: '#3d646a'
  primary: '#00191c'
  on-primary: '#ffffff'
  primary-container: '#002f34'
  on-primary-container: '#70989d'
  inverse-primary: '#a5ced4'
  secondary: '#0052d1'
  on-secondary: '#ffffff'
  secondary-container: '#2a6bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#260f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#3f230b'
  on-tertiary-container: '#b38869'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1eaf0'
  primary-fixed-dim: '#a5ced4'
  on-primary-fixed: '#001f23'
  on-primary-fixed-variant: '#254d52'
  secondary-fixed: '#dae1ff'
  secondary-fixed-dim: '#b3c5ff'
  on-secondary-fixed: '#001849'
  on-secondary-fixed-variant: '#003fa4'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#edbd9a'
  on-tertiary-fixed: '#2e1501'
  on-tertiary-fixed-variant: '#603f25'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  price-display:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  navbar-height: 72px
  navbar-height-mobile: 64px
  container-max-width: 1280px
  grid-gutter: 16px
  section-padding: 32px
  card-padding: 16px
---

## Brand & Style

This design system is engineered for high-velocity secondary markets where trust and efficiency are paramount. The aesthetic follows a **Modern Corporate** direction—balancing the utilitarian nature of a search-heavy interface with the approachability of a community marketplace. 

The visual language focuses on clarity and speed. It utilizes a refined color palette to establish authority, while employing high-contrast "call-to-action" moments to drive user conversion (specifically the "Sell" journey). The emotional response should be one of reliability and ease, ensuring that both buyers and sellers feel they are in a professional environment. The design prioritizes content density without sacrificing legibility, using a clear hierarchical structure to help users navigate thousands of listings effortlessly.

## Colors

The palette is anchored by a deep **Navy Teal** (`#002F34`), used for primary text and structural branding to evoke professional stability. 

- **Primary:** Used for the global navigation, primary buttons, and headings.
- **Secondary (Action Blue):** Employed for interactive elements like links, tabs, and "View Profile" actions.
- **Accent (Sell Gold):** Specifically reserved for the "Sell" button and urgent promotional banners. This high-contrast yellow ensures the primary revenue driver is always visible.
- **Surface Strategy:** We use a "Card-on-Canvas" approach. The page background is a cool gray (`#F2F4F5`), providing enough contrast for white surfaces (`#FFFFFF`) to pop, creating a clear distinction between the layout and individual product listings.

## Typography

We use **Inter** across the entire system for its exceptional legibility in data-dense environments. 

The hierarchy is built to support rapid scanning. **Prices** use a dedicated `price-display` token with an extra-bold weight to ensure they are the first thing a user sees on a product card. **Labels** are utilized for categories and metadata (like location and date), often appearing in a muted teal or bold caps for technical specifications. On mobile, headlines scale down to prevent text wrapping that would break the vertical flow of the search results page.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **2-column grid** for mobile listing views.

- **Grid Logic:** On desktop, the product gallery uses a 4-column layout (`3-span` per card). On tablet, this shifts to 3 columns, and on mobile, it transitions to a 2-column "masonry-lite" or a single-column list view.
- **Sticky Elements:** The global header is fixed to the top of the viewport (`z-index: 1000`) to provide constant access to search and the "Sell" button. On product detail pages, the "Price/Contact" box becomes a sticky sidebar on desktop and a bottom-fixed bar on mobile.
- **Margins:** A standard 16px gutter is maintained between cards to allow the background light-gray to act as a natural separator.

## Elevation & Depth

This system uses **Tonal Layering** combined with soft **Ambient Shadows** to define hierarchy.

- **Level 0 (Canvas):** The light gray background (`#F2F4F5`).
- **Level 1 (Cards):** White surfaces with a very subtle 1px border (`#DDE2E2`) and a soft shadow (0px 2px 4px rgba(0, 47, 52, 0.05)).
- **Level 2 (Hover/Active):** When a user interacts with a listing card, the shadow deepens (0px 8px 16px rgba(0, 47, 52, 0.12)) and the card lifts slightly to indicate interactivity.
- **Level 3 (Modals/Popovers):** Standard high-elevation shadows with a 20% backdrop blur on the overlay to maintain context of the underlying grid.

## Shapes

The design system adopts a **Rounded** (8px) corner radius. This is the "Goldilocks" radius for marketplaces: it is friendlier than sharp corners but remains professional enough for high-value transactions like cars or real estate.

- **Standard Elements:** Product cards, input fields, and standard buttons use the 8px radius.
- **Pill Elements:** Secondary tags (e.g., "Featured," "Verified Seller") use a full-pill radius to distinguish them from actionable buttons.
- **Image Containers:** Product thumbnails within cards must inherit the top-level 8px radius to maintain a cohesive silhouette.

## Components

### Buttons
- **Primary:** Filled Navy Teal (`#002F34`) with White text. Bold and authoritative.
- **Sell Button:** The "Hero" action. Uses the Gold Accent (`#FFCE32`) with a heavy Navy Teal border and an icon (+).
- **Secondary:** Ghost style with Navy Teal borders for "Chat" or "View Profile."

### Cards
Cards are the primary container for the marketplace. They feature:
- An aspect ratio of 4:3 for the image.
- A heart icon (Favorite) in the top right corner with a subtle white blur background.
- Price at the top of the content stack in `price-display` styling.
- A 2-line limit for titles to ensure grid alignment.

### Input Fields
Inputs use a white background with a 1px border. On focus, the border thickens to 2px and changes to Action Blue (`#3A77FF`). The search bar is oversized (48px height) with a prominent magnifying glass icon.

### Chips & Tags
Small, low-contrast pills used for category filtering. When active, they shift to a filled Navy Teal state with a white "X" for dismissal.

### Product Grid
A responsive container that manages the transition from 4 columns to 1, ensuring that the `grid-gutter` of 16px remains consistent to preserve the visual "rhythm" of the marketplace.