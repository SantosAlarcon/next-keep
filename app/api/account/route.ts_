import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    // const cookie = req.cookies.get("appwrite_session")?.value
    const cookie = req.headers.get("cookie").replace("appwrite_session=", "")

    //const session = JSON.parse(cookie)

    return new NextResponse(cookie, {status: 200})
}
