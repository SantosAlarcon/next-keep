import { EllipsisV } from "@primeicons/react/ellipsis-v";
import {Trash as Delete} from "@primeicons/react/trash"
import { Sidebar } from "@primereact/ui/sidebar";
import Image from "next/image";
import { useRef } from "react";
import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import type { ContextMenuItem } from "../types";
import CustomMenu from "./ui/CustomMenu";

const groupContext: ContextMenuItem[] = [
    {
        icon: <Delete />,
        label: "Delete",
        command: () => console.log("Holi")
    }
]

const GroupItem = ({
    id,
    title,
    amount,
    expanded,
    onContextMenu,
}: {
    id: string;
    title: string;
    amount: number;
    expanded: boolean;
    onContextMenu: () => void;
}) => {

    const itemRef = useRef<unknown>(null);

    return (
        <Sidebar.MenuItem key={id} ref={itemRef}>
            <Sidebar.MenuButton>
                <Image
                    className={GroupItemStyles.group__item__icon}
                    src="/group.svg"
                    width="20"
                    height="20"
                    alt="Group icon"
                />
                {expanded ? (
                    <span className={GroupItemStyles.group__item__title}>{title}</span>
                ) : null}
            </Sidebar.MenuButton>
            <CustomMenu model={groupContext} />
        </Sidebar.MenuItem>
        // <li
        // 	onContextMenu={onContextMenu}
        // 	data-title={expanded ? null : title}
        // 	data-tooltip-align={expanded ? null : "right"}
        // 	className={GroupItemStyles.group__item__container}
        // >
        // 	<ActiveLink href={`/groups/${id}`} title={title}>
        // 		<div
        // 			className={
        // 				expanded
        // 					? GroupItemStyles.group__item__group
        // 					: GroupItemStyles.group__item__group__collapsed
        // 			}
        // 		>
        // 			<div className={GroupItemStyles.group__item__left}>
        // 				<Image
        // 					className={GroupItemStyles.group__item__icon}
        // 					src="/group.svg"
        // 					width="20"
        // 					height="20"
        // 					alt="Group icon"
        // 				/>
        // 				{expanded ? (
        // 					<span className={GroupItemStyles.group__item__title}>
        // 						{title}
        // 					</span>
        // 				) : null}
        // 			</div>
        // 			{amount > 0 && expanded && (
        // 				<span className={GroupItemStyles.group__item__amount}>
        // 					{amount}
        // 				</span>
        // 			)}
        // 		</div>
        // 	</ActiveLink>
        // </li>
    );
};

export default GroupItem;
