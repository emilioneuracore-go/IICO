import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { NAV_ITEMS } from '../nav';

export function Layout() {
  const { auth, logout, hasAnyRole } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const seccionesHabilitadas = NAV_ITEMS.filter((item) => hasAnyRole(...item.roles));

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-bar">
          <span className="app-brand">IICO</span>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Abrir navegación"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto((open) => !open)}
          >
            ☰
          </button>
        </div>
        <nav className={`app-nav ${menuAbierto ? 'app-nav-open' : ''}`}>
          {seccionesHabilitadas.length === 0 && (
            <span className="app-nav-empty">Tu rol no tiene secciones habilitadas</span>
          )}
          {seccionesHabilitadas.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `app-nav-link ${isActive ? 'app-nav-link-active' : ''}`}
              onClick={() => setMenuAbierto(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="app-user">
          <span>
            {auth?.user.email} ({auth?.user.roles.join(', ') || 'sin rol'})
          </span>
          <button type="button" onClick={logout}>
            Salir
          </button>
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
