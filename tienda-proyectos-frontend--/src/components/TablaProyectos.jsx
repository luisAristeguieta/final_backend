import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/apiConfig";
import { useAuth } from "../context/AuthContext.jsx";

function TablaProyectos() {
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    // Recuperamos el token del contexto global para las cabeceras seguras
    const { token } = useAuth();

    useEffect(() => {
        const cargarProyectos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/proyectos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Inyección obligatoria del Bearer Token
                    }
                });

                if (!response.ok) {
                    throw new Error("No se pudo recuperar la lista de proyectos del servidor.");
                }

                const data = await response.json();
                setProyectos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            cargarProyectos();
        }
    }, [token]);

    if (loading) return <div className="loading-container"><p>Cargando proyectos...</p></div>;

    return (
        <div className="table-wrapper" style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
            <h2>Listado de Proyectos del Sistema</h2>
            
            {error && (
                <p style={{ color: "#e63946", backgroundColor: "#ffe3e3", padding: "0.5rem", borderRadius: "4px" }}>
                    {error}
                </p>
            )}

            {proyectos.length === 0 ? (
                <p>No existen proyectos registrados actualmente en la base de datos.</p>
            ) : (
                <table className="data-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left", borderBottom: "2px solid #cbd5e1" }}>
                            <th style={{ padding: "0.75rem" }}>ID</th>
                            <th style={{ padding: "0.75rem" }}>Nombre del Proyecto</th>
                            <th style={{ padding: "0.75rem" }}>Descripción</th>
                            <th style={{ padding: "0.75rem" }}>Fecha de Inicio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.map((proyecto) => (
                            <tr key={proyecto.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                                <td style={{ padding: "0.75rem" }}>{proyecto.id}</td>
                                <td style={{ padding: "0.75rem", fontWeight: "500" }}>{proyecto.nombre}</td>
                                <td style={{ padding: "0.75rem" }}>{proyecto.descripcion}</td>
                                <td style={{ padding: "0.75rem" }}>{proyecto.fechaInicio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TablaProyectos;