"use client";

import { useRouter } from "next/navigation";
import sidebarStyles from "@/app/styles/sidebar.module.css";
import NewNoteIcon from "../icons/NewNoteIcon";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import { motion } from "framer-motion";

const NewNoteButton = ({ title, expanded }: { title: string; expanded: boolean }) => {
	const reset = useNewNoteStore.getState().reset;
	reset();

	const router = useRouter();
	const createNewNote = () => {
		router.push("/notes/new");
	};

	const variants = {
		expanded: {
			opacity: 1,
			display: "block"
		},
		collapsed: {
			display: "none",
			opacity: 0,
			transition: {
			    staggerChildren: 0.2,
			    staggerDirection: -1,
			    when: "afterChildren"
			}
		}
	}

	return (
		<button data-title={title} className={sidebarStyles.sidebar__button} onClick={createNewNote} type="button">
			<NewNoteIcon />
			<motion.span variants={variants} initial={expanded ? "collapsed" : "expanded"} exit={expanded ? "collapsed" : "expanded"} animate={expanded ? "expanded" : "collapsed"}>{title}</motion.span>
		</button>
	);
};

export default NewNoteButton;
