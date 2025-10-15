import * as SQLite from 'expo-sqlite';

let db;

export const initDb = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('mundogeek.db');
    }
};

export const initSessionsTable = async () => {
    console.log("Iniciando tabla de sesiones");
    await initDb();
    // Durante el desarrollo, eliminamos la tabla para asegurar que los cambios de esquema se apliquen
    await db.execAsync('DROP TABLE IF EXISTS sessions'); 
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            localId TEXT NOT NULL,
            email TEXT NOT NULL,
            token TEXT NOT NULL
        )
    `);
};

export const saveSession = async ({ localId, email, token }) => {
    await initDb();
    // Borra cualquier sesión anterior para asegurar que solo haya una activa
    await db.runAsync('DELETE FROM sessions;');
    await db.runAsync(
        'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
        [localId, email, token]
    );
};

export const getSession = async () => {
    await initDb();
    const result = await db.getAllAsync('SELECT * FROM sessions LIMIT 1;');
    console.log("Obteniendo datos de DB", result);
    return result.length > 0 ? result[0] : null;
};

export const clearSession = async () => {
    await initDb();
    await db.runAsync('DELETE FROM sessions');
};
