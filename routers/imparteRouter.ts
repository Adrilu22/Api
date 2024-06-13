import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparte';
import { Imparte } from '../models/imparte';

const imparteRouter = express.Router();

// Ruta para crear una nueva relación 'Imparte'
imparteRouter.post('http://127.0.0.1:3000/api/imparte/', (req: Request, res: Response) => {
    const nuevaImparte: Imparte = req.body;

    imparteController.create(nuevaImparte, (err: Error | null, imparteId?: number) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: imparteId });
    });
});

// Ruta para obtener una relación 'Imparte' por su ID de profesor, código de asignatura y grupo
imparteRouter.get('/:id_p/:cod_a/:grupo', (req: Request, res: Response) => {
    const id_p: number = parseInt(req.params.id_p);
    const cod_a: number = parseInt(req.params.cod_a);
    const grupo: number = parseInt(req.params.grupo);

    imparteController.getById(id_p, cod_a, grupo, (err: Error | null, imparte?: Imparte) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!imparte) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }
        res.status(200).json(imparte);
    });
});

imparteRouter.put('/:id_p/:cod_a/:grupo', (req: Request, res: Response) => {
    const id_p: number = parseInt(req.params.id_p);
    const cod_a: number = parseInt(req.params.cod_a);
    const grupo: number = parseInt(req.params.grupo);
    const updatedImparte: Imparte = req.body;

    imparteController.update(id_p, cod_a, grupo, updatedImparte, (err: Error | null) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Relación actualizada correctamente' });
    });
});

// Ruta para eliminar una relación 'Imparte' por su ID de profesor, código de asignatura y grupo
imparteRouter.delete('/:id_p/:cod_a/:grupo', (req: Request, res: Response) => {
    const id_p: number = parseInt(req.params.id_p);
    const cod_a: number = parseInt(req.params.cod_a);
    const grupo: number = parseInt(req.params.grupo);

    imparteController.remove(id_p, cod_a, grupo, (err: Error | null) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Relación eliminada correctamente' });
    });
});

// Ruta para listar todas las relaciones 'Imparte'
imparteRouter.get('/', (req: Request, res: Response) => {
    imparteController.getAll((err: Error | null, impartes?: Imparte[]) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(impartes);
    });
});

export { imparteRouter };