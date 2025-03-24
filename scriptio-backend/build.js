const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🏗️  Starting build process...");

try {
  const prismaClientPath = path.join(__dirname, "node_modules", ".prisma", "client", "index.js");

  // 1. Prisma Generate (only if not already generated)
  if (!fs.existsSync(prismaClientPath)) {
    console.log("⚙️  Generating Prisma client...");
    execSync("npx prisma generate", { stdio: "inherit" });
  } else {
    console.log("✅ Prisma client already generated, skipping...");
  }

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
