# Timezone Visualizer

A modern, interactive web application that helps two people in different timezones visualize their local times, find overlapping meeting windows, and explore timezones on a 3D animated globe.

## Features

- 🌍 **3D Interactive Globe** - Visualize locations on an animated 3D Earth
- ⏰ **Real-time Time Display** - See current times for both people with live updates
- 📅 **Meeting Time Finder** - Automatically find overlapping work hours
- 🎚️ **Customizable Work Hours** - Adjustable sliders to set work hours for each person
- 🎨 **Notion-inspired Design** - Clean, minimal, and modern UI

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **react-globe.gl** - 3D globe visualization
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Styling
- **date-fns-tz** - Timezone calculations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Deployment

This project is configured for Vercel deployment. Simply connect your GitHub repository to Vercel and it will automatically deploy.

## Usage

1. Select timezones for Person 1 and Person 2
2. Adjust work hours using the sliders (default: 9 AM - 5 PM)
3. View available meeting times for today
4. Explore locations on the 3D globe

## License

MIT
