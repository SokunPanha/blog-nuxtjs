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
    where: { email: "panha.sokun@gmail.com" },
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
        nameEn: "Frontend",
        nameKh: "ផ្នែកខាងមុខ",
        slug: "frontend",
        descriptionEn: "Frontend development with JavaScript, TypeScript, React, Vue, and modern CSS.",
        descriptionKh: "ការអភិវឌ្ឍន៍ផ្នែកខាងមុខដោយប្រើ JavaScript, TypeScript, React, Vue, និង CSS ទំនើប។",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "backend" },
      update: {},
      create: {
        nameEn: "Backend",
        nameKh: "ផ្នែកខាងក្រោយ",
        slug: "backend",
        descriptionEn: "Server-side development with Node.js, Python, Go, and databases.",
        descriptionKh: "ការអភិវឌ្ឍន៍ផ្នែក server ដោយប្រើ Node.js, Python, Go, និង databases។",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "devops" },
      update: {},
      create: {
        nameEn: "DevOps",
        nameKh: "DevOps",
        slug: "devops",
        descriptionEn: "CI/CD, Docker, Kubernetes, cloud platforms, and infrastructure as code.",
        descriptionKh: "CI/CD, Docker, Kubernetes, cloud platforms, និង infrastructure as code។",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "web-development" },
      update: {},
      create: {
        nameEn: "Web Development",
        nameKh: "ការអភិវឌ្ឍន៍គេហទំព័រ",
        slug: "web-development",
        descriptionEn: "Full-stack web development tutorials, best practices, and modern architectures.",
        descriptionKh: "ការបង្រៀន full-stack web development, best practices, និង modern architectures។",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "mobile-development" },
      update: {},
      create: {
        nameEn: "Mobile Development",
        nameKh: "ការអភិវឌ្ឍន៍កម្មវិធីចល័ត",
        slug: "mobile-development",
        descriptionEn: "iOS, Android, React Native, and Flutter mobile app development.",
        descriptionKh: "ការអភិវឌ្ឍន៍កម្មវិធីចល័ត iOS, Android, React Native, និង Flutter។",
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
        nameEn: "JavaScript",
        nameKh: "ជ្វាស្ក្រីប",
        slug: "javascript",
        descriptionEn: "JavaScript programming language",
        descriptionKh: "ភាសាកម្មវិធី JavaScript",
        coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "typescript" },
      update: {},
      create: {
        nameEn: "TypeScript",
        nameKh: "TypeScript",
        slug: "typescript",
        descriptionEn: "TypeScript - typed JavaScript",
        descriptionKh: "TypeScript - JavaScript ដែលមានប្រភេទ",
        coverImage: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "vuejs" },
      update: {},
      create: {
        nameEn: "Vue.js",
        nameKh: "Vue.js",
        slug: "vuejs",
        descriptionEn: "Vue.js progressive framework",
        descriptionKh: "Vue.js progressive framework",
        coverImage: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "nuxt" },
      update: {},
      create: {
        nameEn: "Nuxt",
        nameKh: "Nuxt",
        slug: "nuxt",
        descriptionEn: "Nuxt.js meta-framework for Vue",
        descriptionKh: "Nuxt.js meta-framework សម្រាប់ Vue",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "react" },
      update: {},
      create: {
        nameEn: "React",
        nameKh: "React",
        slug: "react",
        descriptionEn: "React library for building UIs",
        descriptionKh: "React library សម្រាប់បង្កើត UI",
        coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "nodejs" },
      update: {},
      create: {
        nameEn: "Node.js",
        nameKh: "Node.js",
        slug: "nodejs",
        descriptionEn: "Node.js JavaScript runtime",
        descriptionKh: "Node.js JavaScript runtime",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "python" },
      update: {},
      create: {
        nameEn: "Python",
        nameKh: "ភីតុន",
        slug: "python",
        descriptionEn: "Python programming language",
        descriptionKh: "ភាសាកម្មវិធី Python",
        coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "docker" },
      update: {},
      create: {
        nameEn: "Docker",
        nameKh: "Docker",
        slug: "docker",
        descriptionEn: "Docker containerization",
        descriptionKh: "Docker containerization",
        coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "git" },
      update: {},
      create: {
        nameEn: "Git",
        nameKh: "Git",
        slug: "git",
        descriptionEn: "Git version control",
        descriptionKh: "Git version control",
        coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "api" },
      update: {},
      create: {
        nameEn: "API",
        nameKh: "API",
        slug: "api",
        descriptionEn: "REST and GraphQL APIs",
        descriptionKh: "REST និង GraphQL APIs",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "tutorial" },
      update: {},
      create: {
        nameEn: "Tutorial",
        nameKh: "ការបង្រៀន",
        slug: "tutorial",
        descriptionEn: "Step-by-step coding tutorials",
        descriptionKh: "ការបង្រៀន coding ជាជំហានៗ",
        coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "best-practices" },
      update: {},
      create: {
        nameEn: "Best Practices",
        nameKh: "វិធីប្រតិបត្តិល្អ",
        slug: "best-practices",
        descriptionEn: "Coding best practices and patterns",
        descriptionKh: "វិធីប្រតិបត្តិ coding ល្អ និង patterns",
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
        titleEn: "Getting Started with Nuxt 4: A Complete Guide",
        titleKh: "ការចាប់ផ្ដើមជាមួយ Nuxt 4: មគ្គុទ្ទេសក៍ពេញលេញ",
        slug: "getting-started-with-nuxt-4",
        excerptEn: "Learn how to build modern web applications with Nuxt 4, the latest version of the Vue.js meta-framework.",
        excerptKh: "រៀនបង្កើត web applications ទំនើបជាមួយ Nuxt 4, កំណែចុងក្រោយបំផុតនៃ Vue.js meta-framework។",
        contentEn: `## Introduction to Nuxt 4

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
        contentKh: `## សេចក្ដីណែនាំអំពី Nuxt 4

Nuxt 4 គឺជាកំណែចម្បងថ្មីបំផុតនៃ Vue.js framework ដ៏ពេញនិយមសម្រាប់ការបង្កើត web applications។ វាមកជាមួយការធ្វើឱ្យប្រសើរឡើង និងមុខងារថ្មីៗជាច្រើនដែលធ្វើឱ្យការអភិវឌ្ឍន៍លឿន និងងាយស្រួលជាងមុន។

## មុខងារសំខាន់ៗ

- **ដំណើរការប្រសើរ:** Nuxt 4 លឿនជាងមុនជាមួយ build times ដែលបានធ្វើឱ្យប្រសើរ។
- **បទពិសោធន៍ Developer ប្រសើរ:** Hot module replacement ប្រសើរ និង error handling ល្អ។
- **ការគាំទ្រ TypeScript:** ការគាំទ្រ TypeScript ដោយផ្ទាល់ចេញពីប្រអប់។
- **Hybrid Rendering:** ច្របូកបញ្ចូល SSR, SSG, និង client-side rendering ក្នុង application តែមួយ។

## ការចាប់ផ្ដើម

ដើម្បីបង្កើត project Nuxt 4 ថ្មី, បញ្ចូល command ខាងក្រោម:

\`\`\`bash
npx nuxi init my-app
cd my-app
npm install
npm run dev
\`\`\`

## រចនាសម្ព័ន្ធ Project

Nuxt 4 ប្រើប្រាស់ file-based routing។ បង្កើតឯកសារ Vue ក្នុង directory \`pages/\` ហើយពួកវានឹងក្លាយជា routes ដោយស្វ័យប្រវត្តិ។

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

## សន្និដ្ឋាន

Nuxt 4 គឺជា framework ដ៏មានឥទ្ធិពល ដែលធ្វើឱ្យការបង្កើត Vue.js applications ងាយស្រួល។ ចាប់ផ្ដើមស្វែងយល់ថ្ងៃនេះ!`,
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
        titleEn: "10 JavaScript Tips for Writing Better Code",
        titleKh: "ល្បិច JavaScript ១០ ចំណុចសម្រាប់ការសរសេរ Code ល្អ",
        slug: "10-javascript-tips-for-better-code",
        excerptEn: "Improve your JavaScript skills with these practical tips and best practices for cleaner, more efficient code.",
        excerptKh: "ធ្វើឱ្យប្រសើរជំនាញ JavaScript របស់អ្នកជាមួយល្បិច និង best practices ទាំងនេះ សម្រាប់ code ស្អាត និងប្រសើរ។",
        contentEn: `## Write Better JavaScript

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
        contentKh: `## សរសេរ JavaScript ឱ្យប្រសើរ

JavaScript គឺជាភាសា versatile ប៉ុន្តែការសរសេរ code ស្អាត និងងាយថែទាំ ទាមទារការអនុវត្ត។ នេះជាល្បិច ១០ ចំណុច ដើម្បីប្រសើរភាព code របស់អ្នក។

### ១. ប្រើ const និង let

តែងតែប្រើ \`const\` សម្រាប់អថេរដែលមិនផ្លាស់ប្ដូរ, និង \`let\` សម្រាប់អថេរដែលផ្លាស់ប្ដូរ។ ជៀសវាង \`var\`។

\`\`\`javascript
// ល្អ
const API_URL = 'https://api.example.com';
let count = 0;

// ជៀសវាង
var oldWay = 'deprecated';
\`\`\`

### ២. ប្រើ Template Literals

Template literals ធ្វើឱ្យការភ្ជាប់ strings ស្អាត និងងាយអាន។

\`\`\`javascript
const greeting = \`សួស្ដី, \${name}! អ្នកមានសារ \${count} ។\`;
\`\`\`

### ៣. Destructuring Assignment

ដកតម្លៃពី objects និង arrays ដោយប្រើស្អាត។

\`\`\`javascript
const { name, email } = user;
const [first, second, ...rest] = items;
\`\`\`

### ៤. Arrow Functions

ប្រើ arrow functions សម្រាប់ syntax ខ្លី និង lexical \`this\` binding។

\`\`\`javascript
const double = (n) => n * 2;
const items = data.map(item => item.name);
\`\`\`

### ៥. ប្រើ Array Methods

Methods ដូចជា \`map\`, \`filter\`, និង \`reduce\` ធ្វើឱ្យ code មាន declarative ច្រើន។

\`\`\`javascript
const activeUsers = users.filter(u => u.isActive);
const names = users.map(u => u.name);
const total = prices.reduce((sum, p) => sum + p, 0);
\`\`\`

### ៦. Optional Chaining

ចូលប្រើ nested properties ដោយសុវត្ថិភាព ដោយមិនចាំបាច់ពិនិត្យគ្រប់ level។

\`\`\`javascript
const city = user?.address?.city ?? 'មិនស្គាល់';
\`\`\`

### ៧. Nullish Coalescing

ប្រើ \`??\` ជំនួស \`||\` សម្រាប់តម្លៃ default ពេល null ឬ undefined។

\`\`\`javascript
const count = data.count ?? 0;
\`\`\`

### ៨. Async/Await

សរសេរ asynchronous code ដែលអានដូច synchronous code។

\`\`\`javascript
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    return await response.json();
  } catch (error) {
    console.error('បរាជ័យក្នុងការទាញ user:', error);
  }
}
\`\`\`

### ៩. Object Shorthand

ធ្វើឱ្យការបង្កើត object ងាយស្រួល ពេលឈ្មោះ property ដូចគ្នានឹងឈ្មោះអថេរ។

\`\`\`javascript
const name = 'John';
const age = 30;
const user = { name, age };
\`\`\`

### ១០. Spread Operator

Clone និង merge objects/arrays ដោយ immutably។

\`\`\`javascript
const newUser = { ...user, role: 'admin' };
const allItems = [...items1, ...items2];
\`\`\`

## សន្និដ្ឋាន

ល្បិចទាំងនេះនឹងជួយអ្នកសរសេរ JavaScript code ស្អាត និងងាយថែទាំ។ អនុវត្តរៀងរាល់ថ្ងៃ!`,
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
        titleEn: "TypeScript Generics Explained with Practical Examples",
        titleKh: "TypeScript Generics ពន្យល់ជាមួយឧទាហរណ៍ជាក់ស្ដែង",
        slug: "typescript-generics-explained",
        excerptEn: "Master TypeScript generics with clear explanations and real-world examples you can use in your projects.",
        excerptKh: "ស្ទាត់ជំនាញ TypeScript generics ជាមួយការពន្យល់ច្បាស់ និងឧទាហរណ៍ real-world ដែលអ្នកអាចប្រើក្នុង projects របស់អ្នក។",
        contentEn: `## Understanding TypeScript Generics

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
        contentKh: `## ការយល់ដឹងអំពី TypeScript Generics

Generics អនុញ្ញាតឱ្យអ្នកសរសេរ code ដែលអាចប្រើប្រាស់បានឡើងវិញ ខណៈពេលដែលរក្សាបាននូវ type safety។ ពួកវាជាមុខងារដ៏មានឥទ្ធិពលបំផុតរបស់ TypeScript។

## Generic Function ជាមូលដ្ឋាន

ជំនួសការប្រើ \`any\`, generics រក្សា type information:

\`\`\`typescript
// ដោយមិនប្រើ generics - បាត់ type information
function identity(arg: any): any {
  return arg;
}

// ជាមួយ generics - រក្សា type
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);        // type: number
const str = identity('hello');   // type: string
\`\`\`

## Generic Interfaces

បង្កើត interfaces ដែលបត់បែនធ្វើការជាមួយប្រភេទច្រើន:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
\`\`\`

## Generic Constraints

កំណត់ប្រភេទដែលអាចប្រើជាមួយ generic:

\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length);
}
\`\`\`

## Generic Classes

បង្កើត data structures ដែលមាន type-safe:

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
\`\`\`

## សន្និដ្ឋាន

Generics មានសារៈសំខាន់ណាស់សម្រាប់ការសរសេរ TypeScript code ដែលអាចប្រើប្រាស់បានឡើងវិញ។ ចាប់ផ្ដើមប្រើពួកវា ដើម្បីបង្កើនប្រសិទ្ធភាព type safety!`,
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
        titleEn: "Building a REST API with Node.js and Express",
        titleKh: "ការបង្កើត REST API ជាមួយ Node.js និង Express",
        slug: "building-rest-api-with-nodejs",
        excerptEn: "Learn how to create a production-ready REST API using Node.js, Express, and best practices.",
        excerptKh: "រៀនបង្កើត REST API ត្រៀមសម្រាប់ production ដោយប្រើ Node.js, Express, និង best practices។",
        contentEn: `## Introduction

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
        contentKh: `## សេចក្ដីណែនាំ

REST APIs គឺជាសសររបស់ web applications ទំនើប។ ក្នុងការបង្រៀននេះ យើងនឹងបង្កើត API ពេញលេញដោយប្រើ Node.js និង Express។

## ការរៀបចំ Project

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express cors helmet morgan
npm install -D typescript @types/node @types/express ts-node nodemon
\`\`\`

## រចនាសម្ព័ន្ធ Project

\`\`\`
my-api/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── index.ts
├── package.json
└── tsconfig.json
\`\`\`

## ការរៀបចំ Server ជាមូលដ្ឋាន

\`\`\`typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(\`Server កំពុងដំណើរការលើ port \${PORT}\`);
});
\`\`\`

## ការបង្កើត Routes

\`\`\`typescript
import { Router } from 'express';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
\`\`\`

## Error Handling Middleware

\`\`\`typescript
export const errorHandler = (err: Error, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'មានបញ្ហាកើតឡើង!',
    message: err.message
  });
};
\`\`\`

## សន្និដ្ឋាន

ឥឡូវនេះ អ្នកមានមូលដ្ឋានរឹងមាំសម្រាប់ការបង្កើត REST APIs ជាមួយ Node.js។ ពង្រីកវាជាមួយ authentication, validation, និងការភ្ជាប់ database!`,
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
        titleEn: "Docker for Developers: From Zero to Production",
        titleKh: "Docker សម្រាប់ Developer: ពី Zero ដល់ Production",
        slug: "docker-for-developers",
        excerptEn: "A practical guide to containerizing your applications with Docker and Docker Compose.",
        excerptKh: "មគ្គុទ្ទេសក៍ជាក់ស្ដែងសម្រាប់ containerize ប្រព័ន្ធប្រើប្រាស់ជាមួយ Docker និង Docker Compose។",
        contentEn: `## Why Docker?

Docker solves the "it works on my machine" problem by packaging your application with all its dependencies into a container.

## Key Concepts

- **Image:** A blueprint for containers (like a class)
- **Container:** A running instance of an image (like an object)
- **Dockerfile:** Instructions to build an image
- **Docker Compose:** Tool for multi-container applications

## Your First Dockerfile

\`\`\`dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## Docker Compose for Development

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Common Docker Commands

\`\`\`bash
docker build -t my-app .
docker run -p 3000:3000 my-app
docker ps
docker-compose up -d
docker-compose down
docker-compose logs -f
\`\`\`

## Conclusion

Docker makes your development and deployment workflow consistent and reproducible. Start containerizing your apps today!`,
        contentKh: `## ហេតុអ្វីត្រូវប្រើ Docker?

Docker ដោះស្រាយបញ្ហា "ដំណើរការបានលើ machine ខ្ញុំ" ដោយ packaging ប្រព័ន្ធប្រើប្រាស់របស់អ្នកជាមួយ dependencies ទាំងអស់ក្នុង container។

## គំនិតសំខាន់ៗ

- **Image:** ប្លង់ (blueprint) សម្រាប់ containers
- **Container:** Instance ដែលកំពុងដំណើរការនៃ image
- **Dockerfile:** ការណែនាំដើម្បីបង្កើត image
- **Docker Compose:** Tool សម្រាប់ applications ដែលមាន containers ច្រើន

## Dockerfile ដំបូងរបស់អ្នក

\`\`\`dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## Docker Compose សម្រាប់ Development

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
\`\`\`

## Commands Docker ទូទៅ

\`\`\`bash
docker build -t my-app .       # បង្កើត image
docker run -p 3000:3000 my-app # រត់ container
docker ps                       # បង្ហាញ containers
docker-compose up -d            # ចាប់ផ្ដើមក្នុង background
docker-compose down             # បញ្ឈប់
\`\`\`

## សន្និដ្ឋាន

Docker ធ្វើឱ្យ workflow development និង deployment របស់អ្នកស៊ីសង្វាក់ និងអាចចម្លងបាន។ ចាប់ផ្ដើម containerize apps របស់អ្នកថ្ងៃនេះ!`,
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
        titleEn: "Git Workflow for Teams: Branching Strategies and Best Practices",
        titleKh: "Git Workflow សម្រាប់ Teams: Branching Strategies និង Best Practices",
        slug: "git-workflow-for-teams",
        excerptEn: "Learn effective Git branching strategies and collaboration workflows for development teams.",
        excerptKh: "រៀន Git branching strategies ប្រកបដោយប្រសិទ្ធភាព និង collaboration workflows សម្រាប់ development teams។",
        contentEn: `## Introduction

A well-defined Git workflow helps teams collaborate effectively and maintain code quality.

## Popular Branching Strategies

### Git Flow

Best for projects with scheduled releases:

\`\`\`
main          ─────●─────────────●─────────
develop   ────●────●────●────●──┘
feature   ────●───────●
\`\`\`

### GitHub Flow

Simpler approach for continuous deployment:

\`\`\`
main     ────●────●────●────●────
feature  ────●    │    │    │
\`\`\`

## Essential Git Commands

\`\`\`bash
git checkout -b feature/user-auth
git fetch origin
git rebase origin/main
git rebase -i HEAD~3
git merge --squash feature/user-auth
\`\`\`

## Commit Message Convention

\`\`\`
feat(auth): add OAuth2 login support
fix(api): handle null response in user endpoint
docs(readme): update installation instructions
refactor(utils): simplify date formatting function
\`\`\`

## Pull Request Best Practices

- Keep PRs small and focused
- Write clear descriptions
- Add screenshots for UI changes
- Request reviews from relevant team members
- Address all comments before merging

## Conclusion

Choose a workflow that fits your team size and release cycle. Consistency is key!`,
        contentKh: `## សេចក្ដីណែនាំ

Git workflow ដែលបានកំណត់យ៉ាងល្អ ជួយ teams ធ្វើការសហការបានល្អ និងរក្សាគុណភាព code។

## Branching Strategies ពេញនិយម

### Git Flow

ល្អបំផុតសម្រាប់ projects ដែលមាន scheduled releases:

\`\`\`
main      ─────●─────────────●─────────
develop   ────●────●────●────●──┘
feature   ────●───────●
\`\`\`

### GitHub Flow

វិធីសាស្ត្រសាមញ្ញជាង សម្រាប់ continuous deployment:

\`\`\`
main     ────●────●────●────●────
feature  ────●    │    │    │
\`\`\`

## Commands Git ចាំបាច់

\`\`\`bash
git checkout -b feature/user-auth  # បង្កើតមែក feature
git fetch origin                    # ទាញ changes
git rebase origin/main             # rebase ជាមួយ main
git rebase -i HEAD~3               # interactive rebase
\`\`\`

## វិធីសរសេរ Commit Message

\`\`\`
feat(auth): add OAuth2 login support
fix(api): handle null response in user endpoint
docs(readme): update installation instructions
\`\`\`

## Best Practices សម្រាប់ Pull Requests

- រក្សា PRs ឱ្យតូច និងផ្ដោតសំខាន់
- សរសេរការពណ៌នាច្បាស់
- បន្ថែម screenshots សម្រាប់ UI changes
- ស្នើសុំ reviews ពី team members

## សន្និដ្ឋាន

ជ្រើសរើស workflow ដែលសមស្របទំហំ team និង release cycle របស់អ្នក។ ភាពស៊ីសង្វាក់គឺជាគន្លឹះ!`,
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
        titleEn: "Vue 3 Composition API: A Complete Guide",
        titleKh: "Vue 3 Composition API: មគ្គុទ្ទេសក៍ពេញលេញ",
        slug: "vue-3-composition-api-guide",
        excerptEn: "Master Vue 3's Composition API with practical examples and patterns for building scalable applications.",
        excerptKh: "ស្ទាត់ជំនាញ Vue 3 Composition API ជាមួយឧទាហរណ៍ជាក់ស្ដែង និង patterns ក្នុងការបង្កើតប្រព័ន្ធ scalable។",
        contentEn: `## Introduction to Composition API

The Composition API is Vue 3's new way to organize component logic, offering better code reuse and TypeScript support.

## Basic Setup

\`\`\`vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const name = ref('World');

const greeting = computed(() => \`Hello, \${name.value}!\`);

function increment() {
  count.value++;
}

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
const state = reactive({ count: 0, user: null });
state.count++;
\`\`\`

## Creating Composables

Extract and reuse logic across components:

\`\`\`typescript
// composables/useFetch.ts
export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const loading = ref(true);

  async function fetchData() {
    loading.value = true;
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } finally {
      loading.value = false;
    }
  }

  fetchData();
  return { data, loading, refetch: fetchData };
}
\`\`\`

## Conclusion

The Composition API offers a powerful way to organize and reuse Vue component logic. Start using composables!`,
        contentKh: `## សេចក្ដីណែនាំអំពី Composition API

Composition API គឺជាវិធីថ្មីរបស់ Vue 3 ក្នុងការរៀបចំ component logic ដោយផ្ដល់នូវ code reuse ប្រសើរ និងការគាំទ្រ TypeScript ល្អ។

## ការរៀបចំជាមូលដ្ឋាន

\`\`\`vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const name = ref('ពិភពលោក');

const greeting = computed(() => \`សួស្ដី, \${name.value}!\`);

function increment() {
  count.value++;
}

onMounted(() => {
  console.log('Component ត្រូវបាន mount');
});
</script>

<template>
  <h1>{{ greeting }}</h1>
  <p>ចំនួន: {{ count }}</p>
  <button @click="increment">បន្ថែម</button>
</template>
\`\`\`

## Reactive ទល់នឹង Ref

\`\`\`typescript
import { ref, reactive } from 'vue';

// ref - សម្រាប់ primitives (ចូលប្រើជាមួយ .value)
const count = ref(0);
count.value++;

// reactive - សម្រាប់ objects (មិនចាំបាច់ .value)
const state = reactive({ count: 0, user: null });
state.count++;
\`\`\`

## ការបង្កើត Composables

ដក និងប្រើ logic ឡើងវិញក្នុង components ផ្សេងៗ:

\`\`\`typescript
// composables/useFetch.ts
export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const loading = ref(true);

  async function fetchData() {
    loading.value = true;
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } finally {
      loading.value = false;
    }
  }

  fetchData();
  return { data, loading, refetch: fetchData };
}
\`\`\`

## Watch និង WatchEffect

\`\`\`typescript
import { watch, watchEffect } from 'vue';

// Watch source ជាក់លាក់
watch(count, (newVal, oldVal) => {
  console.log(\`ចំនួនផ្លាស់ប្ដូរ: \${oldVal} -> \${newVal}\`);
});

// watchEffect - track dependencies ដោយស្វ័យប្រវត្តិ
watchEffect(() => {
  console.log(\`ចំនួន: \${count.value}\`);
});
\`\`\`

## សន្និដ្ឋាន

Composition API ផ្ដល់នូវវិធីដ៏មានឥទ្ធិពល ក្នុងការរៀបចំ និងប្រើ Vue component logic ឡើងវិញ។ ចាប់ផ្ដើមប្រើ composables!`,
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
        titleEn: "React Hooks Deep Dive: Beyond the Basics",
        titleKh: "React Hooks Deep Dive: ហួសពី Basics",
        slug: "react-hooks-deep-dive",
        excerptEn: "Go beyond useState and useEffect with advanced React hooks patterns and custom hook creation.",
        excerptKh: "ស្វែងយល់ advanced React hooks patterns និងការបង្កើត custom hooks ហួសពី useState និង useEffect។",
        contentEn: `## Introduction

React Hooks revolutionized how we write React components. Let's explore advanced patterns and custom hooks.

## useReducer for Complex State

\`\`\`typescript
import { useReducer } from 'react';

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
    </div>
  );
}
\`\`\`

## useMemo and useCallback

\`\`\`typescript
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filter));
  }, [items, filter]);

  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);

  return <ul>{filteredItems.map(item => <li key={item}>{item}</li>)}</ul>;
}
\`\`\`

## Custom Hooks

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}

const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

## Conclusion

Master these patterns to write more efficient and maintainable React code!`,
        contentKh: `## សេចក្ដីណែនាំ

React Hooks បានផ្លាស់ប្ដូររបៀបសរសេរ React components។ ចូរយើងស្វែងយល់ advanced patterns និង custom hooks។

## useReducer សម្រាប់ State ស្មុគស្មាញ

\`\`\`typescript
import { useReducer } from 'react';

type Action =
  | { type: 'increment' }
  | { type: 'decrement' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
\`\`\`

## useMemo និង useCallback

\`\`\`typescript
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, filter }) {
  // Memoize ការគណនាដ៏ expensive
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filter));
  }, [items, filter]);

  // Memoize callback សម្រាប់ child components
  const handleClick = useCallback((id: string) => {
    console.log('ចុច:', id);
  }, []);

  return <ul>{filteredItems.map(item => <li key={item}>{item}</li>)}</ul>;
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
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}

// ការប្រើប្រាស់
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

## សន្និដ្ឋាន

ស្ទាត់ patterns ទាំងនេះ ដើម្បីសរសេរ React code ប្រសើរ និងងាយថែទាំ!`,
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
        titleEn: "Building APIs with Python FastAPI",
        titleKh: "ការបង្កើត APIs ជាមួយ Python FastAPI",
        slug: "python-fastapi-tutorial",
        excerptEn: "Learn to build high-performance APIs with FastAPI, Python's modern web framework.",
        excerptKh: "រៀនបង្កើត high-performance APIs ជាមួយ FastAPI, Python's modern web framework។",
        contentEn: `## Why FastAPI?

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
    return {"id": 1, **item.dict()}
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
\`\`\`

## Dependency Injection

\`\`\`python
from fastapi import Depends

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
        contentKh: `## ហេតុអ្វីត្រូវប្រើ FastAPI?

FastAPI គឺជា Python framework ទំនើបសម្រាប់បង្កើត APIs ជាមួយ OpenAPI documentation ដោយស្វ័យប្រវត្តិ និងដំណើរការល្អ។

## ការដំឡើង

\`\`\`bash
pip install fastapi uvicorn[standard]
\`\`\`

## Application ជាមូលដ្ឋាន

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.get("/")
async def root():
    return {"message": "សួស្ដីពិភពលោក"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

@app.post("/items/")
async def create_item(item: Item):
    return {"id": 1, "name": item.name}
\`\`\`

## ការ Validate Request

\`\`\`python
from pydantic import BaseModel, Field

class User(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str
    age: int = Field(..., ge=0, le=120)
\`\`\`

## Dependency Injection

\`\`\`python
from fastapi import Depends

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = await verify_token(token)
    if not user:
        raise HTTPException(status_code=401)
    return user

@app.get("/users/me")
async def read_users_me(current_user = Depends(get_current_user)):
    return current_user
\`\`\`

## ការដំណើរការ Server

\`\`\`bash
uvicorn main:app --reload
\`\`\`

ចូល \`http://localhost:8000/docs\` ដើម្បីមើល Swagger documentation ដោយស្វ័យប្រវត្តិ!

## សន្និដ្ឋាន

FastAPI បញ្ចូលគ្នានូវ ល្បឿន, ការ validate ដោយស្វ័យប្រវត្តិ, និង documentation ល្អ។ ល្អឥតខ្ចោះសម្រាប់ Python APIs ទំនើប!`,
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
        titleEn: "Kubernetes for Beginners: Getting Started Guide",
        titleKh: "Kubernetes សម្រាប់អ្នកចាប់ផ្ដើម: មគ្គុទ្ទេសក៍ចាប់ផ្ដើម",
        slug: "draft-kubernetes-guide",
        excerptEn: "Learn the basics of Kubernetes container orchestration.",
        excerptKh: "រៀនគ្រឹះ Kubernetes container orchestration។",
        contentEn: `## Coming Soon

A comprehensive guide to Kubernetes is coming soon!

Stay tuned for:
- Kubernetes architecture overview
- Pods, Services, and Deployments
- ConfigMaps and Secrets
- Helm charts
- Best practices for production`,
        contentKh: `## នឹងមកដល់ឆាប់ៗ

មគ្គុទ្ទេសក៍ Kubernetes ដ៏ស៊ីជម្រៅនឹងមកដល់ឆាប់ៗ!

រង់ចាំ:
- ទិដ្ឋភាពទូទៅ Kubernetes architecture
- Pods, Services, និង Deployments
- ConfigMaps និង Secrets
- Helm charts
- Best practices សម្រាប់ production`,
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
