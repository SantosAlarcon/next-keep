import sqlite3, { type Database } from "sqlite3"

// @ts-ignore
export const db: Database = new sqlite3.Database(process.env.DATABASE_URL, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
	console.error("Fallo al conectar con la BD de SQLite.")
    }

    console.log(">> Se ha conectado a la BD con éxito.")

})
