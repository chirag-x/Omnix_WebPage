/**
 * Tiny i18n shell. Default language is English. Add more locales here.
 * Components read strings via the `t()` helper.
 */
import { useState, useCallback, useMemo } from "react";

export type Locale = "en";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
];

type Dictionary = Record<string, string>;

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    "nav.product": "Product",
    "nav.why": "Why Omnix",
    "nav.architecture": "Architecture",
    "nav.capabilities": "Capabilities",
    "nav.demo": "Demo",
    "nav.roadmap": "Roadmap",
  },
};

let current: Locale = "en";
const listeners = new Set<() => void>();

export function setLocale(l: Locale) {
  current = l;
  listeners.forEach((fn) => fn());
}

export function getLocale(): Locale {
  return current;
}

export function t(key: string): string {
  return dictionaries[current][key] ?? key;
}

export function useT() {
  const [, force] = useState(0);
  const cb = useCallback(() => force((n) => n + 1), []);
  useMemo(() => {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, [cb]);
  return t;
}
