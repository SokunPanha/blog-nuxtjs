import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Updating Khmer translations...");

  // Update categories with Khmer translations
  const categoryUpdates = [
    { slug: "frontend", nameKh: "ផ្នែកខាងមុខ", descriptionKh: "ការអភិវឌ្ឍន៍ផ្នែកខាងមុខដោយប្រើ JavaScript, TypeScript, React, Vue, និង CSS ទំនើប។" },
    { slug: "backend", nameKh: "ផ្នែកខាងក្រោយ", descriptionKh: "ការអភិវឌ្ឍន៍ផ្នែក server ដោយប្រើ Node.js, Python, Go, និង databases។" },
    { slug: "devops", nameKh: "DevOps", descriptionKh: "CI/CD, Docker, Kubernetes, cloud platforms, និង infrastructure as code។" },
    { slug: "web-development", nameKh: "ការអភិវឌ្ឍន៍គេហទំព័រ", descriptionKh: "ការបង្រៀន full-stack web development, best practices, និង modern architectures។" },
    { slug: "mobile-development", nameKh: "ការអភិវឌ្ឍន៍កម្មវិធីចល័ត", descriptionKh: "ការអភិវឌ្ឍន៍កម្មវិធីចល័ត iOS, Android, React Native, និង Flutter។" },
  ];

  for (const cat of categoryUpdates) {
    await prisma.category.update({
      where: { slug: cat.slug },
      data: { nameKh: cat.nameKh, descriptionKh: cat.descriptionKh },
    });
  }
  console.log("✅ Updated", categoryUpdates.length, "categories");

  // Update tags with Khmer translations
  const tagUpdates = [
    { slug: "javascript", nameKh: "ជ្វាស្ក្រីប", descriptionKh: "ភាសាកម្មវិធី JavaScript" },
    { slug: "typescript", nameKh: "TypeScript", descriptionKh: "TypeScript - JavaScript ដែលមានប្រភេទ" },
    { slug: "vuejs", nameKh: "Vue.js", descriptionKh: "Vue.js progressive framework" },
    { slug: "nuxt", nameKh: "Nuxt", descriptionKh: "Nuxt.js meta-framework សម្រាប់ Vue" },
    { slug: "react", nameKh: "React", descriptionKh: "React library សម្រាប់បង្កើត UI" },
    { slug: "nodejs", nameKh: "Node.js", descriptionKh: "Node.js JavaScript runtime" },
    { slug: "python", nameKh: "ភីតុន", descriptionKh: "ភាសាកម្មវិធី Python" },
    { slug: "docker", nameKh: "Docker", descriptionKh: "Docker containerization" },
    { slug: "git", nameKh: "Git", descriptionKh: "Git version control" },
    { slug: "api", nameKh: "API", descriptionKh: "REST និង GraphQL APIs" },
    { slug: "tutorial", nameKh: "ការបង្រៀន", descriptionKh: "ការបង្រៀន coding ជាជំហានៗ" },
    { slug: "best-practices", nameKh: "វិធីប្រតិបត្តិល្អ", descriptionKh: "វិធីប្រតិបត្តិ coding ល្អ និង patterns" },
  ];

  for (const tag of tagUpdates) {
    await prisma.tag.update({
      where: { slug: tag.slug },
      data: { nameKh: tag.nameKh, descriptionKh: tag.descriptionKh },
    });
  }
  console.log("✅ Updated", tagUpdates.length, "tags");

  

 
}

main()
  .catch((e) => {
    console.error("❌ Error updating translations:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
