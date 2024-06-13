"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.remove = exports.update = exports.getById = exports.create = void 0;
const db_1 = require("../db");
// Función para crear una relación 'Imparte'
const create = (imparte, callback) => {
    if (imparte.grupo <= 0) {
        return callback(new Error('El valor de grupo debe ser mayor que 0.'));
    }
    const queryString = 'INSERT INTO Imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err, result) => {
        if (err) {
            return callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
// Función para obtener una relación 'Imparte' por su ID de profesor y código de asignatura
const getById = (id_p, cod_a, grupo, callback) => {
    if (grupo <= 0) {
        return callback(new Error('El valor de grupo debe ser mayor que 0.'));
    }
    const queryString = 'SELECT * FROM Imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    db_1.db.query(queryString, [id_p, cod_a, grupo], (err, results) => {
        if (err) {
            return callback(err);
        }
        const imparteData = results;
        if (imparteData.length === 0) {
            return callback(null, undefined);
        }
        const imparte = {
            id_p: imparteData[0].id_p,
            cod_a: imparteData[0].cod_a,
            grupo: imparteData[0].grupo,
            horario: imparteData[0].horario
        };
        callback(null, imparte);
    });
};
exports.getById = getById;
// Función para actualizar una relación 'Imparte' por su ID de profesor y código de asignatura
const update = (id_p, cod_a, grupo, imparte, callback) => {
    if (grupo <= 0) {
        return callback(new Error('El valor de grupo debe ser mayor que 0.'));
    }
    const queryString = 'UPDATE Imparte SET horario = ? WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    db_1.db.query(queryString, [imparte.horario, id_p, cod_a, grupo], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
exports.update = update;
// Función para eliminar una relación 'Imparte' por su ID de profesor y código de asignatura
const remove = (id_p, cod_a, grupo, callback) => {
    if (grupo <= 0) {
        return callback(new Error('El valor de grupo debe ser mayor que 0.'));
    }
    const queryString = 'DELETE FROM Imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    db_1.db.query(queryString, [id_p, cod_a, grupo], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
exports.remove = remove;
// Función para listar todas las relaciones 'Imparte'
const getAll = (callback) => {
    const queryString = 'SELECT * FROM Imparte';
    db_1.db.query(queryString, (err, results) => {
        if (err) {
            return callback(err);
        }
        const impartes = results;
        callback(null, impartes);
    });
};
exports.getAll = getAll;
