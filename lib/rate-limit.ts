import 'server-only'

type Window = { count: number; resetAt: number }

/**
 * Small in-memory fixed-window rate limiter. On serverless hosts each
 * instance keeps its own counts, so treat it as a speed bump, not a wall.
 * Swap for a shared store (e.g. Redis) if abuse ever gets through.
 */
export const createRateLimiter = ({
  limit,
  windowMs,
}: {
  limit: number
  windowMs: number
}) => {
  const windows = new Map<string, Window>()

  return (key: string, now = Date.now()): boolean => {
    // Drop expired entries so the map can't grow without bound.
    windows.forEach((window, windowKey) => {
      if (window.resetAt <= now) {
        windows.delete(windowKey)
      }
    })
    const current = windows.get(key)
    if (!current) {
      windows.set(key, { count: 1, resetAt: now + windowMs })
      return true
    }
    if (current.count >= limit) {
      return false
    }
    windows.set(key, { ...current, count: current.count + 1 })
    return true
  }
}
