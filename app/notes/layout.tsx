import React from 'react'
import "@/app/styles/globals.css"
import type { ReactNode } from 'react'

const NoteLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}

export default NoteLayout
