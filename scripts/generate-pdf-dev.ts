import { chromium } from "playwright";

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Используем локальный dev сервер
  const url = "http://localhost:5173";

  console.log(`📄 Generating PDF from dev server: ${url}`);
  console.log("⚠️  Make sure dev server is running (npm run dev)");

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 10000 });
  } catch {
    console.error(
      '❌ Could not connect to dev server. Please run "npm run dev" first.',
    );
    await browser.close();
    process.exit(1);
  }

  // Настройки для PDF резюме
  await page.pdf({
    path: "./cv-aleksey-lovchikov.pdf",
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      right: "15mm",
      bottom: "20mm",
      left: "15mm",
    },
    preferCSSPageSize: false,
  });

  console.log("✅ PDF generated successfully: cv-aleksey-lovchikov.pdf");

  await browser.close();
}

generatePDF().catch((error) => {
  console.error("❌ Error generating PDF:", error);
  process.exit(1);
});
