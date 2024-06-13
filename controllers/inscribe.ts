import { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '../db';
import { Inscribe } from '../models/inscribe';

// Función para crear una inscripción
export const create = (inscribe: Inscribe, callback: (err: Error | null, inscribeId?: number) => void) => {
    const queryVerify = 'SELECT * FROM Imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    db.query(queryVerify, [inscribe.id_p, inscribe.cod_a, inscribe.grupo], (err, results) => {
        if (err) {
            return callback(err);
        }
        
        // Verifica si existen registros en Imparte que coincidan
        if ((<RowDataPacket[]>results).length === 0) {
            return callback(new Error("Foreign key constraint fails. The provided (id_p, cod_a, grupo) does not exist in Imparte."));
        }

        // Inserta la nueva inscripción
        const queryString = 'INSERT INTO Inscribe (cod_e, id_p, cod_a, grupo, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(queryString, [inscribe.cod_e, inscribe.id_p, inscribe.cod_a, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3], (err, result) => {
            if (err) {
                return callback(err);
            }
            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        });
    });
};

