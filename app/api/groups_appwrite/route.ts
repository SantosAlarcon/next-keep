import { createNewGroup } from "@/app/utils/database-appwrite/groups/createNewGroup";
import { deleteGroupById } from "@/app/utils/database-appwrite/groups/deleteGroupById";
import { getGroupById } from "@/app/utils/database-appwrite/groups/getGroupById";
import { getGroupByTitle } from "@/app/utils/database-appwrite/groups/getGroupByTitle";
import getGroupsByUser from "@/app/utils/database-appwrite/groups/getGroupsByUser";
import { updateGroupById } from "@/app/utils/database-appwrite/groups/updateGroupById";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @swagger
 * /api/groups?id={id}:
 *   get:
 *     summary: Return a group using the ID
 *     tags:
 *       - groups
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the group to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the group object with that ID
 *       400:
 *         description: The ID provided doesn't exist in the database
 * /api/groups?title={title}:
 *   get:
 *     summary: Returns the group that uses that title
 *     tags:
 *       - groups
 *     parameters:
 *       - in: query
 *         name: title
 *         description: Returns the group that uses that title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the group that contains the title
 *       400:
 *         description: No group found with that title
 * /api/groups?userId={userId}:
 *   get:
 *     summary: Returns the group that uses that title
 *     tags:
 *       - groups
 *     parameters:
 *       - in: query
 *         name: userId
 *         description: Returns the groups that belongs to the user with that ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the groups that belong to the user with that ID
*/
export async function GET(req: NextRequest) {
	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id")
	const title = searchParams.get("title")
	const userId = searchParams.get("userId")

	// If id is present in the query params, executes the getGroupById function and returns the group object
	if (id) {
		const group = await getGroupById(id);

		if (!group) {
			return Response.json({ message: "There is no group with that ID" }, { status: 400 })
		}

		return Response.json(group, { status: 200 });
	}

	// If title is present in the query params, it returns the group object that uses that title
	if (title) {
		const group = await getGroupByTitle(title);

		if (!group) {
			return Response.json({ message: "No group found with that title" }, { status: 400 })
		}

		return Response.json(group, { status: 200 });
	}

	if (userId) {
		const userGroups = await getGroupsByUser(userId);
		return Response.json(userGroups, { status: 200 })
	}
}

/**
 * @swagger
 * /api/groups:
 *   post:
 *     tags:
 *       - groups
 *     summary: Creates a new group
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Creates the new group succesfully
 *       400:
 *         description: Title has not been provided
*/
export async function POST(req: NextRequest) {
	const body = await req.json();

	if (!body.hasOwnProperty("title") || !body) {
		return Response.json({ message: "You need to provide the title" }, { status: 400 })
	}

	// Call the createNewGroup function to add it to the DB
	await createNewGroup(body.title).then(() => {
		return NextResponse.json({ message: `New group ${body.title} is added to the DB` }, { status: 201 })
	}).catch((error) => {
		console.log(error.message)
	})

}

/**
 * @swagger
 * /api/groups?id={id}:
 *   delete:
 *     tags:
 *       - groups
 *     summary: Deletes a group
 *     description: Deletes a group from the database
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
 *         description: ID has not been provided to delete the group or the ID provided doesn't exist in the database.
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
 * /api/groups?id={id}:
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
 *         description: Title or id have not been provided, or the ID provided doesn't exist in the database.
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
