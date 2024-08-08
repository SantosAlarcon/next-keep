export const getAllGroups = async () => {
    const response = await fetch(process.env.URL + "/api/groups")
    const allGroups = await response.json()
    return allGroups
}
