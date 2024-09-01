"use client";

import { InputText } from "primereact/inputtext";
import FilterComponentStyles from "@/styles/FilterComponent.module.css";
import { useEffect, useRef } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import i18nClient from "../i18n-client";
import { dataStore } from "../store/dataStore";

const FilterComponent = ({ lang }: { lang: string }) => {
	const t = i18nClient.getFixedT(lang, "common");
	const filter = dataStore((state) => state.filter)
	const setFilter = dataStore((state) => state.setFilter)
	const [debInput, pending] = useDebounce(filter, 250);

	useEffect(() => {}, [debInput]);

    if (!i18nClient) return null;

	return (
		<section className={`${FilterComponentStyles.filter__component__container} p-inputgroup`}>
			<span className="p-inputgroup-addon">
				<i className={pending ? "pi pi-spin pi-spinner-dotted" : "pi pi-filter"} />
			</span>
			<InputText placeholder={t("filter")} onInput={(e) => setFilter(e.target.value)} />
		</section>
	);
};

export default FilterComponent;
