# Nūriya Studio

A clean, minimal parent studio website representing Nūriya Studio—a creative studio building thoughtful digital and interactive experiences.

## Overview

This website serves as the main brand hub for Nūriya Studio, linking to:
- **Āthariq** — The interactive games label
- **Yaseen Jacobs** — Founder profile website

This site does NOT host games or portfolio projects directly.

## Tech Stack

- **Vite** — Build tool and dev server
- **Vanilla JavaScript** — No frameworks, pure JS
- **HTML/CSS** — Semantic markup and modern CSS

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Deployment to Railway

### Prerequisites

1. A Railway account ([railway.app](https://railway.app))
2. Railway CLI installed (optional, you can use the web interface)

### Deployment Steps

#### Option 1: Using Railway Web Interface

1. **Connect Your Repository**
   - Log in to Railway
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or Git provider of choice)
   - Connect your repository

2. **Configure Build Settings**
   - Railway will auto-detect Vite
   - Ensure the build command is: `npm run build`
   - Ensure the start command is: `npm start` (or `npm run preview`)

3. **Set Environment Variables**
   - Railway automatically sets the `PORT` environment variable
   - The `vite.config.js` is configured to use `process.env.PORT` (defaults to 5000 if not set)

4. **Deploy**
   - Railway will automatically build and deploy your site
   - Your site will be available at a Railway-provided URL

#### Option 2: Using Railway CLI

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Deploy**
   ```bash
   railway up
   ```

### Environment Variables

Railway automatically provides the `PORT` environment variable. The `vite.config.js` file is configured to read it:

```javascript
preview: {
  port: process.env.PORT || 5000,
  host: true
}
```

If `PORT` is not set, it defaults to 5000.

### Production URLs Configuration

Before deploying, update the external URLs in `main.js`:

```javascript
const EXTERNAL_URLS = {
  athariq: 'https://athariq.com', // Update with actual URL
  founder: 'https://yaseenjacobs.com' // Update with actual URL
};
```

Replace these placeholder URLs with your actual production URLs.

### Railway Build Configuration

Railway should automatically detect Vite projects. If needed, you can create a `railway.json` configuration file:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Custom Domain (Optional)

1. In Railway dashboard, go to your project
2. Click "Settings"
3. Add a custom domain
4. Configure DNS records as instructed

## Project Structure

```
.
├── index.html          # Main HTML entry point
├── style.css           # Global styles
├── main.js             # Main JavaScript (routing)
├── pages/              # Page modules
│   ├── home.js
│   ├── work.js
│   ├── athariq.js
│   ├── founder.js
│   └── contact.js
├── package.json
├── vite.config.js
└── README.md
```

## Features

- ✅ Clean, minimal design
- ✅ Mobile-first responsive layout
- ✅ Client-side routing
- ✅ Accessible navigation
- ✅ Dark theme with neutral colors
- ✅ Railway-ready deployment configuration

## Notes

- This is a static site with client-side routing
- All navigation is handled client-side using the History API
- External links open in new tabs
- The site uses vanilla JavaScript—no frameworks required

## License

ISC

