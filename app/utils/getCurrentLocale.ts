export async function getCurrentLocale() {
	const locale = await fetch("/api/locale");
    console.log(locale)
    // @ts-ignore
	return locale.value;
};
