// Netlify Function: /api/health
// Lightweight probe used by the live status indicator in the navbar.

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    },
    body: JSON.stringify({
      ok: true,
      service: "omnix-web",
      ts: new Date().toISOString(),
    }),
  };
};
