export function getRelativeTime(dateString: string, lang: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffSec = Math.floor(diffMs / 1000);
	const diffMin = Math.floor(diffSec / 60);
	const diffHour = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHour / 24);
	const diffWeek = Math.floor(diffDay / 7);
	const diffMonth = Math.floor(diffDay / 30);

	const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });

	if (diffSec < 60) return rtf.format(-diffSec, "second");
	if (diffMin < 60) return rtf.format(-diffMin, "minute");
	if (diffHour < 24) return rtf.format(-diffHour, "hour");
	if (diffWeek < 4) return rtf.format(-diffWeek, "week");
	if (diffMonth < 12) return rtf.format(-diffMonth, "month");

	return date.toLocaleDateString(lang, { dateStyle: "medium" });
}

export function getMarkdownPreview(markdown: string, maxLength: number = 80): string {
	const stripped = markdown
		.replace(/#{1,6}\s/g, "")
		.replace(/\*\*(.*?)\*\*/g, "$1")
		.replace(/\*(.*?)\*/g, "$1")
		.replace(/`(.*?)`/g, "$1")
		.replace(/```[\s\S]*?```/g, "")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
		.replace(/[-*_]{3,}/g, "")
		.replace(/\n+/g, " ")
		.trim();

	return stripped.length > maxLength ? stripped.slice(0, maxLength) + "…" : stripped;
}
