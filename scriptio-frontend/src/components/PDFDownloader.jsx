import { useCallback, useState } from "react";
import { FaFileDownload } from "react-icons/fa";

const PDFDownloader = ({ contentRef }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  const downloadPDF = useCallback(async () => {
    const contentElement = contentRef.current;
    if (!contentElement) {
      console.log("Content element not found");
      return;
    }

    setLoading(true);

    const html = contentElement.innerHTML;
    // console.log("HTML content:", html);
    const title =
      contentRef.current.querySelector("p")?.textContent ||
      `generatedPDF${Date.now()}`;
    const fileName = title
      .replace(title.includes("Title:") ? "Title:" : "", "")
      .trim();
    // setLoading(false);
    // return;
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
      `;
    // console.log(`HTML content sent to the server:\n${fullHTML}`);

    try {
      const response = await fetch(`${backendURL}/api/ai/generatepdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: fullHTML }),
      });

      if (!response.ok) throw new Error("PDF generation failed");

      const contentType = response.headers.get("Content-Type");
      if (!contentType?.includes("application/pdf")) {
        throw new Error("Invalid PDF response");
      }

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });

      if (blob.size < 100) {
        throw new Error("PDF file is too small");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [contentRef]);

  return (
    <button
      onClick={downloadPDF}
      disabled={loading}
      className={`w-full justify-self-end rounded-br-md px-4 py-2 ${
        loading ? "cursor-not-allowed opacity-70" : ""
      }`}
    >
      {loading ? (
        "Generating..."
      ) : (
        <span className="flex items-center gap-2 justify-self-center">
          <FaFileDownload /> PDF
        </span>
      )}
    </button>
  );
};

export default PDFDownloader;
