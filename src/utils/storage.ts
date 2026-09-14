export interface Person {
  name: string;
  mobile: string;
  email: string;
  institution: string;
  department: string;
  year: string;
  github: string;
  linkedin: string;
}

export interface Abstract {
  id: string;
  title: string;
  track: string;
  filename: string;
  size: number;
  date: string;
}

export interface Passport {
  category: string;
  track: string;
  team: string;
  people: Person[];
  registered: boolean;
  abstracts: Abstract[];
}

// Immediately clean all legacy test databases
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('vikas-2026-passport');
    localStorage.removeItem('vikas-2026-auth');
    localStorage.removeItem('vikas-2026-registered-emails');
    localStorage.removeItem('vikas-passport-demo-v1');
  }
} catch {
  // ignore
}

const STORAGE_KEY = 'vikas-2026-passport-v4';
const AUTH_KEY = 'vikas-2026-auth-v4';
const REGISTERED_USERS_KEY = 'vikas-2026-registered-emails-v4';

export function emptyPerson(): Person {
  return { name: '', mobile: '', email: '', institution: '', department: '', year: '', github: '', linkedin: '' };
}

export function blankPassport(): Passport {
  return {
    category: '',
    track: '',
    team: '',
    people: [emptyPerson()],
    registered: false,
    abstracts: [],
  };
}

export function savePassport(data: Passport): void {
  try {
    const isIndividual = data.category && data.category !== 'UG';
    const sanitized: Passport = {
      ...data,
      team: isIndividual ? '' : data.team,
      people: isIndividual ? [data.people[0] || emptyPerson()] : data.people,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  } catch {
    // silently fail if storage is full
  }
}

export function loadPassport(): Passport {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return blankPassport();
    const parsed = JSON.parse(raw);
    const isIndividual = parsed.category && parsed.category !== 'UG';
    const rawPeople = Array.isArray(parsed.people)
      ? parsed.people.map((p: Partial<Person>) => ({ ...emptyPerson(), ...p }))
      : [emptyPerson()];
    return {
      ...blankPassport(),
      ...parsed,
      team: isIndividual ? '' : (parsed.team || ''),
      people: isIndividual ? [rawPeople[0] || emptyPerson()] : rawPeople,
      abstracts: Array.isArray(parsed.abstracts) ? parsed.abstracts : [],
    };
  } catch {
    return blankPassport();
  }
}

export function titleCase(str: string): string {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

export function validatePerson(p: Person): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!p.name.trim()) errors.name = 'Name is required.';
  else if (!/^[A-Za-z ]+$/.test(p.name)) errors.name = 'Letters and spaces only.';
  if (!p.mobile.trim()) errors.mobile = 'Mobile is required.';
  else if (!/^[0-9]{10}$/.test(p.mobile)) errors.mobile = 'Exactly 10 digits.';
  if (!p.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) errors.email = 'Enter a valid email.';
  if (!p.institution.trim()) errors.institution = 'Institution is required.';
  if (!p.department.trim()) errors.department = 'Department is required.';
  if (!p.year) errors.year = 'Select a year.';
  return errors;
}

export function validProfile(data: Passport): boolean {
  if (!data.category || !data.track) return false;
  if (data.category === 'UG' && !data.team.trim()) return false;
  return data.people.every(p => Object.keys(validatePerson(p)).length === 0);
}

export const yearOptionsFor = (category: string) =>
  category === 'UG'
    ? ['1st year', '2nd year', '3rd year', '4th year']
    : category === 'PG'
    ? ['1st year', '2nd year']
    : ['PhD Scholar / Candidate', 'Post-Doctoral Researcher'];

export const WHATSAPP_LINK = 'https://chat.whatsapp.com/CrjTmSgQZcTLxtb4gedUKC';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isNewUser?: boolean;
}

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuthUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch {
    // silently fail
  }
}

export function getRegisteredEmails(): string[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    const passport = loadPassport();
    if (passport.registered && Array.isArray(passport.people)) {
      passport.people.forEach((p) => {
        if (p && p.email) {
          const email = p.email.toLowerCase().trim();
          if (email && !list.includes(email)) {
            list.push(email);
          }
        }
      });
    }
    return list;
  } catch {
    return [];
  }
}

export function registerEmail(email: string): void {
  try {
    const list = getRegisteredEmails();
    const clean = email.trim().toLowerCase();
    if (clean && !list.includes(clean)) {
      list.push(clean);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(list));
    }
  } catch {
    // silently fail
  }
}

export function clearDatabase(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REGISTERED_USERS_KEY);
  } catch {
    // silently fail
  }
}

export function isEmailRegistered(email: string): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  const list = getRegisteredEmails();
  return list.includes(clean);
}

