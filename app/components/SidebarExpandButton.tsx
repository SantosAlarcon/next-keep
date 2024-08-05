"use client"

import { useEffect, useState } from "react";
import { sidebarStore } from "../store/sidebarStore";

const SidebarExpandButton = () => {
	const expanded: boolean = sidebarStore.getState().expanded;
	const toggleExpanded: () => void = sidebarStore.getState().toggleExpanded;
    const [label, setLabel] = useState<string>("Expanded")

    useEffect(() => {
        if (expanded) {
           setLabel("Expanded") 
        } else {
            setLabel("Not expanded")
        }
    }, [expanded])

	return <button onClick={() => toggleExpanded()} type="button">{label}</button>;
};

export default SidebarExpandButton;
