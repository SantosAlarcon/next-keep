import groups from "@/data/groups.json"

export const getGroupById = (id: string) => {
    return groups.filter((group) => group.id === id)
}
