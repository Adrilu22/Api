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
exports.inscribeRouter = void 0;
const express_1 = __importDefault(require("express"));
const inscribeController = __importStar(require("../controllers/inscribe"));
const inscribeRouter = express_1.default.Router();
exports.inscribeRouter = inscribeRouter;
// Ruta para crear una nueva inscripción
inscribeRouter.post('/', (req, res) => {
    const nuevaInscribe = req.body;
    // Validación de la nueva inscripción antes de intentar crearla
    if (!nuevaInscribe.cod_e || !nuevaInscribe.id_p || !nuevaInscribe.cod_a || nuevaInscribe.grupo <= 0) {
        return res.status(400).json({ message: 'Datos de inscripción inválidos' });
    }
    inscribeController.create(nuevaInscribe, (err, inscribeId) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: inscribeId });
    });
});
// Ruta para obtener una inscripción por sus IDs y grupo
inscribeRouter.get('/:cod_e/:id_p/:cod_a/:grupo', (req, res) => {
    // ... (mantener el código existente aquí)
});
// Ruta para actualizar una inscripción por sus IDs y grupo
inscribeRouter.put('/:cod_e/:id_p/:cod_a/:grupo', (req, res) => {
    // ... (mantener el código existente aquí)
});
// Ruta para eliminar una inscripción por sus IDs y grupo
inscribeRouter.delete('/:cod_e/:id_p/:cod_a/:grupo', (req, res) => {
    // ... (mantener el código existente aquí)
});
// Ruta para listar todas las inscripciones
inscribeRouter.get('/', (req, res) => {
    // ... (mantener el código existente aquí)
});
