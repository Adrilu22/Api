"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.remove = exports.update = exports.getById = exports.create = void 0;
const db_1 = require("../db");
// Función para crear una asignatura
const create = (asignatura, callback) => {
    const queryString = 'INSERT INTO Asignaturas (cod_a, nom_a, ih, cred) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.ih, asignatura.cred], (err, result) => {
        if (err) {
            return callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
// Función para obtener una asignatura por su ID
const getById = (asignaturaId, callback) => {
    const queryString = 'SELECT * FROM Asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, [asignaturaId], (err, results) => {
        if (err) {
            return callback(err);
        }
        const asignaturaData = results;
        if (asignaturaData.length === 0) {
            return callback(null, undefined);
        }
        const asignatura = {
            cod_a: asignaturaData[0].cod_a,
            nom_a: asignaturaData[0].nom_a,
            ih: asignaturaData[0].ih,
            cred: asignaturaData[0].cred
        };
        callback(null, asignatura);
    });
};
exports.getById = getById;
// Función para actualizar una asignatura por su ID
const update = (asignaturaId, asignatura, callback) => {
    const queryString = 'UPDATE Asignaturas SET nom_a = ?, ih = ?, cred = ? WHERE cod_a = ?';
    db_1.db.query(queryString, [asignatura.nom_a, asignatura.ih, asignatura.cred, asignaturaId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
exports.update = update;
// Función para eliminar una asignatura por su ID
const remove = (asignaturaId, callback) => {
    const queryString = 'DELETE FROM Asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, [asignaturaId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
exports.remove = remove;
//Funcion para listar todas las asignaturas //
const getAll = (callback) => {
    const queryString = 'SELECT * FROM Asignaturas';
    db_1.db.query(queryString, (err, results) => {
        if (err) {
            return callback(err);
        }
        // No transformamos los datos, simplemente los devolvemos como están
        const estudiantes = results;
        callback(null, results);
    });
};
exports.getAll = getAll;
