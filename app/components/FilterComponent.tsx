"use client";

import { InputText } from "primereact/inputtext";
import FilterComponentStyles from "@/styles/FilterComponent.module.css";
import { useEffect, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import { dataStore } from "../store/dataStore";
import { useTranslation } from "react-i18next";

const FilterComponent = ({ lang }: { lang: string }) => {
    const {t} = useTranslation("common", {lng: lang})
	// @ts-ignore
	const setFilter = dataStore((state) => state.setFilter)
	const [input, setInput] = useState<string>("");
	const [debInput, pending] = useDebounce(input, 250);

	useEffect(() => { setFilter(debInput) }, [debInput]);

	return (
		<section className={`${FilterComponentStyles.filter__component__container} p-inputgroup`}>
			<span className="p-inputgroup-addon">
				<i className={pending ? "pi pi-spin pi-spinner-dotted" : "pi pi-filter"} />
			</span>
			{/* @ts-ignore */}
			<InputText className={FilterComponentStyles.filter__component__input} placeholder={t("filter")} onInput={(e) => setInput(e.target.value)} />
		</section>
	);
};

export default FilterComponent;
