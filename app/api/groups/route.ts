import { getGroupById } from "@/app/utils/database/groups/getGroupById";
import { getAllGroups } from "@/app/utils/database/groups/getAllGroups";
import { createNewGroup } from "@/app/utils/database/groups/createNewGroup";
import { updateGroupById } from "@/app/utils/database/groups/updateGroupById";
import { deleteGroupById } from "@/app/utils/database/groups/deleteGroupById";

export async function GET(req) { 
    const searchParams: URLSearchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id")
    const hasSort = searchParams.has("sort")

    // If id is present in the query params, executes the getGroupById function and returns the group object
    if (id) {
        const group = await getGroupById(id);
        return Response.json(group)
    }

    // If the sort parameter is present, it returns the group list ordered by the title alphabetically
    if (hasSort) {
        const groups = await getAllGroups();
        return Response.json(groups?.sort((a, b) => a.title.localeCompare(b.title)))
    }

	const groups = await getAllGroups();
	return Response.json(groups);
}

export async function POST(req) {
    const body = await req.json();

    if (!(body.hasOwnProperty("title"))) {
        return Response.json({message: "You need to provide the title"}, {status: 400})
    }

    // Call the createNewGroup function to add it to the DB
    await createNewGroup(body.title)

    return Response.json({message: `New group ${body.title} is added to the DB`}, {status: 201})

}

export async function DELETE(req) {
    const searchParams: URLSearchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id")

    if (!id) {
        return Response.json({message: "You need to provide the ID to proceed the deletion"}, {status: 400})
    }

    // Call the deleteGroupById to remove it from the DB
    const deletion = await deleteGroupById(id)

    // If the deletion returns undefined, it means the record doesn't exist in the DB.
    if (!deletion) {
        return Response.json({message: `The item with ID ${id} doesn't exist in the DB`}, {status: 400})
    }

    return Response.json({message: `The item with ID ${id} has been removed from the DB`}, {status: 200})
}

export async function PATCH(req) {
    const searchParams: URLSearchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id")
    const body = await req.json()
    const title = body.title

    if (!(id && title)) {
        return Response.json({message: "You need to provide the ID and the title."}, {status: 400})
    }

    // Call the updateGroupById to update the group title
    const isUpdateSuccesful = await updateGroupById(id, title);

    if (!isUpdateSuccesful) {
        return Response.json({message: "The group of that ID doesn't exist in the DB"}, {status: 400})
    }

    return Response.json({message: `Group has been renamed to ${title}`}, {status: 200})
}
