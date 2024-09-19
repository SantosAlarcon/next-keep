import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = cookies().get("appwrite_session")?.value
    return Response.json(JSON.parse(session!))
}
