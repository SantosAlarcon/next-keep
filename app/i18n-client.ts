import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '@/i18n.config';
import { initReactI18next } from 'react-i18next';
import i18nClient from 'i18next';

i18nClient
	.use(
		resourcesToBackend(
			(language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`),
		)
	)
	.use(initReactI18next)
	.init({
		//debug: process.env.NODE_ENV === "development",
		fallbackLng: i18nConfig.i18n.defaultLocale,
		supportedLngs: i18nConfig.i18n.locales,
		defaultNS: "common",
		fallbackNS: "common",
		load: "all",
		ns: i18nConfig.ns,
		preload: i18nConfig.i18n.locales
	})


export default i18nClient
