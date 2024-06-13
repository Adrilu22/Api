import express, { Request, Response } from 'express';
import * as asignaturaController from '../controllers/asignatura';
import { Asignatura } from '../models/asignatura';

const asignaturaRouter = express.Router();

// Ruta para crear una nueva asignatura
asignaturaRouter.post('/', (req: Request, res: Response) => {
    const nuevaAsignatura: Asignatura = req.body;

    asignaturaController.create(nuevaAsignatura, (err: Error | null, asignaturaId?: number) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: asignaturaId });
    });
});

// Ruta para obtener una asignatura por su ID
asignaturaRouter.get('/:id', (req: Request, res: Response) => {
    const asignaturaId: number = parseInt(req.params.id);

    asignaturaController.getById(asignaturaId, (err: Error | null, asignatura?: Asignatura) => {
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
asignaturaRouter.put('/:id', (req: Request, res: Response) => {
    const asignaturaId: number = parseInt(req.params.id);
    const updatedAsignatura: Asignatura = req.body;

    asignaturaController.update(asignaturaId, updatedAsignatura, (err: Error | null) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Asignatura actualizada correctamente' });
    });
});

// Ruta para eliminar una asignatura por su ID
asignaturaRouter.delete('/:id', (req: Request, res: Response) => {
    const asignaturaId: number = parseInt(req.params.id);

    asignaturaController.remove(asignaturaId, (err: Error | null) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Asignatura eliminada correctamente' });
    });
});

// funcion para listar todas las asignaturas
asignaturaRouter.get('/', (req: Request, res: Response) => {
    asignaturaController.getAll((err: Error | null, asignaturas?: Asignatura[]) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(asignaturas);
    });
  });
  
export { asignaturaRouter };
