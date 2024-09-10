import type { NextRequest } from "next/server";
import { appwriteClient } from "@/app/appwrite";
import { Databases, Models } from "appwrite";

export async function GET(req: NextRequest) {
	const db = new Databases(appwriteClient);
	const groups: Models.DocumentList<Models.Document> = await db.listDocuments(process.env.DATABASE_ID!, process.env.GROUPS_COLLECTION_ID!);
	return Response.json(groups.documents, { status: 200 });
}
