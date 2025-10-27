# Moodsphere Frontend - Project Structure

## Directory Structure

```
src/
├── components/          # Reusable UI components
│   └── (future components like buttons, cards, forms, etc.)
├── pages/              # Page components (one per route)
│   ├── LandingPage.js
│   └── LandingPage.css
├── App.js              # Main application container
├── App.css             # Global styles
├── index.js            # Application entry point
└── index.css           # Base CSS reset and typography
```

## How to Add New Pages

### 1. Create a new page component

Create a new file in `src/pages/` for your page:

```javascript
// src/pages/YourNewPage.js
import React from 'react';
import './YourNewPage.css';

function YourNewPage() {
  return (
    <div className="your-new-page">
      {/* Your page content */}
    </div>
  );
}

export default YourNewPage;
```

### 2. Create the page's CSS file

```css
/* src/pages/YourNewPage.css */
.your-new-page {
  /* Page-specific styles */
}
```

### 3. Add the page to App.js

For now, you can conditionally render pages or use state to switch between them:

```javascript
// src/App.js
import LandingPage from './pages/LandingPage';
import YourNewPage from './pages/YourNewPage';

function App() {
  return (
    <div className="App">
      <LandingPage />
      {/* or <YourNewPage /> */}
    </div>
  );
}
```

### 4. Future: Add React Router (Recommended)

When you're ready to add routing, install React Router:

```bash
npm install react-router-dom
```

Then update App.js:

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import YourNewPage from './pages/YourNewPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/your-page" element={<YourNewPage />} />
        </Routes>
      </div>
    </Router>
  );
}
```

## Creating Reusable Components

Place reusable components in `src/components/`:

```javascript
// src/components/Button.js
import React from 'react';
import './Button.css';

function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
```

## Current Pages

- **LandingPage**: The main welcome screen with animated circle and "Get Started" button

## Naming Conventions

- **Pages**: PascalCase (e.g., `LandingPage.js`, `Dashboard.js`)
- **Components**: PascalCase (e.g., `Button.js`, `NavBar.js`)
- **CSS files**: Match the component name (e.g., `LandingPage.css`, `Button.css`)
- **CSS classes**: kebab-case (e.g., `landing-page`, `get-started-button`)
