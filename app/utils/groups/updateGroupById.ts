export const updateGroupById = async (id: string, newTitle: string) => {
	return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups?id=${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: newTitle }),
	})
}
