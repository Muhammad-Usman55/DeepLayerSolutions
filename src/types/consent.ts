export type CookieCategory = "necessary" | "analytics" | "marketing";

export interface CookiePreferences {
  necessary: true; // Strictly necessary cookies are mandatory
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentRecord extends CookiePreferences {
  consentId: string;
  policyVersion: string;
  timestamp: string;
}

export interface ConsentContextValue {
  consent: ConsentRecord | null;
  hasDecided: boolean;
  isBannerOpen: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => Promise<void>;
  rejectOptional: () => Promise<void>;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => Promise<void>;
  openBanner: () => void;
  openPreferences: () => void;
  closeBanner: () => void;
  closePreferences: () => void;
}
