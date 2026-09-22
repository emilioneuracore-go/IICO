import { FormEvent, useState } from 'react';
import { useApi } from '../api/useApi';
import { useAuth } from '../auth/AuthContext';
import { ApiError } from '../api/client';
import { JsonPreview } from '../components/JsonPreview';

interface Materia {
  id: string;
  nombre: string;
  duracion: string;
  modalidadAcreditacion: string | null;
  areas: { id: string; nombre: string }[];
}

export function MateriasPage() {
  const api = useApi();
  const { hasAnyRole } = useAuth();
  const puedeCrear = hasAnyRole('SecretariaAcademica', 'Direccion');

  const [altaForm, setAltaForm] = useState({ nombre: '', duracion: 'ANUAL' });
  const [altaError, setAltaError] = useState<string | null>(null);
  const [altaResultado, setAltaResultado] = useState<Materia | null>(null);

  const [consultaId, setConsultaId] = useState('');
  const [consultaError, setConsultaError] = useState<string | null>(null);
  const [materia, setMateria] = useState<Materia | null>(null);

  const crearMateria = async (event: FormEvent) => {
    event.preventDefault();
    setAltaError(null);
    setAltaResultado(null);
    try {
      const creada = await api<Materia>('/materias', { method: 'POST', body: altaForm });
      setAltaResultado(creada);
    } catch (error) {
      setAltaError(error instanceof ApiError ? error.message : 'No se pudo crear la materia');
    }
  };

  const consultarMateria = async (event: FormEvent) => {
    event.preventDefault();
    setConsultaError(null);
    setMateria(null);
    try {
      const encontrada = await api<Materia>(`/materias/${consultaId}`);
      setMateria(encontrada);
    } catch (error) {
      setConsultaError(error instanceof ApiError ? error.message : 'No se pudo consultar la materia');
    }
  };

  return (
    <div className="page">
      <h1>Materias del plan de estudios</h1>

      {puedeCrear ? (
        <section className="card">
          <h2>Alta de materia</h2>
          <form className="form-grid" onSubmit={crearMateria}>
            <label>
              Nombre
              <input
                required
                value={altaForm.nombre}
                onChange={(e) => setAltaForm({ ...altaForm, nombre: e.target.value })}
              />
            </label>
            <label>
              Duración
              <select
                value={altaForm.duracion}
                onChange={(e) => setAltaForm({ ...altaForm, duracion: e.target.value })}
              >
                <option value="ANUAL">Anual</option>
                <option value="BIANUAL">Bianual</option>
                <option value="TRIANUAL">Trianual</option>
              </select>
            </label>
            <button type="submit">Crear materia</button>
          </form>
          {altaError && <p role="alert">{altaError}</p>}
          {altaResultado && <p>Materia creada con id: {altaResultado.id}</p>}
        </section>
      ) : (
        <p className="hint">Tu rol tiene acceso de solo consulta a materias.</p>
      )}

      <section className="card">
        <h2>Consulta de materia</h2>
        <form className="form-inline" onSubmit={consultarMateria}>
          <label>
            Id de la materia
            <input required value={consultaId} onChange={(e) => setConsultaId(e.target.value)} />
          </label>
          <button type="submit">Consultar</button>
        </form>
        {consultaError && <p role="alert">{consultaError}</p>}
        {materia && <JsonPreview data={materia} />}
      </section>
    </div>
  );
}
