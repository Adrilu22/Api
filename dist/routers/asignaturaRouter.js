"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignaturaRouter = void 0;
const express_1 = __importDefault(require("express"));
const asignaturaController = __importStar(require("../controllers/asignatura"));
const asignaturaRouter = express_1.default.Router();
exports.asignaturaRouter = asignaturaRouter;
// Ruta para crear una nueva asignatura
asignaturaRouter.post('/', (req, res) => {
    const nuevaAsignatura = req.body;
    asignaturaController.create(nuevaAsignatura, (err, asignaturaId) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: asignaturaId });
    });
});
// Ruta para obtener una asignatura por su ID
asignaturaRouter.get('/:id', (req, res) => {
    const asignaturaId = parseInt(req.params.id);
    asignaturaController.getById(asignaturaId, (err, asignatura) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!asignatura) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.status(200).json(asignatura);
    });
});
// Ruta para actualizar una asignatura por su ID
asignaturaRouter.put('/:id', (req, res) => {
    const asignaturaId = parseInt(req.params.id);
    const updatedAsignatura = req.body;
    asignaturaController.update(asignaturaId, updatedAsignatura, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Asignatura actualizada correctamente' });
    });
});
// Ruta para eliminar una asignatura por su ID
asignaturaRouter.delete('/:id', (req, res) => {
    const asignaturaId = parseInt(req.params.id);
    asignaturaController.remove(asignaturaId, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Asignatura eliminada correctamente' });
    });
});
// funcion para listar todas las asignaturas
asignaturaRouter.get('/', (req, res) => {
    asignaturaController.getAll((err, asignaturas) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(asignaturas);
    });
});
