import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";
import { useAuth } from "../context/AuthContext.jsx";

function FormularioProyecto() {
    // Estados locales para controlar los valores de los inputs del formulario
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    
    // Estados para gestionar la retroalimentación visual de errores y éxitos
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");

    // Hooks para la navegación programática y extracción del token de sesión global
    const navigate = useNavigate();
    const { token } = useAuth();

    // Manejador del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError("");      
        setExito("");     

        try {
            // Petición HTTP asíncrona hacia el endpoint protegido del backend
            const response = await fetch(`${API_BASE_URL}/proyectos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Adjunta credenciales JWT en la cabecera
                },
                // Convierte el estado del formulario a una cadena JSON stringificada
                body: JSON.stringify({
                    nombre,
                    descripcion,
                    fechaInicio
                })
            });

            // Si el servidor responde con un código de error (fuera del rango 200-299)
            if (!response.ok) {
                // Intercepta explícitamente la denegación de privilegios
                if (response.status === 403) {
                    throw new Error("No tiene permisos (ADMIN) para realizar esta acción.");
                }
                // Extrae el texto del catch del controlador de Spring Boot (ej. validaciones de base de datos)
                const msgError = await response.text();
                throw new Error(msgError || "Error al registrar el proyecto. Verifique los datos.");
            }

            // Flujo de éxito: Se ejecuta si el backend responde con un estado 201 Created
            setExito("¡Proyecto registrado exitosamente!");
            
            // Resetea el estado de los campos controlados del formulario
            setNombre("");
            setDescripcion("");
            setFechaInicio("");

            // Temporizador para redirigir al listado, permitiendo al usuario leer el mensaje de éxito
            setTimeout(() => {
                navigate("/proyectos");
            }, 1500);

        } catch (err) {
            // Captura cualquier error de red o lanzado manualmente en el bloque superior
            setError(err.message);
        }
    };

    return (
        <div className="form-wrapper" style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Registrar Nuevo Proyecto</h2>
            
            {/* Vinculación del evento submit al manejador asíncrono */}
            <form onSubmit={handleSubmit} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>
                
                {/* Inputs controlados: El valor se amarra al estado y cambia mediante onChange */}
                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label>Nombre del Proyecto</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                    />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label>Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows="4"
                        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", resize: "none" }}
                    />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label>Fecha de Inicio</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                    />
                </div>

                {/* Renderizado condicional: Muestra el contenedor de error solo si el estado contiene texto */}
                {error && (
                    <p style={{ color: "#e63946", backgroundColor: "#ffe3e3", padding: "0.5rem", borderRadius: "4px", margin: "0" }}>
                        {error}
                    </p>
                )}

                {/* Renderizado condicional: Muestra el contenedor de éxito solo si el estado contiene texto */}
                {exito && (
                    <p style={{ color: "#15803d", backgroundColor: "#dcfce7", padding: "0.5rem", borderRadius: "4px", margin: "0" }}>
                        {exito}
                    </p>
                )}

                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", padding: "0.6rem 1.5rem", cursor: "pointer" }}>
                    Guardar Proyecto
                </button>
            </form>
        </div>
    );
}

export default FormularioProyecto;