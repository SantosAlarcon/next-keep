export const getAllGroups = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups`, {cache: "no-cache"})
    const allGroups = await response.json()
    return allGroups
}
