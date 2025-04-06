export const generateGameCode = async (prompt: string): Promise<string> => {
  const gemini  = "https://code-to-play-api.vercel.app/generate-game"
  const groq = "https://codetoplay-groq-api.vercel.app"
  try {
    const response = await fetch(gemini, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    
    if (data.gameCode) {
      return data.gameCode.replace(/```javascript|```/g, "").trim(); // Clean up code formatting
    } else {
      throw new Error("Invalid game code received");
    }
  } catch (error) {
    console.error("Error fetching game code:", error);
    throw new Error("Failed to generate game");
  }
};
