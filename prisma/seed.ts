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
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    },
  });
  console.log("✅ Created admin user:", admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "technology" },
      update: {},
      create: {
        name: "Technology",
        slug: "technology",
        description: "Latest news and tutorials about technology, programming, and software development.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "lifestyle" },
      update: {},
      create: {
        name: "Lifestyle",
        slug: "lifestyle",
        description: "Tips and stories about healthy living, productivity, and personal growth.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "travel" },
      update: {},
      create: {
        name: "Travel",
        slug: "travel",
        description: "Explore the world with our travel guides, tips, and destination reviews.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
        deletedAt: null,
      },
    }),
    prisma.category.upsert({
      where: { slug: "food" },
      update: {},
      create: {
        name: "Food & Recipes",
        slug: "food",
        description: "Delicious recipes, cooking tips, and food photography.",
        status: "PUBLISHED",
        coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        deletedAt: null,
      },
    }),
  ]);
  console.log("✅ Created", categories.length, "categories");

  // Create tags
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
      where: { slug: "vuejs" },
      update: {},
      create: {
        name: "Vue.js",
        slug: "vuejs",
        description: "Vue.js framework",
        coverImage: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "nuxt" },
      update: {},
      create: {
        name: "Nuxt",
        slug: "nuxt",
        description: "Nuxt.js framework",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "tutorial" },
      update: {},
      create: {
        name: "Tutorial",
        slug: "tutorial",
        description: "Step-by-step guides",
        coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      },
    }),
    prisma.tag.upsert({
      where: { slug: "tips" },
      update: {},
      create: {
        name: "Tips",
        slug: "tips",
        description: "Helpful tips and tricks",
        coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      },
    }),
  ]);
  console.log("✅ Created", tags.length, "tags");

  // Create posts
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: "getting-started-with-nuxt-4" },
      update: {},
      create: {
        title: "Getting Started with Nuxt 4: A Complete Guide",
        slug: "getting-started-with-nuxt-4",
        excerpt: "Learn how to build modern web applications with Nuxt 4, the latest version of the Vue.js framework.",
        content: `
<h2>Introduction to Nuxt 4</h2>
<p>Nuxt 4 is the latest major version of the popular Vue.js framework for building web applications. It comes with many improvements and new features that make development faster and more enjoyable.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Improved Performance:</strong> Nuxt 4 is faster than ever with optimized build times and runtime performance.</li>
  <li><strong>Better Developer Experience:</strong> Enhanced hot module replacement and better error handling.</li>
  <li><strong>TypeScript Support:</strong> First-class TypeScript support out of the box.</li>
</ul>

<h2>Getting Started</h2>
<p>To create a new Nuxt 4 project, run the following command:</p>
<pre><code>npx nuxi init my-app</code></pre>

<h2>Conclusion</h2>
<p>Nuxt 4 is a powerful framework that makes building Vue.js applications a breeze. Start exploring today!</p>
        `.trim(),
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
        status: "PUBLISHED",
        isFeatured: true,
        viewCount: 150,
        publishedAt: new Date("2024-01-15"),
        authorId: admin.id,
        categories: { connect: [{ slug: "technology" }] },
        tags: { connect: [{ slug: "nuxt" }, { slug: "vuejs" }, { slug: "tutorial" }] },
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

<h3>2. Use Template Literals</h3>
<p>Template literals make string concatenation cleaner and more readable.</p>
<pre><code>const greeting = \`Hello, \${name}!\`;</code></pre>

<h3>3. Destructuring Assignment</h3>
<p>Extract values from objects and arrays more elegantly.</p>

<h3>4. Arrow Functions</h3>
<p>Use arrow functions for shorter syntax and lexical <code>this</code> binding.</p>

<h3>5. Use Array Methods</h3>
<p>Methods like <code>map</code>, <code>filter</code>, and <code>reduce</code> make code more declarative.</p>

<h2>Conclusion</h2>
<p>These tips will help you write cleaner, more maintainable JavaScript code.</p>
        `.trim(),
        coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200",
        status: "PUBLISHED",
        isFeatured: true,
        viewCount: 230,
        publishedAt: new Date("2024-01-20"),
        authorId: admin.id,
        categories: { connect: [{ slug: "technology" }] },
        tags: { connect: [{ slug: "javascript" }, { slug: "tips" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "productivity-tips-for-developers" },
      update: {},
      create: {
        title: "5 Productivity Tips Every Developer Should Know",
        slug: "productivity-tips-for-developers",
        excerpt: "Boost your productivity as a developer with these proven strategies and tools.",
        content: `
<h2>Maximize Your Productivity</h2>
<p>Being productive as a developer isn't just about coding faster—it's about working smarter.</p>

<h3>1. Time Blocking</h3>
<p>Dedicate specific blocks of time for coding, meetings, and breaks. This helps maintain focus.</p>

<h3>2. Use Keyboard Shortcuts</h3>
<p>Learn the keyboard shortcuts for your IDE. It can save hours of time over weeks.</p>

<h3>3. Take Regular Breaks</h3>
<p>The Pomodoro Technique (25 minutes work, 5 minutes break) can help maintain concentration.</p>

<h3>4. Automate Repetitive Tasks</h3>
<p>Write scripts or use tools to automate repetitive tasks in your workflow.</p>

<h3>5. Keep Learning</h3>
<p>Invest time in learning new tools and techniques that can improve your efficiency.</p>

<h2>Conclusion</h2>
<p>Small improvements in productivity compound over time. Start with one tip and build from there.</p>
        `.trim(),
        coverImage: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1200",
        status: "PUBLISHED",
        isFeatured: false,
        viewCount: 89,
        publishedAt: new Date("2024-02-01"),
        authorId: admin.id,
        categories: { connect: [{ slug: "lifestyle" }] },
        tags: { connect: [{ slug: "tips" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "exploring-southeast-asia" },
      update: {},
      create: {
        title: "Exploring Southeast Asia: A Budget Travel Guide",
        slug: "exploring-southeast-asia",
        excerpt: "Discover the best destinations in Southeast Asia without breaking the bank.",
        content: `
<h2>Southeast Asia on a Budget</h2>
<p>Southeast Asia is one of the most affordable and beautiful regions to travel. Here's how to make the most of your trip.</p>

<h3>Top Destinations</h3>
<ul>
  <li><strong>Thailand:</strong> From Bangkok's temples to the beaches of Phuket.</li>
  <li><strong>Vietnam:</strong> Ha Long Bay, Hoi An, and amazing street food.</li>
  <li><strong>Cambodia:</strong> The magnificent Angkor Wat temple complex.</li>
</ul>

<h3>Budget Tips</h3>
<ul>
  <li>Stay in hostels or guesthouses</li>
  <li>Eat at local street food stalls</li>
  <li>Use local transportation</li>
  <li>Travel during shoulder season</li>
</ul>

<h2>Conclusion</h2>
<p>Southeast Asia offers incredible experiences for budget-conscious travelers. Start planning your adventure today!</p>
        `.trim(),
        coverImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200",
        status: "PUBLISHED",
        isFeatured: false,
        viewCount: 120,
        publishedAt: new Date("2024-02-05"),
        authorId: admin.id,
        categories: { connect: [{ slug: "travel" }] },
        tags: { connect: [{ slug: "tips" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "simple-pasta-recipes" },
      update: {},
      create: {
        title: "3 Simple Pasta Recipes for Busy Weeknights",
        slug: "simple-pasta-recipes",
        excerpt: "Quick and delicious pasta recipes you can make in under 30 minutes.",
        content: `
<h2>Quick & Delicious Pasta</h2>
<p>Pasta is the perfect solution for busy weeknights. Here are three recipes that are both quick and satisfying.</p>

<h3>1. Garlic Butter Pasta</h3>
<p>A classic that never fails. Sauté garlic in butter, toss with pasta, add parmesan and parsley.</p>

<h3>2. Cherry Tomato Pasta</h3>
<p>Roast cherry tomatoes with olive oil until bursty, mix with pasta and fresh basil.</p>

<h3>3. Creamy Mushroom Pasta</h3>
<p>Sauté mushrooms, add cream, season with thyme, and combine with your favorite pasta.</p>

<h2>Tips for Perfect Pasta</h2>
<ul>
  <li>Salt your pasta water generously</li>
  <li>Save some pasta water for the sauce</li>
  <li>Don't rinse your pasta after cooking</li>
</ul>

<h2>Conclusion</h2>
<p>With these recipes, you can have a delicious dinner ready in no time!</p>
        `.trim(),
        coverImage: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200",
        status: "PUBLISHED",
        isFeatured: false,
        viewCount: 75,
        publishedAt: new Date("2024-02-10"),
        authorId: admin.id,
        categories: { connect: [{ slug: "food" }] },
        tags: { connect: [{ slug: "tips" }, { slug: "tutorial" }] },
        deletedAt: null,
      },
    }),
    prisma.post.upsert({
      where: { slug: "draft-post-example" },
      update: {},
      create: {
        title: "Draft Post: Coming Soon",
        slug: "draft-post-example",
        excerpt: "This is a draft post that hasn't been published yet.",
        content: "<p>This content is still being worked on...</p>",
        coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
        status: "DRAFT",
        isFeatured: false,
        viewCount: 0,
        publishedAt: null,
        authorId: admin.id,
        categories: { connect: [{ slug: "technology" }] },
        tags: { connect: [{ slug: "tutorial" }] },
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
