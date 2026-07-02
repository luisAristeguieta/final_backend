import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import TablaProyectos from "./components/TablaProyectos.jsx";
import FormularioProyecto from "./components/FormularioProyecto.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* El Navbar dinámico se renderiza de forma global */}
        <Navbar />
        
        <Routes>
          {/* Rutas Públicas de Autenticación */}
          <Route path="/login" element={<Login />} />

          {/* Rutas Privadas Protegidas e Interconectadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/proyectos" element={<TablaProyectos />} />
            <Route path="/gestionar-proyectos" element={<FormularioProyecto />} />
          </Route>

          {/* Redirección Automática por Defecto */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;