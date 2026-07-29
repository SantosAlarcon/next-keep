"use client";

import { Button } from "@primereact/ui/button";
import { useState } from "react";
import MobileHeaderStyles from "@/styles/MobileHeader.module.css";
import SidebarDrawerClient from "../SidebarDrawerClient";

const MobileHeader = ({ lang }: { lang: string }) => {
	const [visible, setVisible] = useState<boolean>(false);

	return (
		<section className={MobileHeaderStyles.mobile__header__container}>
			<SidebarDrawerClient
				params={{ lang: lang }}
				visible={visible}
				onHide={() => setVisible(false)}
			/>
			<Button
				aria-label="Mobile menu"
				onClick={() => setVisible(true)}
				className={MobileHeaderStyles.mobile__header__button}
				icon="pi pi-bars"
			/>
		</section>
	);
};

export default MobileHeader;
