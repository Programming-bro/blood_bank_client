import { createContext, useState, useEffect } from "react";
import apiClient from "../services/api-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async (token) => {
        const authToken = token || localStorage.getItem("token");
        if (authToken) {
            try {
                
                const res = await apiClient.get("/donors/me/", {
                    headers: { Authorization: `JWT ${authToken}` }
                });
                setUser(res.data);
            } catch (err) {
                console.error("User fetch failed", err);
                localStorage.removeItem("token");
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (username, password) => {
        const res = await apiClient.post("/auth/jwt/create/", { username, password });
        const accessToken = res.data.access;
        localStorage.setItem("token", accessToken);
        
        await fetchUser(accessToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => { fetchUser(); }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};