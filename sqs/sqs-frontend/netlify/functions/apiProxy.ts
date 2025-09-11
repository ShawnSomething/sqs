import fetch from "node-fetch";

export async function handler(event, context) {
  const path = event.path.replace("/.netlify/functions/proxy", ""); 
  const { method, body } = event;

  const apiUrl = process.env.REACT_APP_API_URL; 
  const targetUrl = `${apiUrl}${path}`;

  try {
    const response = await fetch(targetUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body && body !== "" ? body : JSON.stringify({}),
    });

    const text = await response.text(); 
    let data;
    try {
      data = JSON.parse(text); 
    } catch {
      data = { raw: text }; 
    }

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy failed", details: err.message }),
    };
  }
}
