import { Estudiante } from '../models/estudiantes';
import { db } from '../db';
import { OkPacket, RowDataPacket,ResultSetHeader } from 'mysql2';


// Función para crear  un estudiante
export const create = (estudiante: Estudiante, callback: (err: Error | null, estudId?: number) => void) => {
  const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
  
  db.query(
    queryString,
    [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

// Función para obtener un estudiante por su ID
export const getById = (estudId: number, callback: (err: Error | null, estudiante?: Estudiante) => void) => {
  const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';

  db.query(
      queryString,
      [estudId],
      (err, results) => {
          if (err) {
              return callback(err);
          }

          const estudianteData = <RowDataPacket[]>results;
          if (estudianteData.length === 0) {
              return callback(null, undefined);
          }

          const estudiante: Estudiante = {
              cod_e: estudianteData[0].cod_e,
              nom_e: estudianteData[0].nom_e,
              dir_e: estudianteData[0].dir_e,
              tel_e: estudianteData[0].tel_e,
              fech_nac: estudianteData[0].fech_nac
          };

          callback(null, estudiante);
      }
  );
};

// Función para actualizar un estudiante por su ID
export const update = (estudId: number, estudiante: Estudiante, callback: (err: Error | null) => void) => {
  const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';

  db.query(
      queryString,
      [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudId],
      (err, result) => {
          if (err) {
              return callback(err);
          }

          callback(null);
      }
  );
};

// Función para eliminar un estudiante por su ID
export const remove = (estudId: number, callback: (err: Error | null) => void) => {
  const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';

  db.query(
      queryString,
      [estudId],
      (err, result) => {
          if (err) {
              return callback(err);
          }

          callback(null);
      }
  );
};
//Funcion para listar todos los estudiantes //

export const getAll = (callback: (err: Error | null, estudiantes?: Estudiante[]) => void) => {
  const queryString = 'SELECT * FROM Estudiantes';

  db.query(queryString, (err, results) => {
      if (err) {
          return callback(err);
      }

      // No transformamos los datos, simplemente los devolvemos como están
     const estudiantes = <RowDataPacket[]>results;
      callback(null, estudiantes as Estudiante[]);
  });
};