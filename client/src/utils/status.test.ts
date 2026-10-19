import { getNextStatus, getPreviousStatus, getStatusTitle } from './status';

describe('status-hjälpfunktioner', () => {
  it('returnerar nästa status', () => {
    expect(getNextStatus('todo')).toBe('in-progress');
    expect(getNextStatus('in-progress')).toBe('done');
  });

  it('returnerar null när det inte finns någon nästa status', () => {
    expect(getNextStatus('done')).toBeNull();
  });

  it('returnerar föregående status', () => {
    expect(getPreviousStatus('done')).toBe('in-progress');
    expect(getPreviousStatus('todo')).toBeNull();
  });

  it('returnerar kolumnens titel', () => {
    expect(getStatusTitle('in-progress')).toBe('Pågående');
  });
});
