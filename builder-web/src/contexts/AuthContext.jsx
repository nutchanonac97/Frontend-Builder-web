import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);
const API_BASE = 'http://localhost:5213';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // โหลด session จาก localStorage ตอนเริ่มต้น
    useEffect(() => {
        const savedToken = localStorage.getItem('jwt_token');
        const savedUser = localStorage.getItem('user_info');
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    // Login ด้วย Google ID Token
    const loginWithGoogle = useCallback(async (idToken) => {
        const res = await fetch(`${API_BASE}/api/auth/google-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'เข้าสู่ระบบไม่สำเร็จ');
        }

        const data = await res.json();
        // data = { token, username, role, profilePicture }
        setToken(data.token);
        const userInfo = {
            username: data.username,
            role: data.role,
            profilePicture: data.profilePicture,
        };
        setUser(userInfo);

        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user_info', JSON.stringify(userInfo));

        return data;
    }, []);

    // Logout
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_info');
    }, []);

    const isLoggedIn = !!user;
    const isAdmin = user?.role === 'Admin';

    return (
        <AuthContext.Provider value={{ user, token, loading, isLoggedIn, isAdmin, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
