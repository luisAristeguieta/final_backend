import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error("Usuario o contraseña incorrectos. Por favor, intente de nuevo.");
            }

            const data = await response.json();

            // Guardamos token, rol y username recuperados de tu AuthController
            login(data.token, data.rol, data.username);

            // Redirección hacia el perfil del usuario
            navigate("/profile");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p style={{ color: "#e63946", backgroundColor: "#ffe3e3", padding: "0.5rem", borderRadius: "4px" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn-primary">Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;