# NexusKit

A powerful, feature-rich Next.js starter library with authentication, UI components, and database integration.

<div align="center">
  <a href="https://github.com/nebulanollie/nexuskit">
    <img src="https://via.placeholder.com/1200x600/4F46E5/FFFFFF?text=NexusKit" alt="NexusKit" width="100%" />
  </a>
</div>

## Features

- **Authentication Ready** - Complete auth solution using NextAuth.js v5
  - Google OAuth
  - Email/Magic Link authentication via Resend
  - Secure cookie handling
  - Database session storage
- **UI Framework** - Comprehensive UI kit with:
  - 50+ accessible Radix UI components
  - Tailwind CSS styling
  - Light/dark mode support
  - Responsive design
- **Database Integration** - PostgreSQL with Prisma ORM
  - User accounts and sessions
  - WebAuthn support (optional)
  - Type-safe database operations
- **Developer Experience**
  - TypeScript throughout
  - React Hook Form + Zod for form handling
  - TurboRepo for faster builds
  - ESLint configuration
  - Minimal setup required

## Quick Start

### Method 1: Using the CLI (Recommended)

#### Option A: Use npx (After the package is published)
```bash
# Create a new NexusKit project
npx create-nexuskit-app my-project

# Navigate to your project directory
cd my-project

# Start the development server
npm run dev
```

#### Option B: Use directly from the repository (Until the package is published)
```bash
# Clone the repository
git clone https://github.com/nebulanollie/nexuskit.git

# Navigate to the repository
cd nexuskit

# Create a new project 
node ./cli/create-app.js my-project

# Navigate to your project
cd my-project

# Start the development server
npm run dev
```

### Method 2: Manual Setup
```bash
# Clone the repository
git clone https://github.com/nebulanollie/nexuskit.git my-project

# Navigate to your project directory
cd my-project

# Remove the .git directory
rm -rf .git

# Initialize a new git repository
git init

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Documentation

For full documentation, visit [nexuskit.dev/docs](https://nexuskit.dev/docs).

### Environment Setup

Create a `.env.local` file with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

# Authentication
AUTH_SECRET="your-auth-secret"
AUTH_RESEND_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="auth@yourdomain.com"

# Optional Google OAuth
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

## Components

NexusKit provides 50+ accessible UI components built on Radix UI and styled with Tailwind CSS:

- **Layout**: Container, Section, Grid, etc.
- **Forms**: Input, Select, Checkbox, DatePicker, etc.
- **Navigation**: Tabs, Dropdown, Breadcrumbs, etc.
- **Feedback**: Toast, Alert, Dialog, etc.
- **Display**: Card, Avatar, Badge, etc.

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MyForm() {
  return (
    <form>
      <Input placeholder="Email" />
      <Button>Submit</Button>
    </form>
  );
}
```

## Authentication

NexusKit provides a complete authentication solution using NextAuth.js v5:

```tsx
// Server component
import { auth } from "@/lib/auth";

export default async function ProtectedPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

## Database

NexusKit uses Prisma ORM for type-safe database operations:

```tsx
import { prisma } from "@/lib/prisma";

// Get a user
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// Create a post
const post = await prisma.post.create({
  data: {
    title: "Hello World",
    content: "This is my first post",
    authorId: userId,
  },
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE) © NexusKit Contributors
