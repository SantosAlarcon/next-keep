import { appwriteAccount, getLoggedInUser } from "@/app/appwrite";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const user = await getLoggedInUser();
    return Response.json(user)
}

export async function DELETE(req: NextRequest) {
    const result = await appwriteAccount.deleteSessions();
    return Response.json(result)
}
