"use client"

import { useEffect, useState } from "react";
import { sidebarStore } from "../store/sidebarStore";
import { useRouter } from "next/navigation";

const SidebarExpandButton = () => {
	const expanded: boolean = sidebarStore((state) => state.expanded);
	const {toggleExpanded} = sidebarStore.getState();
	const [label, setLabel] = useState<string>(">")
	const router = useRouter()

	useEffect(() => {
		if (expanded) {
			setLabel(">")
		} else {
			setLabel("<")
		}
		router.refresh()

	}, [label])

	return <button onClick={() => void toggleExpanded()} type="button">{label}</button>;
};

export default SidebarExpandButton;
