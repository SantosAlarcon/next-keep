import type { I18nConfig } from "next-i18next/proxy";

const i18NextConfig: I18nConfig = {
	supportedLngs: ["en", "es", "ca"],
	fallbackLng: "en",
	defaultNS: "common",
	ns: ["common", "login", "register", "reset-password", "new-password"],
	resourceLoader: (language, namespace) =>
		import(`./locales/${language}/${namespace}.json`),
};

export const getOptions = (lang: string, ns: string | string[]) => {
	return {
		supportedLangs: i18NextConfig.supportedLngs,
		lang,
		ns,
		fallbackNS: i18NextConfig.fallbackLng,
		defaultNS: i18NextConfig.defaultNS,
	};
};

export default i18NextConfig;
