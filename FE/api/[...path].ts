import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const backendUrl = process.env.BACKEND_URL || "http://35.164.230.188";
  const { path } = req.query;

  // Handle path array
  const apiPath = Array.isArray(path) ? path.join("/") : path || "";

  // Build URL with query parameters
  const url = new URL(`${backendUrl}/${apiPath}`);
  Object.entries(req.query).forEach(([key, value]) => {
    if (key !== "path") {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, v));
      } else if (value) {
        url.searchParams.append(key, value);
      }
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        Authorization: req.headers.authorization || "",
        // Forward other relevant headers
        ...Object.fromEntries(
          Object.entries(req.headers).filter(
            ([key]) =>
              ![
                "host",
                "connection",
                "x-forwarded-for",
                "x-real-ip",
                "referer",
              ].includes(key.toLowerCase())
          )
        ),
      } as HeadersInit,
      body: ["GET", "HEAD"].includes(req.method || "GET")
        ? undefined
        : JSON.stringify(req.body),
    });

    // Forward response headers
    response.headers.forEach((value, key) => {
      if (
        !["content-encoding", "transfer-encoding"].includes(key.toLowerCase())
      ) {
        res.setHeader(key, value);
      }
    });

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      const text = await response.text();
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({
      error: "Backend connection failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
