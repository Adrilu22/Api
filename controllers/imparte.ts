import { Imparte } from '../models/imparte';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';



// Función para crear una relación 'Imparte'
export const create = (imparte: Imparte, callback: (err: Error | null, imparteId?: number) => void) => {
    if (imparte.grupo >= 0) {
        return callback(new Error('El valor de grupo debe ser mayor que 0.'));
    }

    const queryString = 'INSERT INTO Imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err, result) => {
        if (err) {
            return callback(err);
        }
        const insertId = (<OkPacket>result).insertId;
        callback(null, insertId);
    });
};

// Función para obtener una relación 'Imparte' por su ID de profesor y código de asignatura
export const getById = (id_p: number, cod_a: number, grupo: number, callback: (err: Error | null, imparte?: Imparte) => void) => {
    if (grupo <= 0) {
        return callback(new Error('El valor de grupo debe ser mayor que 0.'));
    }

    const queryString = 'SELECT * FROM Imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    db.query(queryString, [id_p, cod_a, grupo], (err, results) => {
        if (err) {
            return callback(err);
        }

        const imparteData = <RowDataPacket[]>results;
        if (imparteData.length === 0) {
            return callback(null, undefined);
        }

        const imparte: Imparte = {
            id_p: imparteData[0].id_p,
            cod_a: imparteData[0].cod_a,
            grupo: imparteData[0].grupo,
            horario: imparteData[0].horario
        };

        callback(null, imparte);
    });
};

// Función para actualizar una relación 'Imparte' por su ID de profesor y código de asignatura
export const update = (id_p: number, cod_a: number, grupo: number, imparte: Imparte, callback: (err: Error | null) => void) => {
    if (grupo <= 0) {
        return callback(new Error('El valor de grupo debe ser mayor que 0.'));
    }

    const queryString = 'UPDATE Imparte SET horario = ? WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    db.query(queryString, [imparte.horario, id_p, cod_a, grupo], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null);
    });
};

// Función para eliminar una relación 'Imparte' por su ID de profesor y código de asignatura
export const remove = (id_p: number, cod_a: number, grupo: number, callback: (err: Error | null) => void) => {
    if (grupo <= 0) {
        return callback(new Error('El valor de grupo debe ser mayor que 0.'));
    }

    const queryString = 'DELETE FROM Imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    db.query(queryString, [id_p, cod_a, grupo], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null);
    });
};

// Función para listar todas las relaciones 'Imparte'
export const getAll = (callback: (err: Error | null, impartes?: Imparte[]) => void) => {
    const queryString = 'SELECT * FROM Imparte';
    db.query(queryString, (err, results) => {
        if (err) {
            return callback(err);
        }
        const impartes = <RowDataPacket[]>results;
        callback(null, impartes as Imparte[]);
    });
};
