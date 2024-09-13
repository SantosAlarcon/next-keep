export const getAllGroups = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups_appwrite`)
    const allGroups = await response.json()
    return allGroups
}
