#!/usr/bin/env node
/**
 * Capture public case-study screenshots for portfolio cards.
 * Usage: node scripts/capture-case-studies.mjs [slug...]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public/images/case-studies");

/** Card aspect ratio 3:2 — crop viewport to match */
const CARD_ASPECT = 3 / 2;

const SAVOURY_URL =
  "https://the-savoury-lab-git-cursor-wha-20422a-yaseens-projects-1765104f.vercel.app/?_vercel_share=m3JsPtHQWm2XHAKlSYFUjRVt5sLUmbf4";
const METANOIA_URL =
  "https://ozayr-kriel-events-git-cursor-851753-yaseens-projects-1765104f.vercel.app/?_vercel_share=6LkmNVBwKeKQNAjXT5c94tgy0iAtlEPc";

async function captureCard(page, { width, height, outPath, setup }) {
  await page.setViewportSize({ width, height });
  if (setup) await setup(page);
  await page.waitForTimeout(1200);
  const clipHeight = Math.round(width / CARD_ASPECT);
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width, height: clipHeight },
    type: "jpeg",
    quality: 88,
  });
  console.log(`  ✓ ${outPath}`);
}

async function dismissOverlays(page) {
  const dismiss = page.locator(
    'button:has-text("Accept"), button:has-text("Got it"), button:has-text("OK"), button:has-text("Close")',
  );
  if (await dismiss.count()) await dismiss.first().click({ timeout: 2000 }).catch(() => {});
}

async function swipeCarousel(page, selector) {
  const carousel = page.locator(selector);
  if (!(await carousel.count())) return;
  await carousel.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const box = await carousel.first().boundingBox();
  if (!box) return;
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2, { steps: 14 });
  await page.mouse.up();
  await page.waitForTimeout(700);
}

async function fouzaSetup(page, isMobile) {
  await page.goto("https://fouzaphysiotherapy.co.za/book", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await dismissOverlays(page);
  await page.evaluate((y) => window.scrollTo(0, y), isMobile ? 560 : 0);
  await page.waitForTimeout(600);
}

async function moveInAfricaSetup(page, isMobile) {
  await page.goto("https://moveinafrica.co.za/fleet", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.evaluate((y) => window.scrollTo(0, y), isMobile ? 980 : 0);
  await page.waitForTimeout(800);
  await swipeCarousel(page, "section:has(img)");
}

async function savouryLabSetup(page, isMobile) {
  await page.goto(SAVOURY_URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate((y) => window.scrollTo(0, y), isMobile ? 1200 : 2200);
  await page.waitForTimeout(1000);
}

async function metanoiaSetup(page, isMobile) {
  await page.goto(METANOIA_URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate((y) => window.scrollTo(0, y), isMobile ? 1200 : 900);
  await page.waitForTimeout(1000);
}

const JOBS = [
  {
    slug: "fouza-physiotherapy",
    setup: fouzaSetup,
    desktop: { width: 1280, height: 900 },
    mobile: { width: 375, height: 812 },
  },
  {
    slug: "move-in-africa",
    setup: moveInAfricaSetup,
    desktop: { width: 1280, height: 900 },
    mobile: { width: 375, height: 812 },
  },
  {
    slug: "the-savoury-lab",
    setup: savouryLabSetup,
    desktop: { width: 1280, height: 900 },
    mobile: { width: 375, height: 812 },
  },
  {
    slug: "metanoia-events-collective",
    setup: metanoiaSetup,
    desktop: { width: 1280, height: 900 },
    mobile: { width: 375, height: 812 },
  },
];

async function main() {
  const filter = process.argv.slice(2);
  const jobs = filter.length ? JOBS.filter((j) => filter.includes(j.slug)) : JOBS;

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const job of jobs) {
    console.log(`\n${job.slug}`);
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });
    const page = await context.newPage();

    await captureCard(page, {
      ...job.desktop,
      outPath: path.join(OUT_DIR, `${job.slug}-desktop.jpg`),
      setup: (p) => job.setup(p, false),
    });
    await captureCard(page, {
      ...job.mobile,
      outPath: path.join(OUT_DIR, `${job.slug}-mobile.jpg`),
      setup: (p) => job.setup(p, true),
    });

    await context.close();
  }

  await browser.close();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
