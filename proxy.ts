import { createProxy } from "next-i18next/proxy";
import i18nConfig from "./i18n.config";

export const proxy = createProxy(i18nConfig);

// Apply this proxy only to files in the app directory and these directories
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
	// matcher: [
	// 	"/((?!api|static|.*\\..*|_next).*)",
	// 	"/login",
	// 	"/register",
	// 	"/reset-password",
	// 	"/new-password",
	// ],
	// matcher: [
	// 	"/((?!api|login|register|reset-password|new-password|static|.*\\..*|_next).*)",
	// ],
};
