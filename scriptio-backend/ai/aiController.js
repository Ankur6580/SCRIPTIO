const { getAIScript } = require('./aiService');
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const puppeteer = require('puppeteer');

const generateScript = async (req, res) => {
  const { prompt } = req.body;

  try {
    const script = await getAIScript(prompt);

    res.json({ script });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const saveScript = async (req, res) => {
  const userID = req.body.userID;
  const title = req.body.title;
  const script = req.body.script;

  try {
    const newScript = await prisma.script.create({
      data: {
        userId: userID,
        title: title,
        content: script
      },
      select: {
        id: true,
        title: true,
        content: true,
        userId: true
      }
    });
    res.status(200).json({ "message": "Script saved", newScript });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllScripts = async (req, res) => {
  const userID = req.params.userID
  try {
    const scripts = await prisma.script.findMany({
      where: {
        userId: userID
      },
      select: {
        id: true,
        title: true,
        content: true
      }
    })
    res.json({ scripts })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    const { html } = req.body;
    if (!html) {
      console.error("No HTML content received!");
      return res.status(400).json({ error: "Missing HTML content in request body" });
    }

    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm"
      }
    });

    if (!pdfBuffer || pdfBuffer.length < 100) {
      throw new Error("Generated PDF is empty or too small");
    }

    await browser.close();

    res.setHeader("Content-Disposition", 'attachment; filename="document.pdf"');
    res.setHeader("Content-Type", "application/pdf");  // ✅ Ensure correct Content-Type
    res.setHeader("Content-Length", pdfBuffer.length); // ✅ Set Content-Length explicitly
    res.end(pdfBuffer,"binary");

  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: error.message });
  }
};




module.exports = { generateScript, getAllScripts, saveScript, deleteScript, generateScriptPDF };