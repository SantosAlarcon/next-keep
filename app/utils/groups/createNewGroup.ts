export const createNewGroup = async (newGroup: string) => {
	return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: newGroup }),
	})
}
