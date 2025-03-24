const { getAIScript } = require("./aiService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const puppeteer = require("puppeteer");
const chromium = require("@sparticuz/chromium");

const generateScript = async (req, res) => {
  const { prompt } = req.body;

  try {
    const script = await getAIScript(prompt);

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
  let browser;
  try {
    const { html } = req.body;
    if (!html || typeof html !== "string" || html.length < 10) {
      // Minimum length check
      return res.status(400).json({
        error: "Invalid HTML content",
        received: html ? `Type: ${typeof html}, Length: ${html.length}` : "No HTML received",
      });
    }

    const isProduction = process.env.NODE_ENV === "production";
    browser = await puppeteer.launch({
      args: ["--disable-dev-shm-usage", "--no-sandbox", ...(isProduction ? chromium.args : [])],
      executablePath: isProduction ? await chromium.executablePath() : puppeteer.executablePath(),
      headless: "new",
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: ["domcontentloaded", "networkidle0"],
      timeout: 30000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
      timeout: 60000,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error Details:", {
      message: error.message,
      stack: error.stack,
      bodyContent: req.body.html?.substring(0, 100),
    });
    res.status(500).json({
      error: "PDF generation failed",
      details: error.message,
    });
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = { generateScript, getAllScripts, saveScript, deleteScript, generateScriptPDF };
