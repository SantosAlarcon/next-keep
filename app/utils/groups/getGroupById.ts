export const getGroupById = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups?id=${id}`).then((response) => response)
}
