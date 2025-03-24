// build.js
const { execSync } = require("child_process");

console.log("🏗️  Starting build process...");

try {
  // 1. Prisma Generate
  console.log("⚙️  Generating Prisma client...");
  execSync("npx prisma generate", { stdio: "inherit" });

  // 2. Prisma Migrate
  console.log("🔄  Applying database migrations...");
  execSync("npx prisma migrate deploy", { stdio: "inherit" });

  // 3. Puppeteer Install (Production Only)
  if (process.env.NODE_ENV === "production") {
    console.log("📦  Installing Puppeteer...");
    execSync("npx puppeteer browsers install chrome", { stdio: "inherit" });
  }

  console.log("✅  Build completed successfully!");
} catch (error) {
  console.error("❌  Build failed:", error);
  process.exit(1);
}
