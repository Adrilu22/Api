"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByCriteria = exports.getAll = exports.remove = exports.update = exports.getById = exports.create = void 0;
const db_1 = require("../db");
// Función para crear un profesor
const create = (profesor, callback) => {
    const queryString = 'INSERT INTO Profesores (id_p, nom_p, profesion, tel_p) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [profesor.id_p, profesor.nom_p, profesor.profesion, profesor.tel_p], (err, result) => {
        if (err) {
            return callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
// Función para obtener un profesor por su ID
const getById = (profId, callback) => {
    const queryString = 'SELECT * FROM Profesores WHERE id_p = ?';
    db_1.db.query(queryString, [profId], (err, results) => {
        if (err) {
            return callback(err);
        }
        const profesorData = results;
        if (profesorData.length === 0) {
            return callback(null, undefined);
        }
        const profesor = {
            id_p: profesorData[0].id_p,
            nom_p: profesorData[0].nom_p,
            profesion: profesorData[0].profesion,
            tel_p: profesorData[0].tel_p
        };
        callback(null, profesor);
    });
};
exports.getById = getById;
// Función para actualizar un profesor por su ID
const update = (profId, profesor, callback) => {
    const queryString = 'UPDATE Profesores SET nom_p = ?, profesion = ?, tel_p = ? WHERE id_p = ?';
    db_1.db.query(queryString, [profesor.nom_p, profesor.profesion, profesor.tel_p, profId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
exports.update = update;
// Función para eliminar un profesor por su ID
const remove = (profId, callback) => {
    const queryString = 'DELETE FROM Profesores WHERE id_p = ?';
    db_1.db.query(queryString, [profId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
exports.remove = remove;
// Función para listar todos los profesores
const getAll = (callback) => {
    const queryString = 'SELECT * FROM Profesores';
    db_1.db.query(queryString, (err, results) => {
        if (err) {
            return callback(err);
        }
        const profesoresData = results;
        const profesores = profesoresData.map(profesorData => ({
            id_p: profesorData.id_p,
            nom_p: profesorData.nom_p,
            profesion: profesorData.profesion,
            tel_p: profesorData.tel_p
        }));
        callback(null, profesores);
    });
};
exports.getAll = getAll;
// Función para listar profesores por un criterio específico (ejemplo: profesión)
const getByCriteria = (criterio, valor, callback) => {
    const queryString = `SELECT * FROM Profesores WHERE ${criterio} = ?`;
    db_1.db.query(queryString, [valor], (err, results) => {
        if (err) {
            return callback(err);
        }
        const profesoresData = results;
        const profesores = profesoresData.map(profesorData => ({
            id_p: profesorData.id_p,
            nom_p: profesorData.nom_p,
            profesion: profesorData.profesion,
            tel_p: profesorData.tel_p
        }));
        callback(null, profesores);
    });
};
exports.getByCriteria = getByCriteria;
