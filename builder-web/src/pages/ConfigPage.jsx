import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Plus, Trash2, Save, Search, RefreshCw, X, AlertCircle,
    CheckCircle, Database, Shield, ChevronDown, ChevronRight, Edit3, Eye, EyeOff, LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = 'http://localhost:5213';
const GOOGLE_CLIENT_ID = '532280358732-kha4jufet25m069msjoh1gue8lpcal96.apps.googleusercontent.com';

// จัดกลุ่ม Config ตาม prefix ของ key
const groupConfigs = (configs) => {
    const groups = {};
    configs.forEach((cfg) => {
        const prefix = cfg.configKey?.split(':')[0] || 'Other';
        if (!groups[prefix]) groups[prefix] = [];
        groups[prefix].push(cfg);
    });
    return groups;
};

const groupIcons = {
    Email: '📧', LineConfig: '💬', LINE: '💬',
    Google: '🔐', Groq: '🤖', Gemini: '✨', LineBot: '🤖',
};

// =============================================
// 🔐 Google Login Screen
// =============================================
const LoginScreen = ({ isDark, onLogin }) => {
    const googleBtnRef = useRef(null);
    const [loginError, setLoginError] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        // โหลด Google Identity Services SDK
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            window.google?.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: async (response) => {
                    setLoggingIn(true);
                    setLoginError('');
                    try {
                        await onLogin(response.credential);
                    } catch (err) {
                        setLoginError(err.message || 'เข้าสู่ระบบไม่สำเร็จ');
                    } finally {
                        setLoggingIn(false);
                    }
                },
            });
            window.google?.accounts.id.renderButton(googleBtnRef.current, {
                theme: isDark ? 'filled_black' : 'outline',
                size: 'large',
                shape: 'pill',
                text: 'signin_with',
                locale: 'th',
                width: 300,
            });
        };
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); };
    }, [isDark, onLogin]);

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-slate-100'}`}>
            <div className={`w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100'}`}>
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                    <Shield size={36} className="text-purple-500" />
                </div>

                <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Admin Panel
                </h1>
                <p className={`text-sm mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    เข้าสู่ระบบด้วย Google เพื่อจัดการตั้งค่า
                </p>

                {/* Google Sign-In Button */}
                <div className="flex justify-center mb-4">
                    <div ref={googleBtnRef} />
                </div>

                {loggingIn && (
                    <div className="flex items-center justify-center gap-2 text-sm text-purple-500 mt-4">
                        <RefreshCw size={16} className="animate-spin" /> กำลังเข้าสู่ระบบ...
                    </div>
                )}

                {loginError && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm mt-4">
                        <AlertCircle size={16} /> {loginError}
                    </div>
                )}

                <p className={`text-xs mt-8 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                    เฉพาะ Admin ที่ได้รับสิทธิ์เท่านั้น
                </p>
            </div>
        </div>
    );
};

