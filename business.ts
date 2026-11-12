export interface BusinessProfile {
  name: string;
  industry: string;
  products: string;
  targetAudience: string;
  brandVoice: string;
  goals: string;
  website: string;
  marketingPreferences: string;
  updatedAt?: string;
}

const KEY = "marketpilot_business_profile";
const AUTH_KEY = "marketpilot_user";

export function getBusinessProfile(): BusinessProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveBusinessProfile(profile: BusinessProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    KEY,
    JSON.stringify({ ...profile, updatedAt: new Date().toISOString() })
  );
}

export function clearBusinessProfile() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export interface UserSession {
  email: string;
  name: string;
  plan: "starter" | "professional" | "business" | null;
  createdAt: string;
}

export function getSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(user: UserSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return !!getSession();
}
