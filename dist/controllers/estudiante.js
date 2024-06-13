"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.remove = exports.update = exports.getById = exports.create = void 0;
const db_1 = require("../db");
// Función para crear  un estudiante
const create = (estudiante, callback) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], (err, result) => {
        if (err) {
            return callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
// Función para obtener un estudiante por su ID
const getById = (estudId, callback) => {
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';
    db_1.db.query(queryString, [estudId], (err, results) => {
        if (err) {
            return callback(err);
        }
        const estudianteData = results;
        if (estudianteData.length === 0) {
            return callback(null, undefined);
        }
        const estudiante = {
            cod_e: estudianteData[0].cod_e,
            nom_e: estudianteData[0].nom_e,
            dir_e: estudianteData[0].dir_e,
            tel_e: estudianteData[0].tel_e,
            fech_nac: estudianteData[0].fech_nac
        };
        callback(null, estudiante);
    });
};
exports.getById = getById;
// Función para actualizar un estudiante por su ID
const update = (estudId, estudiante, callback) => {
    const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
    db_1.db.query(queryString, [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
exports.update = update;
// Función para eliminar un estudiante por su ID
const remove = (estudId, callback) => {
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';
    db_1.db.query(queryString, [estudId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
exports.remove = remove;
//Funcion para listar todos los estudiantes //
const getAll = (callback) => {
    const queryString = 'SELECT * FROM Estudiantes';
    db_1.db.query(queryString, (err, results) => {
        if (err) {
            return callback(err);
        }
        // No transformamos los datos, simplemente los devolvemos como están
        const estudiantes = results;
        callback(null, estudiantes);
    });
};
exports.getAll = getAll;
