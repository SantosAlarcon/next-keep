import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    //const {cookies} = await import("next/headers")
    //const locale = cookies().get("NEXT_LOCALE")
    const locale = req.cookies.get("NEXT_LOCALE")
    return Response.json(locale, {status: 200})
}
