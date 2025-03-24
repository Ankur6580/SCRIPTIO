const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

const token = process.env.GITHUB_TOKEN;

const getAIScript = async (prompt) => {
  try {
    const client = ModelClient(
      "https://models.inference.ai.azure.com",
      new AzureKeyCredential(token)
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a Youtube video script generator. You will be given a prompt and you will generate a video script. The script should always start with an title." },
          { role: "user", content: prompt }
        ],
        model: "Phi-4",
        temperature: 0.8,
        max_tokens: 2048,
        top_p: 0.1
      }
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const match = response.body.choices[0].message.content.match(/Title: (.*)/);
    const title = match[1].substring(0, match[1].length - 2);

    const data = {
      id: response.body.id,
      title: title,
      content: response.body.choices[0].message.content
    };

    return data;
  } catch (error) {
    console.error("The sample encountered an error:", error);
  }
};

module.exports = { getAIScript };