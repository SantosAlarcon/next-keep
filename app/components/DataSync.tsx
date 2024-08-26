"use client"

import i18nClient from "../i18n-client"
import { dataStore, type DataStoreProps } from "../store/dataStore"
import { useStoreSync } from "../utils/hooks/useStoreSync"

export const DataSync = ({state}: {state: DataStoreProps}) => {
    const t = i18nClient.getFixedT("en", "common")
    useStoreSync(dataStore, state);
    return null;
}
