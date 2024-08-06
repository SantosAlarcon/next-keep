export const getAllGroups = async () => {
    const response = await fetch("/api/groups")
    const allGroups = await response.json()
    return allGroups
}
