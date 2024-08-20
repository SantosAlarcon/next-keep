export const getNoteById = async (id: string) => {
    return await fetch(`${process.env.URL}/api/notes?id=${id}`).then((response) => response.json())
}
