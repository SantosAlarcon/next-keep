import { appwriteAccount } from "@/app/appwrite";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get("userId");
	const secret = request.nextUrl.searchParams.get("secret");

	// @ts-ignore
	const session = await appwriteAccount.createSession(userId, secret);

	cookies().set("appwrite_session", JSON.stringify(session), {
		path: "/",
		// httpOnly: true,
		// sameSite: "strict",
		// secure: true,
	});

	return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/notes/all`, {
		status: 303
	});
}
