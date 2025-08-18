# WAAAGH! Slamball Scoreboard Setup

## Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Installation & Running

### Method 1: Using npm/Vite (Recommended)
```bash
# Navigate to the project directory
cd waagh-slamball-scoreboard

# Install dependencies (if needed)
npm install

# Start the development server
npm start
# OR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Method 2: Using Python HTTP Server (Alternative)
```bash
# Navigate to the project directory
cd waagh-slamball-scoreboard

# Start Python HTTP server
python -m http.server 3000

# Open browser to http://localhost:3000
```

### Method 3: Direct File Access
- Simply open `index.html` in a web browser
- Note: Some features might not work due to CORS restrictions

## Keyboard Controls
- **Q, W, E**: Home team +1, +2, +3 points
- **R**: Home team KRUMP ability
- **U, I, O**: Guest team +1, +2, +3 points  
- **P**: Guest team KRUMP ability
- **N**: Reset game

## Game Features
- Ork-themed basketball scoreboard
- WAAAGH! meter system
- Special KRUMP abilities
- Visual effects and animations
- Statistics tracking
- Milestone celebrations
- Easter eggs (Konami code!)

## Fixed Issues
- Container width layout issue
- Event object dependencies
- Background image path
- Input validation and error handling
- Score overflow protection
- DOM element safety checks

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
