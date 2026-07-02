import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import { API_BASE_URL } from "../config/apiConfig";
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const { token, rol, logout } = useAuth();

    const handleLogout = async () => {
        try {
            // Petición asíncrona al backend para invalidar el token
            await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: "POST",
                headers: { 
                    "Authorization": `Bearer ${token}` 
                }
            });
        } catch (err) {
            console.error("Error al cerrar sesión en el servidor: ", err);
        } finally {
            // Limpieza del localStorage y estados de React
            logout();
            navigate("/login");
        }
    };

    // Si el usuario no está autenticado, no se muestra la barra
    if (!token) return null;

    return (
        <nav className="navbar">
            <span className="navbar-logo">📁 GestorProyectos</span>
            <div className="navbar-links">
                {/* Enlace común para USER y ADMIN */}
                <Link to="/proyectos" className="nav-link">📋 Ver Proyectos</Link>
                
                {/* Enlaces exclusivos para el rol ADMIN */}
                {rol === "ADMIN" && (
                    <>
                        <Link to="/gestionar-proyectos" className="nav-link">➕ Nuevo Proyecto</Link>
                        <Link to="/crear-tareas" className="nav-link">📝 Crear Tarea</Link>
                    </>
                )}

                <button onClick={handleLogout} className="btn-logout" style={{ marginLeft: "1rem", cursor: "pointer" }}>
                    🚪 Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}

export default Navbar;