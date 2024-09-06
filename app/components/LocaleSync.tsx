"use client"

import { localeStore, type LocaleStoreProps } from "../store/localeStore"
import { useStoreSync } from "../utils/hooks/useStoreSync"

export const LocaleSync = ({state}: {state: LocaleStoreProps}) => {
    useStoreSync(localeStore, state);
    return null;
}
