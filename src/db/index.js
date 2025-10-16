import * as SQLite from 'expo-sqlite';

let db;

export const initDb = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('flyke.db');
    }
};

export const initSessionsTable = async () => {
    console.log("Iniciando tabla de sesiones");
    await initDb();
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            localId TEXT NOT NULL,
            email TEXT NOT NULL,
            token TEXT NOT NULL,
            userName TEXT,
            lastname TEXT,
            profileImage TEXT 
        )
    `);
};

export const saveSession = async ({ localId, email, token, userName, lastname, profileImage }) => {
    await initDb();
    // Borra cualquier sesión anterior para asegurar que solo haya una activa
    await db.runAsync('DELETE FROM sessions;');
    await db.runAsync(
        'INSERT INTO sessions (localId, email, token, userName, lastname, profileImage) VALUES (?, ?, ?, ?, ?, ?);',
        [localId, email, token, userName, lastname, profileImage]
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

export const updateProfileImage = async (localId, imageUri) => {
    await initDb();
    const result = await db.runAsync('UPDATE sessions SET profileImage = ? WHERE localId = ?;', [imageUri, localId]);
    
    if (result.changes === 0) {
        throw new Error("No se encontró al usuario en la base de datos para actualizar la imagen.");
    }
    
    console.log("Base de datos actualizada con éxito:", result);
    return result;
};