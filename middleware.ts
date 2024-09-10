import i18nConfig from "@/i18n.config";
import { i18nRouter } from "next-i18n-router";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	// Register the URL param in the headers
	request.headers.set("x-current-path", request.nextUrl.pathname);

	if (request.nextUrl.pathname.startsWith("/api/") || 
        request.nextUrl.pathname.startsWith("/login/") || 
        request.nextUrl.pathname.startsWith("/register/") || 
        request.nextUrl.pathname.startsWith("/reset-password/") ||
        request.nextUrl.pathname.startsWith("/new-password/")) {
		return NextResponse.next();
	}

	return i18nRouter(request, i18nConfig.i18n);
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next).*)", "/login", "/register", "/reset-password", "/new-password"],
};
