import { Profesor } from '../models/profesor';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

// Función para crear un profesor
export const create = (profesor: Profesor, callback: (err: Error | null, profId?: number) => void) => {
    const queryString = 'INSERT INTO Profesores (id_p, nom_p, profesion, tel_p) VALUES (?, ?, ?, ?)';
  
    db.query(queryString, [profesor.id_p, profesor.nom_p, profesor.profesion, profesor.tel_p], (err, result) => {
        if (err) {
            return callback(err);
        }
        const insertId = (<OkPacket>result).insertId;
        callback(null, insertId);
    });
};

// Función para obtener un profesor por su ID
export const getById = (profId: number, callback: (err: Error | null, profesor?: Profesor) => void) => {
    const queryString = 'SELECT * FROM Profesores WHERE id_p = ?';

    db.query(queryString, [profId], (err, results) => {
        if (err) {
            return callback(err);
        }

        const profesorData = <RowDataPacket[]>results;
        if (profesorData.length === 0) {
            return callback(null, undefined);
        }

        const profesor: Profesor = {
            id_p: profesorData[0].id_p,
            nom_p: profesorData[0].nom_p,
            profesion: profesorData[0].profesion,
            tel_p: profesorData[0].tel_p
        };

        callback(null, profesor);
    });
};

// Función para actualizar un profesor por su ID
export const update = (profId: number, profesor: Profesor, callback: (err: Error | null) => void) => {
    const queryString = 'UPDATE Profesores SET nom_p = ?, profesion = ?, tel_p = ? WHERE id_p = ?';

    db.query(queryString, [profesor.nom_p, profesor.profesion, profesor.tel_p, profId], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null);
    });
};

// Función para eliminar un profesor por su ID
export const remove = (profId: number, callback: (err: Error | null) => void) => {
    const queryString = 'DELETE FROM Profesores WHERE id_p = ?';

    db.query(queryString, [profId], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null);
    });
};

// Función para listar todos los profesores
export const getAll = (callback: (err: Error | null, profesores?: Profesor[]) => void) => {
    const queryString = 'SELECT * FROM Profesores';

    db.query(queryString, (err, results) => {
        if (err) {
            return callback(err);
        }

        const profesoresData = <RowDataPacket[]>results;
        const profesores: Profesor[] = profesoresData.map(profesorData => ({
            id_p: profesorData.id_p,
            nom_p: profesorData.nom_p,
            profesion: profesorData.profesion,
            tel_p: profesorData.tel_p
        }));

        callback(null, profesores);
    });
};

// Función para listar profesores por un criterio específico (ejemplo: profesión)
export const getByCriteria = (criterio: string, valor: string, callback: (err: Error | null, profesores?: Profesor[]) => void) => {
    const queryString = `SELECT * FROM Profesores WHERE ${criterio} = ?`;

    db.query(queryString, [valor], (err, results) => {
        if (err) {
            return callback(err);
        }

        const profesoresData = <RowDataPacket[]>results;
        const profesores: Profesor[] = profesoresData.map(profesorData => ({
            id_p: profesorData.id_p,
            nom_p: profesorData.nom_p,
            profesion: profesorData.profesion,
            tel_p: profesorData.tel_p
        }));

        callback(null, profesores);
    });
};
