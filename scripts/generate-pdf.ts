import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, resolve as pathResolve, extname } from "path";
import { existsSync, readFileSync } from "fs";
import { createServer } from "http";
import { lookup } from "mime-types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Простой HTTP сервер для раздачи статических файлов
function createStaticServer(
  distPath: string,
  port: number,
): Promise<{ url: string; close: () => void }> {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      let filePath = req.url === "/" ? "/index.html" : req.url || "/index.html";
      filePath = filePath.split("?")[0]; // Убираем query параметры

      const fullPath = pathResolve(distPath, "." + filePath);
      const distPathResolved = pathResolve(distPath);

      // Проверяем безопасность пути
      if (!fullPath.startsWith(distPathResolved)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      if (!existsSync(fullPath)) {
        // Если файл не найден, пробуем index.html (для SPA)
        const indexPath = pathResolve(distPath, "index.html");
        if (existsSync(indexPath)) {
          filePath = "/index.html";
        } else {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }
      }

      const actualPath =
        filePath === "/index.html"
          ? pathResolve(distPath, "index.html")
          : fullPath;

      try {
        const content = readFileSync(actualPath);
        const ext = extname(actualPath);
        const contentType = lookup(ext) || "application/octet-stream";

        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      } catch {
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    });

    server.listen(port, () => {
      const url = `http://localhost:${port}`;
      resolvePromise({
        url,
        close: () => {
          server.close();
        },
      });
    });
  });
}

async function generatePDF() {
  const distPath = pathResolve(__dirname, "../dist");

  if (!existsSync(distPath)) {
    console.log('⚠️  dist folder not found. Please run "npm run build" first.');
    process.exit(1);
  }

  // Запускаем локальный сервер
  console.log("🚀 Starting local server...");
  const { url, close } = await createStaticServer(distPath, 3000);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log(`📄 Generating PDF from: ${url}`);

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

    // Дополнительное ожидание для полной загрузки React приложения
    await page.waitForTimeout(2000);

    // Проверяем, что контент загрузился
    const content = await page.content();
    if (!content.includes("root") || content.length < 1000) {
      console.warn("⚠️  Content might not be fully loaded");
    }

    // Настройки для PDF резюме
    await page.pdf({
      path: pathResolve(__dirname, "../cv-aleksey-lovchikov.pdf"),
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
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    throw error;
  } finally {
    await browser.close();
    close();
  }
}

generatePDF().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
