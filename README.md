# Kiraale Frontend

This project is the frontend for the Kiraale application. It is built using [Next.js](https://nextjs.org/) with [React](https://react.dev/), styled using [Tailwind CSS](https://tailwindcss.com/), and utilizes [TypeScript](https://www.typescriptlang.org/) for type safety. The project uses [Bun](https://bun.sh/) as the package manager and runtime for improved performance and developer experience.

## Features

- Modern Next.js application with Turbopack for fast development builds.
- Tailwind CSS for styling.
- TypeScript for robust type-checking.
- Prettier and ESLint integration for code formatting and linting.
- Ready-to-use scripts for development, building, and formatting.

## Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your system. If not, install it by running:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Installation

Clone the repository and install the dependencies:

```bash
git clone <repository_url>
cd kiraale-fe
bun install
```

## Available Scripts

Here are the scripts available for use in this project:

### Development

Run the development server with Turbopack:

```bash
bun run dev
```

### Build

Build the application for production:

```bash
bun run build
```

### Start

Start the production server:

```bash
bun run start
```

### Lint

Run ESLint to check for code quality and enforce coding standards:

```bash
bun run lint
```

### Format

Format the codebase using Prettier:

```bash
bun run fmt
```

## Configuration

### ESLint

The project uses ESLint for linting and code quality. The configuration is defined in `.eslintrc.js` and extends the Next.js and Prettier configurations. Errors or warnings can be fixed using the lint script.

### Prettier

Prettier is configured to ensure consistent code formatting. The configuration is defined in a `.prettierrc` file. Run the format script to format the entire codebase.

### Tailwind CSS

Tailwind CSS is configured via the `tailwind.config.js` file. You can extend or customize it as needed for the project.

## Directory Structure

```plaintext
/
├── pages/       # Next.js pages for routing
├── components/  # Reusable React components
├── styles/      # Global and component-specific styles
├── public/      # Static assets
├── tsconfig.json # TypeScript configuration
├── tailwind.config.js # Tailwind CSS configuration
├── .eslintrc.js # ESLint configuration
├── .prettierrc  # Prettier configuration
└── package.json # Project metadata and scripts
```

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.
