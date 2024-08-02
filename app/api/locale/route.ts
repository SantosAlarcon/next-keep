import type { NextRequest } from "next/server";

/**
 * @swagger
 * /api/locale:
 *   get:
 *     tags:
 *       - locale
 *     summary: Returns the current locale
 *     description: Returns the current locale from the 'NEXT_LOCALE' cookie.
 *     responses:
 *       200:
 *         description: Returns the current locale
 */
export async function GET(req: NextRequest) {
    const locale = req.cookies.get("NEXT_LOCALE")
    return Response.json(locale?.value, {status: 200})
}
