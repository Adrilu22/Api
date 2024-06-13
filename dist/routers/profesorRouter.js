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
exports.profesorRouter = void 0;
// profesorRouter.ts
const express_1 = __importDefault(require("express"));
const profesorController = __importStar(require("../controllers/profesor"));
const profesorRouter = express_1.default.Router();
exports.profesorRouter = profesorRouter;
// Ruta para crear un nuevo profesor
profesorRouter.post('/', (req, res) => {
    const nuevoProfesor = req.body;
    profesorController.create(nuevoProfesor, (err, profId) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: profId });
    });
});
// Ruta para obtener un profesor por su ID
profesorRouter.get('/:id', (req, res) => {
    const profId = parseInt(req.params.id);
    profesorController.getById(profId, (err, profesor) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(200).json(profesor);
    });
});
// Ruta para actualizar un profesor por su ID
profesorRouter.put('/:id', (req, res) => {
    const profId = parseInt(req.params.id);
    const updatedProfesor = req.body;
    profesorController.update(profId, updatedProfesor, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Profesor actualizado correctamente' });
    });
});
// Ruta para eliminar un profesor por su ID
profesorRouter.delete('/:id', (req, res) => {
    const profId = parseInt(req.params.id);
    profesorController.remove(profId, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Profesor eliminado correctamente' });
    });
});
// Ruta para listar todos los profesores
profesorRouter.get('/', (req, res) => {
    profesorController.getAll((err, profesores) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(profesores);
    });
});
// Ruta para listar profesores por un criterio específico (ejemplo: profesión)
profesorRouter.get('/criterio/:criterio/valor/:valor', (req, res) => {
    const criterio = req.params.criterio;
    const valor = req.params.valor;
    profesorController.getByCriteria(criterio, valor, (err, profesores) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(profesores);
    });
});
