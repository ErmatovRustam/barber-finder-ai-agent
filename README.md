## Bay Area Barber Finder (AI Agent)

Single-page React app (Vite + TypeScript) to discover and book barbershops in the San Francisco Bay Area.

Sections: About, Pricing, Hair Styles, Locations, Appointments. Includes a Login page and an AI widget using browser geolocation to simulate nearby search results.

### Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview production build

### Getting started

1. Install deps: `npm install`
2. Run dev: `npm run dev`
3. Open the URL printed in terminal

### Project structure

- `src/App.tsx`: homepage sections and layout
- `src/components/AgentWidget.tsx`: AI geolocation widget
- `src/pages/Login.tsx`: login route
- `src/App.css`: global and responsive styles
- `src/main.tsx`: router setup

### Notes

- Geolocation requires HTTPS or localhost. The widget shows simulated Bay Area results.
