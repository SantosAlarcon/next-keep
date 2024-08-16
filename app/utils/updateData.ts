"use client"

import { dataStore } from "../store/dataStore"
import { getAllGroups } from "./groups/getAllGroups"

export const updateGroups = () => {
	// @ts-ignore
	const { setAllGroups } = dataStore.getState()
	console.log(setAllGroups)
	getAllGroups().then((data) => setAllGroups(data))
}
