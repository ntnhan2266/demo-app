# Demo App

This is a React application built with Vite and TypeScript.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Building the App](#building-the-app)
  - [Running Tests](#running-tests)
- [Scripts](#scripts)
- [Code structure](#code-structure)
- [Build status](#build-status)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Yarn](https://yarnpkg.com/) (optional but recommended)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/demo-app.git
   cd demo-app
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```

### Running the App

To start the development server, run:

```bash
yarn dev
```

or

```bash
npm run dev
```

This will launch the app on [http://localhost:3000](http://localhost:3000/) by default.

### Building the App

To build the app for production, run:

```bash
yarn build
```

or

```bash
npm run build
```

The compiled files will be available in the `dist` directory.

### Running Tests

To run tests, use the following command:

```bash
yarn test
```

## Scripts

- **dev:** Start the development server.
- **build:** Build the app for production.
- **lint:** Run ESLint to lint your code.
- **lint:fix:** Run ESLint and automatically fix linting issues.
- **format:** Run Prettier to format your code.
- **preview:** Use Vite to preview the production build locally.
- **test:** Run Jest tests.

## Code structure

#### `src/`

The `src/` directory is the heart of your application, containing the source code.

##### `__snapshots__/`

This directory holds Jest snapshots. Jest uses snapshots to track changes in the UI over time and ensure that it remains consistent.

##### `assets/`

The `assets/` directory contains static assets like images, fonts, or any other files that are imported into your application.

##### `components/`

Reusable React components live in the `components/` directory. These components are designed to be modular and can be used in different parts of your application.

##### `constants/`

The `constants/` directory is for storing constant values and configuration files that are used across your application.

##### `contexts/`

React context providers and consumers are organized in the `contexts/` directory. Contexts are a way to manage state at a global level in React.

##### `hocs/`

Higher-order components (HOCs) are stored in the `hocs/` directory. HOCs are functions that take a component and return a new component with enhanced functionality.

##### `hooks/`

Custom React hooks are placed in the `hooks/` directory. Hooks are a way to reuse stateful logic across different components.

##### `interfaces/`

TypeScript interface definitions are stored in the `interfaces/` directory. This helps in maintaining a clear structure for the data expected by different components.

##### `pages/`

Top-level components that represent pages or views are organized in the `pages/` directory. Each file in this directory may correspond to a different route in your application.

##### `services/`

API calls, external services, and utility functions are placed in the `services/` directory. This helps in keeping the data-fetching logic separate from components.

##### `styles/`

Global styles and style-related files are stored in the `styles/` directory. This could include stylesheets, theme files, or any other styling-related configurations.

##### `utils/`

Utility functions and helper modules reside in the `utils/` directory. These are functions that provide commonly used functionality across your application.

#### `.github/`

This directory holds GitHub-specific configurations. It might include workflows, actions, or any other GitHub-related files.

#### `.husky/`

The `.husky/` directory contains configurations for Git hooks. Git hooks are scripts that run automatically before or after particular Git events. They are useful for enforcing certain checks or tasks before committing or pushing code.

#### `public/`

The `public/` directory is where static assets such as images, fonts, and HTML files reside. The contents of this directory are typically served as-is.

### Configuration Files

##### `.commitlintrc.json`

This configuration file is used for Commitlint, ensuring that commit messages follow a specified convention.

##### `.eslintignore`

This file lists files and directories that should be ignored by ESLint, the linter for JavaScript and TypeScript code.

##### `.eslintrc.cjs`

The file contains the ESLint configuration for linting JavaScript and TypeScript code. It defines rules and settings to maintain code quality.

##### `.gitignore`

The file specifies files and directories that Git should ignore when tracking changes. It helps in keeping the repository clean.

##### `.prettierignore`

This file lists files and directories that should be ignored by Prettier, the code formatter.

##### `.prettierrc`

The file contains configuration settings for Prettier, defining how code should be formatted.

##### `jest.config.ts`

The configuration file for Jest, the testing framework. It specifies settings and options for running tests.

##### `setupTests.ts`

The configuration file for setting up tests. It may include global test configurations or setups.

##### `tailwind.config.js`

This file contains the configuration for Tailwind CSS, a utility-first CSS framework.

## Build status

[![Build Status](https://github.com/ntnhan2266/demo-app/actions/workflows/production-workflow.yaml/badge.svg)](https://github.com/ntnhan2266/demo-app/actions/workflows/production-workflow.yaml)

## License

This project is licensed under the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
