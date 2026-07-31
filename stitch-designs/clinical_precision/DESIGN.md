---
name: Clinical Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#cadbfc'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dfe8ff'
  surface-container-highest: '#d6e3ff'
  on-surface: '#091c35'
  on-surface-variant: '#434654'
  inverse-surface: '#20314b'
  inverse-on-surface: '#ecf0ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#00687b'
  on-secondary: '#ffffff'
  secondary-container: '#50dcff'
  on-secondary-container: '#005f71'
  tertiary: '#334649'
  on-tertiary: '#ffffff'
  tertiary-container: '#4a5e61'
  on-tertiary-container: '#c1d7da'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#0040a2'
  secondary-fixed: '#afecff'
  secondary-fixed-dim: '#48d7f9'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5d'
  tertiary-fixed: '#d1e7e9'
  tertiary-fixed-dim: '#b5cacd'
  on-tertiary-fixed: '#0a1e21'
  on-tertiary-fixed-variant: '#364a4d'
  background: '#f9f9ff'
  on-background: '#091c35'
  surface-variant: '#d6e3ff'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 48px
  margin-tablet: 32px
  margin-mobile: 16px
---

## Brand & Style
The design system is engineered for high-end healthcare environments, prioritizing a sense of clinical excellence, immediate trust, and professional calm. The target audience includes both healthcare providers managing complex schedules and patients seeking a frictionless, premium care experience. 

The aesthetic is **Corporate / Modern** with subtle **Glassmorphism** accents. It leverages high-density information layouts that remain legible through generous whitespace and a strict mathematical grid. The emotional response should be one of "effortless reliability"—the UI feels invisible yet sturdy, ensuring users feel in control of their health data and time.

## Colors
The palette utilizes a core "Medical Blue" to establish authority and trust.
- **Primary Blue (#0052CC):** Reserved for primary actions, active navigation states, and critical brand touchpoints.
- **Secondary Teal (#00B8D9):** Used for supportive information, secondary metrics, and success-oriented status indicators.
- **Accent Cyan (#E6FCFF):** Primarily used for soft background fills, subtle highlights, and high-contrast "low-light" areas to reduce visual fatigue.
- **Neutral Grays:** Ranging from slate for text to light silver for structural borders, ensuring high accessibility (WCAG AA/AAA) against the white background.

## Typography
This design system uses **Inter** exclusively to maintain a systematic, utilitarian aesthetic that performs exceptionally well in data-heavy environments. 

Headlines utilize tighter letter spacing and heavier weights to command attention, while body text is optimized for readability with a 1.5x line height ratio. For smaller labels and metadata (like time stamps in the appointment manager), a medium weight is used to maintain legibility at 12px. All interactive labels must be at least 14px to ensure accessibility for a wide range of patient demographics.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a maximum container width of 1440px for desktop. 
- **Desktop (1024px+):** 12-column grid with 24px gutters. Sidebars are typically fixed at 280px.
- **Tablet (768px - 1023px):** 8-column grid with 20px gutters. Sidebars collapse into a drawer.
- **Mobile (Under 768px):** 4-column grid with 16px gutters. Padding is reduced to maximize screen real estate for list views and forms.

The spacing rhythm is built on a 4px baseline. Components like cards and input groups should use 16px (4x) or 24px (6x) padding to maintain a consistent internal rhythm.

## Elevation & Depth
Depth is communicated through **Ambient Shadows** and **Tonal Layering**. 
- **Level 0 (Base):** Pure white (#FFFFFF) for the primary canvas.
- **Level 1 (Cards):** Low-opacity, diffused shadows (0px 4px 12px rgba(0, 0, 0, 0.05)) to lift content from the background.
- **Level 2 (Modals/Popovers):** Higher elevation with a larger blur (0px 12px 32px rgba(0, 0, 0, 0.1)).
- **Glassmorphism:** Sidebars and sticky navigation headers utilize a background blur (12px) with a semi-transparent white fill (rgba(255, 255, 255, 0.8)) and a 1px border (#DFE1E6) to create a sophisticated, layered feeling without clutter.

## Shapes
The shape language is consistently **Rounded**, using a 12px base radius for standard components and 16px for larger containers like dashboard cards. This softens the "clinical" feel, making the software feel more approachable and modern. 
- **Small components (Buttons, Inputs):** 8px radius.
- **Medium components (Cards, Panels):** 12px-16px radius.
- **Pills (Status Tags, Time Slots):** Fully rounded (999px) to distinguish them as discrete, interactive units.

## Components
- **Buttons:** Primary buttons use the Primary Blue (#0052CC) with white text. Hover states shift to a deeper indigo. Secondary buttons use the Accent Cyan (#E6FCFF) background with Primary Blue text.
- **Pills:** Used for appointment status (e.g., "Confirmed" in Teal, "Pending" in Gray). Time slot pills feature a 1px border and a subtle Primary Blue background on hover to indicate interactivity.
- **Cards:** White background with a 1px border (#DFE1E6). On hover, cards transition to a slightly deeper shadow and a Primary Blue left-border accent (4px width).
- **Input Fields:** Clean, minimal styling with 12px internal padding. Focus states must trigger a 2px Primary Blue ring with a 4px soft glow to ensure the active field is unmistakable.
- **Lists:** Data rows should have a subtle hover effect (background: #F4F5F7) and provide ample vertical padding (16px) to accommodate touch targets on mobile and tablets.
- **Calendar Widgets:** Use Secondary Teal for current-day highlights and Primary Blue for selected date ranges.