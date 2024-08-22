"use client"

import { Button } from 'primereact/button'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'

const TestButton = () => {
    // @ts-ignore
	const handlePopup = (event) => {
		confirmPopup({
			target: event.currentTarget,
			message: "¡Comeme el miembro! ¡Es una órden!",
			icon: "pi pi-info-circle",
			acceptLabel: "Sí",
			rejectLabel: "No",
			accept: () => {
				console.log("Accept")
			},
			reject: () => {
				console.log("Reject")
			},
		})
	}


	return (
	<>
	    <ConfirmPopup />
	    <Button label="Comeme el miembro" onClick={(e) => handlePopup(e)} />
	</>
	)
}

export default TestButton
