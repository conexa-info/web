// Google Analytics loads only after the visitor accepts it in the consent banner.
export const GA_ID = "G-V0LMBMH207";
const CONSENT_KEY = "conexa-analytics-consent";
export const CONSENT_EVENT = "conexa:consent-reset";

export type Consent = "granted" | "denied";

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export function getConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    // Storage blocked: the choice applies to this visit only.
  }
  if (v === "granted") loadAnalytics();
}

/** Clears the stored choice and asks the banner to show again. */
export function resetConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function loadAnalytics() {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (w.gtag) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Records a successful form submission as a GA4 lead (no-op without consent). */
export function trackLead(form: "brand" | "creator", lang: string) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  w.gtag?.("event", "generate_lead", { form_type: form, language: lang });
}
