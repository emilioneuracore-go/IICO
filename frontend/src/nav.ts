export interface NavItem {
  path: string;
  label: string;
  // Roles habilitados para ver esta sección (coincide con los @Roles(...) de
  // cada controller del backend, para que la navegación nunca ofrezca una
  // sección a la que el rol no tiene acceso).
  roles: string[];
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/legajos', label: 'Legajos', roles: ['SecretariaAcademica', 'Direccion'] },
  { path: '/libro-matriz', label: 'Libro Matriz', roles: ['SecretariaAcademica', 'Direccion'] },
  { path: '/materias', label: 'Materias', roles: ['SecretariaAcademica', 'Direccion', 'Docente'] },
  { path: '/actas-examen', label: 'Actas de Examen', roles: ['SecretariaAcademica', 'Direccion'] },
  { path: '/materias-previas', label: 'Materias Previas', roles: ['SecretariaAcademica', 'Direccion'] },
  { path: '/pases-estudiantes', label: 'Pases de Estudiantes', roles: ['SecretariaAcademica', 'Direccion'] },
];