// =============================================
// 👮 Admin Whitelist Panel
// =============================================
const AdminPanel = ({ isDark }) => {
    const [admins, setAdmins] = useState([]);
    const [loadingAdmins, setLoadingAdmins] = useState(true);
    const [newEmail, setNewEmail] = useState('');
    const [adminMsg, setAdminMsg] = useState('');
    const [adminErr, setAdminErr] = useState('');
    const [adding, setAdding] = useState(false);

    const fetchAdmins = useCallback(async () => {
        setLoadingAdmins(true);
        try {
            const res = await fetch(`${API_BASE}/api/auth/list-admins`);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setAdmins(data);
        } catch (err) {
            setAdminErr('โหลดรายชื่อ Admin ไม่ได้: ' + err.message);
        } finally {
            setLoadingAdmins(false);
        }
    }, []);

    useEffect(() => { fetchAdmins(); }, [fetchAdmins]);

    const addAdmin = async () => {
        if (!newEmail.trim() || !newEmail.includes('@')) {
            setAdminErr('กรุณากรอกอีเมลที่ถูกต้อง');
            return;
        }
        setAdding(true);
        setAdminErr('');
        try {
            const res = await fetch(`${API_BASE}/api/auth/add-admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newEmail.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
            setAdminMsg(data.message || 'เพิ่ม Admin สำเร็จ ✅');
            setNewEmail('');
            setTimeout(() => setAdminMsg(''), 3000);
            await fetchAdmins();
        } catch (err) {
            setAdminErr(err.message);
        } finally {
            setAdding(false);
        }
    };

    const removeAdmin = async (email) => {
        if (!window.confirm(`ยืนยันลบสิทธิ์ Admin ของ "${email}" ?`)) return;
        try {
            const res = await fetch(`${API_BASE}/api/auth/remove-admin?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
            setAdminMsg(data.message || 'ลบ Admin แล้ว');
            setTimeout(() => setAdminMsg(''), 3000);
            await fetchAdmins();
        } catch (err) {
            setAdminErr(err.message);
        }
    };

    return (
        <section className="px-4 sm:px-6 pb-8">
            <div className="max-w-5xl mx-auto">
                <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                    {/* Header */}
                    <div className={`flex items-center gap-3 px-5 py-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                        <span className="text-xl">👮</span>
                        <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin Whitelist</span>
                        <span className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                            {admins.length} คน
                        </span>
                    </div>

                    <div className="px-5 py-4 space-y-3">
                        {/* Alerts */}
                        {adminMsg && (
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm">
                                <CheckCircle size={16} /> {adminMsg}
                            </div>
                        )}
                        {adminErr && (
                            <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                                <span className="flex items-center gap-2"><AlertCircle size={16} /> {adminErr}</span>
                                <button onClick={() => setAdminErr('')}><X size={14} /></button>
                            </div>
                        )}

                        {/* Add Admin Form */}
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addAdmin()}
                                placeholder="เพิ่มอีเมล Admin ใหม่..."
                                className={`flex-1 px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-purple-500' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}`}
                            />
                            <button
                                onClick={addAdmin}
                                disabled={adding}
                                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all"
                            >
                                {adding ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                                เพิ่ม
                            </button>
                        </div>

                        {/* Admin List */}
                        {loadingAdmins ? (
                            <div className="flex items-center justify-center gap-2 py-6">
                                <RefreshCw size={18} className="animate-spin text-purple-500" />
                                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>กำลังโหลด...</span>
                            </div>
                        ) : admins.length === 0 ? (
                            <p className={`text-sm text-center py-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>ยังไม่มี Admin</p>
                        ) : (
                            <div className="space-y-1">
                                {admins.map((admin, idx) => (
                                    <div
                                        key={admin.email || idx}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                                            {(admin.email || '?')[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{admin.email}</p>
                                            {admin.addedAt && (
                                                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                                    เพิ่มเมื่อ {new Date(admin.addedAt).toLocaleDateString('th-TH')}
                                                </p>
                                            )}
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${admin.isActive !== false ? 'bg-green-500/20 text-green-500' : 'bg-slate-500/20 text-slate-500'}`}>
                                            {admin.isActive !== false ? 'Active' : 'Inactive'}
                                        </span>
                                        <button
                                            onClick={() => removeAdmin(admin.email)}
                                            className={`p-1.5 rounded-lg transition-all ${isDark ? 'hover:bg-slate-700 text-slate-500 hover:text-red-400' : 'hover:bg-red-50 text-slate-400 hover:text-red-600'}`}
                                            title="ลบ Admin"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// =============================================
// ⚙️ Config Dashboard (หลัง Login แล้ว)
// =============================================
const ConfigDashboard = ({ isDark }) => {
    const { user, logout } = useAuth();
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [search, setSearch] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});
    const [editingKey, setEditingKey] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [showSecrets, setShowSecrets] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [newConfig, setNewConfig] = useState({ configKey: '', configValue: '', description: '' });
    const [saving, setSaving] = useState(false);

    const fetchConfigs = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE}/api/integration-config`);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setConfigs(data);
            const groups = {};
            data.forEach((cfg) => {
                const prefix = cfg.configKey?.split(':')[0] || 'Other';
                groups[prefix] = true;
            });
            setExpandedGroups(groups);
        } catch (err) {
            setError('ไม่สามารถดึงข้อมูล Config ได้: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchConfigs(); }, [fetchConfigs]);

    const saveConfig = async (configKey, configValue, description) => {
        setSaving(true);
        try {
            const res = await fetch(`${API_BASE}/api/integration-config`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ configKey, configValue, description }),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            setSuccess(`บันทึก "${configKey}" สำเร็จ ✅`);
            setEditingKey(null);
            setTimeout(() => setSuccess(''), 3000);
            await fetchConfigs();
        } catch (err) {
            setError('บันทึกไม่สำเร็จ: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const deleteConfig = async (configKey) => {
        if (!window.confirm(`ยืนยันลบ "${configKey}" ?`)) return;
        try {
            const res = await fetch(`${API_BASE}/api/integration-config/${encodeURIComponent(configKey)}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            setSuccess(`ลบ "${configKey}" แล้ว`);
            setTimeout(() => setSuccess(''), 3000);
            await fetchConfigs();
        } catch (err) {
            setError('ลบไม่สำเร็จ: ' + err.message);
        }
    };

    const startEdit = (cfg) => {
        setEditingKey(cfg.configKey);
        setEditValue(cfg.configValue || '');
        setEditDesc(cfg.description || '');
    };

    const addNewConfig = async () => {
        if (!newConfig.configKey || !newConfig.configValue) {
            setError('กรุณากรอก Key และ Value');
            return;
        }
        await saveConfig(newConfig.configKey, newConfig.configValue, newConfig.description);
        setNewConfig({ configKey: '', configValue: '', description: '' });
        setShowAddModal(false);
    };

    const isSecret = (key) => {
        const secretKeys = ['password', 'secret', 'token', 'apikey', 'accesstoken'];
        return secretKeys.some((s) => key.toLowerCase().includes(s));
    };

    const toggleSecret = (key) => {
        setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const filtered = configs.filter(
        (c) =>
            c.configKey && c.configKey.trim() !== '' && // ไม่แสดงข้อมูลที่ key ว่าง
            ((c.configKey || '').toLowerCase().includes(search.toLowerCase()) ||
                (c.configValue || '').toLowerCase().includes(search.toLowerCase()) ||
                (c.description || '').toLowerCase().includes(search.toLowerCase()))
    );
    const grouped = groupConfigs(filtered);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-slate-100'}`}>
            {/* Hero + User Badge */}
            <section className="pt-24 sm:pt-32 pb-8 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${isDark ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-800'}`}>
                            <Shield size={16} /> Admin Panel
                        </div>
                    </div>

                    {/* User Info Bar */}
                    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200 shadow-sm'}`}>
                        {user?.profilePicture && (
                            <img src={user.profilePicture} alt="" className="w-7 h-7 rounded-full" />
                        )}
                        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{user?.username}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${user?.role === 'Admin' ? 'bg-green-500/20 text-green-500' : 'bg-slate-500/20 text-slate-500'}`}>
                            {user?.role}
                        </span>
                        <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors" title="ออกจากระบบ">
                            <LogOut size={16} />
                        </button>
                    </div>

                    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ตั้งค่า<span className="text-purple-500">ระบบ</span>
                    </h1>
                    <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        จัดการ Integration Config ทั้งหมด (Email, LINE, Google, AI) จากที่เดียว
                    </p>
                </div>
            </section>


            {/* Alerts */}
            <section className="px-4 sm:px-6">
                <div className="max-w-5xl mx-auto space-y-2">
                    {success && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm">
                            <CheckCircle size={18} /> {success}
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                            <span className="flex items-center gap-2"><AlertCircle size={18} /> {error}</span>
                            <button onClick={() => setError('')}><X size={16} /></button>
                        </div>
                    )}
                </div>
            </section>

            {/* Config Groups */}
            <section className="px-4 sm:px-6 py-6">
                <div className="max-w-5xl mx-auto space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center gap-4 py-20">
                            <RefreshCw size={32} className={`animate-spin ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>กำลังโหลด...</p>
                        </div>
                    ) : Object.keys(grouped).length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-20">
                            <Database size={48} className={isDark ? 'text-slate-600' : 'text-slate-300'} />
                            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>ไม่พบ Config {search && `ที่ตรงกับ "${search}"`}</p>
                        </div>
                    ) : (
                        Object.entries(grouped).map(([group, items]) => (
                            <div key={group} className={`rounded-2xl overflow-hidden border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                                <button onClick={() => setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }))} className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'}`}>
                                    {expandedGroups[group] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    <span className="text-xl">{groupIcons[group] || '⚙️'}</span>
                                    <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{group}</span>
                                    <span className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{items.length} รายการ</span>
                                </button>
                                {expandedGroups[group] && (
                                    <div className={`p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 border-t ${isDark ? 'border-slate-700 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
                                        {items.map((cfg) => (
                                            <div key={cfg.configKey} className={`relative flex flex-col gap-3 p-5 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md group ${isDark ? 'border-slate-700 bg-slate-800/80 hover:border-purple-500/50 hover:bg-slate-800' : 'border-slate-200 bg-white hover:border-purple-400'}`}>
                                                {editingKey === cfg.configKey ? (
                                                    <div className="flex flex-col gap-3 w-full animate-in fade-in zoom-in duration-200">
                                                        <span className={`text-xs font-mono font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{cfg.configKey}</span>
                                                        <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder="Value" className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}`} />
                                                        <input type="text" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Description (ไม่บังคับ)" className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}`} />
                                                        <div className="flex gap-2 mt-1">
                                                            <button onClick={() => saveConfig(cfg.configKey, editValue, editDesc)} disabled={saving} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-md shadow-green-500/20">
                                                                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} บันทึก
                                                            </button>
                                                            <button onClick={() => setEditingKey(null)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}>ยกเลิก</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="flex justify-between items-start gap-4">
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className={`text-sm font-bold truncate mb-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{cfg.configKey}</h4>
                                                                {cfg.description && <p className={`text-xs mt-0.5 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{cfg.description}</p>}
                                                            </div>
                                                            <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 shrink-0 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-slate-200/20 shadow-sm">
                                                                <button onClick={() => startEdit(cfg)} className={`p-1.5 rounded-md transition-all ${isDark ? 'text-slate-400 hover:bg-slate-700 hover:text-blue-400' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'}`} title="แก้ไข"><Edit3 size={14} /></button>
                                                                <button onClick={() => deleteConfig(cfg.configKey)} className={`p-1.5 rounded-md transition-all ${isDark ? 'text-slate-400 hover:bg-slate-700 hover:text-red-400' : 'text-slate-500 hover:bg-red-50 hover:text-red-600'}`} title="ลบ"><Trash2 size={14} /></button>
                                                            </div>
                                                        </div>
                                                        <div className={`mt-2 p-3 rounded-lg border flex items-center justify-between gap-3 ${isDark ? 'bg-slate-900 border-slate-700/50' : 'bg-slate-50 border-slate-200/50'}`}>
                                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                                {isSecret(cfg.configKey) && !showSecrets[cfg.configKey] ? (
                                                                    <p className={`text-sm font-mono tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>••••••••••••</p>
                                                                ) : (
                                                                    <p className={`text-sm font-mono truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{cfg.configValue || '-'}</p>
                                                                )}
                                                            </div>
                                                            {isSecret(cfg.configKey) && (
                                                                <button onClick={() => toggleSecret(cfg.configKey)} className={`shrink-0 p-1.5 rounded-md transition-all ${isDark ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-200 shadow-sm border border-slate-200'}`}>
                                                                    {showSecrets[cfg.configKey] ? <EyeOff size={14} /> : <Eye size={14} />}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* =============================================
                👮 Admin Whitelist Section
            ============================================== */}
            <AdminPanel isDark={isDark} />

            {/* Add Config Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
                    <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}><Plus size={20} className="text-purple-500" /> เพิ่ม Config ใหม่</h3>
                            <button onClick={() => setShowAddModal(false)} className={`p-1 rounded-lg ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-400'}`}><X size={20} /></button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Config Key *</label>
                                <input type="text" value={newConfig.configKey} onChange={(e) => setNewConfig({ ...newConfig, configKey: e.target.value })} placeholder="เช่น Email:SmtpHost" className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-purple-500' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}`} />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Value *</label>
                                <input type="text" value={newConfig.configValue} onChange={(e) => setNewConfig({ ...newConfig, configValue: e.target.value })} placeholder="ค่าที่ต้องการตั้ง" className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-purple-500' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}`} />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Description</label>
                                <input type="text" value={newConfig.description} onChange={(e) => setNewConfig({ ...newConfig, description: e.target.value })} placeholder="คำอธิบาย (ไม่บังคับ)" className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-purple-500' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}`} />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button onClick={addNewConfig} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all">
                                {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />} บันทึก
                            </button>
                            <button onClick={() => setShowAddModal(false)} className={`px-5 py-2.5 rounded-xl font-medium text-sm ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>ยกเลิก</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// =============================================
// 🚀 Main: เช็ค Login ก่อนแสดง Dashboard
// =============================================
const ConfigPage = ({ isDark = false }) => {
    const { isLoggedIn, loading, loginWithGoogle } = useAuth();

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <RefreshCw size={32} className="animate-spin text-purple-500" />
            </div>
        );
    }

    if (!isLoggedIn) {
        return <LoginScreen isDark={isDark} onLogin={loginWithGoogle} />;
    }

    return <ConfigDashboard isDark={isDark} />;
};

export default ConfigPage;
