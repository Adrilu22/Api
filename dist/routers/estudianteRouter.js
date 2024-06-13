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
exports.estudiantesRouter = void 0;
const express_1 = __importDefault(require("express"));
const estudiantesController = __importStar(require("../controllers/estudiante"));
const estudiantesRouter = express_1.default.Router();
exports.estudiantesRouter = estudiantesRouter;
estudiantesRouter.post('/', (req, res) => {
    const newEstudiante = req.body;
    estudiantesController.create(newEstudiante, (err, estudId) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ estudId });
    });
});
// Ruta para obtener un estudiante por su ID
estudiantesRouter.get('/:id', (req, res) => {
    const estudId = parseInt(req.params.id);
    estudiantesController.getById(estudId, (err, estudiante) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(estudiante);
    });
});
// Ruta para actualizar un estudiante por su ID
estudiantesRouter.put('/:id', (req, res) => {
    const estudId = parseInt(req.params.id);
    const updatedEstudiante = req.body;
    estudiantesController.update(estudId, updatedEstudiante, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Estudiante actualizado correctamente' });
    });
});
// Ruta para eliminar un estudiante por su ID
estudiantesRouter.delete('/:id', (req, res) => {
    const estudId = parseInt(req.params.id);
    estudiantesController.remove(estudId, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    });
});
// funcion para listar todos los estudiantes
estudiantesRouter.get('/', (req, res) => {
    estudiantesController.getAll((err, estudiantes) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(estudiantes);
    });
});
