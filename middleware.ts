import i18nConfig from "@/i18n.config";
import { i18nRouter } from "next-i18n-router";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	// Get the language used in the browser
	// @ts-ignore
	const lang = request.headers.get("Accept-Language").split(",")[0].split("-")[0];

	if (request.nextUrl.pathname.startsWith("/api/") ||
		request.nextUrl.pathname.startsWith("/login/") ||
		request.nextUrl.pathname.startsWith("/register/") ||
		request.nextUrl.pathname.startsWith("/reset-password/") ||
		request.nextUrl.pathname.startsWith("/new-password/")) {
		return NextResponse.next();
	}

	const session = request.cookies.get("appwrite_session")?.value;

	// If there is no session, redirect to the login page
	if (!session) {
		return NextResponse.redirect(new URL(`/login/${lang}`, request.nextUrl));
	}

	return i18nRouter(request, i18nConfig.i18n);
}

// Apply this middleware only to files in the app directory and these directories
export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next).*)", "/login", "/register", "/reset-password", "/new-password"],
};
