import { getGroupById } from "@/app/utils/database/groups/getGroupById";
import { getAllGroups } from "@/app/utils/database/groups/getAllGroups";
import { createNewGroup } from "@/app/utils/database/groups/createNewGroup";
import { updateGroupById } from "@/app/utils/database/groups/updateGroupById";
import { deleteGroupById } from "@/app/utils/database/groups/deleteGroupById";
import type { NextRequest } from "next/server";

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Returns the list of all groups
 *     tags:
 *       - groups
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the group to get
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         description: Sorts the list of groups alphabetically
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Returns the list of groups
 *       400:
 *         description: The ID provided doesn't exist in the database
*/
export async function GET(req: NextRequest) {
	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id")
	const hasSort = searchParams.has("sort")

	// If id is present in the query params, executes the getGroupById function and returns the group object
	if (id) {
		const group = await getGroupById(id);
		return Response.json(group, { status: 200 });
	}

	// If the sort parameter is present, it returns the group list ordered by the title alphabetically
	if (hasSort) {
		const groups = await getAllGroups();
		return Response.json(groups?.sort((a, b) => a.title.localeCompare(b.title)), { status: 200 });
	}

	const groups = await getAllGroups();
	return Response.json(groups, { status: 200 });
}

/**
 * @swagger
 * /api/groups:
 *   post:
 *     tags:
 *       - groups
 *     summary: Creates a new group
 *     parameters:
 *       - in: header
 *         name: title
 *         description: The title of the group
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       201:
 *         description: Creates the new group succesfully
 *       400:
 *         description: Title has not been provided
*/
export async function POST(req: NextRequest) {
	const body = await req.json();

	if (!(body.hasOwnProperty("title"))) {
		return Response.json({ message: "You need to provide the title" }, { status: 400 })
	}

	// Call the createNewGroup function to add it to the DB
	await createNewGroup(body.title)

	return Response.json({ message: `New group ${body.title} is added to the DB` }, { status: 201 })

}

/**
 * @swagger
 * /api/groups:
 *   delete:
 *     tags:
 *       - groups
 *     summary: Updates the name of the group
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the group to update
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deletes the group
 *       400:
 *         description: ID has not been provided to delete the group
*/
export async function DELETE(req: NextRequest) {
	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id")

	if (!id) {
		return Response.json({ message: "You need to provide the ID to proceed the deletion" }, { status: 400 })
	}

	// Call the deleteGroupById to remove it from the DB
	const deletion = await deleteGroupById(id)

	// If the deletion returns undefined, it means the record doesn't exist in the DB.
	if (!deletion) {
		return Response.json({ message: `The item with ID ${id} doesn't exist in the DB` }, { status: 400 })
	}

	return Response.json({ message: `The item with ID ${id} has been removed from the DB` }, { status: 200 })
}

/**
 * @swagger
 * /api/groups:
 *   put:
 *     tags:
 *       - groups
 *     summary: Updates the name of the group
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the group to update
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: title
 *         description: The new title of the group
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       201:
 *         description: Updates the note group succesfully
 *       400:
 *         description: Title or id have not been provided
*/
export async function PUT(req: NextRequest) {
	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id")
	const body = await req.json()
	const title = body.title

	if (!(id && title)) {
		return Response.json({ message: "You need to provide the ID and the title." }, { status: 400 })
	}

	// Call the updateGroupById to update the group title
	const isUpdateSuccesful = await updateGroupById(id, title);

	if (!isUpdateSuccesful) {
		return Response.json({ message: "The group of that ID doesn't exist in the DB" }, { status: 400 })
	}

	return Response.json({ message: `Group has been renamed to ${title}` }, { status: 200 })
}
