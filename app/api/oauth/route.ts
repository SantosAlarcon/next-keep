import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { appwriteAccount } from "@/app/appwrite";

export async function GET(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get("userId");
	const secret = request.nextUrl.searchParams.get("secret");
	const cookieList = await cookies();

	// @ts-ignore
	const session = await appwriteAccount.createSession(userId, secret);

	cookieList.set("appwrite_session", JSON.stringify(session), {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 30,
	});

	return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL!}/notes/all`, {
		status: 303,
		url: `${process.env.NEXT_PUBLIC_URL!}/notes/all`,
	});
}
