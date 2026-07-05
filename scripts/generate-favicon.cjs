const sharp = require("sharp");
const toIco = require("to-ico");
const fs = require("fs");
const path = require("path");

const ASSETS = path.join(process.cwd(), "public", "favicon-assets");
const SOURCE = path.join(ASSETS, "favicon.svg");
const svgBuffer = fs.readFileSync(SOURCE);

const pngSizes = [
  { size: 16, file: "favicon-16x16.png" },
  { size: 32, file: "favicon-32x32.png" },
  { size: 180, file: "apple-touch-icon.png" },
  { size: 192, file: "android-chrome-192x192.png" },
  { size: 512, file: "android-chrome-512x512.png" }
];

async function main() {
  for (const { size, file } of pngSizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(ASSETS, file));
    console.log(`✓ ${file}`);
  }

  const icoBuffers = await Promise.all([16, 32, 48].map((size) =>
    sharp(svgBuffer).resize(size, size).png().toBuffer()
  ));
  const icoBuffer = await toIco(icoBuffers);
  fs.writeFileSync(path.join(ASSETS, "favicon.ico"), icoBuffer);
  console.log("✓ favicon.ico (16/32/48 multi-size)");

  const manifest = {
    name: "Harish Kumar - Full Stack Engineer",
    short_name: "Harish Kumar",
    description:
      "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Building Aegis and Stardust.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon-assets/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/favicon-assets/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  fs.writeFileSync(
    path.join(ASSETS, "site.webmanifest"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("✓ site.webmanifest");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
