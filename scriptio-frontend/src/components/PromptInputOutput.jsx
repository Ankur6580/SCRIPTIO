import { useEffect, useState } from "react";

import Animation from "./Animation";
import Script from "./Scripts";

const PromptInputOutput = ({ user }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [prompt, setPrompt] = useState("");
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchScripts = async () => {
      try {
        const response = await fetch(
          `${backendURL}/api/ai/scripts/${user.id}`,
          {
            method: "GET",
            mode: "cors",
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setScripts(data.scripts || []);
        }
      } catch (error) {
        console.error("Error fetching scripts:", error);
      }
    };

    fetchScripts();
  }, [user]);

  const handleGenerateScript = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedScriptData = data.script;

        if (!user) {
          setScripts((prev) =>
            prev.some((s) => s.id === generatedScriptData.id)
              ? prev
              : [...prev, generatedScriptData],
          );
        }

        setPrompt("");

        if (user) {
          const saveResponse = await fetch(`${backendURL}/api/ai/savescript`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              userID: user.id,
              title: generatedScriptData.title,
              script: generatedScriptData.content,
            }),
          });

          if (saveResponse.ok) {
            const savedData = await saveResponse.json();
            if (savedData.newScript) {
              setScripts((prev) =>
                prev.some((s) => s.id === savedData.newScript.id)
                  ? prev
                  : [...prev, savedData.newScript],
              );
            }
          }
        }
      } else {
        console.error("Failed to generate script");
      }
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleGenerateScript();
    }
  };

  return (
    <>
      <section className="mx-auto my-4 flex w-full max-w-[650px] flex-col items-center justify-center">
        <input
          className="focus:outline-highlight h-[80px] w-full rounded border p-2"
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleEnterPress}
          disabled={loading}
        />
        <button
          className={`shadow-custom hover:bg-highlight mt-2 w-full rounded p-2 font-semibold transition disabled:bg-gray-600 ${loading ? "cursor-not-allowed" : ""}`}
          onClick={handleGenerateScript}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Script"}
        </button>
      </section>

      {loading && <Animation />}

      <div className="mb-4 flex flex-col-reverse">
        {scripts.length > 0 ? (
          scripts.map((scriptData) => (
            <Script
              key={scriptData.id}
              scriptData={scriptData}
              onDelete={(id) =>
                setScripts((prev) => prev.filter((s) => s.id !== id))
              }
            />
          ))
        ) : (
          <p className="text-center mb-4">
            Every great story starts with a blank page. Time to write yours!
          </p>
        )}
      </div>
    </>
  );
};

export default PromptInputOutput;
