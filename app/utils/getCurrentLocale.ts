export async function getCurrentLocale() {
	const response = await fetch("/api/locale");
	const locale = await response.json();
	return locale;
};
