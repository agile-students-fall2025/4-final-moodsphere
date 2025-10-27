# Moodsphere Frontend

A React-based mood tracking and journaling application designed to help users monitor their mood, journal their feelings, and discover practices to improve their wellbeing.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd 4-final-moodsphere/front-end/moodsphere-frontend
```

### 2. Install Dependencies

```bash
npm install
```

If you encounter any dependency issues, try:

```bash
npm install --legacy-peer-deps
```

### 3. Run the Development Server

```bash
npm start
```

This will start the development server and automatically open the app in your default browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components (one per route)
│   ├── LandingPage.js  # Main landing page
│   └── LandingPage.css # Landing page styles
├── App.js              # Main application container
├── App.css             # Global styles
├── index.js            # Application entry point
└── index.css           # Base CSS reset and typography
```

## Technical Stack

- **React 19.2.0** - UI library
- **React Scripts 5.0.1** - Build tooling
- **Functional Components** - All components are written as functions (not classes)
- **JSX** - All component content uses JSX syntax

## Features

- **Dynamic Color-Changing Animation** - Peaceful, calming color transitions on the landing page
- **Responsive Design** - Mobile-friendly layout
- **Clean, Modern UI** - Contemporary design with smooth animations
- **Component-Based Architecture** - Scalable structure for adding new pages

## Adding New Pages

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed instructions on how to add new pages and components.

## Troubleshooting

### Port 3000 is already in use

If you see an error that port 3000 is already in use, you can:

1. Kill the process using port 3000
2. Or use a different port by running: `PORT=3001 npm start`

### Dependency Issues

If you encounter module-related errors:

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Commit with meaningful messages
4. Push to your branch
5. Create a pull request

## License

This project is part of an academic assignment for Agile Software Development.
