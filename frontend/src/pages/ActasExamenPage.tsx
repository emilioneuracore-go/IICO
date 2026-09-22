import { FormEvent, useState } from 'react';
import { useApi } from '../api/useApi';
import { ApiError } from '../api/client';
import { JsonPreview } from '../components/JsonPreview';

interface LibroActas {
  id: string;
  nombre: string;
  anio: number;
}

interface Acta {
  id: string;
  materiaId: string;
  alcance: string;
  tramoAnio: number | null;
  estado: string;
}

export function ActasExamenPage() {
  const api = useApi();

  const [libroForm, setLibroForm] = useState({ nombre: '', anio: '' });
  const [libroError, setLibroError] = useState<string | null>(null);
  const [libroResultado, setLibroResultado] = useState<LibroActas | null>(null);

  const [actaForm, setActaForm] = useState({
    libroActasId: '',
    materiaId: '',
    fecha: '',
    docenteIds: '',
    alumnoIds: '',
    tramoAnio: '',
  });
  const [actaError, setActaError] = useState<string | null>(null);
  const [actaResultado, setActaResultado] = useState<Acta | null>(null);

  const [calificacionForm, setCalificacionForm] = useState({ actaId: '', alumnoId: '', nota: '' });
  const [calificacionError, setCalificacionError] = useState<string | null>(null);
  const [calificacionResultado, setCalificacionResultado] = useState<unknown>(null);

  const [cierreActaId, setCierreActaId] = useState('');
  const [cierreError, setCierreError] = useState<string | null>(null);
  const [cierreResultado, setCierreResultado] = useState<Acta | null>(null);

  const [historialForm, setHistorialForm] = useState({ tipo: 'alumno', id: '' });
  const [historialError, setHistorialError] = useState<string | null>(null);
  const [historial, setHistorial] = useState<unknown[] | null>(null);

  const crearLibro = async (event: FormEvent) => {
    event.preventDefault();
    setLibroError(null);
    setLibroResultado(null);
    try {
      const creado = await api<LibroActas>('/actas-examen/libros', {
        method: 'POST',
        body: { nombre: libroForm.nombre, anio: Number(libroForm.anio) },
      });
      setLibroResultado(creado);
    } catch (error) {
      setLibroError(error instanceof ApiError ? error.message : 'No se pudo crear el libro de actas');
    }
  };

  const crearActa = async (event: FormEvent) => {
    event.preventDefault();
    setActaError(null);
    setActaResultado(null);
    try {
      const creada = await api<Acta>('/actas-examen/actas', {
        method: 'POST',
        body: {
          libroActasId: actaForm.libroActasId,
          materiaId: actaForm.materiaId,
          fecha: actaForm.fecha,
          docenteIds: actaForm.docenteIds.split(',').map((id) => id.trim()).filter(Boolean),
          alumnoIds: actaForm.alumnoIds.split(',').map((id) => id.trim()).filter(Boolean),
          tramoAnio: actaForm.tramoAnio ? Number(actaForm.tramoAnio) : undefined,
        },
      });
      setActaResultado(creada);
    } catch (error) {
      setActaError(error instanceof ApiError ? error.message : 'No se pudo crear el acta');
    }
  };

  const cargarCalificacion = async (event: FormEvent) => {
    event.preventDefault();
    setCalificacionError(null);
    setCalificacionResultado(null);
    try {
      const actualizado = await api(`/actas-examen/actas/${calificacionForm.actaId}/alumnos/${calificacionForm.alumnoId}`, {
        method: 'PATCH',
        body: { nota: Number(calificacionForm.nota) },
      });
      setCalificacionResultado(actualizado);
    } catch (error) {
      setCalificacionError(error instanceof ApiError ? error.message : 'No se pudo cargar la calificación');
    }
  };

  const cerrarActa = async (event: FormEvent) => {
    event.preventDefault();
    setCierreError(null);
    setCierreResultado(null);
    try {
      const cerrada = await api<Acta>(`/actas-examen/actas/${cierreActaId}/cerrar`, { method: 'POST' });
      setCierreResultado(cerrada);
    } catch (error) {
      setCierreError(error instanceof ApiError ? error.message : 'No se pudo cerrar el acta');
    }
  };

  const consultarHistorial = async (event: FormEvent) => {
    event.preventDefault();
    setHistorialError(null);
    setHistorial(null);
    try {
      const resultado = await api<unknown[]>(`/actas-examen/historial/${historialForm.tipo}/${historialForm.id}`);
      setHistorial(resultado);
    } catch (error) {
      setHistorialError(error instanceof ApiError ? error.message : 'No se pudo consultar el historial');
    }
  };

  return (
    <div className="page">
      <h1>Actas de examen</h1>

      <section className="card">
        <h2>1. Crear libro de actas</h2>
        <form className="form-grid" onSubmit={crearLibro}>
          <label>
            Nombre
            <input
              required
              value={libroForm.nombre}
              onChange={(e) => setLibroForm({ ...libroForm, nombre: e.target.value })}
            />
          </label>
          <label>
            Año
            <input
              required
              type="number"
              value={libroForm.anio}
              onChange={(e) => setLibroForm({ ...libroForm, anio: e.target.value })}
            />
          </label>
          <button type="submit">Crear libro</button>
        </form>
        {libroError && <p role="alert">{libroError}</p>}
        {libroResultado && <p>Libro creado con id: {libroResultado.id}</p>}
      </section>

      <section className="card">
        <h2>2. Registrar acta de examen</h2>
        <form className="form-grid" onSubmit={crearActa}>
          <label>
            Id del libro de actas
            <input
              required
              value={actaForm.libroActasId}
              onChange={(e) => setActaForm({ ...actaForm, libroActasId: e.target.value })}
            />
          </label>
          <label>
            Id de la materia
            <input
              required
              value={actaForm.materiaId}
              onChange={(e) => setActaForm({ ...actaForm, materiaId: e.target.value })}
            />
          </label>
          <label>
            Fecha
            <input
              required
              type="date"
              value={actaForm.fecha}
              onChange={(e) => setActaForm({ ...actaForm, fecha: e.target.value })}
            />
          </label>
          <label>
            Ids de docentes evaluadores (separados por coma)
            <input
              required
              value={actaForm.docenteIds}
              onChange={(e) => setActaForm({ ...actaForm, docenteIds: e.target.value })}
            />
          </label>
          <label>
            Ids de alumnos inscriptos (separados por coma)
            <input
              required
              value={actaForm.alumnoIds}
              onChange={(e) => setActaForm({ ...actaForm, alumnoIds: e.target.value })}
            />
          </label>
          <label>
            Tramo (año del ciclo, solo materias "por tramo")
            <input
              type="number"
              value={actaForm.tramoAnio}
              onChange={(e) => setActaForm({ ...actaForm, tramoAnio: e.target.value })}
            />
          </label>
          <button type="submit">Registrar acta</button>
        </form>
        {actaError && <p role="alert">{actaError}</p>}
        {actaResultado && (
          <p>
            Acta creada con id: {actaResultado.id} (alcance {actaResultado.alcance})
          </p>
        )}
      </section>

      <section className="card">
        <h2>3. Cargar calificación</h2>
        <form className="form-grid" onSubmit={cargarCalificacion}>
          <label>
            Id del acta
            <input
              required
              value={calificacionForm.actaId}
              onChange={(e) => setCalificacionForm({ ...calificacionForm, actaId: e.target.value })}
            />
          </label>
          <label>
            Id del alumno
            <input
              required
              value={calificacionForm.alumnoId}
              onChange={(e) => setCalificacionForm({ ...calificacionForm, alumnoId: e.target.value })}
            />
          </label>
          <label>
            Nota (1-10)
            <input
              required
              type="number"
              min={1}
              max={10}
              value={calificacionForm.nota}
              onChange={(e) => setCalificacionForm({ ...calificacionForm, nota: e.target.value })}
            />
          </label>
          <button type="submit">Cargar calificación</button>
        </form>
        {calificacionError && <p role="alert">{calificacionError}</p>}
        <JsonPreview data={calificacionResultado} />
      </section>

      <section className="card">
        <h2>4. Cerrar acta</h2>
        <form className="form-inline" onSubmit={cerrarActa}>
          <label>
            Id del acta
            <input required value={cierreActaId} onChange={(e) => setCierreActaId(e.target.value)} />
          </label>
          <button type="submit">Cerrar acta</button>
        </form>
        {cierreError && <p role="alert">{cierreError}</p>}
        {cierreResultado && <p>Acta {cierreResultado.id} en estado {cierreResultado.estado}</p>}
      </section>

      <section className="card">
        <h2>5. Historial de actas</h2>
        <form className="form-inline" onSubmit={consultarHistorial}>
          <label>
            Consultar por
            <select
              value={historialForm.tipo}
              onChange={(e) => setHistorialForm({ ...historialForm, tipo: e.target.value })}
            >
              <option value="alumno">Alumno</option>
              <option value="materia">Materia</option>
            </select>
          </label>
          <label>
            Id
            <input
              required
              value={historialForm.id}
              onChange={(e) => setHistorialForm({ ...historialForm, id: e.target.value })}
            />
          </label>
          <button type="submit">Consultar</button>
        </form>
        {historialError && <p role="alert">{historialError}</p>}
        {historial && <JsonPreview data={historial} />}
      </section>
    </div>
  );
}
