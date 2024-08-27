"use client";

import MobileHeaderStyles from "@/styles/MobileHeader.module.css"
import { Button } from "primereact/button";
import SidebarDrawerClient from "../SidebarDrawerClient";
import { useState } from "react";

const MobileHeader = ({lang}:{lang: string}) => {
    const [visible, setVisible] = useState<boolean>(false);

	return (
        <section className={MobileHeaderStyles.mobile__header__container}>
            <SidebarDrawerClient params={{lang: lang}} visible={visible} onHide={() => setVisible(false)} />
            <Button onClick={() => setVisible(true)} className={MobileHeaderStyles.mobile__header__button} icon="pi pi-bars" />
        </section>
    )
};

export default MobileHeader;
