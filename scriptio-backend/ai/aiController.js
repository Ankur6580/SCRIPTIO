const { getAIScript } = require("./aiService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const puppeteer = require("puppeteer");
const chromium = require("@sparticuz/chromium");

const generateScript = async (req, res) => {
  const { prompt } = req.body;

  try {
    const scriptContent = await getAIScript(prompt);
    if (!scriptContent || !scriptContent.script) {
      console.error("No script generated.");
      return res.status(400).json({ error: "Failed to generate script." });
    }

    // console.log("Script content:\n", scriptContent.script);

    let titleMatch = scriptContent.script.match(/\*\*Title:\s*"(.+?)"\*\*/);
    if (!titleMatch) {
      titleMatch = scriptContent.script.match(/\*\**(.+?)\*\*/);
    }

    const scriptTitle = titleMatch ? titleMatch[1] : "A Temporary Title for Now";

    const script = {
      id: `script-${Date.now()}`,
      title: scriptTitle,
      content: scriptContent.script,
    };

    // console.log("Script generated and sent successfully\n", script);
    res.json({ script });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveScript = async (req, res) => {
  const userID = req.body.userID;
  const title = req.body.title;
  const script = req.body.script;

  try {
    const newScript = await prisma.script.create({
      data: {
        userId: userID,
        title: title,
        content: script,
      },
      select: {
        id: true,
        title: true,
        content: true,
        userId: true,
      },
    });
    res.status(200).json({ message: "Script saved", newScript });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllScripts = async (req, res) => {
  const userID = req.params.userID;
  try {
    const scripts = await prisma.script.findMany({
      where: {
        userId: userID,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
    res.json({ scripts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteScript = async (req, res) => {
  const scriptID = req.params.scriptID;
  try {
    // Check if the script exists before attempting to delete
    const existingScript = await prisma.script.findUnique({
      where: { id: scriptID },
    });

    if (!existingScript) {
      return res.status(404).json({ error: "Script not found." });
    }

    // Proceed with deletion if script exists
    const deletedScript = await prisma.script.delete({
      where: {
        id: scriptID,
      },
    });

    res.json({ message: "Script deleted.", deletedScript });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateScriptPDF = async (req, res) => {
  try {
    let executablePath = await chromium.executablePath();
    let args = chromium.args;
    const isDev = process.env.NODE_ENV !== "production";

    if (isDev) {
      const puppeteerLocal = require("puppeteer");
      executablePath = puppeteerLocal.executablePath();
      args = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"];
    }

    const browser = await puppeteer.launch({
      executablePath: executablePath,
      args: args,
      headless: chromium.headless,
    });
    console.log("Puppeteer Browser launched");

    const page = await browser.newPage();
    console.log("New page created.");

    const { html } = req.body;
    if (!html) {
      console.error("No HTML content received!");
      return res.status(400).json({ error: "Missing HTML content in request body" });
    }

    await page.setContent(html, { waitUntil: "networkidle2" });
    await page.emulateMediaType("screen");
    console.log("HTML content set.");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
    });

    if (!pdfBuffer || pdfBuffer.length < 100) {
      throw new Error("Generated PDF is empty or too small");
    }
    console.log("PDF generated.");

    await browser.close();
    console.log("Browser closed.");

    res.setHeader("Content-Disposition", 'attachment; filename="document.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", pdfBuffer.length);
    res.end(pdfBuffer, "binary");
    console.log("PDF response sent.");
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "PDF generation failed" });
  }
};

module.exports = { generateScript, getAllScripts, saveScript, deleteScript, generateScriptPDF };
