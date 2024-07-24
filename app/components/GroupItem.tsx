import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import ActiveLink from "./ui/ActiveLink"
import { getNotesByGroup } from "../utils/database/notes/getNotesByGroup";

const GroupItem = async ({ id, title}: { id: string, title: string; }) => {
	const groupNotes = await getNotesByGroup(id);
	const amount = groupNotes ? groupNotes.length : 0;
	return (
		<li className={GroupItemStyles.group__item__container}>
			<ActiveLink href={`/groups/${id}`}>
				<div className={GroupItemStyles.group__item__group}>
					<span className={GroupItemStyles.group__item__title}>{title}</span>
					{amount > 0 && <span className={GroupItemStyles.group__item__amount}>{amount}</span>}
				</div>
			</ActiveLink>
		</li>
	);
};

export default GroupItem;
