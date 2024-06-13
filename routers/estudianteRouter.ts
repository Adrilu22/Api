import express, { Request, Response } from 'express';
import * as estudiantesController from '../controllers/estudiante';
import { Estudiante } from '../models/estudiantes';

const estudiantesRouter = express.Router();

estudiantesRouter.post('/', (req: Request, res: Response) => {
  const newEstudiante: Estudiante = req.body;

  estudiantesController.create(newEstudiante, (err: Error | null, estudId?: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ estudId });
  });
});



// Ruta para obtener un estudiante por su ID
estudiantesRouter.get('/:id', (req: Request, res: Response) => {
  const estudId: number = parseInt(req.params.id);

  estudiantesController.getById(estudId, (err: Error | null, estudiante?: Estudiante) => {
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
estudiantesRouter.put('/:id', (req: Request, res: Response) => {
  const estudId: number = parseInt(req.params.id);
  const updatedEstudiante: Estudiante = req.body;

  estudiantesController.update(estudId, updatedEstudiante, (err: Error | null) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Estudiante actualizado correctamente' });
  });
});

// Ruta para eliminar un estudiante por su ID
estudiantesRouter.delete('/:id', (req: Request, res: Response) => {
  const estudId: number = parseInt(req.params.id);

  estudiantesController.remove(estudId, (err: Error | null) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Estudiante eliminado correctamente' });
  });
});
// funcion para listar todos los estudiantes
estudiantesRouter.get('/', (req: Request, res: Response) => {
  estudiantesController.getAll((err: Error | null, estudiantes?: Estudiante[]) => {
      if (err) {
          return res.status(500).json({ message: err.message });
      }
      res.status(200).json(estudiantes);
  });
});



export { estudiantesRouter };

