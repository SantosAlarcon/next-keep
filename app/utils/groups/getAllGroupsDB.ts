import { db } from "../sqlite-client";

export const getAllGroupsDB = () => {

	try {
		const query = db.all("SELECT * FROM groups");
		console.log(query);
		return query;

		//db.close();
	} catch (error) {
		console.error(error);
	}

}
