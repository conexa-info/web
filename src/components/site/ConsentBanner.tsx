import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  getConsent,
  loadAnalytics,
  resetConsent,
  setConsent,
} from "@/lib/analytics";
import { DICT, type Lang } from "@/lib/i18n";
import { btn } from "./ui";

export function ConsentBanner({ lang }: { lang: Lang }) {
  const c = DICT[lang].consent;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = getConsent();
    if (stored === "granted") loadAnalytics();
    setOpen(stored === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;
  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setOpen(false);
  };
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.title}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border bg-card p-5 text-sm shadow-card md:inset-x-auto md:right-6"
    >
      <p className="font-semibold">{c.title}</p>
      <p className="mt-1 text-muted-foreground">{c.text}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose("granted")} className={btn({})}>
          {c.accept}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className={btn({ variant: "outline" })}
        >
          {c.reject}
        </button>
      </div>
    </div>
  );
}

export function ConsentSettingsLink({ lang }: { lang: Lang }) {
  return (
    <button type="button" onClick={resetConsent} className="underline hover:text-primary">
      {DICT[lang].consent.settings}
    </button>
  );
}
