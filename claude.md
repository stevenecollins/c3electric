# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# C3 Electrical Contracting Website

## Project Overview
Single-page responsive website for C3 Electrical Contracting, an electrical services company serving residential, commercial, new construction, and service call clients.

## File Structure
```
c3-electric-website/
├── index.html
├── styles.css
├── script.js
├── images/ (for future real images)
└── claude.md
```

## Technical Requirements

### Technology Stack
- Pure HTML5
- Separate CSS file (styles.css) - NO embedded styles
- Vanilla JavaScript (script.js) - NO frameworks or libraries
- Responsive design (mobile-first approach)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (320px and up)

## Design Specifications

### Color Palette
- Primary: Deep purple/navy (#2d2462 or similar)
- Secondary: Black (#000000)
- Background: White (#ffffff)
- Accent: Gray tones for text and borders

### Typography
- Clean, modern sans-serif fonts
- Hierarchy: Large hero text, clear section headers, readable body text

## Website Sections

### 1. Navigation
- Fixed/sticky navigation bar at top
- Links to all sections with smooth scrolling
- Mobile hamburger menu for small screens
- Company logo/name

### 2. Hero Section
- Company name: **C3 ELECTRICAL CONTRACTING**
- Subtitle: RESIDENTIAL, COMMERCIAL, NEW CONSTRUCTION, SERVICE CALLS
- Phone: **(910) 406-1076**
- Tagline: **"Power To The People"**
- Large hero image (placeholder for electrician working)
- Eye-catching, full-width design

### 3. Services Section
- Dark purple/navy background
- Lorem ipsum text for now
- Grid or card layout for services
- List electrical services offered

### 4. About/Credentials Section
- White background with company information box
- Lorem ipsum text about the company
- Centered, professional layout
- Include credentials/certifications area

### 5. Projects Gallery Section
- Grid layout of 4+ project images
- Use placeholder images from https://placehold.co/
- Responsive grid (4 columns desktop, 2 tablet, 1 mobile)
- Title: "OUR PROJECTS" or "Take a look at some of our completed electrical projects"

### 6. Contact Section
- Split layout: Phone on left, Email on right
- Phone icon + **(910) 406-1076**
- Email icon + **C3ElectricalContracting@gmail.com**
- Large, clickable contact information
- Clean, simple design

### 7. Footer
- Company branding
- Tagline: "Power To The People"
- Copyright information
- Additional links if needed

## Content Guidelines

### Temporary Content
- Use **lorem ipsum** placeholder text for all sections
- User will replace with real content later
- Keep text structure logical and scannable

### Images
- Use https://placehold.co/ for all placeholder images
- Suggested sizes:
  - Hero: 1920x800px
  - Projects: 400x300px each
  - About section: 600x400px
- Alt text for all images

### Contact Information (REAL - DO NOT USE LOREM IPSUM)
- Phone: (910) 406-1076
- Email: C3ElectricalContracting@gmail.com
- Company Name: C3 ELECTRICAL CONTRACTING

## JavaScript Features
- Smooth scrolling navigation
- Mobile menu toggle
- Scroll animations (fade-in, slide-in) - optional but nice
- Active navigation highlighting based on scroll position

## Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and up

## Code Quality Standards
- Clean, well-commented code
- Semantic HTML5 elements
- BEM or similar CSS naming convention
- Organized CSS (sections clearly labeled)
- Accessible (ARIA labels, keyboard navigation)
- SEO-friendly (meta tags, proper heading hierarchy)

## Future Enhancements (Not Now)
- Replace placeholder images with real photos
- Replace lorem ipsum with actual content
- Add contact form functionality
- Add more project images
- Integrate Google Maps for service area
- Add testimonials section

## Notes
- Design inspired by provided c3electric.png reference image
- Keep design clean and professional
- Emphasize "Power To The People" branding
- Make phone number and email highly visible and clickable