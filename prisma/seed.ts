import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      firstName: "Sokun",
      lastName: "Panha",
      username: "panha",
      email: "panha.sokun@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
      avatar: "https://panha.cambocoder.com/_vercel/image?url=%2Fimages%2Fprofile-image.webp&w=1536&q=100",
    },
  });
  console.log("✅ Created admin user:", admin.email);

  // Create tech-focused categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "frontend" },
      update: {},
      create: {
        name: "Frontend",
        slug: "frontend",
        description: "Frontend development with JavaScript, TypeScript, React, Vue, and modern CSS.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "backend" },
      update: {},
      create: {
        name: "Backend",
        slug: "backend",
        description: "Server-side development with Node.js, Python, Go, and databases.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "devops" },
      update: {},
      create: {
        name: "DevOps",
        slug: "devops",
        description: "CI/CD, Docker, Kubernetes, cloud platforms, and infrastructure as code.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "web-development" },
      update: {},
      create: {
        name: "Web Development",
        slug: "web-development",
        description: "Full-stack web development tutorials, best practices, and modern architectures.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "mobile-development" },
      update: {},
      create: {
        name: "Mobile Development",
        slug: "mobile-development",
        description: "iOS, Android, React Native, and Flutter mobile app development.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
        deletedAt: null,
      },
    }),
  ]);
  console.log("✅ Created", categories.length, "categories");

  // Create coding-related tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: "javascript" },
      update: {},
      create: {
        name: "JavaScript",
        slug: "javascript",
        description: "JavaScript programming language",
        coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "typescript" },
      update: {},
      create: {
        name: "TypeScript",
        slug: "typescript",
        description: "TypeScript - typed JavaScript",
        coverImage: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "vuejs" },
      update: {},
      create: {
        name: "Vue.js",
        slug: "vuejs",
        description: "Vue.js progressive framework",
        coverImage: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "nuxt" },
      update: {},
      create: {
        name: "Nuxt",
        slug: "nuxt",
        description: "Nuxt.js meta-framework for Vue",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "react" },
      update: {},
      create: {
        name: "React",
        slug: "react",
        description: "React library for building UIs",
        coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "nodejs" },
      update: {},
      create: {
        name: "Node.js",
        slug: "nodejs",
        description: "Node.js JavaScript runtime",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "python" },
      update: {},
      create: {
        name: "Python",
        slug: "python",
        description: "Python programming language",
        coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "docker" },
      update: {},
      create: {
        name: "Docker",
        slug: "docker",
        description: "Docker containerization",
        coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "git" },
      update: {},
      create: {
        name: "Git",
        slug: "git",
        description: "Git version control",
        coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "api" },
      update: {},
      create: {
        name: "API",
        slug: "api",
        description: "REST and GraphQL APIs",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "tutorial" },
      update: {},
      create: {
        name: "Tutorial",
        slug: "tutorial",
        description: "Step-by-step coding tutorials",
        coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "best-practices" },
      update: {},
      create: {
        name: "Best Practices",
        slug: "best-practices",
        description: "Coding best practices and patterns",
        coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      },
    }),
  ]);
  console.log("✅ Created", tags.length, "tags");

  // Create tech/coding posts with Markdown content
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: "getting-started-with-nuxt-4" },
      update: {},
      create: {
        title: "Getting Started with Nuxt 4: A Complete Guide",
        slug: "getting-started-with-nuxt-4",
        excerpt: "Learn how to build modern web applications with Nuxt 4, the latest version of the Vue.js meta-framework.",
        content: `## Introduction to Nuxt 4

Nuxt 4 is the latest major version of the popular Vue.js framework for building web applications. It comes with many improvements and new features that make development faster and more enjoyable.

## Key Features

- **Improved Performance:** Nuxt 4 is faster than ever with optimized build times and runtime performance.
- **Better Developer Experience:** Enhanced hot module replacement and better error handling.
- **TypeScript Support:** First-class TypeScript support out of the box.
- **Hybrid Rendering:** Mix SSR, SSG, and client-side rendering in the same application.

## Getting Started

To create a new Nuxt 4 project, run the following command:

\`\`\`bash
npx nuxi init my-app
cd my-app
npm install
npm run dev
\`\`\`

## Project Structure

Nuxt 4 uses a file-based routing system. Create Vue files in the \`pages/\` directory and they automatically become routes.

\`\`\`
my-app/
├── app.vue
├── pages/
│   ├── index.vue      # /
│   ├── about.vue      # /about
│   └── blog/
│       └── [slug].vue # /blog/:slug
├── components/
├── composables/
└── nuxt.config.ts
\`\`\`

## Conclusion

Nuxt 4 is a powerful framework that makes building Vue.js applications a breeze. Start exploring today!`,
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
        status: "PUBLISHED",
        isFeatured: true,
        viewCount: 450,
        publishedAt: new Date("2024-01-15"),
        authorId: admin.id,
        categories: { connect: [{ slug: "frontend" }, { slug: "web-development" }] },
        tags: { connect: [{ slug: "nuxt" }, { slug: "vuejs" }, { slug: "typescript" }, { slug: "tutorial" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "10-javascript-tips-for-better-code" },
      update: {},
      create: {
        title: "10 JavaScript Tips for Writing Better Code",
        slug: "10-javascript-tips-for-better-code",
        excerpt: "Improve your JavaScript skills with these practical tips and best practices for cleaner, more efficient code.",
        content: `## Write Better JavaScript

JavaScript is a versatile language, but writing clean and maintainable code requires practice. Here are 10 tips to improve your code quality.

### 1. Use const and let

Always prefer \`const\` for variables that don't change, and \`let\` for those that do. Avoid \`var\`.

\`\`\`javascript
// Good
const API_URL = 'https://api.example.com';
let count = 0;

// Avoid
var oldWay = 'deprecated';
\`\`\`

### 2. Use Template Literals

Template literals make string concatenation cleaner and more readable.

\`\`\`javascript
const greeting = \`Hello, \${name}! You have \${count} messages.\`;
\`\`\`

### 3. Destructuring Assignment

Extract values from objects and arrays more elegantly.

\`\`\`javascript
const { name, email } = user;
const [first, second, ...rest] = items;
\`\`\`

### 4. Arrow Functions

Use arrow functions for shorter syntax and lexical \`this\` binding.

\`\`\`javascript
const double = (n) => n * 2;
const items = data.map(item => item.name);
\`\`\`

### 5. Use Array Methods

Methods like \`map\`, \`filter\`, and \`reduce\` make code more declarative.

\`\`\`javascript
const activeUsers = users.filter(u => u.isActive);
const names = users.map(u => u.name);
const total = prices.reduce((sum, p) => sum + p, 0);
\`\`\`

### 6. Optional Chaining

Safely access nested properties without checking each level.

\`\`\`javascript
const city = user?.address?.city ?? 'Unknown';
\`\`\`

### 7. Nullish Coalescing

Use \`??\` instead of \`||\` for default values when you want to allow falsy values.

\`\`\`javascript
const count = data.count ?? 0; // Only defaults if null/undefined
\`\`\`

### 8. Async/Await

Write asynchronous code that reads like synchronous code.

\`\`\`javascript
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}
\`\`\`

### 9. Use Object Shorthand

Simplify object creation when property names match variable names.

\`\`\`javascript
const name = 'John';
const age = 30;
const user = { name, age }; // { name: 'John', age: 30 }
\`\`\`

### 10. Spread Operator

Clone and merge objects/arrays immutably.

\`\`\`javascript
const newUser = { ...user, role: 'admin' };
const allItems = [...items1, ...items2];
\`\`\`

## Conclusion

These tips will help you write cleaner, more maintainable JavaScript code. Practice them daily!`,
        coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200",
        status: "PUBLISHED",
        isFeatured: true,
        viewCount: 680,
        publishedAt: new Date("2024-01-20"),
        authorId: admin.id,
        categories: { connect: [{ slug: "frontend" }] },
        tags: { connect: [{ slug: "javascript" }, { slug: "best-practices" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "typescript-generics-explained" },
      update: {},
      create: {
        title: "TypeScript Generics Explained with Practical Examples",
        slug: "typescript-generics-explained",
        excerpt: "Master TypeScript generics with clear explanations and real-world examples you can use in your projects.",
        content: `## Understanding TypeScript Generics

Generics allow you to write flexible, reusable code while maintaining type safety. They're one of TypeScript's most powerful features.

## Basic Generic Function

Instead of using \`any\`, generics preserve type information:

\`\`\`typescript
// Without generics - loses type information
function identity(arg: any): any {
  return arg;
}

// With generics - preserves type
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);        // type: number
const str = identity('hello');   // type: string
\`\`\`

## Generic Interfaces

Create flexible interfaces that work with multiple types:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'Success'
};
\`\`\`

## Generic Constraints

Limit what types can be used with your generic:

\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length);
}

logLength('hello');     // OK - string has length
logLength([1, 2, 3]);   // OK - array has length
logLength(123);         // Error - number has no length
\`\`\`

## Multiple Type Parameters

Use multiple generics for complex relationships:

\`\`\`typescript
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const numbers = [1, 2, 3];
const strings = map(numbers, n => n.toString());
// strings: string[]
\`\`\`

## Generic Classes

Create type-safe data structures:

\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const value = numberStack.pop(); // type: number | undefined
\`\`\`

## Conclusion

Generics are essential for writing reusable TypeScript code. Start using them to improve your type safety!`,
        coverImage: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=1200",
        status: "PUBLISHED",
        isFeatured: true,
        viewCount: 320,
        publishedAt: new Date("2024-02-01"),
        authorId: admin.id,
        categories: { connect: [{ slug: "frontend" }] },
        tags: { connect: [{ slug: "typescript" }, { slug: "tutorial" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "building-rest-api-with-nodejs" },
      update: {},
      create: {
        title: "Building a REST API with Node.js and Express",
        slug: "building-rest-api-with-nodejs",
        excerpt: "Learn how to create a production-ready REST API using Node.js, Express, and best practices.",
        content: `## Introduction

REST APIs are the backbone of modern web applications. In this tutorial, we'll build a complete API using Node.js and Express.

## Project Setup

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express cors helmet morgan
npm install -D typescript @types/node @types/express ts-node nodemon
\`\`\`

## Project Structure

\`\`\`
my-api/
├── src/
│   ├── controllers/
│   │   └── userController.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── package.json
└── tsconfig.json
\`\`\`

## Basic Server Setup

\`\`\`typescript
// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Creating Routes

\`\`\`typescript
// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
\`\`\`

## Controller Implementation

\`\`\`typescript
// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch users from database
    const users = await User.findAll();
    res.json({ data: users });
  } catch (error) {
    next(error);
  }
};
\`\`\`

## Error Handling Middleware

\`\`\`typescript
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
};
\`\`\`

## Conclusion

You now have a solid foundation for building REST APIs with Node.js. Extend this with authentication, validation, and database integration!`,
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
        status: "PUBLISHED",
        isFeatured: false,
        viewCount: 520,
        publishedAt: new Date("2024-02-05"),
        authorId: admin.id,
        categories: { connect: [{ slug: "backend" }, { slug: "web-development" }] },
        tags: { connect: [{ slug: "nodejs" }, { slug: "typescript" }, { slug: "api" }, { slug: "tutorial" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "docker-for-developers" },
      update: {},
      create: {
        title: "Docker for Developers: From Zero to Production",
        slug: "docker-for-developers",
        excerpt: "A practical guide to containerizing your applications with Docker and Docker Compose.",
        content: `## Why Docker?

Docker solves the "it works on my machine" problem by packaging your application with all its dependencies into a container.

## Key Concepts

- **Image:** A blueprint for containers (like a class)
- **Container:** A running instance of an image (like an object)
- **Dockerfile:** Instructions to build an image
- **Docker Compose:** Tool for multi-container applications

## Your First Dockerfile

\`\`\`dockerfile
# Node.js application Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
\`\`\`

## Docker Compose for Development

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  postgres_data:
\`\`\`

## Common Docker Commands

\`\`\`bash
# Build an image
docker build -t my-app .

# Run a container
docker run -p 3000:3000 my-app

# List running containers
docker ps

# Stop a container
docker stop <container_id>

# Docker Compose commands
docker-compose up -d      # Start in background
docker-compose down       # Stop and remove
docker-compose logs -f    # Follow logs
\`\`\`

## Multi-stage Builds

Reduce image size by separating build and runtime:

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
\`\`\`

## Conclusion

Docker makes your development and deployment workflow consistent and reproducible. Start containerizing your apps today!`,
        coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200",
        status: "PUBLISHED",
        isFeatured: true,
        viewCount: 380,
        publishedAt: new Date("2024-02-10"),
        authorId: admin.id,
        categories: { connect: [{ slug: "devops" }] },
        tags: { connect: [{ slug: "docker" }, { slug: "tutorial" }, { slug: "best-practices" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "git-workflow-for-teams" },
      update: {},
      create: {
        title: "Git Workflow for Teams: Branching Strategies and Best Practices",
        slug: "git-workflow-for-teams",
        excerpt: "Learn effective Git branching strategies and collaboration workflows for development teams.",
        content: `## Introduction

A well-defined Git workflow helps teams collaborate effectively and maintain code quality.

## Popular Branching Strategies

### Git Flow

Best for projects with scheduled releases:

\`\`\`
main          ─────●─────────────●─────────
               ↑                ↑
hotfix        ─●─               │
               ↓                │
develop   ────●────●────●────●──┘
               ↑       ↑
feature   ────●───────●
\`\`\`

### GitHub Flow

Simpler approach for continuous deployment:

\`\`\`
main     ────●────●────●────●────
              ↑    ↑    ↑    ↑
feature  ────●    │    │    │
feature  ─────────●    │    │
feature  ──────────────●    │
feature  ───────────────────●
\`\`\`

## Essential Git Commands

\`\`\`bash
# Create and switch to new branch
git checkout -b feature/user-auth

# Keep branch up to date with main
git fetch origin
git rebase origin/main

# Interactive rebase to clean up commits
git rebase -i HEAD~3

# Squash commits before merging
git merge --squash feature/user-auth

# Cherry-pick specific commits
git cherry-pick abc123
\`\`\`

## Commit Message Convention

Follow conventional commits for clear history:

\`\`\`
# Format
<type>(<scope>): <description>

# Examples
feat(auth): add OAuth2 login support
fix(api): handle null response in user endpoint
docs(readme): update installation instructions
refactor(utils): simplify date formatting function
test(auth): add unit tests for login service
\`\`\`

## Pull Request Best Practices

- Keep PRs small and focused
- Write clear descriptions
- Add screenshots for UI changes
- Request reviews from relevant team members
- Address all comments before merging

## Protecting Your Main Branch

\`\`\`
Branch protection rules:
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Include administrators
- Restrict force pushes
\`\`\`

## Conclusion

Choose a workflow that fits your team size and release cycle. Consistency is key!`,
        coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200",
        status: "PUBLISHED",
        isFeatured: false,
        viewCount: 290,
        publishedAt: new Date("2024-02-15"),
        authorId: admin.id,
        categories: { connect: [{ slug: "devops" }] },
        tags: { connect: [{ slug: "git" }, { slug: "best-practices" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "vue-3-composition-api-guide" },
      update: {},
      create: {
        title: "Vue 3 Composition API: A Complete Guide",
        slug: "vue-3-composition-api-guide",
        excerpt: "Master Vue 3's Composition API with practical examples and patterns for building scalable applications.",
        content: `## Introduction to Composition API

The Composition API is Vue 3's new way to organize component logic, offering better code reuse and TypeScript support.

## Basic Setup

\`\`\`vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Reactive state
const count = ref(0);
const name = ref('World');

// Computed property
const greeting = computed(() => \`Hello, \${name.value}!\`);

// Methods
function increment() {
  count.value++;
}

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <h1>{{ greeting }}</h1>
  <p>Count: {{ count }}</p>
  <button @click="increment">Increment</button>
</template>
\`\`\`

## Reactive vs Ref

\`\`\`typescript
import { ref, reactive } from 'vue';

// ref - for primitives (access with .value)
const count = ref(0);
count.value++;

// reactive - for objects (no .value needed)
const state = reactive({
  count: 0,
  user: null
});
state.count++;
\`\`\`

## Creating Composables

Extract and reuse logic across components:

\`\`\`typescript
// composables/useFetch.ts
import { ref } from 'vue';

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);

  async function fetchData() {
    loading.value = true;
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }

  fetchData();

  return { data, error, loading, refetch: fetchData };
}

// Usage in component
const { data: users, loading, error } = useFetch('/api/users');
\`\`\`

## Watch and WatchEffect

\`\`\`typescript
import { watch, watchEffect } from 'vue';

// Watch specific source
watch(count, (newVal, oldVal) => {
  console.log(\`Count changed: \${oldVal} -> \${newVal}\`);
});

// Watch multiple sources
watch([firstName, lastName], ([first, last]) => {
  fullName.value = \`\${first} \${last}\`;
});

// watchEffect - auto-tracks dependencies
watchEffect(() => {
  console.log(\`Count is: \${count.value}\`);
});
\`\`\`

## Provide/Inject for Dependency Injection

\`\`\`typescript
// Parent component
import { provide } from 'vue';

const theme = ref('dark');
provide('theme', theme);

// Child component (any depth)
import { inject } from 'vue';

const theme = inject('theme', 'light'); // 'light' is default
\`\`\`

## Conclusion

The Composition API offers a powerful way to organize and reuse Vue component logic. Start using composables!`,
        coverImage: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200",
        status: "PUBLISHED",
        isFeatured: false,
        viewCount: 410,
        publishedAt: new Date("2024-02-20"),
        authorId: admin.id,
        categories: { connect: [{ slug: "frontend" }] },
        tags: { connect: [{ slug: "vuejs" }, { slug: "typescript" }, { slug: "tutorial" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "react-hooks-deep-dive" },
      update: {},
      create: {
        title: "React Hooks Deep Dive: Beyond the Basics",
        slug: "react-hooks-deep-dive",
        excerpt: "Go beyond useState and useEffect with advanced React hooks patterns and custom hook creation.",
        content: `## Introduction

React Hooks revolutionized how we write React components. Let's explore advanced patterns and custom hooks.

## useReducer for Complex State

\`\`\`typescript
import { useReducer } from 'react';

interface State {
  count: number;
  step: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
\`\`\`

## useMemo and useCallback

\`\`\`typescript
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, filter }) {
  // Memoize expensive computation
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filter));
  }, [items, filter]);

  // Memoize callback for child components
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <ul>
      {filteredItems.map(item => (
        <ListItem key={item.id} onClick={handleClick} />
      ))}
    </ul>
  );
}
\`\`\`

## Custom Hooks

\`\`\`typescript
// useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

## useRef Beyond DOM

\`\`\`typescript
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const stop = () => clearInterval(intervalRef.current);

  return (
    <div>
      <p>{count}</p>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
\`\`\`

## Conclusion

Master these patterns to write more efficient and maintainable React code!`,
        coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200",
        status: "PUBLISHED",
        isFeatured: false,
        viewCount: 350,
        publishedAt: new Date("2024-02-25"),
        authorId: admin.id,
        categories: { connect: [{ slug: "frontend" }] },
        tags: { connect: [{ slug: "react" }, { slug: "typescript" }, { slug: "tutorial" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "python-fastapi-tutorial" },
      update: {},
      create: {
        title: "Building APIs with Python FastAPI",
        slug: "python-fastapi-tutorial",
        excerpt: "Learn to build high-performance APIs with FastAPI, Python's modern web framework.",
        content: `## Why FastAPI?

FastAPI is a modern Python framework for building APIs with automatic OpenAPI documentation and excellent performance.

## Installation

\`\`\`bash
pip install fastapi uvicorn[standard]
\`\`\`

## Basic Application

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: Optional[str] = None

items_db = {}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return items_db[item_id]

@app.post("/items/")
async def create_item(item: Item):
    item_id = len(items_db) + 1
    items_db[item_id] = item
    return {"id": item_id, **item.dict()}
\`\`\`

## Request Validation

\`\`\`python
from pydantic import BaseModel, Field, validator

class User(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str
    age: int = Field(..., ge=0, le=120)

    @validator('email')
    def email_must_be_valid(cls, v):
        if '@' not in v:
            raise ValueError('Invalid email')
        return v

@app.post("/users/")
async def create_user(user: User):
    return user
\`\`\`

## Dependency Injection

\`\`\`python
from fastapi import Depends

async def get_db():
    db = Database()
    try:
        yield db
    finally:
        await db.close()

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = await verify_token(token)
    if not user:
        raise HTTPException(status_code=401)
    return user

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
\`\`\`

## Running the Server

\`\`\`bash
uvicorn main:app --reload
\`\`\`

Visit \`http://localhost:8000/docs\` for automatic Swagger documentation!

## Conclusion

FastAPI combines speed, automatic validation, and great documentation. Perfect for modern Python APIs!`,
        coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200",
        status: "PUBLISHED",
        isFeatured: false,
        viewCount: 280,
        publishedAt: new Date("2024-03-01"),
        authorId: admin.id,
        categories: { connect: [{ slug: "backend" }] },
        tags: { connect: [{ slug: "python" }, { slug: "api" }, { slug: "tutorial" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "draft-kubernetes-guide" },
      update: {},
      create: {
        title: "Kubernetes for Beginners: Getting Started Guide",
        slug: "draft-kubernetes-guide",
        excerpt: "Learn the basics of Kubernetes container orchestration.",
        content: `## Coming Soon

A comprehensive guide to Kubernetes is coming soon!

Stay tuned for:
- Kubernetes architecture overview
- Pods, Services, and Deployments
- ConfigMaps and Secrets
- Helm charts
- Best practices for production`,
        coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200",
        status: "DRAFT",
        isFeatured: false,
        viewCount: 0,
        publishedAt: null,
        authorId: admin.id,
        categories: { connect: [{ slug: "devops" }] },
        tags: { connect: [{ slug: "docker" }, { slug: "tutorial" }] },
        deletedAt: null,
      },
    }),
  ]);
  console.log("✅ Created", posts.length, "posts");

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
