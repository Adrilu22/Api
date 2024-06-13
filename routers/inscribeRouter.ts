import express, { Request, Response } from 'express';
import * as inscribeController from '../controllers/inscribe';
import { Inscribe } from '../models/inscribe';

const inscribeRouter = express.Router();

// Ruta para crear una nueva inscripción
inscribeRouter.post('/', (req: Request, res: Response) => {
    const nuevaInscribe: Inscribe = req.body;

    // Validación de la nueva inscripción antes de intentar crearla
    if (!nuevaInscribe.cod_e || !nuevaInscribe.id_p || !nuevaInscribe.cod_a || nuevaInscribe.grupo <= 0) {
        return res.status(400).json({ message: 'Datos de inscripción inválidos' });
    }

    inscribeController.create(nuevaInscribe, (err: Error | null, inscribeId?: number) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: inscribeId });
    });
});

// Ruta para obtener una inscripción por sus IDs y grupo
inscribeRouter.get('/:cod_e/:id_p/:cod_a/:grupo', (req: Request, res: Response) => {
    // ... (mantener el código existente aquí)
});

// Ruta para actualizar una inscripción por sus IDs y grupo
inscribeRouter.put('/:cod_e/:id_p/:cod_a/:grupo', (req: Request, res: Response) => {
    // ... (mantener el código existente aquí)
});

// Ruta para eliminar una inscripción por sus IDs y grupo
inscribeRouter.delete('/:cod_e/:id_p/:cod_a/:grupo', (req: Request, res: Response) => {
    // ... (mantener el código existente aquí)
});

// Ruta para listar todas las inscripciones
inscribeRouter.get('/', (req: Request, res: Response) => {
    // ... (mantener el código existente aquí)
});

export { inscribeRouter };
