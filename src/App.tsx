import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, usePocket } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { AiPage } from './pages/AIPage';
import { AuthPage } from './pages/Authpage';
import { DashboardPage } from './pages/DashboardPage';

function PrivateRoute({children}: {children: React.ReactNode}){
  const {user} = usePocket();
  if(!user){
    return <Navigate to="/login" />
  }
  return <>{children}</>
}

function AppContent() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="/ai" element={
            <PrivateRoute>
              <AiPage />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;