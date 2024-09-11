import type { NextRequest } from "next/server";
import { Models } from "appwrite";
import { appwriteDatabase } from "@/app/appwrite";

export async function GET(req: NextRequest) {
	req.headers.get("accept-language");
	const groups: Models.DocumentList<Models.Document> = await appwriteDatabase.listDocuments(process.env.DATABASE_ID!, process.env.GROUPS_COLLECTION_ID!);
	return Response.json(groups.documents, { status: 200 });
}
