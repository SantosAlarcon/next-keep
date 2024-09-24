import type { NextRequest } from "next/server";

/**
 * @swagger
 * /api/locale:
 *   get:
 *     tags:
 *       - locale
 *     summary: Returns the current locale
 *     description: Returns the current locale from the 'Accept-Language' header.
 *     responses:
 *       200:
 *         description: Returns the current locale
 *       400:
 *         description: The 'Accept-Language' header does not exist
 */
export async function GET(req: NextRequest) {
	const locale = req.headers.get("Accept-Language")?.split(",")[0].split("-")[0]

	if (!locale) {
		return Response.json("The 'Accept-Language' header does not exist", { status: 400 })
	}

	return Response.json(locale, { status: 200 })
}
