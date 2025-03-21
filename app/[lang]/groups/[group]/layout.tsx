import groupPageStyles from "@/app/styles/groupPage.module.css";
import { getGroupById } from "@/app/utils/groups/getGroupById";
import type { ReactNode } from "react";

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }) {
	const { group } = await params;
    const foundGroup = await getGroupById(group)

    return {
        title: `${foundGroup?.title}`,
    };
}

const GroupLayout = ({ children }: { children: ReactNode }) => {

    return (
            <div className={groupPageStyles.group__page__container}>{children}</div>
    )
};

export default GroupLayout;
