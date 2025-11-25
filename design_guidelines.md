# Firehawk Drone Website - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium tech product pages (DJI, Apple, Tesla) combined with emergency response urgency. The design balances youthful innovation with professional credibility—showcasing advanced technology created by talented young inventors.

## Core Design Principles
1. **Tech-Forward Minimalism**: Clean, spacious layouts that let the drone and mission take center stage
2. **Emergency Precision**: Sharp, decisive design elements reflecting the critical nature of first-aid delivery
3. **Innovation Showcase**: Bold visual presentations that highlight the creators' exceptional talent

## Typography System
- **Primary Font**: Inter or SF Pro Display (modern, tech-focused)
- **Accent Font**: Space Grumman or similar technical font for specs
- **Hierarchy**:
  - Hero Headlines: 4xl-6xl, font-bold, tracking-tight
  - Section Headers: 3xl-4xl, font-semibold
  - Subsections: xl-2xl, font-medium
  - Body: base-lg, regular weight, increased line-height (1.7)
  - Technical Specs: mono font, sm-base

## Layout System
**Spacing Scale**: Tailwind units 4, 6, 8, 12, 16, 24 (p-6, mt-12, gap-8, etc.)
- Section padding: py-16 to py-24 on desktop, py-12 on mobile
- Container max-width: max-w-7xl for full sections, max-w-4xl for content
- Consistent gutters: px-6 on mobile, px-8 on desktop

## Component Library

### Homepage
**Hero Section (100vh)**:
- Full-width background: Dramatic drone in-flight image (emergency delivery scene)
- Large hero headline with mission statement overlay
- Dual CTAs: "View Specs" (primary) + "Watch Demo" (secondary) with blurred backgrounds
- Floating stats bar: "X Lives Saved" "X Seconds Response" "X Miles Range"

**Specs Showcase**:
- Two-column layout (lg:grid-cols-2): Technical illustration left, specifications grid right
- Spec cards in 2-column grid with icons, values, and descriptions
- Key metrics: Flight time, payload capacity, speed, range, first-aid kit contents

**Demo Video Section**:
- Centered video player with custom controls
- Video dimensions: aspect-video, max-w-5xl
- Title + description above player
- Background: subtle gradient treatment

**Gallery Grid**:
- Masonry-style or 3-column grid (md:grid-cols-2, lg:grid-cols-3)
- High-quality drone photos: in-flight, close-ups, deployment scenarios
- Hover effect: subtle scale + overlay with image caption

**Team Section**:
- Three-column cards (stack on mobile)
- Each creator card: Photo, name, age highlight ("13 years old"), role, brief bio
- Emphasize "Young Innovators" headline
- Background: Subtle tech pattern or gradient

**Contact Form Section**:
- Two-column layout: Form (60%) + Info sidebar (40%)
- Form fields: Name, Email, Subject, Message (textarea)
- Submit button with loading state
- Sidebar: Response time info, email, social links

### Admin Dashboard
- Clean data table for submitted messages
- Columns: Date, Name, Email, Subject, Status (New/Replied)
- Click to expand message details
- Reply interface: Text editor with send button
- Dashboard stats at top: Total messages, pending replies, response rate

## Navigation
- Fixed header on scroll with blur background
- Logo left, nav links center (Specs, Team, Gallery, Contact), admin login right
- Mobile: Hamburger menu with slide-in panel
- Smooth scroll to sections

## Animations (Minimal)
- Hero elements: Fade-in on load
- Scroll-triggered: Fade-up for section headers only
- Button hovers: Subtle scale (scale-105)
- No parallax or complex scroll effects

## Images Required
1. **Hero Background**: Dramatic drone in flight delivering first aid (wide landscape, high-res)
2. **Gallery Images**: 9-12 photos including drone details, in-flight shots, first-aid payload, team with drone, deployment scenarios
3. **Team Photos**: Individual portraits of Ron, Anik, and Trim (professional or semi-professional quality)
4. **Technical Diagrams**: Side-view drone schematic with labeled components
5. **Demo Video**: Embedded from hosting service (YouTube/Vimeo placeholder)

## Form Components
- Input fields: Rounded borders (rounded-lg), focus ring, padding p-3
- Labels: Above inputs, text-sm font-medium
- Textareas: min-height h-32
- Buttons: Rounded (rounded-lg), padding px-6 py-3, font-semibold
- Error states: Red border + error message below field

## Accessibility
- All images with descriptive alt text
- Form labels properly associated
- Color contrast ratios meet WCAG AA
- Keyboard navigation throughout
- Skip to main content link

## Page Structure Summary
**Public Pages**: Home (all sections), Admin Login
**Admin Pages**: Dashboard (messages list + reply interface)
**Total Sections**: Hero, Specs (2-col), Video, Gallery (3-col), Team (3-col), Contact (2-col), Footer