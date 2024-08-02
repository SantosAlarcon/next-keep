import type { NextRequest } from "next/server";

/**
 * @swagger
 * /api/locale:
 *   get:
 *     description: Returns the current locale
 *     responses:
 *       200:
 *         description: Returns the current locale
 */
export async function GET(req: NextRequest) {
    const locale = req.cookies.get("NEXT_LOCALE")
    return Response.json(locale?.value, {status: 200})
}
