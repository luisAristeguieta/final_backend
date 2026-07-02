import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Inicializamos los estados recuperando directamente del localStorage si ya existían
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [rol, setRol] = useState(localStorage.getItem("rol") || null);
    const [username, setUsername] = useState(localStorage.getItem("username") || null);

    const login = (nuevoToken, nuevoRol, nuevoUsername) => {
        localStorage.setItem("token", nuevoToken);
        localStorage.setItem("rol", nuevoRol);
        localStorage.setItem("username", nuevoUsername);
        
        setToken(nuevoToken);
        setRol(nuevoRol);
        setUsername(nuevoUsername);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("username");
        
        setToken(null);
        setRol(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ token, rol, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}