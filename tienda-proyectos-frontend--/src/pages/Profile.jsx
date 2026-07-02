import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
    // Extraemos el nombre de usuario y el rol directamente del contexto persistido
    const { username, rol } = useAuth();

    return (
        <div className="profile-container" style={{ padding: "2rem", maxWidth: "600px", margin: "2rem auto", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
            <h1>👤 Perfil del Usuario</h1>
            <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
                ¡Bienvenido de vuelta, <strong>{username || "Usuario"}</strong>!
            </p>
            <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "6px", display: "inline-block" }}>
                <span><strong>Rol asignado:</strong> </span>
                <span style={{ 
                    backgroundColor: rol === "ADMIN" ? "#dbeafe" : "#f1f5f9", 
                    color: rol === "ADMIN" ? "#1e40af" : "#334155", 
                    padding: "0.2rem 0.6rem", 
                    borderRadius: "4px", 
                    fontWeight: "bold" 
                }}>
                    {rol || "Ninguno"}
                </span>
            </div>
        </div>
    );
}

export default Profile;