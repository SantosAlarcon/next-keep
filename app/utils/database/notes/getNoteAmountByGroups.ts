import { prismaClient } from "../../PrismaClient";

export async function getNoteAmountsByGroups() {
	const response = await prismaClient.notes.groupBy({
		by: ["group"],
		_count: {
			_all: true
		}
	})

	const amountMap = new Map<string, number>();
	for (const note of response) {
		if (note.group !== null) {
			amountMap.set(note.group, note._count._all);
		}
	}

	const amountMapObject = Object.fromEntries(amountMap);

	return amountMapObject;
}
