import i18nConfig from "@/i18n.config";
import { i18nRouter } from "next-i18n-router";
import type { NextRequest } from "next/server";
import { groupStore } from "./app/store/groupStore";

export async function middleware(request: NextRequest) {

    const {fetchTitles} = groupStore.getState()
    await fetchTitles()

	// Register the URL param in the headers
	request.headers.set("x-current-path", request.nextUrl.pathname);
	return i18nRouter(request, i18nConfig.i18n);
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: "/((?!api|static|.*\\..*|_next).*)",
};
