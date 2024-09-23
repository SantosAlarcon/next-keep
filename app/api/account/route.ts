import { NextResponse, type NextRequest } from "next/server";

//export const dynamic = "force-static";

export async function GET(req: NextRequest) {
    const cookie = req.cookies.get("appwrite_session")?.value

    const session = JSON.parse(cookie)

    return NextResponse.json(session, {status: 200})
}
