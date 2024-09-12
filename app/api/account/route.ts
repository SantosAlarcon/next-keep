import { appwriteAccount, appwriteClientAccount, createSessionClient, getLoggedInUser } from "@/app/appwrite";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const accountData = await appwriteAccount.getSession("current")
    //const account = await getLoggedInUser();

    return Response.json(accountData)
}

export async function DELETE(req: NextRequest) {
    const result = await appwriteAccount.deleteSessions();
    return Response.json(result)
}
