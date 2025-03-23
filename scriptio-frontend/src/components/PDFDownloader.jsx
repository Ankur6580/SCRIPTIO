import { useCallback, useState } from "react";

const PDFDownloader = ({ contentRef }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  const downloadPDF = useCallback(async () => {
    if (!contentRef?.current) {
      console.error("No content reference found");
      return;
    }

    setLoading(true);

    const html = contentRef.current.outerHTML;
    const title =
      contentRef.current.querySelector("p")?.textContent ||
      `generatedPDF${Date.now()}`;
    const fileName = title
      .replace(title.includes("Title:") ? "Title:" : "", "")
      .trim();

    try {
      const response = await fetch(`${backendURL}/api/ai/generatepdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setLoading(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setLoading(false);
    }
  }, [contentRef, backendURL]);

  return (
    <button
      onClick={downloadPDF}
      disabled={loading}
      className={`rounded-br-md border px-4 py-2 ${loading ? "cursor-not-allowed opacity-70" : ""} `}
    >
      {loading ? "Generating PDF..." : "Download as PDF"}
    </button>
  );
};

export default PDFDownloader;
