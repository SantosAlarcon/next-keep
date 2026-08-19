import { type NextRequest } from "next/server";

const rateLimit = new Map<string, number[]>();

export function checkRateLimit(
	request: NextRequest,
	options: { windowMs?: number; max?: number } = {},
): { limited: boolean; response?: Response } {
	const { windowMs = 60_000, max = 60 } = options;

	const ip =
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
		request.headers.get("x-real-ip") ||
		"127.0.0.1";

	const now = Date.now();
	const requests = rateLimit.get(ip) ?? [];
	const recent = requests.filter((t: number) => now - t < windowMs);

	if (recent.length >= max) {
		return {
			limited: true,
			response: Response.json(
				{ message: "Too many requests. Please try again later." },
				{ status: 429 },
			),
		};
	}

	recent.push(now);
	rateLimit.set(ip, recent);

	return { limited: false };
}
