import { FormEvent, useState } from 'react';
import { useApi } from '../api/useApi';
import { ApiError } from '../api/client';

interface Inscripcion {
  id: string;
  libro: string;
  anio: number;
  numeroCorrelativo: number;
  activa: boolean;
  alumno: { id: string; nombre: string; apellido: string; documento: string };
}

export function LibroMatrizPage() {
  const api = useApi();

  const [altaForm, setAltaForm] = useState({ libro: '', anio: '', alumnoId: '' });
  const [altaError, setAltaError] = useState<string | null>(null);
  const [altaResultado, setAltaResultado] = useState<Inscripcion | null>(null);

  const [consultaForm, setConsultaForm] = useState({ libro: '', anio: '' });
  const [consultaError, setConsultaError] = useState<string | null>(null);
  const [inscripciones, setInscripciones] = useState<Inscripcion[] | null>(null);

  const inscribir = async (event: FormEvent) => {
    event.preventDefault();
    setAltaError(null);
    setAltaResultado(null);
    try {
      const creada = await api<Inscripcion>('/libro-matriz/inscripciones', {
        method: 'POST',
        body: { libro: altaForm.libro, anio: Number(altaForm.anio), alumnoId: altaForm.alumnoId },
      });
      setAltaResultado(creada);
    } catch (error) {
      setAltaError(error instanceof ApiError ? error.message : 'No se pudo inscribir al alumno');
    }
  };

  const consultar = async (event: FormEvent) => {
    event.preventDefault();
    setConsultaError(null);
    setInscripciones(null);
    try {
      const params = new URLSearchParams({ libro: consultaForm.libro, anio: consultaForm.anio });
      const lista = await api<Inscripcion[]>(`/libro-matriz/inscripciones?${params.toString()}`);
      setInscripciones(lista);
    } catch (error) {
      setConsultaError(error instanceof ApiError ? error.message : 'No se pudo consultar el libro matriz');
    }
  };

  return (
    <div className="page">
      <h1>Libro matriz</h1>

      <section className="card">
        <h2>Inscribir alumno</h2>
        <form className="form-grid" onSubmit={inscribir}>
          <label>
            Libro
            <input
              required
              value={altaForm.libro}
              onChange={(e) => setAltaForm({ ...altaForm, libro: e.target.value })}
            />
          </label>
          <label>
            Año
            <input
              required
              type="number"
              value={altaForm.anio}
              onChange={(e) => setAltaForm({ ...altaForm, anio: e.target.value })}
            />
          </label>
          <label>
            Id del alumno
            <input
              required
              value={altaForm.alumnoId}
              onChange={(e) => setAltaForm({ ...altaForm, alumnoId: e.target.value })}
            />
          </label>
          <button type="submit">Inscribir</button>
        </form>
        {altaError && <p role="alert">{altaError}</p>}
        {altaResultado && (
          <p>
            Inscripción #{altaResultado.numeroCorrelativo} creada con id: {altaResultado.id}
          </p>
        )}
      </section>

      <section className="card">
        <h2>Consultar inscripciones</h2>
        <form className="form-inline" onSubmit={consultar}>
          <label>
            Libro
            <input
              required
              value={consultaForm.libro}
              onChange={(e) => setConsultaForm({ ...consultaForm, libro: e.target.value })}
            />
          </label>
          <label>
            Año
            <input
              required
              type="number"
              value={consultaForm.anio}
              onChange={(e) => setConsultaForm({ ...consultaForm, anio: e.target.value })}
            />
          </label>
          <button type="submit">Consultar</button>
        </form>
        {consultaError && <p role="alert">{consultaError}</p>}
        {inscripciones && (
          <table className="data-table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Alumno</th>
                <th>Documento</th>
                <th>Activa</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((i) => (
                <tr key={i.id}>
                  <td>{i.numeroCorrelativo}</td>
                  <td>
                    {i.alumno.nombre} {i.alumno.apellido}
                  </td>
                  <td>{i.alumno.documento}</td>
                  <td>{i.activa ? 'Sí' : 'No'}</td>
                </tr>
              ))}
              {inscripciones.length === 0 && (
                <tr>
                  <td colSpan={4}>Sin inscripciones para ese libro/año</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
