import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "url";

export function logServerStats(req: NextApiRequest, res: NextApiResponse) {
  const start = Number(req.headers["x-request-start"]);
  let responseBody: any;

  // Intercept res.json to capture the response body
  const originalJson = res.json;
  res.json = function (body: any) {
    responseBody = body;
    return originalJson.call(this, body);
  };

  // Intercept res.send to capture the response body for non-JSON responses
  const originalSend = res.send;
  res.send = function (body: any) {
    responseBody = body;
    return originalSend.call(this, body);
  };

  res.on("finish", () => {
    const end = Date.now();
    let duration = null;
    if (!isNaN(start)) {
      duration = end - start;
    }

    const parsedUrl = parse(req.url || "", true);
    const urlWithoutParams = parsedUrl.pathname;

    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: urlWithoutParams,
      status: res.statusCode,
      durationMS: duration,
      searchParams: parsedUrl.query,
      requestHeaders: req.headers,
      responseHeaders: res.getHeaders(),
      userAgent: req.headers["user-agent"],
      referer: req.headers.referer || null,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      responseBody: responseBody,
    };

    // Be cautious with logging request bodies, as they may contain sensitive information
    if (req.body && ["POST", "PUT", "PATCH"].includes(req.method)) {
      (logData as any).requestBody = req.body;
    }

    console.log(JSON.stringify(logData, null, 2));
  });
}