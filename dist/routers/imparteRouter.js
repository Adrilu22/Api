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
exports.imparteRouter = void 0;
;
const express_1 = __importDefault(require("express"));
const imparteController = __importStar(require("../controllers/imparte"));
const imparteRouter = express_1.default.Router();
exports.imparteRouter = imparteRouter;
// Ruta para crear una nueva relación 'Imparte'
imparteRouter.post('/', (req, res) => {
    const nuevaImparte = req.body;
    imparteController.create(nuevaImparte, (err, imparteId) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: imparteId });
    });
});
// Ruta para obtener una relación 'Imparte' por su ID de profesor, código de asignatura y grupo
imparteRouter.get('/:id_p/:cod_a/:grupo', (req, res) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    imparteController.getById(id_p, cod_a, grupo, (err, imparte) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!imparte) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }
        res.status(200).json(imparte);
    });
});
imparteRouter.put('/:id_p/:cod_a/:grupo', (req, res) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    const updatedImparte = req.body;
    imparteController.update(id_p, cod_a, grupo, updatedImparte, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Relación actualizada correctamente' });
    });
});
// Ruta para eliminar una relación 'Imparte' por su ID de profesor, código de asignatura y grupo
imparteRouter.delete('/:id_p/:cod_a/:grupo', (req, res) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    imparteController.remove(id_p, cod_a, grupo, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Relación eliminada correctamente' });
    });
});
// Ruta para listar todas las relaciones 'Imparte'
imparteRouter.get('/', (req, res) => {
    imparteController.getAll((err, impartes) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(impartes);
    });
});
