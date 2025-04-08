const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const getAIScript = async (prompt) => {
  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // model: 'google/gemini-2.5-pro-exp-03-25:free',
          // messages: [
          //   {
          //     role: 'system',
          //     // content:
          //     //   "You are an expert scriptwriter specializing in engaging, high-quality video scripts. Your task is to generate compelling, well-structured scripts based on the user's prompt. Keep the tone engaging, concise, and suitable for the target audience. Use natural-sounding dialogue, vivid descriptions, and smooth transitions. Format the response with proper headings, scene descriptions, and dialogue. Always start with a Title. NO FOLLOW-UP QUESTIONS NEEDED. Only respond with the script, no other text.",
          //     content: `You are a professional video script writer. Strictly follow these rules:
          //       1. Always start with "Title: [CATCHY TITLE]" at the beginning
          //       2. Use Markdown formatting with clear scene headings (INT./EXT.), descriptions, and dialogue
          //       3. Follow this structure:
          //         Title: [Title]
          //         ---
          //         [Scene 1: LOCATION - TIME OF DAY]
          //         [Visual description/action]
          //         [NARRATOR/CAMERA TEXT]: [Content]
          //         [Character dialogue if needed]

          //         [Scene 2: ...] etc.
          //       4. Keep language vivid but concise
          //       5. Never add explanations, notes, or follow-up questions
          //       6. Maintain consistent tone matching the user's input
          //       7. Ensure smooth transitions between scenes`,
          //     role: 'user',
          //     content: prompt,
          //   },
          // ],
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: [
            {
              role: 'system',
              content: ` 
              You are an expert scriptwriter specializing in engaging, high-quality video scripts. Your task is to generate compelling, well-structured scripts based on the user's prompt. Keep the tone engaging, concise, and suitable for the target audience. Use natural-sounding dialogue, vivid descriptions, and smooth transitions. Format the response with proper headings, scene descriptions, and dialogue.
              STRICT RULES:
                1. OUTPUT MUST CONTAIN ONLY:
                  - Title line wrapped in **, Example: **Title: [CATCHY TITLE]**
                  - Scene headings
                  - Action descriptions
                  - Dialogue/narration
                  - Scene transitions
                  - Timestamps, only if video type mentioned is shorts

                2. STRICTLY FORBIDDEN:
                  * Production tips
                  * Music suggestions
                  * Copyright notes
                  * Algorithm advice
                  * Follow-up questions
                  * Any text after "---" separator
                  * Bullet points except scene markers

                3. FORMATTING RULES:
                  - Start with "Title: [CATCHY TITLE]" 
                  - Bold for speaker roles
                  - No markdown beyond headings/bold/italics

                Example of FORBIDDEN content:
                ### Production Tips: 
                - Use CGI here... ❌
                Music: Epic soundtrack... ❌
                Any questions? ❌`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error('Error fetching API');
      return;
    }

    const data = await response.json();
    const script = data.choices[0]?.message?.content;

    if (!script) {
      console.error('No script generated');
      return;
    }

    return { script: script };
  } catch (error) {
    console.error('The sample encountered an error:', error);
  }
};

module.exports = { getAIScript };
