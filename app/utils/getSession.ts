"use server"

import { cookies } from "next/headers";

export const getSession = async () => {
    const session = JSON.parse(cookies().get("appwrite_session")!.value);
    return session;
}
