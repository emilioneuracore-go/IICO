import { FormEvent, useState } from 'react';
import { useApi } from '../api/useApi';
import { ApiError } from '../api/client';
import { JsonPreview } from '../components/JsonPreview';

interface Legajo {
  id: string;
  nombre: string;
  apellido: string;
  documento: string;
  fechaNacimiento: string;
  domicilio: string | null;
  telefono: string | null;
  responsables: { responsable: { nombre: string; apellido: string }; vinculo: string }[];
  historial: { campo: string; valorAnterior: string | null; valorNuevo: string | null; fecha: string }[];
}

export function LegajosPage() {
  const api = useApi();

  const [altaForm, setAltaForm] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    fechaNacimiento: '',
    domicilio: '',
    telefono: '',
  });
  const [altaError, setAltaError] = useState<string | null>(null);
  const [altaResultado, setAltaResultado] = useState<Legajo | null>(null);

  const [consultaId, setConsultaId] = useState('');
  const [consultaError, setConsultaError] = useState<string | null>(null);
  const [legajo, setLegajo] = useState<Legajo | null>(null);

  const [responsableForm, setResponsableForm] = useState({
    nombre: '',
    apellido: '',
    vinculo: 'MADRE',
    telefono: '',
    email: '',
  });
  const [responsableError, setResponsableError] = useState<string | null>(null);

  const crearLegajo = async (event: FormEvent) => {
    event.preventDefault();
    setAltaError(null);
    setAltaResultado(null);
    try {
      const creado = await api<Legajo>('/legajos-alumnos', {
        method: 'POST',
        body: {
          ...altaForm,
          domicilio: altaForm.domicilio || undefined,
          telefono: altaForm.telefono || undefined,
        },
      });
      setAltaResultado(creado);
    } catch (error) {
      setAltaError(error instanceof ApiError ? error.message : 'No se pudo crear el legajo');
    }
  };

  const consultarLegajo = async (event: FormEvent) => {
    event.preventDefault();
    setConsultaError(null);
    setLegajo(null);
    try {
      const encontrado = await api<Legajo>(`/legajos-alumnos/${consultaId}`);
      setLegajo(encontrado);
    } catch (error) {
      setConsultaError(error instanceof ApiError ? error.message : 'No se pudo consultar el legajo');
    }
  };

  const agregarResponsable = async (event: FormEvent) => {
    event.preventDefault();
    setResponsableError(null);
    if (!legajo) return;
    try {
      await api(`/legajos-alumnos/${legajo.id}/responsables`, {
        method: 'POST',
        body: {
          ...responsableForm,
          telefono: responsableForm.telefono || undefined,
          email: responsableForm.email || undefined,
        },
      });
      const actualizado = await api<Legajo>(`/legajos-alumnos/${legajo.id}`);
      setLegajo(actualizado);
      setResponsableForm({ nombre: '', apellido: '', vinculo: 'MADRE', telefono: '', email: '' });
    } catch (error) {
      setResponsableError(error instanceof ApiError ? error.message : 'No se pudo agregar el responsable');
    }
  };

  return (
    <div className="page">
      <h1>Legajos de alumnos</h1>

      <section className="card">
        <h2>Alta de legajo</h2>
        <form className="form-grid" onSubmit={crearLegajo}>
          <label>
            Nombre
            <input
              required
              value={altaForm.nombre}
              onChange={(e) => setAltaForm({ ...altaForm, nombre: e.target.value })}
            />
          </label>
          <label>
            Apellido
            <input
              required
              value={altaForm.apellido}
              onChange={(e) => setAltaForm({ ...altaForm, apellido: e.target.value })}
            />
          </label>
          <label>
            Documento
            <input
              required
              value={altaForm.documento}
              onChange={(e) => setAltaForm({ ...altaForm, documento: e.target.value })}
            />
          </label>
          <label>
            Fecha de nacimiento
            <input
              required
              type="date"
              value={altaForm.fechaNacimiento}
              onChange={(e) => setAltaForm({ ...altaForm, fechaNacimiento: e.target.value })}
            />
          </label>
          <label>
            Domicilio
            <input
              value={altaForm.domicilio}
              onChange={(e) => setAltaForm({ ...altaForm, domicilio: e.target.value })}
            />
          </label>
          <label>
            Teléfono
            <input
              value={altaForm.telefono}
              onChange={(e) => setAltaForm({ ...altaForm, telefono: e.target.value })}
            />
          </label>
          <button type="submit">Crear legajo</button>
        </form>
        {altaError && <p role="alert">{altaError}</p>}
        {altaResultado && (
          <>
            <p>Legajo creado con id: {altaResultado.id}</p>
            <JsonPreview data={altaResultado} />
          </>
        )}
      </section>

      <section className="card">
        <h2>Consulta de legajo</h2>
        <form className="form-inline" onSubmit={consultarLegajo}>
          <label>
            Id del legajo
            <input required value={consultaId} onChange={(e) => setConsultaId(e.target.value)} />
          </label>
          <button type="submit">Consultar</button>
        </form>
        {consultaError && <p role="alert">{consultaError}</p>}
        {legajo && (
          <>
            <JsonPreview data={legajo} />
            <h3>Agregar responsable</h3>
            <form className="form-grid" onSubmit={agregarResponsable}>
              <label>
                Nombre
                <input
                  required
                  value={responsableForm.nombre}
                  onChange={(e) => setResponsableForm({ ...responsableForm, nombre: e.target.value })}
                />
              </label>
              <label>
                Apellido
                <input
                  required
                  value={responsableForm.apellido}
                  onChange={(e) => setResponsableForm({ ...responsableForm, apellido: e.target.value })}
                />
              </label>
              <label>
                Vínculo
                <select
                  value={responsableForm.vinculo}
                  onChange={(e) => setResponsableForm({ ...responsableForm, vinculo: e.target.value })}
                >
                  <option value="MADRE">Madre</option>
                  <option value="PADRE">Padre</option>
                  <option value="TUTOR">Tutor</option>
                </select>
              </label>
              <label>
                Teléfono
                <input
                  value={responsableForm.telefono}
                  onChange={(e) => setResponsableForm({ ...responsableForm, telefono: e.target.value })}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={responsableForm.email}
                  onChange={(e) => setResponsableForm({ ...responsableForm, email: e.target.value })}
                />
              </label>
              <button type="submit">Agregar responsable</button>
            </form>
            {responsableError && <p role="alert">{responsableError}</p>}
          </>
        )}
      </section>
    </div>
  );
}
