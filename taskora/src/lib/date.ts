export type DateInput = number | string | Date;

function isYYYYMMDD(num: number): boolean {
  const s = String(Math.trunc(num));
  if (s.length !== 8) return false;
  const year = Number(s.slice(0, 4));
  const month = Number(s.slice(4, 6));
  const day = Number(s.slice(6, 8));
  if (year < 1900 || year > 2099) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  return true;
}

function toDate(input: DateInput): Date {
  if (input instanceof Date) return input;

  if (typeof input === "string") {
    const trimmed = input.trim();
    // Try native Date parsing first (ISO strings, etc.)
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) return d;
    // If numeric-like string, fall through to numeric handling
    const num = Number(trimmed);
    if (!isNaN(num)) return toDate(num);
    // Fallback to current date
    return new Date();
  }

  // Numeric handling: support epoch ms, epoch seconds, and YYYYMMDD
  const num = Math.trunc(input);
  if (isYYYYMMDD(num)) {
    const s = String(num);
    const year = Number(s.slice(0, 4));
    const month = Number(s.slice(4, 6));
    const day = Number(s.slice(6, 8));
    return new Date(year, month - 1, day);
  }

  // Heuristic: seconds vs milliseconds
  // If < 10^12, treat as seconds (since ms since epoch today ~ 1.7e12)
  if (Math.abs(num) < 1_000_000_000_000) {
    return new Date(num * 1000);
  }
  return new Date(num);
}

export function formatMMDDYYYY(input: DateInput): string {
  const d = toDate(input);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${mm}/${dd}/${yyyy}`;
}
