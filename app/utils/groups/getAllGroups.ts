import { getSession } from "../getSession";

export const getAllGroups = async () => {
    const session = await getSession();
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups_appwrite?userId=${session.userId}`)
    const allGroups = await response.json()
    return allGroups
}
