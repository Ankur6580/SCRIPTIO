import React, { useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import MDRenderer from "./MDRenderer";
import PDFDownloader from "./PDFDownloader";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Scripts = ({ scriptData, onDelete }) => {
  const contentRef = useRef();
  const deleteBtnRef = useRef();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    try {
      const response = await fetch(
        `${backendURL}/api/ai/deletescript/${scriptData.id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        alert("Script deleted successfully");
        onDelete(scriptData.id);
      }
    } catch (error) {
      console.error("Error deleting script:", error);
    }
  };

  if (!scriptData) return null;

  return (
    <div className="shadow-custom relative rounded-md p-4">
      <div className="flex flex-col">
        <MDRenderer scriptData={scriptData} ref={contentRef} />
      </div>

      <div id="buttons" className="grid grid-cols-2">
        <button
          ref={deleteBtnRef}
          onClick={handleDelete}
          className={`flex items-center justify-center gap-2 rounded-bl-md border p-2 transition-all ${confirmDelete ? "bg-opacity-40 animate-pulse" : "hover:bg-opacity-70"}`}
        >
          {confirmDelete ? "Confirm Delete?" : "Delete"}
          <MdDeleteForever className="text-lg" />
        </button>

        <PDFDownloader contentRef={contentRef} />
      </div>
    </div>
  );
};

export default Scripts;
