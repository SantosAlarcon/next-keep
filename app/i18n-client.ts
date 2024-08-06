import type {i18n } from 'i18next';
import { createInstance } from "i18next"
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '@/i18n.config';

export default function initClientTranslations(
    locale: string,
    namespaces: string[],
    i18nInstance?: i18n,
    resources?: any,
) {

    i18nInstance = i18nInstance || createInstance()

    if (!resources) {
        i18nInstance.use(
            resourcesToBackend(
                (language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`),
            ),
        );
    }

    i18nInstance.init({
        debug: false,
        lng: locale,
        resources,
        fallbackLng: i18nConfig.i18n.defaultLocale,
        supportedLngs: i18nConfig.i18n.locales,
        defaultNS: namespaces[0],
        fallbackNS: namespaces[0],
        load: "all",
        ns: namespaces,
        preload: resources ? [] : i18nConfig.i18n.locales,
    });

    return {
        i18n: i18nInstance,
        resources: i18nInstance.services.resourceStore.data,
        t: i18nInstance.t,
    };
}
