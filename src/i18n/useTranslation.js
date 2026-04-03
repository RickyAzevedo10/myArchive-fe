import { useCallback } from "react";
import { useApp } from "../context/AppContext";
import { translations } from "./translations";

export function useTranslation() {
  const { locale, setLocale } = useApp();

  const t = useCallback((key, params = {}) => {
    const dict = translations[locale] || translations.pt;
    let text = dict[key] || key;
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
    return text;
  }, [locale]);

  return { t, locale, setLocale };
}
