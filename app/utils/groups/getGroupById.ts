export const getGroupById = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups_appwrite?id=${id}`).then((response) => response.json())
}
