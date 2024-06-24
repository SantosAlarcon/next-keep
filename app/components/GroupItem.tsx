import React from "react";
import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import NoteList from "./NoteList";

const GroupItem = ({ title, amount }: { title: string; amount: number }) => {
	console.log(title);
	return (
		<li className={GroupItemStyles.group__item__container}>
			<div className={GroupItemStyles.group__item__group}>
				<span className={GroupItemStyles.group__item__title}>{title}</span>
				{amount > 0 && <span className={GroupItemStyles.group__item__amount}>{amount}</span>}
			</div>
			{amount > 0 && <NoteList group={title} />}
		</li>
	);
};

export default GroupItem;
