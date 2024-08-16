import type { Group } from "@/app/types"

export const getAllGroupTitles = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups`, {cache: "no-cache"})
    const allGroups: Group[] = await response.json()
    const allGroupTitles = allGroups?.map((group: Group) => group.title)
    return allGroupTitles.sort((a, b) => a.localeCompare(b))
}
