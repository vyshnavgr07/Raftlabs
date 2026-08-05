const DEFAULT_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes (Render free tier sleeps after ~15)

/**
 * Periodically hits the health endpoint so a Render free-tier service
 * does not spin down from inactivity.
 */
export const startKeepAlive = ({
  baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.KEEP_ALIVE_URL,
  intervalMs = Number(process.env.KEEP_ALIVE_INTERVAL_MS) || DEFAULT_INTERVAL_MS,
} = {}) => {
  if (!baseUrl) {
    return;
  }

  const healthUrl = `${baseUrl.replace(/\/$/, '')}/api/health`;

  const ping = async () => {
    try {
      const response = await fetch(healthUrl);
      process.stdout.write(`[keep-alive] ${healthUrl} -> ${response.status}\n`);
    } catch (error) {
      process.stderr.write(`[keep-alive] ping failed: ${error.message}\n`);
    }
  };

  // Initial ping shortly after boot, then on interval
  setTimeout(ping, 30_000);
  setInterval(ping, intervalMs);

  process.stdout.write(`[keep-alive] enabled every ${intervalMs / 1000}s -> ${healthUrl}\n`);
};
