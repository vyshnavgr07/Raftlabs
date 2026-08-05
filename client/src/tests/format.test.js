import { formatCurrency, formatDateTime } from '../utils/format';

describe('format utils', () => {
  test('formats currency', () => {
    const formatted = formatCurrency(12.5);
    expect(formatted).toContain('12.50');
    expect(formatted).toMatch(/₹|INR/);
  });

  test('formats datetime and handles empty values', () => {
    expect(formatDateTime(null)).toBe('—');
    expect(formatDateTime('2024-01-15T12:00:00.000Z')).toMatch(/2024/);
  });
});
