import groups from "@/data/groups.json";
import styles from "../styles/sidebar.module.css"
import Image from "next/image";
import GroupItem from "./GroupItem";
import { getNotesByGroup } from "../utils/getNotesByGroup";
import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className={styles.sidebar__container}>
	    <Link href="/" prefetch>
		<Image src="/NextKeep.svg" alt="Next Keep logo" width="250" height="150" priority />
	    </Link>
            <ul className={styles.sidebar__grouplist}>
                {
                    groups.map((group: string) => (
                        <GroupItem key={group} title={group} amount={getNotesByGroup(group).length} />
                    ))
                }
            </ul>
        </aside>
    );
};

export default Sidebar;
