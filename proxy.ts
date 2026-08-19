import { createProxy } from "next-i18next/proxy";
import i18nConfig from "./i18n.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const i18nProxy = createProxy(i18nConfig);

export async function proxy(request: NextRequest) {
	const response = await i18nProxy(request);

	if (response instanceof NextResponse) {
		response.headers.set("X-Frame-Options", "DENY");
		response.headers.set("X-Content-Type-Options", "nosniff");
		response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
		response.headers.set(
			"Strict-Transport-Security",
			"max-age=63072000; includeSubDomains; preload",
		);
	}

	return response;
}

// Apply this proxy only to files in the app directory and these directories
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
