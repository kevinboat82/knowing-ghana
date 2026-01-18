import React, { useState, useEffect } from 'react';
import {
    Clock, BookOpen, TrendingUp, Menu, X,
    Briefcase, Building2, History, ChevronRight,
    FileText, CheckCircle, AlertCircle, BarChart3,
    Search, Download, Share2, Mail, Phone, MapPin,
    Users, Globe, ArrowRight, Info, Plus, Trash2,
    Lock, LogOut, Settings, Loader2
} from 'lucide-react';
import { api } from './api';

// --- COMPONENTS ---

const Navbar = ({ activePage, setPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = ['home', 'history', 'government', 'invest', 'about', 'contact'];

    return (
        <nav className="sticky top-0 z-50 glass-panel border-b border-gray-200/50">
            <div className="container mx-auto px-4 lg:px-8 h-16 flex justify-between items-center">
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setPage('home')}
                >
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                        ★
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors">Knowing Ghana</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => setPage(item)}
                            className={`nav-link capitalize ${activePage === item ? 'active' : ''}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden glass-panel border-t border-gray-100 absolute w-full animate-fade-in-up">
                    <div className="flex flex-col p-2 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    setPage(item);
                                    setIsMenuOpen(false);
                                }}
                                className={`capitalize text-left px-4 py-3 rounded-xl transition-colors ${activePage === item ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50 text-gray-600'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

// --- PAGES ---

const HomePage = ({ setPage }) => (
    <div className="font-sans">
        {/* Hero Section */}
        <div className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1532302989216-413e636fc18e?auto=format&fit=crop&q=80&w=2000"
                    alt="Ghana Landscape"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--apple-gray-50)] via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up space-y-8">
                <span className="inline-block py-1.5 px-4 rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-gray-900 text-xs font-bold tracking-wide uppercase">
                    Republic of Ghana
                </span>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 leading-[0.9]">
                    Akwaaba to the <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#006B3F]">Center of the World</span>
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-500 font-light leading-relaxed">
                    Explore the rich history, track the 2025 governance agenda, and discover investment opportunities in West Africa's most stable democracy.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <button
                        onClick={() => setPage('history')}
                        className="apple-button bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        <History className="w-5 h-5" /> Explore History
                    </button>
                    <button
                        onClick={() => setPage('invest')}
                        className="apple-button bg-white text-black border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                        <TrendingUp className="w-5 h-5" /> Invest Now
                    </button>
                </div>
            </div>
        </div>

        {/* Quick Stats Section */}
        <div className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Population', value: '34M+' },
                        { label: 'Regions', value: '16' },
                        { label: 'Capital', value: 'Accra' },
                        { label: 'GDP Growth', value: '5.6%' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group cursor-default">
                            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 tracking-tighter group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const HistoryPage = ({ loading, historyData }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredHistory = historyData.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.year.includes(searchTerm)
    );

    return (
        <div className="container mx-auto px-4 py-12 pb-24">
            <div className="text-center mb-20 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Ghanaian Odyssey</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                    From ancient kingdoms to a modern democratic republic.
                </p>

                <div className="mt-8 max-w-md mx-auto relative group">
                    <input
                        type="text"
                        placeholder="Search history..."
                        className="apple-input pl-11"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-[var(--apple-blue)] transition-colors" />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-8">
                    {filteredHistory.map((event, index) => (
                        <div key={event.id} className="apple-card p-0 flex flex-col md:flex-row overflow-hidden group">
                            <div className="md:w-2/5 relative overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                    {event.year}
                                </div>
                            </div>
                            <div className="p-8 md:w-3/5 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                                <p className="text-gray-500 leading-relaxed mb-6">{event.desc}</p>
                                <button className="self-start text-[var(--apple-blue)] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    Read more <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const GovernmentPage = ({ loading, manifestoData }) => {
    const [filter, setFilter] = useState('all');

    const getStatusColor = (status) => {
        if (status === 'completed') return 'bg-[var(--apple-green)]';
        if (status === 'in_progress') return 'bg-[var(--apple-orange)]';
        return 'bg-[var(--apple-gray-300)]';
    };

    const overallProgress = manifestoData.length > 0
        ? (manifestoData.reduce((acc, curr) => acc + parseInt(curr.progress), 0) / manifestoData.length).toFixed(1)
        : 0;

    return (
        <div className="container mx-auto px-4 py-12 pb-24">
            <div className="apple-card p-8 mb-12 bg-gradient-to-br from-gray-900 to-black text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2 opacity-80">
                            <Briefcase className="w-6 h-6" />
                            <span className="uppercase tracking-widest text-sm font-bold">Government Watch</span>
                        </div>
                        <h2 className="text-3xl font-bold">Manifesto Tracker 2025</h2>
                        <p className="text-gray-400 mt-2">Administration: H.E. John Dramani Mahama</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                        <span className="text-sm text-gray-300 font-medium block mb-1">Overall Fulfillment</span>
                        <div className="text-4xl font-bold tracking-tight">{overallProgress}%</div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                    {['all', 'Economy', 'Agriculture', 'Infrastructure', 'Health', 'Education'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {cat === 'all' ? 'All Policies' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {manifestoData
                        .filter(item => filter === 'all' || item.category === filter)
                        .map((item) => (
                            <div key={item.id} className="apple-card p-6 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200 px-2 py-1 rounded">
                                            {item.category}
                                        </span>
                                        {item.status !== 'pending' && (
                                            <span className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.policy}</h3>
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{item.details}</p>
                                </div>

                                <div>
                                    <div className="mb-2 flex justify-between text-xs font-medium text-gray-400">
                                        <span>Progress</span>
                                        <span>{item.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${getStatusColor(item.status)}`}
                                            style={{ width: `${item.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

const InvestmentPage = ({ loading, investmentData }) => {
    const [investment, setInvestment] = useState(100000);
    const [sector, setSector] = useState('Manufacturing');

    const calculateROI = () => {
        let rate = 0.15; // default
        if (sector === 'Manufacturing') rate = 0.20;
        if (sector === 'Agro-Processing') rate = 0.22;
        if (sector.includes('ICT')) rate = 0.25;

        return Math.floor(investment * rate);
    };

    return (
        <div className="container mx-auto px-4 py-12 pb-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Invest in Ghana</h2>
                <p className="text-xl text-gray-500">Gateway to West Africa | 34M+ Market | Stable Democracy</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? (
                        <div className="col-span-2 flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        </div>
                    ) : investmentData.map((sect) => (
                        <div key={sect.id} className="apple-card p-6 group cursor-pointer hover:border-[var(--apple-blue)]/30">
                            <div className="w-12 h-12 bg-blue-50 text-[var(--apple-blue)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{sect.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{sect.desc}</p>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-[var(--apple-green)] text-xs font-bold">
                                <CheckCircle className="w-3 h-3" /> Avg ROI: {sect.roi}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="apple-card p-8 bg-gray-900 text-white h-fit shadow-2xl shadow-blue-900/10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[var(--apple-yellow)]" />
                        ROI Calculator
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Investment (USD)</label>
                            <input
                                type="number"
                                value={investment}
                                onChange={(e) => setInvestment(Number(e.target.value))}
                                className="w-full bg-gray-800 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-[var(--apple-blue)] outline-none font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Sector</label>
                            <select
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                className="w-full bg-gray-800 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-[var(--apple-blue)] outline-none appearance-none"
                            >
                                <option>Manufacturing</option>
                                <option>Agro-Processing</option>
                                <option>Fintech & ICT</option>
                                <option>Tourism</option>
                            </select>
                        </div>

                        <div className="pt-8 mt-2 border-t border-gray-800">
                            <div className="text-xs text-gray-400 mb-1">Estimated Year 1 Returns</div>
                            <div className="text-4xl font-bold text-[var(--apple-green)] tracking-tight">
                                ${calculateROI().toLocaleString()}
                            </div>
                        </div>

                        <button className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3.5 rounded-xl transition mt-4">
                            Download Investment Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        api.sendMessage(formData).then(() => {
            setSending(false);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        }).catch(() => setSending(false));
    };

    return (
        <div className="container mx-auto px-4 py-16 font-sans max-w-5xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-gray-500 text-lg">We'd love to hear from you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div className="apple-card p-6 flex gap-4 items-start">
                        <div className="w-10 h-10 bg-blue-50 text-[var(--apple-blue)] rounded-full flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Millennium Heights Building<br />
                                Independence Avenue, Airport City<br />
                                Accra, Ghana
                            </p>
                        </div>
                    </div>
                    <div className="apple-card p-6 flex gap-4 items-start">
                        <div className="w-10 h-10 bg-green-50 text-[var(--apple-green)] rounded-full flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Email Us</h3>
                            <p className="text-gray-500 text-sm">info@knowingghana.com</p>
                        </div>
                    </div>
                </div>

                <div className="apple-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {success && (
                            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm text-center font-medium">
                                Message sent successfully!
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Name</label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                type="text"
                                className="apple-input"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Email</label>
                            <input
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                type="email"
                                className="apple-input"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Message</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                rows="4"
                                className="apple-input resize-none"
                                placeholder="How can we help?"
                            ></textarea>
                        </div>
                        <button
                            disabled={sending}
                            type="submit"
                            className="w-full bg-[var(--apple-blue)] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

// --- ADMIN PAGE COMPONENT ---

const AdminPage = ({ refreshData }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [activeTab, setActiveTab] = useState('history');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Data states for admin view
    const [adminHistory, setAdminHistory] = useState([]);
    const [adminManifesto, setAdminManifesto] = useState([]);
    const [adminInvestments, setAdminInvestments] = useState([]);

    // Forms
    const [newHistory, setNewHistory] = useState({ year: '', title: '', desc: '', image: '' });
    const [newManifesto, setNewManifesto] = useState({ policy: '', category: 'Economy', status: 'started', progress: 0, details: '' });
    const [newInvestment, setNewInvestment] = useState({ title: '', desc: '', roi: '' });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await api.verifyToken();
            if (res.valid) {
                setIsAuthenticated(true);
                loadAdminData();
            }
        } catch (e) {
            setIsAuthenticated(false);
        }
    };

    const loadAdminData = async () => {
        setLoading(true);
        try {
            const [h, m, i] = await Promise.all([
                api.getHistory(),
                api.getAllManifesto(),
                api.getInvestments()
            ]);
            setAdminHistory(h);
            setAdminManifesto(m);
            setAdminInvestments(i);
        } catch (e) {
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await api.login(credentials);
            if (res.token) {
                localStorage.setItem('adminToken', res.token);
                setIsAuthenticated(true);
                loadAdminData();
            }
        } catch (e) {
            setError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
    };

    // CRUD Handlers
    const handleAddHistory = async () => {
        if (!newHistory.title) return;
        await api.addHistory(newHistory);
        setNewHistory({ year: '', title: '', desc: '', image: '' });
        loadAdminData();
        refreshData();
    };

    const handleDeleteHistory = async (id) => {
        if (confirm('Delete this event?')) {
            await api.deleteHistory(id);
            loadAdminData();
            refreshData();
        }
    };

    // ... (Similar handlers for Manifesto and Investment - simplified for brevity)
    const handleAddManifesto = async () => {
        if (!newManifesto.policy) return;
        await api.addManifesto(newManifesto);
        setNewManifesto({ policy: '', category: 'Economy', status: 'started', progress: 0, details: '' });
        loadAdminData();
        refreshData();
    }

    const handleDeleteManifesto = async (id) => {
        if (confirm('Delete this policy?')) {
            await api.deleteManifesto(id);
            loadAdminData();
            refreshData();
        }
    }

    const handleAddInvestment = async () => {
        if (!newInvestment.title) return;
        await api.addInvestment(newInvestment);
        setNewInvestment({ title: '', desc: '', roi: '' });
        loadAdminData();
        refreshData();
    }

    const handleDeleteInvestment = async (id) => {
        if (confirm('Delete this sector?')) {
            await api.deleteInvestment(id);
            loadAdminData();
            refreshData();
        }
    }


    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="apple-card p-10 max-w-sm w-full mx-4">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/20">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold">Admin Portal</h2>
                        <p className="text-gray-500 text-sm mt-2">Sign in to manage content</p>
                    </div>
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-6">{error}</div>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            className="apple-input"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        />
                        <input
                            type="password"
                            className="apple-input"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                        <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2 px-2">
                    <Settings className="w-5 h-5" /> Dashboard
                </h3>
                <div className="space-y-1 flex-1">
                    {['history', 'manifesto', 'investments'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-4 py-2.5 rounded-lg capitalize text-sm font-medium transition-colors ${activeTab === tab ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8 capitalize">Manage {activeTab}</h1>

                {/* History Management */}
                {activeTab === 'history' && (
                    <div className="space-y-8">
                        <div className="apple-card p-6">
                            <h3 className="font-bold text-lg mb-4">Add Event</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input placeholder="Year" className="apple-input" value={newHistory.year} onChange={e => setNewHistory({ ...newHistory, year: e.target.value })} />
                                <input placeholder="Title" className="apple-input" value={newHistory.title} onChange={e => setNewHistory({ ...newHistory, title: e.target.value })} />
                                <input placeholder="Image URL" className="apple-input md:col-span-2" value={newHistory.image} onChange={e => setNewHistory({ ...newHistory, image: e.target.value })} />
                                <textarea placeholder="Description" className="apple-input md:col-span-2" rows="3" value={newHistory.desc} onChange={e => setNewHistory({ ...newHistory, desc: e.target.value })} />
                            </div>
                            <button onClick={handleAddHistory} className="mt-4 bg-black text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-800">
                                <Plus className="w-4 h-4" /> Add Event
                            </button>
                        </div>
                        <div className="space-y-4">
                            {adminHistory.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
                                    <div>
                                        <div className="font-bold">{item.title}</div>
                                        <div className="text-sm text-gray-500">{item.year}</div>
                                    </div>
                                    <button onClick={() => handleDeleteHistory(item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Manifesto Management */}
                {activeTab === 'manifesto' && (
                    <div className="space-y-8">
                        <div className="apple-card p-6">
                            <h3 className="font-bold text-lg mb-4">Add Promise</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input placeholder="Policy" className="apple-input" value={newManifesto.policy} onChange={e => setNewManifesto({ ...newManifesto, policy: e.target.value })} />
                                <select className="apple-input" value={newManifesto.category} onChange={e => setNewManifesto({ ...newManifesto, category: e.target.value })}>
                                    <option>Economy</option>
                                    <option>Agriculture</option>
                                    <option>Infrastructure</option>
                                    <option>Health</option>
                                    <option>Education</option>
                                </select>
                                <input type="number" placeholder="Progress %" className="apple-input" value={newManifesto.progress} onChange={e => setNewManifesto({ ...newManifesto, progress: e.target.value })} />
                                <textarea placeholder="Details" className="apple-input md:col-span-2" rows="2" value={newManifesto.details} onChange={e => setNewManifesto({ ...newManifesto, details: e.target.value })} />
                            </div>
                            <button onClick={handleAddManifesto} className="mt-4 bg-[var(--apple-green)] text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Policy
                            </button>
                        </div>
                        <div className="space-y-4">
                            {adminManifesto.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
                                    <div>
                                        <div className="font-bold">{item.policy}</div>
                                        <div className="text-sm text-gray-500">{item.category} • {item.progress}%</div>
                                    </div>
                                    <button onClick={() => handleDeleteManifesto(item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Investment Management */}
                {activeTab === 'investments' && (
                    <div className="space-y-8">
                        <div className="apple-card p-6">
                            <h3 className="font-bold text-lg mb-4">Add Sector</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <input placeholder="Sector Title" className="apple-input" value={newInvestment.title} onChange={e => setNewInvestment({ ...newInvestment, title: e.target.value })} />
                                <input placeholder="ROI Description" className="apple-input" value={newInvestment.roi} onChange={e => setNewInvestment({ ...newInvestment, roi: e.target.value })} />
                                <textarea placeholder="Description" className="apple-input" rows="2" value={newInvestment.desc} onChange={e => setNewInvestment({ ...newInvestment, desc: e.target.value })} />
                            </div>
                            <button onClick={handleAddInvestment} className="mt-4 bg-[var(--apple-blue)] text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Sector
                            </button>
                        </div>
                        <div className="space-y-4">
                            {adminInvestments.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
                                    <div>
                                        <div className="font-bold">{item.title}</div>
                                        <div className="text-sm text-gray-500">{item.roi}</div>
                                    </div>
                                    <button onClick={() => handleDeleteInvestment(item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function App() {
    const [page, setPage] = useState('home');
    const [loading, setLoading] = useState(true);

    // Data States
    const [historyData, setHistoryData] = useState([]);
    const [manifestoData, setManifestoData] = useState([]);
    const [investmentData, setInvestmentData] = useState([]);

    const fetchData = async () => {
        try {
            const [h, m, i] = await Promise.all([
                api.getHistory(),
                api.getAllManifesto(),
                api.getInvestments()
            ]);
            setHistoryData(h);
            setManifestoData(m);
            setInvestmentData(i);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="min-h-screen flex flex-col bg-[var(--apple-gray-50)] text-gray-900 font-sans selection:bg-[var(--apple-blue)] selection:text-white">
            {page !== 'admin' && <Navbar activePage={page} setPage={setPage} />}

            <main className="flex-grow">
                {page === 'home' && <HomePage setPage={setPage} />}
                {page === 'history' && <HistoryPage loading={loading} historyData={historyData} />}
                {page === 'government' && <GovernmentPage loading={loading} manifestoData={manifestoData} />}
                {page === 'invest' && <InvestmentPage loading={loading} investmentData={investmentData} />}
                {page === 'contact' && <ContactPage />}
                {page === 'admin' && <AdminPage refreshData={fetchData} />}

                {page === 'about' && (
                    <div className="container mx-auto px-4 py-24 text-center">
                        <h1 className="text-5xl font-bold mb-8 tracking-tight">Our Mission</h1>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            To provide a transparent, data-driven window into the Republic of Ghana, empowering citizens and investors alike.
                        </p>
                    </div>
                )}
            </main>

            {page !== 'admin' && (
                <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-500 text-sm">© 2025 Knowing Ghana Project. All rights reserved.</p>
                    </div>
                </footer>
            )}
        </div>
    );
}