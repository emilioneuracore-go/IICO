import { FormEvent, useState } from 'react';
import { useApi } from '../api/useApi';
import { ApiError } from '../api/client';
import { JsonPreview } from '../components/JsonPreview';

interface MateriaAdeudada {
  id: string;
  materiaId: string;
  tramoAnio: number | null;
  estado: string;
  materia: { nombre: string };
  planAcompanamiento: { docenteResponsableId: string; modalidad: string } | null;
}

interface Habilitacion {
  alumnoId: string;
  cantidadAdeudadas: number;
  tope: number;
  habilitado: boolean;
}

export function MateriasPreviasPage() {
  const api = useApi();

  const [cierreForm, setCierreForm] = useState({
    actaId: '',
    planAlumnoId: '',
    planDocenteResponsableId: '',
    planModalidad: '',
  });
  const [cierreError, setCierreError] = useState<string | null>(null);
  const [cierreResultado, setCierreResultado] = useState<unknown>(null);

  const [alumnoId, setAlumnoId] = useState('');
  const [adeudadasError, setAdeudadasError] = useState<string | null>(null);
  const [adeudadas, setAdeudadas] = useState<MateriaAdeudada[] | null>(null);

  const [habilitacionAlumnoId, setHabilitacionAlumnoId] = useState('');
  const [habilitacionError, setHabilitacionError] = useState<string | null>(null);
  const [habilitacion, setHabilitacion] = useState<Habilitacion | null>(null);

  const [tope, setTope] = useState('');
  const [topeError, setTopeError] = useState<string | null>(null);
  const [topeResultado, setTopeResultado] = useState<unknown>(null);

  const cerrarActaYSincronizar = async (event: FormEvent) => {
    event.preventDefault();
    setCierreError(null);
    setCierreResultado(null);
    try {
      const planes =
        cierreForm.planAlumnoId && cierreForm.planDocenteResponsableId && cierreForm.planModalidad
          ? [
              {
                alumnoId: cierreForm.planAlumnoId,
                docenteResponsableId: cierreForm.planDocenteResponsableId,
                modalidad: cierreForm.planModalidad,
              },
            ]
          : [];
      const resultado = await api(`/materias-previas/actas/${cierreForm.actaId}/cerrar`, {
        method: 'POST',
        body: { planes },
      });
      setCierreResultado(resultado);
    } catch (error) {
      setCierreError(error instanceof ApiError ? error.message : 'No se pudo cerrar y sincronizar el acta');
    }
  };

  const consultarAdeudadas = async (event: FormEvent) => {
    event.preventDefault();
    setAdeudadasError(null);
    setAdeudadas(null);
    try {
      const lista = await api<MateriaAdeudada[]>(`/materias-previas/alumnos/${alumnoId}`);
      setAdeudadas(lista);
    } catch (error) {
      setAdeudadasError(error instanceof ApiError ? error.message : 'No se pudieron consultar las materias adeudadas');
    }
  };

  const consultarHabilitacion = async (event: FormEvent) => {
    event.preventDefault();
    setHabilitacionError(null);
    setHabilitacion(null);
    try {
      const resultado = await api<Habilitacion>(`/materias-previas/alumnos/${habilitacionAlumnoId}/habilitacion`);
      setHabilitacion(resultado);
    } catch (error) {
      setHabilitacionError(error instanceof ApiError ? error.message : 'No se pudo evaluar la habilitación');
    }
  };

  const actualizarTope = async (event: FormEvent) => {
    event.preventDefault();
    setTopeError(null);
    setTopeResultado(null);
    try {
      const resultado = await api('/materias-previas/configuracion/tope', {
        method: 'POST',
        body: { tope: Number(tope) },
      });
      setTopeResultado(resultado);
    } catch (error) {
      setTopeError(error instanceof ApiError ? error.message : 'No se pudo actualizar el tope');
    }
  };

  return (
    <div className="page">
      <h1>Materias previas</h1>

      <section className="card">
        <h2>Cerrar acta y sincronizar materias previas</h2>
        <p className="hint">
          Completá los campos de plan de acompañamiento solo si sabés que esta acta va a generar la tercera materia
          adeudada del alumno.
        </p>
        <form className="form-grid" onSubmit={cerrarActaYSincronizar}>
          <label>
            Id del acta
            <input
              required
              value={cierreForm.actaId}
              onChange={(e) => setCierreForm({ ...cierreForm, actaId: e.target.value })}
            />
          </label>
          <label>
            Id del alumno (plan)
            <input
              value={cierreForm.planAlumnoId}
              onChange={(e) => setCierreForm({ ...cierreForm, planAlumnoId: e.target.value })}
            />
          </label>
          <label>
            Docente responsable (plan)
            <input
              value={cierreForm.planDocenteResponsableId}
              onChange={(e) => setCierreForm({ ...cierreForm, planDocenteResponsableId: e.target.value })}
            />
          </label>
          <label>
            Modalidad (plan)
            <input
              value={cierreForm.planModalidad}
              onChange={(e) => setCierreForm({ ...cierreForm, planModalidad: e.target.value })}
            />
          </label>
          <button type="submit">Cerrar acta</button>
        </form>
        {cierreError && <p role="alert">{cierreError}</p>}
        <JsonPreview data={cierreResultado} />
      </section>

      <section className="card">
        <h2>Materias adeudadas de un alumno</h2>
        <form className="form-inline" onSubmit={consultarAdeudadas}>
          <label>
            Id del alumno
            <input required value={alumnoId} onChange={(e) => setAlumnoId(e.target.value)} />
          </label>
          <button type="submit">Consultar</button>
        </form>
        {adeudadasError && <p role="alert">{adeudadasError}</p>}
        {adeudadas && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Materia</th>
                <th>Tramo</th>
                <th>Plan de acompañamiento</th>
              </tr>
            </thead>
            <tbody>
              {adeudadas.map((m) => (
                <tr key={m.id}>
                  <td>{m.materia.nombre}</td>
                  <td>{m.tramoAnio ?? '—'}</td>
                  <td>{m.planAcompanamiento ? m.planAcompanamiento.modalidad : '—'}</td>
                </tr>
              ))}
              {adeudadas.length === 0 && (
                <tr>
                  <td colSpan={3}>Sin materias adeudadas</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      <section className="card">
        <h2>Habilitación a promoción</h2>
        <form className="form-inline" onSubmit={consultarHabilitacion}>
          <label>
            Id del alumno
            <input required value={habilitacionAlumnoId} onChange={(e) => setHabilitacionAlumnoId(e.target.value)} />
          </label>
          <button type="submit">Evaluar</button>
        </form>
        {habilitacionError && <p role="alert">{habilitacionError}</p>}
        {habilitacion && (
          <p>
            {habilitacion.cantidadAdeudadas} de {habilitacion.tope} materias adeudadas —{' '}
            {habilitacion.habilitado ? 'habilitado para promocionar' : 'no habilitado para promocionar'}
          </p>
        )}
      </section>

      <section className="card">
        <h2>Configuración: tope de materias adeudadas</h2>
        <form className="form-inline" onSubmit={actualizarTope}>
          <label>
            Nuevo tope
            <input required type="number" min={0} value={tope} onChange={(e) => setTope(e.target.value)} />
          </label>
          <button type="submit">Actualizar</button>
        </form>
        {topeError && <p role="alert">{topeError}</p>}
        <JsonPreview data={topeResultado} />
      </section>
    </div>
  );
}
