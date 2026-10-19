import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formaterar ett ISO-datum till svenskt format', () => {
    expect(formatDate('2026-10-05T12:00:00')).toBe('5 okt 2026');
  });

  it('hanterar första månaden på året', () => {
    expect(formatDate('2026-01-20T12:00:00')).toBe('20 jan 2026');
  });

  it('returnerar en fallback-text för ogiltiga datum', () => {
    expect(formatDate('inte ett datum')).toBe('Okänt datum');
  });
});
