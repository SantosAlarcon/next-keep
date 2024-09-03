"use client"

import { dataStore, type DataStoreProps } from "../store/dataStore"
import { useStoreSync } from "../utils/hooks/useStoreSync"

export const DataSync = ({state}: {state: DataStoreProps}) => {
    useStoreSync(dataStore, state);
    return null;
}
