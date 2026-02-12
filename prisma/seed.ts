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

  // Create tech/coding posts
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: "getting-started-with-nuxt-4" },
      update: {},
      create: {
        title: "Getting Started with Nuxt 4: A Complete Guide",
        slug: "getting-started-with-nuxt-4",
        excerpt: "Learn how to build modern web applications with Nuxt 4, the latest version of the Vue.js meta-framework.",
        content: `
<h2>Introduction to Nuxt 4</h2>
<p>Nuxt 4 is the latest major version of the popular Vue.js framework for building web applications. It comes with many improvements and new features that make development faster and more enjoyable.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Improved Performance:</strong> Nuxt 4 is faster than ever with optimized build times and runtime performance.</li>
  <li><strong>Better Developer Experience:</strong> Enhanced hot module replacement and better error handling.</li>
  <li><strong>TypeScript Support:</strong> First-class TypeScript support out of the box.</li>
  <li><strong>Hybrid Rendering:</strong> Mix SSR, SSG, and client-side rendering in the same application.</li>
</ul>

<h2>Getting Started</h2>
<p>To create a new Nuxt 4 project, run the following command:</p>
<pre><code>npx nuxi init my-app
cd my-app
npm install
npm run dev</code></pre>

<h2>Project Structure</h2>
<p>Nuxt 4 uses a file-based routing system. Create Vue files in the <code>pages/</code> directory and they automatically become routes.</p>
<pre><code>my-app/
├── app.vue
├── pages/
│   ├── index.vue      # /
│   ├── about.vue      # /about
│   └── blog/
│       └── [slug].vue # /blog/:slug
├── components/
├── composables/
└── nuxt.config.ts</code></pre>

<h2>Conclusion</h2>
<p>Nuxt 4 is a powerful framework that makes building Vue.js applications a breeze. Start exploring today!</p>
        `.trim(),
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
        content: `
<h2>Write Better JavaScript</h2>
<p>JavaScript is a versatile language, but writing clean and maintainable code requires practice. Here are 10 tips to improve your code quality.</p>

<h3>1. Use const and let</h3>
<p>Always prefer <code>const</code> for variables that don't change, and <code>let</code> for those that do. Avoid <code>var</code>.</p>
<pre><code>// Good
const API_URL = 'https://api.example.com';
let count = 0;

// Avoid
var oldWay = 'deprecated';</code></pre>

<h3>2. Use Template Literals</h3>
<p>Template literals make string concatenation cleaner and more readable.</p>
<pre><code>const greeting = \`Hello, \${name}! You have \${count} messages.\`;</code></pre>

<h3>3. Destructuring Assignment</h3>
<p>Extract values from objects and arrays more elegantly.</p>
<pre><code>const { name, email } = user;
const [first, second, ...rest] = items;</code></pre>

<h3>4. Arrow Functions</h3>
<p>Use arrow functions for shorter syntax and lexical <code>this</code> binding.</p>
<pre><code>const double = (n) => n * 2;
const items = data.map(item => item.name);</code></pre>

<h3>5. Use Array Methods</h3>
<p>Methods like <code>map</code>, <code>filter</code>, and <code>reduce</code> make code more declarative.</p>
<pre><code>const activeUsers = users.filter(u => u.isActive);
const names = users.map(u => u.name);
const total = prices.reduce((sum, p) => sum + p, 0);</code></pre>

<h3>6. Optional Chaining</h3>
<p>Safely access nested properties without checking each level.</p>
<pre><code>const city = user?.address?.city ?? 'Unknown';</code></pre>

<h3>7. Nullish Coalescing</h3>
<p>Use <code>??</code> instead of <code>||</code> for default values when you want to allow falsy values.</p>
<pre><code>const count = data.count ?? 0; // Only defaults if null/undefined</code></pre>

<h3>8. Async/Await</h3>
<p>Write asynchronous code that reads like synchronous code.</p>
<pre><code>async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}</code></pre>

<h3>9. Use Object Shorthand</h3>
<p>Simplify object creation when property names match variable names.</p>
<pre><code>const name = 'John';
const age = 30;
const user = { name, age }; // { name: 'John', age: 30 }</code></pre>

<h3>10. Spread Operator</h3>
<p>Clone and merge objects/arrays immutably.</p>
<pre><code>const newUser = { ...user, role: 'admin' };
const allItems = [...items1, ...items2];</code></pre>

<h2>Conclusion</h2>
<p>These tips will help you write cleaner, more maintainable JavaScript code. Practice them daily!</p>
        `.trim(),
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
        content: `
<h2>Understanding TypeScript Generics</h2>
<p>Generics allow you to write flexible, reusable code while maintaining type safety. They're one of TypeScript's most powerful features.</p>

<h2>Basic Generic Function</h2>
<p>Instead of using <code>any</code>, generics preserve type information:</p>
<pre><code>// Without generics - loses type information
function identity(arg: any): any {
  return arg;
}

// With generics - preserves type
function identity&lt;T&gt;(arg: T): T {
  return arg;
}

const num = identity(42);        // type: number
const str = identity('hello');   // type: string</code></pre>

<h2>Generic Interfaces</h2>
<p>Create flexible interfaces that work with multiple types:</p>
<pre><code>interface ApiResponse&lt;T&gt; {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse&lt;User&gt; = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'Success'
};</code></pre>

<h2>Generic Constraints</h2>
<p>Limit what types can be used with your generic:</p>
<pre><code>interface HasLength {
  length: number;
}

function logLength&lt;T extends HasLength&gt;(arg: T): void {
  console.log(arg.length);
}

logLength('hello');     // OK - string has length
logLength([1, 2, 3]);   // OK - array has length
logLength(123);         // Error - number has no length</code></pre>

<h2>Multiple Type Parameters</h2>
<p>Use multiple generics for complex relationships:</p>
<pre><code>function map&lt;T, U&gt;(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const numbers = [1, 2, 3];
const strings = map(numbers, n => n.toString());
// strings: string[]</code></pre>

<h2>Generic Classes</h2>
<p>Create type-safe data structures:</p>
<pre><code>class Stack&lt;T&gt; {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack&lt;number&gt;();
numberStack.push(1);
numberStack.push(2);
const value = numberStack.pop(); // type: number | undefined</code></pre>

<h2>Conclusion</h2>
<p>Generics are essential for writing reusable TypeScript code. Start using them to improve your type safety!</p>
        `.trim(),
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
        content: `
<h2>Introduction</h2>
<p>REST APIs are the backbone of modern web applications. In this tutorial, we'll build a complete API using Node.js and Express.</p>

<h2>Project Setup</h2>
<pre><code>mkdir my-api
cd my-api
npm init -y
npm install express cors helmet morgan
npm install -D typescript @types/node @types/express ts-node nodemon</code></pre>

<h2>Project Structure</h2>
<pre><code>my-api/
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
└── tsconfig.json</code></pre>

<h2>Basic Server Setup</h2>
<pre><code>// src/index.ts
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
});</code></pre>

<h2>Creating Routes</h2>
<pre><code>// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;</code></pre>

<h2>Controller Implementation</h2>
<pre><code>// src/controllers/userController.ts
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
};</code></pre>

<h2>Error Handling Middleware</h2>
<pre><code>// src/middleware/errorHandler.ts
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
};</code></pre>

<h2>Conclusion</h2>
<p>You now have a solid foundation for building REST APIs with Node.js. Extend this with authentication, validation, and database integration!</p>
        `.trim(),
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
        content: `
<h2>Why Docker?</h2>
<p>Docker solves the "it works on my machine" problem by packaging your application with all its dependencies into a container.</p>

<h2>Key Concepts</h2>
<ul>
  <li><strong>Image:</strong> A blueprint for containers (like a class)</li>
  <li><strong>Container:</strong> A running instance of an image (like an object)</li>
  <li><strong>Dockerfile:</strong> Instructions to build an image</li>
  <li><strong>Docker Compose:</strong> Tool for multi-container applications</li>
</ul>

<h2>Your First Dockerfile</h2>
<pre><code># Node.js application Dockerfile
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

CMD ["node", "dist/index.js"]</code></pre>

<h2>Docker Compose for Development</h2>
<pre><code># docker-compose.yml
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
  postgres_data:</code></pre>

<h2>Common Docker Commands</h2>
<pre><code># Build an image
docker build -t my-app .

# Run a container
docker run -p 3000:3000 my-app

# List running containers
docker ps

# Stop a container
docker stop &lt;container_id&gt;

# Docker Compose commands
docker-compose up -d      # Start in background
docker-compose down       # Stop and remove
docker-compose logs -f    # Follow logs</code></pre>

<h2>Multi-stage Builds</h2>
<p>Reduce image size by separating build and runtime:</p>
<pre><code>FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]</code></pre>

<h2>Conclusion</h2>
<p>Docker makes your development and deployment workflow consistent and reproducible. Start containerizing your apps today!</p>
        `.trim(),
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
        content: `
<h2>Introduction</h2>
<p>A well-defined Git workflow helps teams collaborate effectively and maintain code quality.</p>

<h2>Popular Branching Strategies</h2>

<h3>Git Flow</h3>
<p>Best for projects with scheduled releases:</p>
<pre><code>main          ─────●─────────────●─────────
               ↑                ↑
hotfix        ─●─               │
               ↓                │
develop   ────●────●────●────●──┘
               ↑       ↑
feature   ────●───────●</code></pre>

<h3>GitHub Flow</h3>
<p>Simpler approach for continuous deployment:</p>
<pre><code>main     ────●────●────●────●────
              ↑    ↑    ↑    ↑
feature  ────●    │    │    │
feature  ─────────●    │    │
feature  ──────────────●    │
feature  ───────────────────●</code></pre>

<h2>Essential Git Commands</h2>
<pre><code># Create and switch to new branch
git checkout -b feature/user-auth

# Keep branch up to date with main
git fetch origin
git rebase origin/main

# Interactive rebase to clean up commits
git rebase -i HEAD~3

# Squash commits before merging
git merge --squash feature/user-auth

# Cherry-pick specific commits
git cherry-pick abc123</code></pre>

<h2>Commit Message Convention</h2>
<p>Follow conventional commits for clear history:</p>
<pre><code># Format
&lt;type&gt;(&lt;scope&gt;): &lt;description&gt;

# Examples
feat(auth): add OAuth2 login support
fix(api): handle null response in user endpoint
docs(readme): update installation instructions
refactor(utils): simplify date formatting function
test(auth): add unit tests for login service</code></pre>

<h2>Pull Request Best Practices</h2>
<ul>
  <li>Keep PRs small and focused</li>
  <li>Write clear descriptions</li>
  <li>Add screenshots for UI changes</li>
  <li>Request reviews from relevant team members</li>
  <li>Address all comments before merging</li>
</ul>

<h2>Protecting Your Main Branch</h2>
<pre><code># Branch protection rules:
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Include administrators
- Restrict force pushes</code></pre>

<h2>Conclusion</h2>
<p>Choose a workflow that fits your team size and release cycle. Consistency is key!</p>
        `.trim(),
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
        content: `
<h2>Introduction to Composition API</h2>
<p>The Composition API is Vue 3's new way to organize component logic, offering better code reuse and TypeScript support.</p>

<h2>Basic Setup</h2>
<pre><code>&lt;script setup lang="ts"&gt;
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
&lt;/script&gt;

&lt;template&gt;
  &lt;h1&gt;{{ greeting }}&lt;/h1&gt;
  &lt;p&gt;Count: {{ count }}&lt;/p&gt;
  &lt;button @click="increment"&gt;Increment&lt;/button&gt;
&lt;/template&gt;</code></pre>

<h2>Reactive vs Ref</h2>
<pre><code>import { ref, reactive } from 'vue';

// ref - for primitives (access with .value)
const count = ref(0);
count.value++;

// reactive - for objects (no .value needed)
const state = reactive({
  count: 0,
  user: null
});
state.count++;</code></pre>

<h2>Creating Composables</h2>
<p>Extract and reuse logic across components:</p>
<pre><code>// composables/useFetch.ts
import { ref } from 'vue';

export function useFetch&lt;T&gt;(url: string) {
  const data = ref&lt;T | null&gt;(null);
  const error = ref&lt;Error | null&gt;(null);
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
const { data: users, loading, error } = useFetch('/api/users');</code></pre>

<h2>Watch and WatchEffect</h2>
<pre><code>import { watch, watchEffect } from 'vue';

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
});</code></pre>

<h2>Provide/Inject for Dependency Injection</h2>
<pre><code>// Parent component
import { provide } from 'vue';

const theme = ref('dark');
provide('theme', theme);

// Child component (any depth)
import { inject } from 'vue';

const theme = inject('theme', 'light'); // 'light' is default</code></pre>

<h2>Conclusion</h2>
<p>The Composition API offers a powerful way to organize and reuse Vue component logic. Start using composables!</p>
        `.trim(),
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
        content: `
<h2>Introduction</h2>
<p>React Hooks revolutionized how we write React components. Let's explore advanced patterns and custom hooks.</p>

<h2>useReducer for Complex State</h2>
<pre><code>import { useReducer } from 'react';

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
    &lt;div&gt;
      &lt;p&gt;Count: {state.count}&lt;/p&gt;
      &lt;button onClick={() => dispatch({ type: 'increment' })}&gt;+&lt;/button&gt;
      &lt;button onClick={() => dispatch({ type: 'decrement' })}&gt;-&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>useMemo and useCallback</h2>
<pre><code>import { useMemo, useCallback } from 'react';

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
    &lt;ul&gt;
      {filteredItems.map(item => (
        &lt;ListItem key={item.id} onClick={handleClick} /&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

<h2>Custom Hooks</h2>
<pre><code>// useLocalStorage hook
function useLocalStorage&lt;T&gt;(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState&lt;T&gt;(() => {
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
const [theme, setTheme] = useLocalStorage('theme', 'light');</code></pre>

<h2>useRef Beyond DOM</h2>
<pre><code>function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef&lt;NodeJS.Timeout&gt;();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const stop = () => clearInterval(intervalRef.current);

  return (
    &lt;div&gt;
      &lt;p&gt;{count}&lt;/p&gt;
      &lt;button onClick={stop}&gt;Stop&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>Conclusion</h2>
<p>Master these patterns to write more efficient and maintainable React code!</p>
        `.trim(),
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
        content: `
<h2>Why FastAPI?</h2>
<p>FastAPI is a modern Python framework for building APIs with automatic OpenAPI documentation and excellent performance.</p>

<h2>Installation</h2>
<pre><code>pip install fastapi uvicorn[standard]</code></pre>

<h2>Basic Application</h2>
<pre><code>from fastapi import FastAPI, HTTPException
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
    return {"id": item_id, **item.dict()}</code></pre>

<h2>Request Validation</h2>
<pre><code>from pydantic import BaseModel, Field, validator

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
    return user</code></pre>

<h2>Dependency Injection</h2>
<pre><code>from fastapi import Depends

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
    return current_user</code></pre>

<h2>Running the Server</h2>
<pre><code>uvicorn main:app --reload</code></pre>

<p>Visit <code>http://localhost:8000/docs</code> for automatic Swagger documentation!</p>

<h2>Conclusion</h2>
<p>FastAPI combines speed, automatic validation, and great documentation. Perfect for modern Python APIs!</p>
        `.trim(),
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
        content: "<p>Coming soon: A comprehensive guide to Kubernetes...</p>",
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
