const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const getAIScript = async (prompt) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert scriptwriter specializing in engaging, high-quality video scripts. Your task is to generate compelling, well-structured scripts based on the user's prompt. Keep the tone engaging, concise, and suitable for the target audience. Use natural-sounding dialogue, vivid descriptions, and smooth transitions. Format the response with proper headings, scene descriptions, and dialogue when necessary.",
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Error fetching API");
      return;
    }

    const data = await response.json();
    const script = data.choices[0].message.content;

    if (!script) {
      console.error("No script generated");
      return;
    }
    console.log("script generated and sent successfully");
    return script;
  } catch (error) {
    console.error("The sample encountered an error:", error);
  }
};

module.exports = { getAIScript };
