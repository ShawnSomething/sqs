import fetch from "node-fetch";

export async function handler(event, context) {
  console.log("Incoming event:", JSON.stringify(event, null, 2));

  const path = event.path.replace("/.netlify/functions/proxy", "").replace(/^\/+/, "");
  const { method, body } = event;

  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    console.error("API_URL not defined in Netlify Functions environment!");
    return { statusCode: 500, body: JSON.stringify({ error: "API_URL not set" }) };
  }

  const targetUrl = `${apiUrl.replace(/\/$/, "")}/${path}`;
  console.log("Proxying to:", targetUrl);

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

    console.log("Response from backend:", data);

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (err: any) {
    console.error("Proxy error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy failed", details: err.message }),
    };
  }
}
