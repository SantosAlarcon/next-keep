import i18nClient from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import i18nConfig from "@/i18n.config";

i18nClient
	.use(
		resourcesToBackend(
			(language: string, namespace: string) =>
				import(`../locales/${language}/${namespace}.json`),
		),
	)
	.use(initReactI18next)
	.init({
		//debug: process.env.NODE_ENV === "development",
		fallbackLng: i18nConfig.fallbackLng,
		supportedLngs: i18nConfig.supportedLngs,
		defaultNS: "common",
		fallbackNS: "common",
		load: "all",
		ns: i18nConfig.ns,
		preload: i18nConfig.supportedLngs,
	});

export default i18nClient;
