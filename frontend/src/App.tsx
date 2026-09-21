import { LoginPage } from './pages/LoginPage';

function App() {
  const handleLogin = async (email: string, password: string) => {
    // TODO (task 9.1): conectar con POST /auth/login del backend
    console.log('login attempt', email, password);
  };

  return <LoginPage onLogin={handleLogin} />;
}

export default App;
