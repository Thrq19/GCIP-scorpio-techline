import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import {
  LayoutDashboard,
  Recycle,
  Zap,
  Trophy,
  LogOut,
  AlertTriangle,
  Leaf,
  User,
  Activity,
  Truck,
  CheckCircle2,
  ArrowUpDown,
  History,
  ChevronDown,
  Star,
  FileText,
  Coffee,
  Scale,
  Clock,
  MapPin,
  Thermometer,
  Lightbulb,
  Trash2,
  Camera,
  Upload,
  Pencil,
  Check,
  X,
  Bell,
  Search,
  Menu,
  Settings,
  BarChart3,
  Wind,
  Sun,
  Battery,
  MoreHorizontal,
  ChevronRight,
  Download,
  Wifi,
  WifiOff,
  RefreshCw,
  Sliders,
  FileBarChart
} from 'lucide-react';

// --- Types ---
type View = 'login' | 'admin' | 'user';

interface LeaderboardEntry {
  id: number;
  name: string;
  role: string;
  points: number;
  isUser?: boolean;
}

interface EnergyDataPoint {
  time: string;
  kwh: number;
}

interface HistoryEntry {
  id: number;
  action: string;
  date: string;
  points: number;
}

// --- Mock Data & Constants ---
const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { id: 1, name: 'Budi Santoso', role: 'Facility Manager', points: 1500 },
  { id: 2, name: 'Dinda (You)', role: 'Mahasiswa S1', points: 1200, isUser: true },
  { id: 3, name: 'Andi Pratama', role: 'Mahasiswa S2', points: 950 },
  { id: 4, name: 'Siti Aminah', role: 'Staff Admin', points: 820 },
];

const INITIAL_HISTORY: HistoryEntry[] = [
  { id: 1, action: 'Recycled Paper', date: 'Yesterday', points: 15 },
  { id: 2, action: 'Walked to Campus', date: 'Yesterday', points: 50 },
  { id: 3, action: 'Recycled Plastic', date: '2 days ago', points: 20 },
  { id: 4, action: 'Used Shuttle', date: '3 days ago', points: 10 },
  { id: 5, action: 'Recycled Metal', date: '3 days ago', points: 45 },
  { id: 6, action: 'Walked to Campus', date: '4 days ago', points: 50 },
  { id: 7, action: 'Recycled Paper', date: 'Last week', points: 15 },
];

const TRANSPORT_DATA = [
  { name: 'Jalan Kaki', value: 55, color: '#10B981' }, // Emerald-500
  { name: 'Shuttle Listrik', value: 30, color: '#3B82F6' }, // Blue-500
  { name: 'Kendaraan Pribadi', value: 15, color: '#F59E0B' }, // Amber-500
];

const INITIAL_ENERGY_DATA: EnergyDataPoint[] = Array.from({ length: 15 }, (_, i) => ({
  time: `${8 + i}:00`,
  kwh: 120 + Math.random() * 50,
}));

const BUILDING_STATUS = [
  { name: 'Gedung A (Fasilkom)', status: 'normal', load: 45, capacity: 60 },
  { name: 'Gedung B (Teknik)', status: 'normal', load: 52, capacity: 80 },
  { name: 'Rektorat', status: 'warning', load: 92, capacity: 100 },
  { name: 'Library', status: 'normal', load: 35, capacity: 50 },
  { name: 'Gedung C (Science)', status: 'critical', load: 88, capacity: 70 },
];

const RECENT_ALERTS = [
  { id: 1, time: '10:42 AM', title: 'Energy Spike Detected', location: 'Rektorat', level: 'high' },
  { id: 2, time: '09:15 AM', title: 'HVAC Optimization', location: 'Library', level: 'low' },
  { id: 3, time: '08:30 AM', title: 'Solar Array Offline', location: 'Roof Block B', level: 'critical' },
  { id: 4, time: 'Yesterday', title: 'Usage Limit Exceeded', location: 'Gedung C', level: 'medium' },
];

// --- New Mock Data for Admin Tabs ---
const ANALYTICS_DATA = [
  { name: 'Jan', grid: 4000, solar: 2400 },
  { name: 'Feb', grid: 3000, solar: 1398 },
  { name: 'Mar', grid: 2000, solar: 5800 },
  { name: 'Apr', grid: 2780, solar: 3908 },
  { name: 'May', grid: 1890, solar: 4800 },
  { name: 'Jun', grid: 2390, solar: 3800 },
  { name: 'Jul', grid: 3490, solar: 4300 },
];

const DEVICE_LIST = [
  { id: 'IOT-001', name: 'Main Meter - Gedung A', type: 'Smart Meter', status: 'online', lastPing: '2s ago', battery: '100%' },
  { id: 'IOT-002', name: 'HVAC Controller - L2', type: 'HVAC', status: 'online', lastPing: '5s ago', battery: '98%' },
  { id: 'IOT-003', name: 'Solar Inverter B', type: 'Inverter', status: 'maintenance', lastPing: '5m ago', battery: 'N/A' },
  { id: 'IOT-004', name: 'Occupancy Sensor - Lib', type: 'Sensor', status: 'offline', lastPing: '2h ago', battery: '12%' },
  { id: 'IOT-005', name: 'Waste Scale - Canteen', type: 'Scale', status: 'online', lastPing: '10s ago', battery: '85%' },
  { id: 'IOT-006', name: 'Temp Sensor - Server Rm', type: 'Sensor', status: 'online', lastPing: '1s ago', battery: '92%' },
];

