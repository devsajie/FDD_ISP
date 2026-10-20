# Nepal Space Telecom (NST)

A multi-page, responsive front-end web project for a Kathmandu-based Low Earth Orbit (LEO) satellite broadband Internet Service Provider (ISP), built using only pure HTML5, CSS3, and vanilla JavaScript.

## Multi-Page Structure & Architecture

Each page is designed around a specific theme according to the assignment requirements:

1. **`index.html` (Home)**
   - High-impact LEO satellite orbital banner (`images/hero-satellite.svg`) transmitting to the Maitidevi ground gateway.
   - Quick service address search with automatic routing to the order page.
   - Scroll-triggered animated stats counters (downlink Mbps, latency, altitude, uptime).
   - Core service plan previews with local product thumbnails.
   - Live interactive broadband speed test simulator with animated speedometer gauge.
   - Kathmandu coverage availability modal.

2. **`plans.html` (Product Listing & Services)**
   - Transparent pricing plans: Home Standard, Business High-Performance, and Roam & Expedition.
   - Local product imagery (`images/dish-terminal.svg` and `images/router-wifi6.svg`).
   - Comprehensive plan comparison matrix comparing speeds, latency, IP allocation, router tier, and SLA.
   - Detailed hardware spotlight section.

3. **`technology.html` (Technology & Multimedia Showcase)**
   - Low Earth Orbit (550 km) vs Geostationary (35,786 km) space architecture diagram (`images/technology-orbit.svg`).
   - Monsoon weather resistance, thermal snow-melting, and automated motorized tracking features.
   - Responsive 16:9 embedded YouTube video player with technical metadata.
   - Detailed engineering hardware specifications for dishes, routers, and mounting options.

4. **`coverage.html` (Coverage Map & Availability Checker)**
   - High-resolution Kathmandu Valley satellite footprint radar map (`images/coverage-kathmandu.svg`).
   - Interactive Locality Checker (select Maitidevi, Thamel, Baneshwor, Patan, Bhaktapur to view line-of-sight status and latency).
   - Nepal nationwide deployment roadmap (Phases 1, 2, and 3).

5. **`about.html` (About Us & FAQ)**
   - Story of Nepal Space Telecom & Maitidevi Operations Hub.
   - Founder & CEO profile card for Sajal Nepal (`images/founder-sajal.svg`).
   - Core engineering principles (Zero Ground Dependency, Transparent Pricing, Local Technical Support).
   - Interactive FAQ accordion with smooth open/close animations.

6. **`contact.html` (Contact & Hardware Deployment Request)**
   - Contact cards with physical address in Maitidevi, direct phone support, and email channels.
   - Service deployment order form with real-time client-side validation.
   - Auto-prefills selected plan and address from query parameters (`?plan=...`, `?addr=...`).
   - Nepali mobile phone validation (`^(98|97)\d{8}$`).
   - Interactive order confirmation banner.

## Local File Organization

```text
FDD_ISP/
├── index.html        # Home landing page with speed test and hero
├── plans.html        # Service plans, product listings & comparison matrix
├── technology.html   # Orbital architecture, video showcase & specs
├── coverage.html     # Kathmandu coverage map & interactive locality checker
├── about.html        # Company background, founder card & FAQ accordion
├── contact.html      # Contact cards & client-validated order form
├── style.css         # Responsive styling, CSS grid, variables & animations
├── script.js         # Interactivity (counters, modal, speed test, validation, URL params)
├── README.md         # Full project documentation and submission guide
└── images/           # 100% self-contained local SVG vector assets (offline ready)
    ├── hero-satellite.svg
    ├── dish-terminal.svg
    ├── router-wifi6.svg
    ├── coverage-kathmandu.svg
    ├── technology-orbit.svg
    └── founder-sajal.svg
```

## How to Run Locally

Since this project uses strictly vanilla web standards (HTML5, CSS3, JavaScript):
1. Double-click `index.html` to open the site in any web browser.
2. Use the navigation links to move between all 6 pages seamlessly.
3. All graphics are stored locally in the `images/` directory, so everything loads without needing an internet connection.
