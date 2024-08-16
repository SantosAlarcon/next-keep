export const deleteGroupById = async (id: string) => {
	return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups?id=${id}`, {
		method: "DELETE",
	})
}