const REPORTS_LIST = [
  { id: 1, name: 'Monthly Sustainability Report - October', date: 'Oct 31, 2023', size: '2.4 MB', type: 'PDF' },
  { id: 2, name: 'Q3 Energy Consumption Analysis', date: 'Sep 30, 2023', size: '5.1 MB', type: 'PDF' },
  { id: 3, name: 'Raw Sensor Data Logs (All Campus)', date: 'Oct 15, 2023', size: '128 MB', type: 'CSV' },
  { id: 4, name: 'Carbon Offset Certificate', date: 'Aug 01, 2023', size: '1.2 MB', type: 'PDF' },
  { id: 5, name: 'Waste Management Audit', date: 'Jul 15, 2023', size: '3.5 MB', type: 'PDF' },
];

// --- Application Component ---
const App = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  
  // Admin State
  const [energyData, setEnergyData] = useState<EnergyDataPoint[]>(INITIAL_ENERGY_DATA);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  
  // User State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(5);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // User Forms
  const [wastePhoto, setWastePhoto] = useState<File | null>(null);

  // --- Effects ---

  // Simulated IoT Data Stream for Admin
  useEffect(() => {
    if (currentView !== 'admin') return;

    const interval = setInterval(() => {
      setEnergyData((prev) => {
        const lastTimeStr = prev[prev.length - 1].time;
        const lastHour = parseInt(lastTimeStr.split(':')[0]);
        const nextHour = lastHour >= 23 ? 0 : lastHour + 1;
        const newPoint = {
          time: `${nextHour}:00`,
          kwh: 100 + Math.random() * 100 + (Math.random() > 0.8 ? 150 : 0), // Occasional spike
        };
        // Keep array size constant
        const newData = [...prev.slice(1), newPoint];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentView]);

  // --- Handlers ---

  const handleLogin = (role: 'admin' | 'user') => {
    setCurrentView(role);
  };

  const handleLogout = () => {
    setCurrentView('login');
    setShowSuccessAlert(false);
    setSortOrder('desc');
    setVisibleHistoryCount(5);
    setSidebarOpen(false);
    setActiveAdminTab('dashboard');
  };

  const handlePointsEarned = (points: number, action: string) => {
    setEarnedPoints(points);
    setSuccessMessage(action);
    setShowSuccessAlert(true);
    
    // Update Leaderboard
    setLeaderboard((prev) => 
      prev.map(entry => 
        entry.isUser ? { ...entry, points: entry.points + points } : entry
      ).sort((a, b) => b.points - a.points)
    );

    // Update History
    const newHistoryEntry: HistoryEntry = {
      id: Date.now(),
      action: action,
      date: 'Just now',
      points: points
    };
    setPointsHistory(prev => [newHistoryEntry, ...prev]);

    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  // --- Sub-Components ---

  const LoginScreen = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-2xl">
              <Leaf className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">GCIP</h1>
          </div>
          <p className="text-slate-500 text-lg">Green Campus Intelligence Platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Persona */}
          <button 
            onClick={() => handleLogin('admin')}
            className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 text-left"
          >
            <div className="absolute top-6 right-6 p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-50 transition-colors">
              <LayoutDashboard className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Sarah</h3>
            <p className="text-emerald-600 font-medium text-sm mb-4">Head of Sustainability</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Access real-time monitoring dashboard, energy anomalies, and campus-wide metrics.
            </p>
          </button>

          {/* User Persona */}
          <button 
            onClick={() => handleLogin('user')}
            className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 text-left"
          >
            <div className="absolute top-6 right-6 p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-50 transition-colors">
              <User className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Recycle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Dinda</h3>
            <p className="text-blue-600 font-medium text-sm mb-4">Mahasiswa (User)</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Track waste contributions, earn green points, and compete on the leaderboard.
            </p>
          </button>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => {
    // Current total load (mock based on last data point)
    const currentLoad = Math.round(energyData[energyData.length - 1].kwh * 2.5);
    
    // Local Settings State
    const [settings, setSettings] = useState({
        emailAlerts: true,
        pushNotifications: false,
        autoCalibration: true,
        darkMode: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // --- Tab Renderers ---

    const renderOverview = () => (
      <div className="space-y-6">
        {/* Header Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Campus Overview</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time monitoring and sustainability metrics.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Export Data
            </button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Load */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Current Load</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{currentLoad} <span className="text-sm font-normal text-slate-400">kWh</span></h3>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold border border-emerald-100">
                <Activity className="w-3 h-3" /> Live
              </span>
              <span className="text-xs text-slate-400">Peak expected at 14:00</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 animate-pulse"></div>
          </div>

          {/* Card 2: Carbon */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Carbon Saved</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">1,240 <span className="text-sm font-normal text-slate-400">kg</span></h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-emerald-600 text-xs font-bold">+12%</span>
              <span className="text-xs text-slate-400">vs last week</span>
            </div>
          </div>

          {/* Card 3: Energy Mix */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Renewable Mix</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">32 <span className="text-sm font-normal text-slate-400">%</span></h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Sun className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </div>

          {/* Card 4: System Health */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">System Health</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">98.5 <span className="text-sm font-normal text-slate-400">%</span></h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-slate-500">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Main Visuals Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Energy Consumption</h3>
                <p className="text-sm text-slate-400">Real-time usage across all campuses</p>
              </div>
              <div className="flex bg-slate-100 rounded-lg p-1">
                {['1H', '24H', '7D'].map(range => (
                  <button key={range} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${range === '1H' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData}>
                  <defs>
                    <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#4ADE80' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="kwh" 
                    stroke="#10B981" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorKwh)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Building Status Widget */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Building Status</h3>
            <div className="flex-1 space-y-4">
              {BUILDING_STATUS.map((building, idx) => {
                const percentage = (building.load / building.capacity) * 100;
                const isCritical = building.status === 'critical';
                const isWarning = building.status === 'warning';
                const colorClass = isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500';
                
                return (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">{building.name}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${isCritical ? 'bg-red-100 text-red-600' : isWarning ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {building.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-slate-400">Load</span>
                        <span className="text-xs font-bold text-slate-800">{building.load} / {building.capacity} kW</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-2 rounded-full transition-all duration-500 ${colorClass}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-4 w-full py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              View All Buildings
            </button>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* AI Alerts Feed */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                AI Insights
              </h3>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">4 New</span>
            </div>
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {RECENT_ALERTS.map((alert) => (
                <div key={alert.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors">
                  <div className={`w-2 h-full rounded-full ${alert.level === 'critical' ? 'bg-red-500' : alert.level === 'high' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-0.5">{alert.time}</p>
                    <h4 className="text-sm font-bold text-slate-800">{alert.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {alert.location}
                    </p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 self-center">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Mobility */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
            <h3 className="font-bold text-slate-800 mb-2">Campus Mobility</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TRANSPORT_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {TRANSPORT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-4">
                <Truck className="w-6 h-6 text-slate-300 mx-auto" />
              </div>
            </div>
          </div>

          {/* Weather / Renewable Potential */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Wind className="w-5 h-5 text-emerald-400" /> Site Conditions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-slate-300 text-xs mb-1">
                    <Sun className="w-3 h-3" /> Solar Irradiance
                  </div>
                  <p className="text-xl font-bold">845 <span className="text-xs font-normal">W/m²</span></p>
                  <p className="text-[10px] text-emerald-400">Peak Efficiency</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-slate-300 text-xs mb-1">
                    <Wind className="w-3 h-3" /> Wind Speed
                  </div>
                  <p className="text-xl font-bold">4.2 <span className="text-xs font-normal">m/s</span></p>
                  <p className="text-[10px] text-slate-400">Moderate</p>
                </div>
                <div className="col-span-2 bg-white/10 p-3 rounded-lg backdrop-blur-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-slate-300 text-xs mb-1">
                          <Battery className="w-3 h-3" /> Battery Storage
                      </div>
                      <p className="text-lg font-bold">78% <span className="text-xs font-normal text-slate-400">Charged</span></p>
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                    </div>
                </div>
              </div>
            </div>
            {/* Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          </div>

        </div>
      </div>
    );

    const renderAnalytics = () => (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Energy Analytics</h1>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><FileBarChart className="w-5 h-5" /></div>
               <p className="text-sm font-semibold text-slate-500">Total Consumption</p>
             </div>
             <p className="text-3xl font-bold text-slate-800">18.4 <span className="text-sm font-normal text-slate-400">MWh</span></p>
             <p className="text-xs text-green-600 mt-2 font-medium">↓ 8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Sun className="w-5 h-5" /></div>
               <p className="text-sm font-semibold text-slate-500">Solar Generation</p>
             </div>
             <p className="text-3xl font-bold text-slate-800">6.2 <span className="text-sm font-normal text-slate-400">MWh</span></p>
             <p className="text-xs text-green-600 mt-2 font-medium">↑ 15% efficiency gain</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><Scale className="w-5 h-5" /></div>
               <p className="text-sm font-semibold text-slate-500">Cost Savings</p>
             </div>
             <p className="text-3xl font-bold text-slate-800">$4,290</p>
             <p className="text-xs text-slate-400 mt-2">Year to date</p>
          </div>
        </div>

        {/* Big Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-800 text-lg mb-6">Monthly Energy Mix (Grid vs Solar)</h3>
           <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ANALYTICS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Legend />
                  <Bar dataKey="grid" stackId="a" fill="#3B82F6" name="Grid Usage (kWh)" />
                  <Bar dataKey="solar" stackId="a" fill="#10B981" name="Solar Generation (kWh)" />
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    );

    const renderDevices = () => (
       <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">IoT Device Management</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
               <RefreshCw className="w-4 h-4" /> Refresh Status
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                   <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Device Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Ping</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Battery</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {DEVICE_LIST.map((device) => (
                        <tr key={device.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4">
                              <p className="text-sm font-bold text-slate-800">{device.name}</p>
                              <p className="text-[10px] text-slate-400">{device.id}</p>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-600">{device.type}</td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                 device.status === 'online' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                 device.status === 'offline' ? 'bg-red-50 text-red-700 border-red-100' :
                                 'bg-amber-50 text-amber-700 border-amber-100'
                              }`}>
                                 {device.status === 'online' && <Wifi className="w-3 h-3" />}
                                 {device.status === 'offline' && <WifiOff className="w-3 h-3" />}
                                 {device.status === 'maintenance' && <Sliders className="w-3 h-3" />}
                                 <span className="capitalize">{device.status}</span>
                              </span>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-500">{device.lastPing}</td>
                           <td className="px-6 py-4 text-sm text-slate-500">
                              {device.battery !== 'N/A' ? (
                                 <div className="flex items-center gap-2">
                                    <div className="w-6 h-2 bg-slate-200 rounded-sm overflow-hidden">
                                       <div className={`h-full ${parseInt(device.battery) > 20 ? 'bg-slate-600' : 'bg-red-500'}`} style={{width: device.battery}}></div>
                                    </div>
                                    <span className="text-xs">{device.battery}</span>
                                 </div>
                              ) : (
                                 <span className="text-xs text-slate-300">Hardwired</span>
                              )}
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                 <MoreHorizontal className="w-4 h-4" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
            </div>
         </div>
       </div>
    );

    const renderReports = () => (
       <div className="space-y-6">
         <h1 className="text-2xl font-bold text-slate-800">System Reports</h1>
         <div className="grid grid-cols-1 gap-4">
            {REPORTS_LIST.map((report) => (
               <div key={report.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-emerald-200 transition-colors group">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <FileText className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-800">{report.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                           <span>{report.date}</span>
                           <span>•</span>
                           <span>{report.size}</span>
                           <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-medium">{report.type}</span>
                        </div>
                     </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                     <Download className="w-4 h-4" /> <span className="hidden sm:inline">Download</span>
                  </button>
               </div>
            ))}
         </div>
       </div>
    );

    const renderSettings = () => (
       <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">Platform Settings</h1>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
             {/* Profile Section Mock */}
             <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><User className="w-5 h-5 text-emerald-500" /> Admin Profile</h3>
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-xl font-bold">SJ</div>
                   <div>
                      <p className="font-bold text-slate-800">Sarah Jenkins</p>
                      <p className="text-sm text-slate-500">sarah.j@green.campus.edu</p>
                      <button className="text-xs text-emerald-600 font-medium mt-1 hover:underline">Edit Profile</button>
                   </div>
                </div>
             </div>

             {/* Toggles */}
             <div className="p-6 space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Bell className="w-5 h-5 text-emerald-500" /> Notifications & Alerts</h3>
                
                <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-700">Email Alerts</label>
                      <p className="text-xs text-slate-500">Receive daily summaries and critical alerts via email.</p>
                   </div>
                   <button 
                     onClick={() => toggleSetting('emailAlerts')}
                     className={`w-11 h-6 flex items-center rounded-full transition-colors ${settings.emailAlerts ? 'bg-emerald-500' : 'bg-slate-300'}`}
                   >
                      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                   </button>
                </div>

                <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-700">Push Notifications</label>
                      <p className="text-xs text-slate-500">Real-time mobile alerts for system anomalies.</p>
                   </div>
                   <button 
                     onClick={() => toggleSetting('pushNotifications')}
                     className={`w-11 h-6 flex items-center rounded-full transition-colors ${settings.pushNotifications ? 'bg-emerald-500' : 'bg-slate-300'}`}
                   >
                      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                   </button>
                </div>
             </div>

             <div className="p-6 space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Sliders className="w-5 h-5 text-emerald-500" /> System Preferences</h3>
                
                <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-700">Auto-Calibration</label>
                      <p className="text-xs text-slate-500">Allow AI to automatically adjust sensor thresholds.</p>
                   </div>
                   <button 
                     onClick={() => toggleSetting('autoCalibration')}
                     className={`w-11 h-6 flex items-center rounded-full transition-colors ${settings.autoCalibration ? 'bg-emerald-500' : 'bg-slate-300'}`}
                   >
                      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.autoCalibration ? 'translate-x-6' : 'translate-x-1'}`} />
                   </button>
                </div>

                <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-700">Dark Mode (Beta)</label>
                      <p className="text-xs text-slate-500">Switch dashboard interface to dark theme.</p>
                   </div>
                   <button 
                     onClick={() => toggleSetting('darkMode')}
                     className={`w-11 h-6 flex items-center rounded-full transition-colors ${settings.darkMode ? 'bg-emerald-500' : 'bg-slate-300'}`}
                   >
                      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                   </button>
                </div>
             </div>

             <div className="p-6 bg-slate-50 rounded-b-xl flex justify-end gap-3">
                <button className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800 transition-colors">Cancel</button>
                <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-colors">Save Changes</button>
             </div>
          </div>
       </div>
    );

    return (
      <div className="min-h-screen bg-slate-100 font-sans flex text-slate-900">
        
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
              <Leaf className="w-6 h-6 text-emerald-500" />
              <span className="font-bold text-white text-lg tracking-tight">GCIP <span className="text-slate-600 font-normal">v2.0</span></span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                { id: 'devices', icon: Activity, label: 'IoT Devices' },
                { id: 'reports', icon: FileText, label: 'Reports' },
                { id: 'settings', icon: Settings, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAdminTab(item.id);
                    setSidebarOpen(false); // Auto-close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activeAdminTab === item.id 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.id === 'devices' && <span className="ml-auto bg-slate-800 text-xs px-2 py-0.5 rounded-full text-slate-400">12</span>}
                </button>
              ))}
            </nav>

            {/* Bottom User Profile */}
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">SJ</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Sarah Jenkins</p>
                  <p className="text-[10px] text-slate-500 truncate">Head of Sustainability</p>
                </div>
                <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
          
          {/* Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-slate-500 hover:text-slate-700">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center text-slate-400 text-sm gap-2">
                <span className="text-slate-800 font-medium capitalize">{activeAdminTab}</span>
                {activeAdminTab === 'dashboard' && (
                  <>
                     <ChevronRight className="w-4 h-4" />
                     <span>Overview</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 transition-all"
                />
              </div>
              <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </header>

          {/* Scrollable Dashboard Area */}
          <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div className="max-w-7xl mx-auto">
               {activeAdminTab === 'dashboard' && renderOverview()}
               {activeAdminTab === 'analytics' && renderAnalytics()}
               {activeAdminTab === 'devices' && renderDevices()}
               {activeAdminTab === 'reports' && renderReports()}
               {activeAdminTab === 'settings' && renderSettings()}
            </div>
          </main>
        </div>
      </div>
    );
  };

  const UserApp = () => {
    // --- State for Forms ---
    const [activeTab, setActiveTab] = useState<'waste' | 'energy'>('waste');

    // Waste Form State
    const [wasteType, setWasteType] = useState('plastik');
    const [wasteWeight, setWasteWeight] = useState('');
    const [weightError, setWeightError] = useState('');

    // Energy Form State
    const [building, setBuilding] = useState('Gedung A');
    const [floor, setFloor] = useState('1');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [energyError, setEnergyError] = useState('');
    const [useDefaults, setUseDefaults] = useState(true);
    const [numLights, setNumLights] = useState(36);
    const [numAC, setNumAC] = useState(2);
    const [acTemp, setAcTemp] = useState(24);

    // Goal State
    const [monthlyGoal, setMonthlyGoal] = useState(500);
    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [goalInput, setGoalInput] = useState('500');
    const [totalKwh, setTotalKwh] = useState(324.5); // Initial dummy usage

    // --- Helpers ---

    const calculateDuration = () => {
      if (!startTime || !endTime) return 0;
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      let diff = (end.getTime() - start.getTime()) / 1000 / 60 / 60; // hours
      if (diff < 0) diff += 24; // Handle overnight roughly
      return parseFloat(diff.toFixed(2));
    };

    const calculateKWh = () => {
      const duration = calculateDuration();
      const lights = useDefaults ? 36 : numLights;
      const acs = useDefaults ? 2 : numAC;
      // Formula: ((Lights*18) + (AC*900)) / 1000 * Duration
      const watts = (lights * 18) + (acs * 900);
      return parseFloat(((watts / 1000) * duration).toFixed(3));
    };

    // --- Handlers ---

    const saveGoal = () => {
      const val = parseFloat(goalInput);
      if(!isNaN(val) && val > 0) {
        setMonthlyGoal(val);
        setIsEditingGoal(false);
      }
    };

    const handleSubmitWaste = (e: React.FormEvent) => {
      e.preventDefault();
      const weight = parseFloat(wasteWeight);
      if (!wasteWeight || isNaN(weight) || weight <= 0) {
        setWeightError('Please enter a valid positive weight.');
        return;
      }
      setWeightError('');
      const points = Math.floor(weight * 10);
      handlePointsEarned(points, `Recycled ${wasteType.charAt(0).toUpperCase() + wasteType.slice(1)}`);
      setWasteWeight('');
      setWastePhoto(null);
    };

    const handleSubmitEnergy = (e: React.FormEvent) => {
      e.preventDefault();
      setEnergyError(''); // Reset errors
      
      if (!startTime || !endTime) {
        setEnergyError('Please select both Start and End times.');
        return;
      }

      // Check if end time is after start time (disallowing overnight for simplicity unless date is provided)
      if (endTime <= startTime) {
        setEnergyError('End time must be after Start time.');
        return;
      }

      // Explicitly check duration to be safe
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      const duration = (end.getTime() - start.getTime()) / 1000 / 60 / 60;

      if (duration > 24) {
        setEnergyError('Duration cannot exceed 24 hours.');
        return;
      }
      
      const kwh = calculateKWh();
      setTotalKwh(prev => prev + kwh);
      // Fixed points for energy reporting
      handlePointsEarned(50, `Energy Report (${building})`);
      
      // Reset logic could go here
      setStartTime('');
      setEndTime('');
    };

    // --- Render Logic ---

    // Sort logic for display
    const sortedLeaderboard = [...leaderboard].sort((a, b) => {
      return sortOrder === 'desc' 
        ? b.points - a.points 
        : a.points - b.points;
    });

    const visibleHistory = pointsHistory.slice(0, visibleHistoryCount);
    const hasMoreHistory = pointsHistory.length > visibleHistoryCount;
    
    // Progress calculation
    const userPoints = leaderboard.find(u => u.isUser)?.points || 0;

    const wasteOptions = [
      { id: 'plastik', label: 'Plastik', icon: Coffee, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', activeRing: 'ring-blue-500' },
      { id: 'kertas', label: 'Kertas', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', activeRing: 'ring-amber-500' },
      { id: 'organik', label: 'Organik', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', activeRing: 'ring-green-500' },
      { id: 'residu', label: 'Residu', icon: Trash2, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', activeRing: 'ring-slate-500' },
    ];

    const estimatedPoints = wasteWeight && !isNaN(parseFloat(wasteWeight)) ? Math.floor(parseFloat(wasteWeight) * 10) : 0;
    const duration = calculateDuration();
    const estimatedKWh = calculateKWh();

    return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-emerald-600 text-white p-6 rounded-b-[2rem] shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-emerald-100 text-sm">Welcome back,</p>
                <h2 className="text-2xl font-bold">Dinda</h2>
              </div>
            </div>
            <button onClick={handleLogout} className="text-emerald-100 hover:bg-emerald-700/50 p-2 rounded-full transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider mb-1">Total Green Points</p>
              <h1 className="text-4xl font-bold">{userPoints.toLocaleString()}</h1>
            </div>
            <div className="bg-emerald-500/50 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-emerald-400/30">
              Rank #{leaderboard.findIndex(u => u.isUser) + 1}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative bg-emerald-800/30 p-4 rounded-xl border border-emerald-500/30 backdrop-blur-sm mt-2">
             <div className="flex justify-between items-end mb-2">
               <div className="flex-1">
                  <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-0.5">Monthly Energy Limit</p>
                  
                  {isEditingGoal ? (
                     <div className="flex items-center gap-2 mt-1">
                       <input 
                         type="number" 
                         value={goalInput}
                         onChange={(e) => setGoalInput(e.target.value)}
                         className="w-24 bg-black/20 text-white text-sm border border-emerald-500/50 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-400"
                         autoFocus
                       />
                       <button onClick={saveGoal} className="p-1 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-md text-emerald-300 transition-colors"><Check className="w-3.5 h-3.5" /></button>
                       <button onClick={() => {setIsEditingGoal(false); setGoalInput(monthlyGoal.toString())}} className="p-1 bg-red-500/20 hover:bg-red-500/40 rounded-md text-red-300 transition-colors"><X className="w-3.5 h-3.5" /></button>
                     </div>
                  ) : (
                     <div className="flex items-center gap-2 text-white font-bold text-sm group/edit cursor-pointer w-fit" onClick={() => setIsEditingGoal(true)}>
                        <div className="flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span>{monthlyGoal.toLocaleString()} kWh</span>
                        </div>
                        <Pencil className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover/edit:opacity-100 transition-opacity -ml-1" />
                     </div>
                  )}
               </div>
               <span className={`text-xl font-bold ${totalKwh > monthlyGoal ? 'text-red-300' : 'text-white'}`}>
                 {Math.min(Math.round((totalKwh / monthlyGoal) * 100), 100)}%
               </span>
             </div>
             
             {/* Progress Track with Tooltip */}
             <div className="relative group">
               <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                 <div className="bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-xl border border-white/10 whitespace-nowrap relative">
                    {totalKwh.toFixed(1)} / {monthlyGoal} kWh
                 </div>
               </div>
               
               <div className="w-full bg-black/20 rounded-full h-3 backdrop-blur-sm overflow-hidden border border-white/5 cursor-help">
                 <div 
                   className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)] ${totalKwh > monthlyGoal ? 'bg-gradient-to-r from-red-500 to-red-400' : 'bg-gradient-to-r from-emerald-500 via-emerald-300 to-white'}`}
                   style={{ width: `${Math.min((totalKwh / monthlyGoal) * 100, 100)}%` }}
                 />
               </div>
             </div>
             
             <p className={`text-right text-[10px] mt-2 font-medium ${totalKwh > monthlyGoal ? 'text-red-300' : 'text-emerald-200'}`}>
               {totalKwh > monthlyGoal 
                 ? `${(totalKwh - monthlyGoal).toFixed(1)} kWh over limit`
                 : `${(monthlyGoal - totalKwh).toFixed(1)} kWh remaining`
               }
             </p>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl -ml-4 -mb-4 pointer-events-none"></div>
      </div>

      <div className="px-4 -mt-6 relative z-20 space-y-6">
        
        {/* Action Card with Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => setActiveTab('waste')}
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'waste' ? 'bg-white text-emerald-600 border-b-2 border-emerald-500' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              <Recycle className="w-4 h-4" />
              Waste Log
            </button>
            <button
              onClick={() => setActiveTab('energy')}
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'energy' ? 'bg-white text-emerald-600 border-b-2 border-emerald-500' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" />
              Energy Log
            </button>
          </div>

          <div className="p-5">
            {activeTab === 'waste' ? (
              // --- WASTE FORM ---
              <form onSubmit={handleSubmitWaste} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Waste Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {wasteOptions.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setWasteType(type.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                          wasteType === type.id 
                            ? `${type.border} ${type.bg} ring-1 ${type.activeRing}` 
                            : 'border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                        }`}
                      >
                        <div className={`p-2 rounded-full bg-white/50 ${type.color}`}>
                           <type.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs font-semibold ${wasteType === type.id ? 'text-slate-800' : 'text-slate-500'}`}>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Weight (kg)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Scale className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0.1"
                      placeholder="0.0" 
                      value={wasteWeight}
                      onChange={(e) => {
                        setWasteWeight(e.target.value);
                        if (weightError) setWeightError('');
                      }}
                      className={`w-full pl-10 bg-slate-50 border ${weightError ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500'} text-slate-800 text-lg font-medium rounded-xl focus:ring-4 focus:ring-opacity-20 block p-3.5 outline-none transition-all`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 text-sm font-medium">kg</span>
                    </div>
                  </div>
                  
                  {/* Quick Add Buttons */}
                  <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1 no-scrollbar">
                    {[0.5, 1.0, 2.5, 5.0].map((val) => (
                      <button 
                        key={val}
                        type="button"
                        onClick={() => {
                          setWasteWeight(val.toString());
                          if (weightError) setWeightError('');
                        }}
                        className="flex-shrink-0 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                      >
                        +{val}kg
                      </button>
                    ))}
                  </div>
                  {weightError && (
                    <p className="text-red-500 text-xs mt-1 font-medium animate-in fade-in slide-in-from-top-1">{weightError}</p>
                  )}
                </div>

                {/* Photo Proof */}
                <div>
                   <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Photo Proof (Optional)</label>
                   <div className="relative">
                     <input 
                       type="file" 
                       id="waste-photo-upload" 
                       accept="image/*" 
                       className="hidden"
                       onChange={(e) => {
                         if (e.target.files && e.target.files.length > 0) {
                           setWastePhoto(e.target.files[0]);
                         }
                       }}
                     />
                     
                     {!wastePhoto ? (
                       <label 
                         htmlFor="waste-photo-upload" 
                         className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all gap-2 group cursor-pointer"
                       >
                          <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium">Tap to upload photo evidence</span>
                          <span className="text-[10px] text-slate-300">Supports JPG, PNG (Max 5MB)</span>
                       </label>
                     ) : (
                       <div className="w-full border border-emerald-200 bg-emerald-50/50 rounded-xl p-3 flex items-center justify-between animate-in fade-in zoom-in duration-200">
                          <div className="flex items-center gap-3 overflow-hidden">
                             <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center border border-emerald-100 shadow-sm flex-shrink-0">
                                <Check className="w-5 h-5 text-emerald-500" />
                             </div>
                             <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-emerald-800 truncate block">{wastePhoto.name}</span>
                                <span className="text-[10px] text-emerald-600">{(wastePhoto.size / 1024).toFixed(0)} KB • Ready to upload</span>
                             </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setWastePhoto(null)} 
                            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" /> 
                          </button>
                       </div>
                     )}
                   </div>
                </div>

                <button 
                  type="submit"
                  className="group relative w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div className="flex items-center justify-center relative z-10">
                    <span>Submit Waste Log</span>
                    {estimatedPoints > 0 && (
                       <span className="ml-3 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-xs text-white border border-white/20 animate-in fade-in zoom-in duration-200">
                         +{estimatedPoints} pts
                       </span>
                    )}
                  </div>
                </button>
              </form>
            ) : (
              // --- ENERGY FORM ---
              <form onSubmit={handleSubmitEnergy} className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Building</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <select 
                          value={building}
                          onChange={(e) => setBuilding(e.target.value)}
                          className="w-full pl-9 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none"
                        >
                          <option value="Gedung A">Gedung A</option>
                          <option value="Gedung B">Gedung B</option>
                          <option value="Rektorat">Rektorat</option>
                          <option value="Library">Library</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Floor</label>
                      <select 
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none"
                      >
                        <option value="1">Floor 1</option>
                        <option value="2">Floor 2</option>
                        <option value="3">Floor 3</option>
                        <option value="4">Floor 4</option>
                      </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Start Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input 
                          type="time" 
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full pl-9 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">End Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input 
                          type="time" 
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full pl-9 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none"
                        />
                      </div>
                    </div>
                 </div>

                 {/* Equipment Section */}
                 <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <Lightbulb className="w-4 h-4 text-amber-500" /> Equipment
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Default?</label>
                        <button 
                          type="button"
                          onClick={() => setUseDefaults(!useDefaults)}
                          className={`w-10 h-5 rounded-full p-1 transition-colors ${useDefaults ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        >
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${useDefaults ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>

                    {useDefaults ? (
                       <div className="grid grid-cols-2 gap-3 animate-in fade-in zoom-in duration-200">
                          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm group hover:border-emerald-200 transition-colors cursor-help relative">
                             <div className="flex items-center gap-2 mb-1">
                                <div className="p-1.5 bg-amber-100 rounded-md text-amber-600">
                                   <Lightbulb className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">Lights</span>
                             </div>
                             <p className="text-lg font-bold text-slate-800">36 <span className="text-[10px] font-normal text-slate-400">units</span></p>
                             <div className="mt-1 text-[10px] text-slate-500 leading-tight border-t border-slate-100 pt-1.5 mt-1.5">
                                <span className="font-semibold text-slate-600">Spec:</span> 18W LED Tube
                                <span className="block text-slate-400 mt-0.5 font-normal">Standard classroom config</span>
                             </div>
                          </div>

                          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm group hover:border-emerald-200 transition-colors cursor-help relative">
                             <div className="flex items-center gap-2 mb-1">
                                <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                                   <Wind className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">AC Units</span>
                             </div>
                             <p className="text-lg font-bold text-slate-800">2 <span className="text-[10px] font-normal text-slate-400">units</span></p>
                             <div className="mt-1 text-[10px] text-slate-500 leading-tight border-t border-slate-100 pt-1.5 mt-1.5">
                                <span className="font-semibold text-slate-600">Spec:</span> 900W Split AC
                                <span className="block text-slate-400 mt-0.5 font-normal">Optimal @ 24°C</span>
                             </div>
                          </div>
                       </div>
                    ) : (
                       <div className="space-y-3 animate-in fade-in zoom-in duration-200">
                          <div className="grid grid-cols-2 gap-3">
                             <div>
                               <label className="text-[10px] text-slate-500 uppercase">Lights (Qty)</label>
                               <input type="number" value={numLights} onChange={e => setNumLights(Number(e.target.value))} className="w-full mt-1 p-2 text-sm border rounded-lg" />
                             </div>
                             <div>
                               <label className="text-[10px] text-slate-500 uppercase">AC (Qty)</label>
                               <input type="number" value={numAC} onChange={e => setNumAC(Number(e.target.value))} className="w-full mt-1 p-2 text-sm border rounded-lg" />
                             </div>
                          </div>
                          <div>
                             <label className="text-[10px] text-slate-500 uppercase">AC Temp (°C)</label>
                             <div className="flex items-center gap-2 mt-1">
                               <input type="range" min="16" max="30" value={acTemp} onChange={e => setAcTemp(Number(e.target.value))} className="flex-1" />
                               <span className="text-sm font-bold text-slate-700 w-8">{acTemp}°</span>
                             </div>
                          </div>
                       </div>
                    )}
                 </div>

                 {/* Real-time Calculation Card */}
                 <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Est. Consumption</p>
                      <h3 className="text-2xl font-bold text-emerald-800">{estimatedKWh} <span className="text-sm font-normal">kWh</span></h3>
                      <p className="text-[10px] text-emerald-500 mt-0.5">{duration} hours duration</p>
                    </div>
                    <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                       <Zap className="w-5 h-5 text-emerald-600" />
                    </div>
                 </div>
                 
                 {energyError && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <p className="text-xs font-medium text-red-600">{energyError}</p>
                    </div>
                 )}

                 <p className="text-[10px] text-center text-slate-400 italic">
                    *Data aggregated automatically. Please ensure accuracy.
                 </p>

                 <button 
                  type="submit"
                  className="group relative w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div className="flex items-center justify-center relative z-10">
                    <span>Submit Energy Report</span>
                    <span className="ml-3 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-xs text-white/90 border border-white/10">
                         +50 pts
                    </span>
                  </div>
                </button>
              </form>
            )}
          </div>

          {/* Success Alert */}
          {showSuccessAlert && (
            <div className="mx-5 mb-5 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-emerald-100 p-1.5 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800">Submitted Successfully!</p>
                <p className="text-xs text-emerald-600">
                  {successMessage ? successMessage : `You earned +${earnedPoints} points.`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* History Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {pointsHistory.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-2">No activity yet.</p>
            ) : (
              <>
                {visibleHistory.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div>
                      <p className="text-sm font-semibold text-slate-700 capitalize">{entry.action}</p>
                      <p className="text-[10px] text-slate-400">{entry.date}</p>
                    </div>
                    <div className="text-emerald-600 font-bold text-sm">+{entry.points} pts</div>
                  </div>
                ))}
                
                {hasMoreHistory && (
                  <button 
                    onClick={() => setVisibleHistoryCount(prev => prev + 5)}
                    className="w-full py-2 flex items-center justify-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all mt-2 group"
                  >
                    View More
                    <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Top Contributors
            </h3>
            <button 
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 text-xs font-medium text-slate-500 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortOrder === 'desc' ? 'Points: High to Low' : 'Points: Low to High'}
            </button>
          </div>
          
          <div className="space-y-3">
            {sortedLeaderboard.map((user, idx) => (
              <div 
                key={user.id} 
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  user.isUser 
                    ? 'bg-emerald-50 border border-emerald-100' 
                    : 'bg-white border border-slate-50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    idx === 0 ? 'bg-amber-100 text-amber-700' :
                    idx === 1 ? 'bg-slate-200 text-slate-600' :
                    idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${user.isUser ? 'text-emerald-900' : 'text-slate-700'}`}>
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{user.role}</p>
                  </div>
                </div>
                <div className="font-bold text-slate-800 text-sm">
                  {user.points} <span className="text-[10px] font-normal text-slate-400">pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
  };

  return (
    <>
      {currentView === 'login' && <LoginScreen />}
      {currentView === 'admin' && <AdminDashboard />}
      {currentView === 'user' && <UserApp />}
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);