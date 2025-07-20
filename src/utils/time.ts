export function parseTime(t: string) {
  const [m, s] = t.split(':').map(Number);
  if (isNaN(m) || isNaN(s)) return 0;
  return m * 60 + s;
}

export function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}
