"use client";

import { Filter } from "@primeicons/react/filter";
import { IconField } from "@primereact/ui/iconfield";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterComponentStyles from "@/styles/FilterComponent.module.css";
import useDebounce from "@/utils/hooks/useDebounce";
import { dataStore } from "../store/dataStore";

const FilterComponent = ({ lang }: { lang: string }) => {
	const [input, setInput] = useState<string>("");
	const { t } = useTranslation("common", { lng: lang });
	// @ts-ignore
	const setFilter = dataStore((state) => state.setFilter);
	const [debInput] = useDebounce(input, 250);

	useEffect(() => {
		setFilter(debInput);
	}, [debInput]);

	return (
		<section
			className={`${FilterComponentStyles.filter__component__container}`}
		>
			<IconField.Root>
				<InputText
					className={FilterComponentStyles.filter__component__input}
					placeholder={t("filter")}
					// @ts-ignore
					onInput={(e) => setInput(e.target.value)}
				/>
			</IconField.Root>
			<IconField.Inset>
				<Filter />
			</IconField.Inset>
		</section>
	);
};

export default FilterComponent;
