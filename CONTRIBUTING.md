# Contributing to NexusKit

Thank you for your interest in contributing to NexusKit! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before submitting a bug report:

1. Check the [GitHub Issues](https://github.com/yourusername/nexuskit/issues) to see if the problem has already been reported.
2. If you're unable to find an open issue addressing the problem, open a new one using the bug report template.

When filing an issue, please include:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When suggesting an enhancement:

1. Use a clear and descriptive title
2. Provide a detailed description of the suggested enhancement
3. Explain why this enhancement would be useful
4. Include any relevant examples or mock-ups

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting to ensure your code meets our standards
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, if applicable
- Update documentation when changing functionality
- The PR should work for Node.js 18.x and above
- All tests must pass
- Code should follow our style guidelines

## Development Setup

### Prerequisites

- Node.js 18.17.0 or later
- npm or pnpm
- Git

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/nexuskit.git
   cd nexuskit
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Project Structure

```
nexuskit/
├── src/                  # Source code
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── lib/              # Utility libraries
│   └── hooks/            # Custom React hooks
├── prisma/               # Database schema
├── cli/                  # CLI tool for scaffolding
├── docs/                 # Documentation website
└── public/               # Static assets
```

## Testing

Run the test suite:

```bash
npm test
```

## Coding Style

We use ESLint and Prettier to enforce a consistent coding style:

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## Documentation

If you're adding new features or components, please update the documentation accordingly:

1. Component documentation should be added to `docs/pages/components/`
2. Feature documentation should be added to `docs/pages/docs/features/`

To run the documentation site locally:

```bash
cd docs
npm install
npm run dev
```

## Release Process

NexusKit follows [Semantic Versioning](https://semver.org/). Releases are created by maintainers using the following process:

1. Update the version in package.json
2. Update the CHANGELOG.md
3. Create a new GitHub release with release notes
4. Publish to npm

## Questions?

If you have any questions, please feel free to create an issue or reach out to the maintainers. 