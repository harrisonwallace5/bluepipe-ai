# BluePipe AI Frontend

BluePipe AI is a production-ready React 18 + Tailwind CSS frontend for a plumbing plan analysis workflow. It includes a responsive marketing shell, validated drag-and-drop plan intake, and demo analysis results that can be swapped for live API responses.

## Stack

- React 18
- Vite
- Tailwind CSS

## Features

- Dark navy / electric blue brand system with responsive sections
- Sticky navigation with desktop and mobile menu states
- Hero section with primary and secondary CTAs
- Drag-and-drop upload panel for PDF and image plans with client-side validation
- Demo results panel with summary metrics, fixture schedule, pipe sizing guidance, and flagged issues
- Pricing section ready for product marketing or sales enablement

## Getting Started

```bash
npm install
npm run dev
```

## Production Build

```bash
npm install
npm run build
```

The static production build is generated in `dist/`.

## Project Structure

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── components
        ├── Footer.jsx
        ├── Hero.jsx
        ├── Navbar.jsx
        ├── ResultsPanel.jsx
        └── UploadPanel.jsx
```

## Connecting a Real API

`src/App.jsx` manages uploaded file metadata locally and passes it into the UI. Replace the demo analysis payload in `src/components/ResultsPanel.jsx` with API-backed state, then post the uploaded plan from `src/components/UploadPanel.jsx` to your backend as multipart form data.
