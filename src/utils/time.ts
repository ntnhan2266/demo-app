import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

/**
 * Format a timestamp or date using dayjs.
 * @param {string | number | Date} timestampOrDate - The timestamp or date to format.
 * @param {string} format - The format string (optional). Default is 'YYYY-MM-DD HH:mm:ss'.
 * @returns {string} The formatted date string.
 */
export const formatTime = (timestampOrDate: string | number | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  return dayjs(timestampOrDate).utc().format(format);
};
