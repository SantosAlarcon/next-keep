import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const locale = req.cookies.get("NEXT_LOCALE")
    return Response.json(locale?.value, {status: 200})
}
