const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

export const api = {
    // History
    getHistory: () => fetch(`${API_URL}/history`).then(res => res.json()),
    addHistory: (data) => fetch(`${API_URL}/history`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(res => res.json()),
    deleteHistory: (id) => fetch(`${API_URL}/history/${id}`, { method: 'DELETE', headers: getHeaders() }).then(res => res.json()),

    // Manifesto
    getManifesto: () => fetch(`${API_URL}/manifesto/stats`).then(res => res.json().then(stats => fetch(`${API_URL}/manifesto`).then(r => r.json()).then(items => ({ stats, items })))),
    getAllManifesto: () => fetch(`${API_URL}/manifesto`).then(res => res.json()), // Fallback
    addManifesto: (data) => fetch(`${API_URL}/manifesto`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(res => res.json()),
    deleteManifesto: (id) => fetch(`${API_URL}/manifesto/${id}`, { method: 'DELETE', headers: getHeaders() }).then(res => res.json()),

    // Investment
    getInvestments: () => fetch(`${API_URL}/investments`).then(res => res.json()),
    addInvestment: (data) => fetch(`${API_URL}/investments`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(res => res.json()),
    deleteInvestment: (id) => fetch(`${API_URL}/investments/${id}`, { method: 'DELETE', headers: getHeaders() }).then(res => res.json()),

    // Contact
    sendMessage: (data) => fetch(`${API_URL}/contact`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(res => res.json()),

    // Auth
    login: (data) => fetch(`${API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    }),
    verifyToken: () => fetch(`${API_URL}/auth/verify`, { headers: getHeaders() }).then(res => res.json())
};
