import { formatTime } from '@/utils/time';

describe('formatTime', () => {
  test('formats a timestamp with the default format', () => {
    const timestamp = 1633276800000; // October 4, 2021, 00:00:00 (UTC)
    const formattedDate = formatTime(timestamp);
    expect(formattedDate).toBe('2021-10-03 16:00:00');
  });

  test('formats a timestamp with a custom format', () => {
    const timestamp = 1633276800000; // October 4, 2021, 00:00:00 (UTC)
    const customFormat = 'DD-MM-YYYY HH:mm:ss';
    const formattedDate = formatTime(timestamp, customFormat);
    expect(formattedDate).toBe('03-10-2021 16:00:00');
  });

  // Edge case: handle invalid input
  test('returns an empty string for invalid input', () => {
    const invalidInput = 'invalid';
    const formattedDate = formatTime(invalidInput);
    expect(formattedDate).toBe('Invalid Date');
  });
});
