import type { NextRequest } from "next/server";

/**
 * @swagger
 * /api/locale:
 *   get:
 *     tags:
 *       - locale
 *     summary: Returns the current locale
 *     description: Returns the current locale from the **NEXT_LOCALE** cookie.
 *     responses:
 *       200:
 *         description: Returns the current locale
 *       400:
 *         description: The cookie **NEXT_LOCALE** does not exist
 */
export async function GET(req: NextRequest) {
    const locale = req.cookies.get("NEXT_LOCALE")

	if (!locale) {
		return Response.json("The cookie NEXT_LOCALE does not exist", {status: 400})
	}

    return Response.json(locale?.value, {status: 200})
}
