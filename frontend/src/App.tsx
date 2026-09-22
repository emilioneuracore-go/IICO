import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { RequireAuth } from './auth/RequireAuth';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { LegajosPage } from './pages/LegajosPage';
import { LibroMatrizPage } from './pages/LibroMatrizPage';
import { MateriasPage } from './pages/MateriasPage';
import { ActasExamenPage } from './pages/ActasExamenPage';
import { MateriasPreviasPage } from './pages/MateriasPreviasPage';
import { PasesEstudiantesPage } from './pages/PasesEstudiantesPage';
import { NAV_ITEMS } from './nav';

function LoginRoute() {
  const { auth, login } = useAuth();
  if (auth) {
    return <Navigate to="/" replace />;
  }
  return <LoginPage onLogin={login} />;
}

function HomeRoute() {
  const { hasAnyRole } = useAuth();
  const primeraSeccionHabilitada = NAV_ITEMS.find((item) => hasAnyRole(...item.roles));
  return <Navigate to={primeraSeccionHabilitada?.path ?? '/login'} replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<HomeRoute />} />
            <Route path="legajos" element={<LegajosPage />} />
            <Route path="libro-matriz" element={<LibroMatrizPage />} />
            <Route path="materias" element={<MateriasPage />} />
            <Route path="actas-examen" element={<ActasExamenPage />} />
            <Route path="materias-previas" element={<MateriasPreviasPage />} />
            <Route path="pases-estudiantes" element={<PasesEstudiantesPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
