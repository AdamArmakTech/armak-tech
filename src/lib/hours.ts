// Open/closed status from the one hours string in src/data/site.ts.
// Pure and dependency-free so it can run in the browser.

export type Hours = { days: number[]; open: string; close: string };
export type OpenStatus = { open: boolean; label: string };

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_INDEX: Record<string, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

const to24 = (h: string, m: string | undefined, ap: string): string => {
  let hour = Number(h) % 12;
  if (ap.toLowerCase() === 'pm') hour += 12;
  return `${String(hour).padStart(2, '0')}:${m ?? '00'}`;
};

/** Parses e.g. "Mon–Fri · 8 AM – 6 PM". Returns null if the string is not in that shape. */
export function parseHours(str: string): Hours | null {
  const dayMatch = /\b(mon|tue|wed|thu|fri|sat|sun)[a-z]*\s*[-–—]\s*(mon|tue|wed|thu|fri|sat|sun)[a-z]*/i.exec(str);
  const timeMatch = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[-–—]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i.exec(str);
  if (!dayMatch || !timeMatch) return null;
  const from = DAY_INDEX[dayMatch[1].toLowerCase()];
  const to = DAY_INDEX[dayMatch[2].toLowerCase()];
  const days: number[] = [];
  for (let d = from; ; d = (d + 1) % 7) {
    days.push(d);
    if (d === to) break;
  }
  return {
    days,
    open: to24(timeMatch[1], timeMatch[2], timeMatch[3]),
    close: to24(timeMatch[4], timeMatch[5], timeMatch[6]),
  };
}

const toMinutes = (t: string): number => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const fmt = (t: string): string => {
  const [h, m] = t.split(':').map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`;
};

export function openStatus(now: Date, hours: Hours, tz = 'America/Los_Angeles'): OpenStatus {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const dow = DAY_INDEX[get('weekday').toLowerCase().slice(0, 3)];
  const mins = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
  const openAt = toMinutes(hours.open);
  const closeAt = toMinutes(hours.close);
  const todayOpen = hours.days.includes(dow);

  if (todayOpen && mins >= openAt && mins < closeAt) {
    return { open: true, label: `Open now · until ${fmt(hours.close)}` };
  }
  if (todayOpen && mins < openAt) {
    return { open: false, label: `Opens today at ${fmt(hours.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (dow + i) % 7;
    if (!hours.days.includes(d)) continue;
    const name = i === 1 && todayOpen ? 'tomorrow' : DAY_NAMES[d];
    return { open: false, label: `Opens ${name} at ${fmt(hours.open)}` };
  }
  return { open: false, label: '' };
}
