import { AuthProvider } from './context/AuthContext';
import { LoginForm } from './components/auth/LoginForm';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoginForm />
      </div>
    </AuthProvider>
  );
}

export default App;