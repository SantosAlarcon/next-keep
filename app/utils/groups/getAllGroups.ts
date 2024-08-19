export const getAllGroups = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups`)
    const allGroups = await response.json()
    return allGroups
}
