import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const staticDir = join(root, ".next", "static");
const publicDir = join(root, "public");

if (!existsSync(standalone)) {
  console.error("Standalone output missing. Ensure next.config.ts has output: 'standalone'.");
  process.exit(1);
}

mkdirSync(join(standalone, ".next"), { recursive: true });

if (existsSync(staticDir)) {
  cpSync(staticDir, join(standalone, ".next", "static"), { recursive: true });
}

if (existsSync(publicDir)) {
  cpSync(publicDir, join(standalone, "public"), { recursive: true });
}

process.stdout.write("Standalone assets prepared for Railway.\n");
