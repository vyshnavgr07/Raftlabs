import { formatCurrency, formatDateTime } from '../utils/format';

describe('format utils', () => {
  test('formats currency', () => {
    expect(formatCurrency(12.5)).toContain('12.50');
  });

  test('formats datetime and handles empty values', () => {
    expect(formatDateTime(null)).toBe('—');
    expect(formatDateTime('2024-01-15T12:00:00.000Z')).toMatch(/2024/);
  });
});
