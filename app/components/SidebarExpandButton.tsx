"use client"

import { useEffect, useState } from "react";
import { sidebarStore } from "../store/sidebarStore";
import { useRouter } from "next/navigation";

const SidebarExpandButton = () => {
	const expanded: boolean = sidebarStore.getState().expanded;
	const {toggleExpanded} = sidebarStore.getState();
	const [label, setLabel] = useState<string>("Expanded")
	const router = useRouter()

	useEffect(() => {
		if (expanded) {
			setLabel("Expanded")
		} else {
			setLabel("Not expanded")
		}
		router.refresh()

	}, [label])

	return <button onClick={() => void toggleExpanded()} type="button">{label}</button>;
};

export default SidebarExpandButton;
