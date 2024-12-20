const GOOGLE_API_KEY = "AIzaSyDBOpoyLPO_cI63_3muhFr-og0qa5ZLa_o";
const API_REQUEST_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

export const sendMessage = async (message: string) => {
  const response = await fetch(API_REQUEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: message }] }]
    })
  });

  const data = await response.json();
  
  if (!response.ok) throw new Error(data.error.message);
  
  const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!responseText) throw new Error("Invalid API response.");

  return { responseText, data };
};