import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Extend dayjs with plugins
dayjs.extend(utc)
dayjs.extend(timezone)

// Use Indonesia/Jakarta (WIB) as the target timezone for all invitation events
const DEFAULT_TIMEZONE = 'Asia/Jakarta'

/**
 * Parse any date input into a dayjs object locked to the Indonesian timezone.
 * Defensively handles null, undefined, invalid dates, and formats to prevent runtime exceptions.
 */
export function parseJakartaDate(dateInput: unknown): dayjs.Dayjs {
  if (!dateInput) {
    return dayjs().tz(DEFAULT_TIMEZONE)
  }

  if (dayjs.isDayjs(dateInput)) {
    return dateInput.tz(DEFAULT_TIMEZONE)
  }

  if (dateInput instanceof Date) {
    const d = dayjs(dateInput)
    return d.isValid() ? d.tz(DEFAULT_TIMEZONE) : dayjs().tz(DEFAULT_TIMEZONE)
  }

  let dateStr = ''
  if (typeof dateInput === 'string') {
    dateStr = dateInput
  } else if (typeof dateInput === 'number') {
    const d = dayjs(dateInput)
    return d.isValid() ? d.tz(DEFAULT_TIMEZONE) : dayjs().tz(DEFAULT_TIMEZONE)
  } else {
    try {
      dateStr = String(dateInput)
    } catch {
      return dayjs().tz(DEFAULT_TIMEZONE)
    }
  }

  const trimmed = dateStr.trim()
  if (!trimmed) {
    return dayjs().tz(DEFAULT_TIMEZONE)
  }

  const hasTimezone = /[Zz]|[+-]\d{2}:?\d{2}$/.test(trimmed)

  if (hasTimezone) {
    try {
      const parsed = dayjs(trimmed).tz(DEFAULT_TIMEZONE)
      if (parsed.isValid()) return parsed
    } catch {
      // Fall back
    }
  } else {
    // Pre-process dashes to slashes to prevent Safari parser quirks
    const safeStr = trimmed.replace(/-/g, '/')

    try {
      const parsed = dayjs.tz(safeStr, DEFAULT_TIMEZONE)
      if (parsed.isValid()) return parsed
    } catch {
      // Ignore error and fall back
    }

    try {
      const parsed = dayjs.tz(trimmed, DEFAULT_TIMEZONE)
      if (parsed.isValid()) return parsed
    } catch {
      // Ignore error and fall back
    }
  }

  return dayjs().tz(DEFAULT_TIMEZONE)
}

export { dayjs }
