"use client";

import { authStore, AuthStoreProps } from "../store/authStore";
import { useStoreSync } from "../utils/hooks/useStoreSync";

export const AuthSync = ({ state }: { state: AuthStoreProps }) => {
	useStoreSync(authStore, state);
	return null;
};
