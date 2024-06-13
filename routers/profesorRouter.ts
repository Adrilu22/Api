// profesorRouter.ts
import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesor';
import { Profesor } from '../models/profesor';

const profesorRouter = express.Router();


// Ruta para crear un nuevo profesor
profesorRouter.post('/', (req: Request, res: Response) => {
    const nuevoProfesor: Profesor = req.body;

    profesorController.create(nuevoProfesor, (err: Error | null, profId?: number) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: profId });
    });
});

// Ruta para obtener un profesor por su ID
profesorRouter.get('/:id', (req: Request, res: Response) => {
    const profId: number = parseInt(req.params.id);

    profesorController.getById(profId, (err: Error | null, profesor?: Profesor) => {
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
profesorRouter.put('/:id', (req: Request, res: Response) => {
    const profId: number = parseInt(req.params.id);
    const updatedProfesor: Profesor = req.body;

    profesorController.update(profId, updatedProfesor, (err: Error | null) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Profesor actualizado correctamente' });
    });
});

// Ruta para eliminar un profesor por su ID
profesorRouter.delete('/:id', (req: Request, res: Response) => {
    const profId: number = parseInt(req.params.id);

    profesorController.remove(profId, (err: Error | null) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Profesor eliminado correctamente' });
    });
});

// Ruta para listar todos los profesores
profesorRouter.get('/', (req: Request, res: Response) => {
    profesorController.getAll((err: Error | null, profesores?: Profesor[]) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(profesores);
    });
});

// Ruta para listar profesores por un criterio específico (ejemplo: profesión)
profesorRouter.get('/criterio/:criterio/valor/:valor', (req: Request, res: Response) => {
    const criterio = req.params.criterio;
    const valor = req.params.valor;

    profesorController.getByCriteria(criterio, valor, (err: Error | null, profesores?: Profesor[]) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(profesores);
    });
});

export { profesorRouter };