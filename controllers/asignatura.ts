import { Asignatura } from '../models/asignatura';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

// Función para crear una asignatura
export const create = (asignatura: Asignatura, callback: (err: Error | null, asignaturaId?: number) => void) => {
    const queryString = 'INSERT INTO Asignaturas (cod_a, nom_a, ih, cred) VALUES (?, ?, ?, ?)';
  
    db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.ih, asignatura.cred], (err, result) => {
        if (err) {
            return callback(err);
        }
        const insertId = (<OkPacket>result).insertId;
        callback(null, insertId);
    });
};

// Función para obtener una asignatura por su ID
export const getById = (asignaturaId: number, callback: (err: Error | null, asignatura?: Asignatura) => void) => {
    const queryString = 'SELECT * FROM Asignaturas WHERE cod_a = ?';

    db.query(queryString, [asignaturaId], (err, results) => {
        if (err) {
            return callback(err);
        }

        const asignaturaData = <RowDataPacket[]>results;
        if (asignaturaData.length === 0) {
            return callback(null, undefined);
        }

        const asignatura: Asignatura = {
            cod_a: asignaturaData[0].cod_a,
            nom_a: asignaturaData[0].nom_a,
            ih: asignaturaData[0].ih,
            cred: asignaturaData[0].cred
        };

        callback(null, asignatura);
    });
};

// Función para actualizar una asignatura por su ID
export const update = (asignaturaId: number, asignatura: Asignatura, callback: (err: Error | null) => void) => {
    const queryString = 'UPDATE Asignaturas SET nom_a = ?, ih = ?, cred = ? WHERE cod_a = ?';

    db.query(queryString, [asignatura.nom_a, asignatura.ih, asignatura.cred, asignaturaId], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null);
    });
};

// Función para eliminar una asignatura por su ID
export const remove = (asignaturaId: number, callback: (err: Error | null) => void) => {
    const queryString = 'DELETE FROM Asignaturas WHERE cod_a = ?';

    db.query(queryString, [asignaturaId], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null);
    });
};

//Funcion para listar todas las asignaturas //

export const getAll = (callback: (err: Error | null, asignaturas?: Asignatura[]) => void) => {
    const queryString = 'SELECT * FROM Asignaturas';
  
    db.query(queryString, (err, results) => {
        if (err) {
            return callback(err);
        }
  
        // No transformamos los datos, simplemente los devolvemos como están
       const estudiantes = <RowDataPacket[]>results;
        callback(null, results as Asignatura[]);
    });
  };