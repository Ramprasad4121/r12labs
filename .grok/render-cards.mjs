import { chromium } from "playwright";

const exe = "/opt/pw-browsers/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell";

const browser = await chromium.launch({
  executablePath: exe,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--allow-file-access-from-files"],
});

const jobs = [
  {
    url: "file:///workspace/.grok/og-card.html",
    width: 1200,
    height: 630,
    path: "/workspace/.grok/og-raw.png",
    kind: "og",
  },
  {
    url: "file:///workspace/.grok/x-banner.html",
    width: 1200,
    height: 264,
    path: "/workspace/.grok/x-banner-raw.png",
    kind: "banner",
  },
];

const report = [];

for (const job of jobs) {
  const page = await browser.newPage({
    viewport: { width: job.width, height: job.height },
    deviceScaleFactor: 2,
  });
  await page.goto(job.url, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  const metrics = await page.evaluate((kind) => {
    const box = (id) => {
      const el = document.getElementById(id);
      const r = el.getBoundingClientRect();
      return {
        text: el.innerText.replace(/\s+/g, " ").trim(),
        font: getComputedStyle(el).fontFamily,
        x: r.x,
        y: r.y,
        w: r.width,
        h: r.height,
        right: r.right,
        bottom: r.bottom,
      };
    };
    const title = box("title");
    const tag = box("tag");
    const lock = box("lock");
    return {
      kind,
      vw: document.documentElement.clientWidth,
      vh: document.documentElement.clientHeight,
      grotesk: document.fonts.check('500 64px "Space Grotesk"'),
      plex: document.fonts.check('16px "IBM Plex Mono"'),
      title,
      tag,
      lock,
    };
  }, job.kind);
  report.push(metrics);
  await page.screenshot({ path: job.path, type: "png" });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
