import { getAllGroupsDB } from "@/app/utils/groups/getAllGroupsDB";

export async function GET() {
	const groups = getAllGroupsDB();
	return Response.json(groups);
}
