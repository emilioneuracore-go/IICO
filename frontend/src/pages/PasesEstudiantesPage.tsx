import { FormEvent, useState } from 'react';
import { useApi } from '../api/useApi';
import { ApiError } from '../api/client';
import { JsonPreview } from '../components/JsonPreview';

interface Pase {
  id: string;
  tipo: string;
  estado: string;
  alumnoId: string;
}

export function PasesEstudiantesPage() {
  const api = useApi();

  const [tipoLegajo, setTipoLegajo] = useState<'existente' | 'nuevo'>('existente');
  const [ingresoForm, setIngresoForm] = useState({
    alumnoId: '',
    nombre: '',
    apellido: '',
    documento: '',
    fechaNacimiento: '',
    institucionOrigen: '',
    documentacionOrigen: '',
  });
  const [ingresoError, setIngresoError] = useState<string | null>(null);
  const [ingresoResultado, setIngresoResultado] = useState<Pase | null>(null);

  const [egresoForm, setEgresoForm] = useState({ alumnoId: '', institucionDestino: '' });
  const [egresoError, setEgresoError] = useState<string | null>(null);
  const [egresoResultado, setEgresoResultado] = useState<Pase | null>(null);

  const [estadoForm, setEstadoForm] = useState({ paseId: '', estado: 'EN_PROCESO' });
  const [estadoError, setEstadoError] = useState<string | null>(null);
  const [estadoResultado, setEstadoResultado] = useState<Pase | null>(null);

  const [consultaPaseId, setConsultaPaseId] = useState('');
  const [consultaError, setConsultaError] = useState<string | null>(null);
  const [pase, setPase] = useState<Pase | null>(null);

  const registrarIngreso = async (event: FormEvent) => {
    event.preventDefault();
    setIngresoError(null);
    setIngresoResultado(null);
    try {
      const body =
        tipoLegajo === 'existente'
          ? {
              alumnoId: ingresoForm.alumnoId,
              institucionOrigen: ingresoForm.institucionOrigen,
              documentacionOrigen: ingresoForm.documentacionOrigen,
            }
          : {
              datosAlumnoNuevo: {
                nombre: ingresoForm.nombre,
                apellido: ingresoForm.apellido,
                documento: ingresoForm.documento,
                fechaNacimiento: ingresoForm.fechaNacimiento,
              },
              institucionOrigen: ingresoForm.institucionOrigen,
              documentacionOrigen: ingresoForm.documentacionOrigen,
            };
      const creado = await api<Pase>('/pases-estudiantes/ingresos', { method: 'POST', body });
      setIngresoResultado(creado);
    } catch (error) {
      setIngresoError(error instanceof ApiError ? error.message : 'No se pudo registrar el pase de ingreso');
    }
  };

  const registrarEgreso = async (event: FormEvent) => {
    event.preventDefault();
    setEgresoError(null);
    setEgresoResultado(null);
    try {
      const creado = await api<Pase>('/pases-estudiantes/egresos', { method: 'POST', body: egresoForm });
      setEgresoResultado(creado);
    } catch (error) {
      setEgresoError(error instanceof ApiError ? error.message : 'No se pudo registrar el pase de egreso');
    }
  };

  const actualizarEstado = async (event: FormEvent) => {
    event.preventDefault();
    setEstadoError(null);
    setEstadoResultado(null);
    try {
      const actualizado = await api<Pase>(`/pases-estudiantes/${estadoForm.paseId}/estado`, {
        method: 'PATCH',
        body: { estado: estadoForm.estado },
      });
      setEstadoResultado(actualizado);
    } catch (error) {
      setEstadoError(error instanceof ApiError ? error.message : 'No se pudo actualizar el estado');
    }
  };

  const consultarPase = async (event: FormEvent) => {
    event.preventDefault();
    setConsultaError(null);
    setPase(null);
    try {
      const encontrado = await api<Pase>(`/pases-estudiantes/${consultaPaseId}`);
      setPase(encontrado);
    } catch (error) {
      setConsultaError(error instanceof ApiError ? error.message : 'No se pudo consultar el pase');
    }
  };

  return (
    <div className="page">
      <h1>Pases de estudiantes</h1>

      <section className="card">
        <h2>Registrar pase de ingreso</h2>
        <div className="tabs">
          <button
            type="button"
            className={tipoLegajo === 'existente' ? 'tab-active' : ''}
            onClick={() => setTipoLegajo('existente')}
          >
            Legajo existente
          </button>
          <button
            type="button"
            className={tipoLegajo === 'nuevo' ? 'tab-active' : ''}
            onClick={() => setTipoLegajo('nuevo')}
          >
            Legajo nuevo
          </button>
        </div>
        <form className="form-grid" onSubmit={registrarIngreso}>
          {tipoLegajo === 'existente' ? (
            <label>
              Id del alumno
              <input
                required
                value={ingresoForm.alumnoId}
                onChange={(e) => setIngresoForm({ ...ingresoForm, alumnoId: e.target.value })}
              />
            </label>
          ) : (
            <>
              <label>
                Nombre
                <input
                  required
                  value={ingresoForm.nombre}
                  onChange={(e) => setIngresoForm({ ...ingresoForm, nombre: e.target.value })}
                />
              </label>
              <label>
                Apellido
                <input
                  required
                  value={ingresoForm.apellido}
                  onChange={(e) => setIngresoForm({ ...ingresoForm, apellido: e.target.value })}
                />
              </label>
              <label>
                Documento
                <input
                  required
                  value={ingresoForm.documento}
                  onChange={(e) => setIngresoForm({ ...ingresoForm, documento: e.target.value })}
                />
              </label>
              <label>
                Fecha de nacimiento
                <input
                  required
                  type="date"
                  value={ingresoForm.fechaNacimiento}
                  onChange={(e) => setIngresoForm({ ...ingresoForm, fechaNacimiento: e.target.value })}
                />
              </label>
            </>
          )}
          <label>
            Institución de origen
            <input
              required
              value={ingresoForm.institucionOrigen}
              onChange={(e) => setIngresoForm({ ...ingresoForm, institucionOrigen: e.target.value })}
            />
          </label>
          <label>
            Documentación remitida
            <input
              required
              value={ingresoForm.documentacionOrigen}
              onChange={(e) => setIngresoForm({ ...ingresoForm, documentacionOrigen: e.target.value })}
            />
          </label>
          <button type="submit">Registrar ingreso</button>
        </form>
        {ingresoError && <p role="alert">{ingresoError}</p>}
        {ingresoResultado && <p>Pase creado con id: {ingresoResultado.id}</p>}
      </section>

      <section className="card">
        <h2>Registrar pase de egreso</h2>
        <form className="form-grid" onSubmit={registrarEgreso}>
          <label>
            Id del alumno
            <input
              required
              value={egresoForm.alumnoId}
              onChange={(e) => setEgresoForm({ ...egresoForm, alumnoId: e.target.value })}
            />
          </label>
          <label>
            Institución de destino
            <input
              required
              value={egresoForm.institucionDestino}
              onChange={(e) => setEgresoForm({ ...egresoForm, institucionDestino: e.target.value })}
            />
          </label>
          <button type="submit">Registrar egreso</button>
        </form>
        {egresoError && <p role="alert">{egresoError}</p>}
        {egresoResultado && <p>Pase creado con id: {egresoResultado.id}, documentación generada</p>}
      </section>

      <section className="card">
        <h2>Actualizar estado del trámite</h2>
        <form className="form-inline" onSubmit={actualizarEstado}>
          <label>
            Id del pase
            <input
              required
              value={estadoForm.paseId}
              onChange={(e) => setEstadoForm({ ...estadoForm, paseId: e.target.value })}
            />
          </label>
          <label>
            Estado
            <select value={estadoForm.estado} onChange={(e) => setEstadoForm({ ...estadoForm, estado: e.target.value })}>
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROCESO">En proceso</option>
              <option value="COMPLETO">Completo</option>
            </select>
          </label>
          <button type="submit">Actualizar</button>
        </form>
        {estadoError && <p role="alert">{estadoError}</p>}
        {estadoResultado && <p>Pase {estadoResultado.id} ahora en estado {estadoResultado.estado}</p>}
      </section>

      <section className="card">
        <h2>Consultar pase</h2>
        <form className="form-inline" onSubmit={consultarPase}>
          <label>
            Id del pase
            <input required value={consultaPaseId} onChange={(e) => setConsultaPaseId(e.target.value)} />
          </label>
          <button type="submit">Consultar</button>
        </form>
        {consultaError && <p role="alert">{consultaError}</p>}
        {pase && <JsonPreview data={pase} />}
      </section>
    </div>
  );
}
