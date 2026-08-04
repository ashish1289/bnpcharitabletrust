import React, { useEffect, useState, useCallback } from 'react';
import { Search, LogOut, FileText, CheckCircle, XCircle, Clock, Eye, Download, User, ChevronLeft, ChevronRight, Filter, X, Users, AlertCircle, BookOpen, Settings as SettingsIcon, LayoutDashboard, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api';
import AdminSettings from './AdminSettings';
import { generatePDF } from '../../utils/generatePDF';

const API_BASE_URL = import.meta.env.PROD ? 'https://app.bnptrust.in/api' : 'http://localhost:5000/api';

const ScholarshipAdminPanel = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [admin, setAdmin] = useState(null);
  
  // Pagination & Filtering State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [uniqueCourses, setUniqueCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Detail view modal state
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState('personal'); // inside modal
  const [sidebarTab, setSidebarTab] = useState('applications'); // 'applications', 'ineligible', 'settings'
  const [viewingDocument, setViewingDocument] = useState(null);

  // Stats state
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, approved: 0, rejected: 0, draft: 0 });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getApplications({
        page,
        limit: 20,
        status: statusFilter,
        course: courseFilter,
        search: debouncedSearch,
        isEligible: sidebarTab === 'ineligible' ? false : true
      });
      // The API now returns { applications, total, page, pages }
      if (data && Array.isArray(data.applications)) {
        setApplications(data.applications);
        setTotalPages(data.pages || 1);
      } else if (Array.isArray(data)) {
        setApplications(data); // Fallback if API hasn't updated yet
      } else {
        setApplications([]);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, courseFilter, debouncedSearch, sidebarTab]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getScholarshipStats();
      if (data) setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const courses = await api.getUniqueCourses();
      if (Array.isArray(courses)) setUniqueCourses(courses);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const data = await api.getCurrentUser();
        if (data.user.role !== 'admin') {
          window.location.href = '/scholarship-info';
          return;
        }
        setAdmin(data.user);
        fetchApplications();
        fetchStats();
        fetchCourses();
      } catch {
        setMessage('Please log in as admin first.');
        setLoading(false);
      }
    };
    checkAdmin();
  }, [fetchApplications, fetchStats, fetchCourses]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedApp]);

  const updateStatus = async (id, status, currentNotes) => {
    try {
      const updated = await api.updateApplicationStatus(id, { status, adminNotes: currentNotes });
      setMessage(`Status updated to ${status}`);
      if (selectedApp?._id === id) {
        setSelectedApp(updated.application);
      }
      fetchApplications();
      fetchStats();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleNotesChange = async (e) => {
    const notes = e.target.value;
    setSelectedApp(prev => ({ ...prev, adminNotes: notes }));
  };

  const saveNotes = async () => {
    if (!selectedApp) return;
    try {
      await api.updateApplicationStatus(selectedApp._id, { status: selectedApp.status, adminNotes: selectedApp.adminNotes });
      setMessage('Notes saved successfully');
      fetchApplications();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save notes');
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {
      // ignore errors
    }
    window.localStorage.removeItem('bnpAuthUser');
    window.location.href = '/admin/login';
  };

  const renderDocumentButton = (title, documentKey) => {
    if (!documentKey) return (
      <div className="border border-gray-200 p-5 rounded-xl bg-gray-50 flex flex-col items-center text-center opacity-70">
        <span className="font-semibold text-sm mb-3 text-gray-500">{title}</span>
        <span className="text-gray-400 text-xs py-2 font-medium">Not Provided</span>
      </div>
    );
    
    const url = `${API_BASE_URL}/scholarships/documents/${documentKey}`;
    
    return (
      <div className="border border-blue-100 p-5 rounded-xl bg-blue-50/30 flex flex-col items-center text-center transition hover:shadow-md hover:bg-blue-50">
        <span className="font-bold text-sm mb-3 text-blue-900">{title}</span>
        <button 
          onClick={() => setViewingDocument({ title, url })} 
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F72CE] text-white rounded-lg text-sm font-semibold hover:bg-[#0A4C8B] w-full transition shadow-sm"
        >
          <Eye size={16} /> View Document
        </button>
      </div>
    );
  };

  if (loading && !applications.length && sidebarTab !== 'settings') return <div className="p-8 flex justify-center items-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>;

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'education', label: 'Education' },
    { id: 'family', label: 'Family & Finance' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'statement', label: 'Statement' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Navbar */}
      <nav className="bg-[#0F72CE] text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <User size={24} />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-wide">BNP Trust</h1>
            <p className="text-xs font-medium text-blue-100 uppercase tracking-widest">Admin Portal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold">{admin?.name || 'Admin User'}</p>
            <p className="text-xs text-blue-200">{admin?.email}</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition text-sm font-bold border border-white/20 shadow-sm"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto w-full p-4 md:p-6 flex-1 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <button 
            onClick={() => { setSidebarTab('applications'); setPage(1); }}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-left ${sidebarTab === 'applications' ? 'bg-[#0F72CE] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            <LayoutDashboard size={20} /> Eligible Applications
          </button>
          <button 
            onClick={() => { setSidebarTab('ineligible'); setPage(1); }}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-left ${sidebarTab === 'ineligible' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            <ShieldAlert size={20} /> Ineligible Queue
          </button>
          <button 
            onClick={() => setSidebarTab('settings')}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-left ${sidebarTab === 'settings' ? 'bg-gray-800 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            <SettingsIcon size={20} /> Platform Settings
          </button>
        </div>

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0">
          {message && (
            <div className="mb-6 rounded-xl bg-blue-50 border border-blue-100 p-4 text-blue-700 font-medium flex items-center gap-3 shadow-sm">
              <CheckCircle size={20} className="text-blue-500 shrink-0" />
              {message}
            </div>
          )}

          {sidebarTab === 'settings' ? (
            <AdminSettings />
          ) : (
            <>
              {/* KPI Cards (Only for Applications view, not Ineligible) */}
              {sidebarTab === 'applications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div 
                    onClick={() => { setStatusFilter('all'); setPage(1); }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm flex items-center gap-4 ${statusFilter === 'all' ? 'bg-blue-50 border-blue-200 shadow-md ring-2 ring-blue-500 ring-offset-2' : 'bg-white border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className={`p-3 rounded-xl ${statusFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-blue-50 text-[#0F72CE]'}`}>
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total</p>
                      <p className="text-xl font-black text-gray-900">{stats.total}</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setStatusFilter('pending'); setPage(1); }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm flex items-center gap-4 ${statusFilter === 'pending' ? 'bg-amber-50 border-amber-200 shadow-md ring-2 ring-amber-500 ring-offset-2' : 'bg-white border-gray-200 hover:border-amber-300'}`}
                  >
                    <div className={`p-3 rounded-xl ${statusFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600'}`}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Under Process</p>
                      <p className="text-xl font-black text-gray-900">{stats.pending + stats.reviewed}</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setStatusFilter('approved'); setPage(1); }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm flex items-center gap-4 ${statusFilter === 'approved' ? 'bg-green-50 border-green-200 shadow-md ring-2 ring-green-500 ring-offset-2' : 'bg-white border-gray-200 hover:border-green-300'}`}
                  >
                    <div className={`p-3 rounded-xl ${statusFilter === 'approved' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600'}`}>
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Approved</p>
                      <p className="text-xl font-black text-gray-900">{stats.approved}</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setStatusFilter('rejected'); setPage(1); }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm flex items-center gap-4 ${statusFilter === 'rejected' ? 'bg-red-50 border-red-200 shadow-md ring-2 ring-red-500 ring-offset-2' : 'bg-white border-gray-200 hover:border-red-300'}`}
                  >
                    <div className={`p-3 rounded-xl ${statusFilter === 'rejected' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-600'}`}>
                      <XCircle size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Rejected</p>
                      <p className="text-xl font-black text-gray-900">{stats.rejected}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content Area (Table) */}
              <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <FileText size={20} className="text-[#0F72CE]" />
            All Applications
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-wrap">
            <div className="relative w-full sm:w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F72CE] transition"
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select 
                value={statusFilter} 
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="w-full sm:w-40 pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F72CE] appearance-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="relative w-full sm:w-auto">
              <BookOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select 
                value={courseFilter} 
                onChange={(e) => { setCourseFilter(e.target.value); setPage(1); }}
                className="w-full sm:w-48 pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F72CE] appearance-none cursor-pointer"
              >
                <option value="all">All Courses</option>
                {uniqueCourses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="p-5 font-semibold">Applicant Name</th>
                <th className="p-5 font-semibold">Contact</th>
                <th className="p-5 font-semibold">Course</th>
                <th className="p-5 font-semibold">Date Applied</th>
                <th className="p-5 font-semibold text-center">Status</th>
                <th className="p-5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-5">
                    <div className="font-bold text-gray-900 text-base">{app.personalDetails?.fullName || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{app.personalDetails?.gender} • DOB: {app.personalDetails?.dateOfBirth}</div>
                  </td>
                  <td className="p-5">
                    <div className="font-medium text-gray-800">{app.personalDetails?.emailAddress}</div>
                    <div className="text-gray-500">{app.personalDetails?.mobileNumber}</div>
                  </td>
                  <td className="p-5">
                    <div className="font-medium text-gray-800">{app.educationalRecord?.courseName || 'N/A'}</div>
                    <div className="text-gray-500 truncate max-w-[200px]">{app.educationalRecord?.institutionNameAddress || 'N/A'}</div>
                  </td>
                  <td className="p-5 font-medium text-gray-600">
                    {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-5 text-center">
                    <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border
                      ${app.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                        app.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                        app.status === 'draft' ? 'bg-gray-50 text-gray-600 border-gray-200' : 
                        app.status === 'reviewed' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-5 text-right flex items-center justify-end gap-2">
                    <button 
                      onClick={() => generatePDF(app)}
                      className="p-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition shadow-sm"
                      title="Download PDF"
                    >
                      <Download size={18} />
                    </button>
                    <button 
                      onClick={() => { setSelectedApp(app); setActiveTab('personal'); }}
                      className="px-4 py-2 bg-white border border-gray-200 text-[#0F72CE] font-bold rounded-lg hover:bg-blue-50 hover:border-blue-200 transition shadow-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-16 text-center text-gray-500 font-medium text-lg">
                    No applications match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <button 
              disabled={page <= 1} 
              onClick={() => setPage(p => p - 1)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 font-medium text-gray-700 transition shadow-sm"
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <span className="text-gray-600 font-medium">Page <span className="font-bold text-gray-900">{page}</span> of {totalPages}</span>
            <button 
              disabled={page >= totalPages} 
              onClick={() => setPage(p => p + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 font-medium text-gray-700 transition shadow-sm"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
      </>
    )}
  </div>

      {/* --- MODAL FOR DETAIL VIEW --- */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedApp(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10 shrink-0">
                <div>
                  <h3 className="font-extrabold text-2xl text-gray-900">{selectedApp.personalDetails?.fullName}</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">{selectedApp.personalDetails?.emailAddress} • Applied on {new Date(selectedApp.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-2">Status:</span>
                    <select
                      className="rounded-lg border-none p-2 bg-white text-sm font-bold text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-[#0F72CE] cursor-pointer"
                      value={selectedApp.status}
                      onChange={(e) => updateStatus(selectedApp._id, e.target.value, selectedApp.adminNotes)}
                    >
                      <option value="draft">Draft</option>
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => generatePDF(selectedApp)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0F72CE] text-white font-bold rounded-xl hover:bg-[#0A4C8B] transition shadow-sm"
                  >
                    <Download size={18} /> <span className="hidden sm:inline">Download PDF</span>
                  </button>
                  <button 
                    onClick={() => setSelectedApp(null)} 
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Tabs */}
              <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50 shrink-0 hide-scrollbar px-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === tab.id 
                        ? 'border-[#0F72CE] text-[#0F72CE] bg-white' 
                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
                
                {/* Internal Notes Section (Always visible at top of modal tabs) */}
                <div className="mb-8 p-5 bg-amber-50 border border-amber-200/60 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
                  <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                    Admin Internal Notes 
                    <span className="text-xs font-bold px-2 py-0.5 bg-amber-200/50 text-amber-800 rounded-full tracking-wide">PRIVATE</span>
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <textarea 
                      className="flex-1 p-3 border border-amber-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
                      rows="2"
                      value={selectedApp.adminNotes || ''}
                      onChange={handleNotesChange}
                      placeholder="Leave internal notes for the selection committee here... (Students cannot see this)"
                    />
                    <button onClick={saveNotes} className="px-6 py-3 bg-amber-500 text-white text-sm font-bold rounded-xl hover:bg-amber-600 transition shadow-sm h-fit shrink-0">
                      Save Notes
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-5xl mx-auto">
                  
                  {activeTab === 'personal' && (
                    <div className="space-y-6">
                      <h4 className="font-extrabold text-2xl text-gray-900 border-b pb-3 border-gray-100">Personal Details</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Full Name</span><span className="font-bold text-gray-800 text-lg">{selectedApp.personalDetails?.fullName || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Date of Birth</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.dateOfBirth || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Gender</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.gender || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Aadhaar Number</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.aadhaarNumber || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Mobile Number</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.mobileNumber || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Email Address</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.emailAddress || 'N/A'}</span></div>
                        <div className="sm:col-span-2 lg:col-span-3"><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Permanent Address</span><span className="font-medium text-gray-800 block p-4 bg-gray-50 rounded-xl border border-gray-200">{selectedApp.personalDetails?.permanentAddress || 'N/A'}</span></div>
                        <div className="sm:col-span-2 lg:col-span-3"><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Correspondence Address</span><span className="font-medium text-gray-800 block p-4 bg-gray-50 rounded-xl border border-gray-200">{selectedApp.personalDetails?.correspondenceAddress || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">District & State</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.districtAndState || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Area Type</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.ruralUrbanArea || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Disability</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.disability || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Special Category</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.personalDetails?.specialCategory || 'N/A'}</span></div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'education' && (
                    <div className="space-y-10">
                      <div>
                        <h4 className="font-extrabold text-2xl text-gray-900 border-b pb-3 mb-6 border-gray-100">Current Education</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 p-8 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-sm">
                          <div className="md:col-span-2 lg:col-span-3"><span className="text-xs text-[#0F72CE] font-bold uppercase block mb-1">Course Name</span><span className="font-extrabold text-blue-950 text-2xl">{selectedApp.educationalRecord?.courseName || 'N/A'}</span></div>
                          <div className="md:col-span-2 lg:col-span-3"><span className="text-xs text-gray-500 font-bold uppercase block mb-1">Institution</span><span className="font-bold text-gray-800 block p-4 bg-white rounded-xl border border-gray-200 shadow-sm">{selectedApp.educationalRecord?.institutionNameAddress || 'N/A'}</span></div>
                          <div><span className="text-xs text-gray-500 font-bold uppercase block mb-1">Course Duration</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.educationalRecord?.courseDuration || 'N/A'}</span></div>
                          <div><span className="text-xs text-gray-500 font-bold uppercase block mb-1">Present Year/Sem</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.educationalRecord?.presentYearSemester || 'N/A'}</span></div>
                          <div><span className="text-xs text-gray-500 font-bold uppercase block mb-1">Admission Status</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.educationalRecord?.admissionStatus || 'N/A'}</span></div>
                          
                          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 pt-8 border-t border-blue-200/60">
                            <div><span className="text-xs text-gray-500 font-bold uppercase block mb-1">Total Fee</span><span className="font-bold text-gray-800 text-xl">₹{selectedApp.educationalRecord?.totalAnnualCourseFee || '0'}</span></div>
                            <div><span className="text-xs text-gray-500 font-bold uppercase block mb-1">Paid</span><span className="font-bold text-green-600 text-xl">₹{selectedApp.educationalRecord?.amountAlreadyPaid || '0'}</span></div>
                            <div><span className="text-xs text-gray-500 font-bold uppercase block mb-1">Outstanding</span><span className="font-bold text-red-600 text-xl">₹{selectedApp.educationalRecord?.outstandingAmount || '0'}</span></div>
                            <div><span className="text-xs text-[#0F72CE] font-bold uppercase block mb-1">Requested</span><span className="font-black text-[#0F72CE] text-2xl">₹{selectedApp.educationalRecord?.scholarshipAmountRequested || '0'}</span></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-xl text-gray-900 mb-6">Past Education</h4>
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600">
                              <tr>
                                <th className="p-4 font-bold border-b">Examination</th>
                                <th className="p-4 font-bold border-b">School / College</th>
                                <th className="p-4 font-bold border-b">Board / Univ</th>
                                <th className="p-4 font-bold border-b">Year</th>
                                <th className="p-4 font-bold border-b text-right">Score</th>
                                <th className="p-4 font-bold border-b text-center">Certificate</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {selectedApp.educationalRecord?.pastEducation?.map((edu, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                  <td className="p-4 font-bold text-gray-900">{edu.examination}</td>
                                  <td className="p-4 font-medium text-gray-700">{edu.schoolCollege}</td>
                                  <td className="p-4 font-medium text-gray-700">{edu.boardUniversity}</td>
                                  <td className="p-4 font-medium text-gray-700">{edu.year}</td>
                                  <td className="p-4 font-black text-[#0F72CE] text-right text-base">{edu.percentage || edu.marksCgpa}</td>
                                  <td className="p-4 text-center">
                                    {edu.certificateFile && renderDocumentButton(`${edu.examination} Certificate`, edu.certificateFile)}
                                  </td>
                                </tr>
                              ))}
                              {(!selectedApp.educationalRecord?.pastEducation || selectedApp.educationalRecord.pastEducation.length === 0) && (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500 font-medium">No past education records provided.</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'family' && (
                    <div className="space-y-8">
                      <h4 className="font-extrabold text-2xl text-gray-900 border-b pb-3 border-gray-100">Family & Financial Details</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-3xl bg-green-50/50 border border-green-100 shadow-sm flex flex-col items-center text-center">
                          <span className="text-xs text-green-600 font-bold uppercase tracking-wide block mb-2">Total Family Income</span>
                          <span className="font-black text-3xl text-green-800">₹{selectedApp.familyDetails?.totalAnnualFamilyIncome || '0'}</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 shadow-sm flex flex-col items-center text-center">
                          <span className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-2">Total Members</span>
                          <span className="font-black text-3xl text-gray-800">{selectedApp.familyDetails?.totalFamilyMembers || '0'}</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 shadow-sm flex flex-col items-center text-center">
                          <span className="text-xs text-gray-500 font-bold uppercase tracking-wide block mb-2">Earning Members</span>
                          <span className="font-black text-3xl text-gray-800">{selectedApp.familyDetails?.earningMembers || '0'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6 pt-4">
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Father's Occupation</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.familyDetails?.fatherOccupation || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Mother's Occupation</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.familyDetails?.motherOccupation || 'N/A'}</span></div>
                        <div className="sm:col-span-2"><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Income Sources</span><span className="font-medium text-gray-800 block p-4 bg-gray-50 rounded-xl border border-gray-200">{selectedApp.familyDetails?.incomeSources || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Agricultural Land</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.familyDetails?.agriculturalLand || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">House Ownership</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.familyDetails?.houseOwnership || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Major Assets</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.familyDetails?.majorAssets || 'N/A'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-1">Liabilities / Loans</span><span className="font-semibold text-gray-800 text-lg">{selectedApp.familyDetails?.liabilities || 'N/A'}</span></div>
                      </div>

                      <div className="pt-6">
                        <h4 className="font-extrabold text-xl text-gray-900 mb-6">Family Members</h4>
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600">
                              <tr>
                                <th className="p-4 font-bold border-b">Name</th>
                                <th className="p-4 font-bold border-b">Age</th>
                                <th className="p-4 font-bold border-b">Relation</th>
                                <th className="p-4 font-bold border-b">Education</th>
                                <th className="p-4 font-bold border-b">Occupation</th>
                                <th className="p-4 font-bold border-b text-right">Income</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {selectedApp.familyDetails?.familyMembers?.map((member, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                  <td className="p-4 font-bold text-gray-900">{member.name}</td>
                                  <td className="p-4 font-medium text-gray-700">{member.age}</td>
                                  <td className="p-4 font-medium text-gray-700">{member.relationship}</td>
                                  <td className="p-4 font-medium text-gray-700">{member.education}</td>
                                  <td className="p-4 font-medium text-gray-700">{member.occupation}</td>
                                  <td className="p-4 font-bold text-green-700 text-right">₹{member.annualIncome}</td>
                                </tr>
                              ))}
                              {(!selectedApp.familyDetails?.familyMembers || selectedApp.familyDetails.familyMembers.length === 0) && (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500 font-medium">No family members listed.</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'achievements' && (
                    <div className="space-y-8">
                      <h4 className="font-extrabold text-2xl text-gray-900 border-b pb-3 border-gray-100">Achievements & Other Support</h4>
                      
                      <div className="p-6 bg-purple-50/50 border border-purple-100 rounded-3xl shadow-sm">
                        <span className="text-xs text-purple-600 font-bold uppercase tracking-wide block mb-4 border-b border-purple-200/50 pb-2">Other Scholarship Support</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                          <div><span className="font-semibold block text-gray-500 uppercase text-[10px] mb-1">Applied Elsewhere?</span> <span className="text-lg font-bold text-purple-950">{selectedApp.otherAssistance?.appliedAnotherScholarship || 'N/A'}</span></div>
                          <div><span className="font-semibold block text-gray-500 uppercase text-[10px] mb-1">Receiving Other?</span> <span className="text-lg font-bold text-purple-950">{selectedApp.otherAssistance?.receivingAnotherScholarship || 'N/A'}</span></div>
                          <div><span className="font-semibold block text-gray-500 uppercase text-[10px] mb-1">Sponsor Name</span> <span className="text-lg font-bold text-purple-950">{selectedApp.otherAssistance?.scholarshipNameSponsor || 'N/A'}</span></div>
                          <div><span className="font-semibold block text-gray-500 uppercase text-[10px] mb-1">Amount Received/Expected</span> <span className="text-lg font-bold text-purple-950">₹{selectedApp.otherAssistance?.amountReceivedExpected || '0'}</span></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-y-6">
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-2">Academic Achievements</span><span className="font-medium text-gray-800 block p-4 bg-gray-50 rounded-xl border border-gray-200">{selectedApp.otherAssistance?.academicAchievements || 'None listed'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-2">Awards / Recognitions</span><span className="font-medium text-gray-800 block p-4 bg-gray-50 rounded-xl border border-gray-200">{selectedApp.otherAssistance?.awardsRecognitions || 'None listed'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-2">Volunteering / NGO Support</span><span className="font-medium text-gray-800 block p-4 bg-gray-50 rounded-xl border border-gray-200">{selectedApp.otherAssistance?.volunteeringActivities || selectedApp.otherAssistance?.supportFromNGO || 'None listed'}</span></div>
                        <div><span className="text-xs text-gray-400 font-bold uppercase block mb-2">Part-Time Work / Skills</span><span className="font-medium text-gray-800 block p-4 bg-gray-50 rounded-xl border border-gray-200">{selectedApp.otherAssistance?.partTimeWork || selectedApp.otherAssistance?.skillCourses || 'None listed'}</span></div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'statement' && (
                    <div className="space-y-8">
                      <h4 className="font-extrabold text-2xl text-gray-900 border-b pb-3 border-gray-100">Personal Statement</h4>
                      <div className="space-y-8">
                        <div>
                          <span className="text-sm text-[#0F72CE] font-bold block mb-3 uppercase tracking-wide">Why did you choose this course and institution?</span>
                          <div className="font-medium text-gray-800 p-6 bg-blue-50/30 rounded-2xl border border-blue-100 leading-relaxed whitespace-pre-wrap">{selectedApp.personalStatement?.whyCourseInstitution || 'Not provided'}</div>
                        </div>
                        <div>
                          <span className="text-sm text-[#0F72CE] font-bold block mb-3 uppercase tracking-wide">What are your plans after completing the course?</span>
                          <div className="font-medium text-gray-800 p-6 bg-blue-50/30 rounded-2xl border border-blue-100 leading-relaxed whitespace-pre-wrap">{selectedApp.personalStatement?.plansAfterCourse || 'Not provided'}</div>
                        </div>
                        <div>
                          <span className="text-sm text-[#0F72CE] font-bold block mb-3 uppercase tracking-wide">Describe your family's financial difficulties.</span>
                          <div className="font-medium text-gray-800 p-6 bg-blue-50/30 rounded-2xl border border-blue-100 leading-relaxed whitespace-pre-wrap">{selectedApp.personalStatement?.financialDifficulties || 'Not provided'}</div>
                        </div>
                        <div>
                          <span className="text-sm text-[#0F72CE] font-bold block mb-3 uppercase tracking-wide">How will this scholarship help you?</span>
                          <div className="font-medium text-gray-800 p-6 bg-blue-50/30 rounded-2xl border border-blue-100 leading-relaxed whitespace-pre-wrap">{selectedApp.personalStatement?.howScholarshipHelps || 'Not provided'}</div>
                        </div>
                        <div>
                          <span className="text-sm text-[#0F72CE] font-bold block mb-3 uppercase tracking-wide">Why should you be considered for this scholarship?</span>
                          <div className="font-medium text-gray-800 p-6 bg-blue-50/30 rounded-2xl border border-blue-100 leading-relaxed whitespace-pre-wrap">{selectedApp.personalStatement?.whyConsiderYou || 'Not provided'}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'documents' && (
                    <div className="space-y-10">
                      <div>
                        <h4 className="font-extrabold text-2xl text-gray-900 border-b pb-3 mb-6 border-gray-100">Attached Documents</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {renderDocumentButton('Tuition Fee Receipt', selectedApp.documents?.tuitionFeeReceipt)}
                          {renderDocumentButton('Income Certificate', selectedApp.documents?.familyIncomeCertificate)}
                          {renderDocumentButton('Aadhaar Card', selectedApp.documents?.aadhaarCard)}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-xl text-gray-900 mb-6">References</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[selectedApp.references?.reference1, selectedApp.references?.reference2].map((ref, idx) => (
                            <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                              <span className="text-xs text-gray-400 font-bold uppercase tracking-wide block mb-4 border-b pb-2">Reference {idx + 1}</span>
                              {ref?.name ? (
                                <div className="space-y-3 text-sm">
                                  <div><span className="font-semibold text-gray-500 uppercase text-[10px] block mb-1">Name</span> <span className="font-bold text-gray-900 text-base">{ref.name}</span></div>
                                  <div><span className="font-semibold text-gray-500 uppercase text-[10px] block mb-1">Designation & Institution</span> <span className="font-medium text-gray-800 text-base">{ref.designation}, {ref.institution}</span></div>
                                  <div><span className="font-semibold text-gray-500 uppercase text-[10px] block mb-1">Relation</span> <span className="font-medium text-gray-800 text-base">{ref.relationship}</span></div>
                                  <div><span className="font-semibold text-gray-500 uppercase text-[10px] block mb-1">Contact</span> <span className="font-bold text-[#0F72CE] text-base">{ref.mobile} / {ref.email}</span></div>
                                </div>
                              ) : (
                                <div className="text-gray-400 text-sm font-medium">Not provided</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-extrabold text-xl text-gray-900 mb-6">Applicant Declarations</h4>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 text-sm space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                            <div><span className="font-semibold text-gray-500 uppercase text-[10px] block mb-1">Applicant Signature (Name)</span> <span className="font-black text-gray-900 text-lg">{selectedApp.declarations?.applicantName || 'N/A'}</span></div>
                            <div className="mt-2 sm:mt-0 text-left sm:text-right">
                              <span className="font-semibold text-gray-500 uppercase text-[10px] block mb-1">Date & Place</span> 
                              <span className="font-medium text-gray-800 text-base">{selectedApp.declarations?.applicantDate} • {selectedApp.declarations?.applicantPlace}</span>
                            </div>
                          </div>
                          
                          {selectedApp.declarations?.parentName && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2">
                              <div><span className="font-semibold text-gray-500 uppercase text-[10px] block mb-1">Parent Signature (Name)</span> <span className="font-bold text-gray-900 text-lg">{selectedApp.declarations?.parentName}</span></div>
                              <div className="mt-2 sm:mt-0 text-left sm:text-right">
                                <span className="font-semibold text-gray-500 uppercase text-[10px] block mb-1">Relationship</span> 
                                <span className="font-medium text-gray-800 text-base">{selectedApp.declarations?.parentRelationship}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>

      {/* --- MODAL FOR DOCUMENT VIEWER --- */}
      <AnimatePresence>
        {viewingDocument && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setViewingDocument(null)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  <FileText size={20} className="text-[#0F72CE]" />
                  {viewingDocument.title}
                </h3>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      const iframe = document.getElementById('document-viewer-iframe');
                      if (iframe && iframe.contentWindow) {
                        try {
                          iframe.contentWindow.print();
                        } catch (e) {
                          window.open(viewingDocument.url, '_blank').print();
                        }
                      } else {
                        window.open(viewingDocument.url, '_blank').print();
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-semibold shadow-sm"
                  >
                    Print
                  </button>
                  <a 
                    href={viewingDocument.url} 
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#0F72CE] text-white rounded-lg hover:bg-[#0A4C8B] transition text-sm font-semibold shadow-sm"
                  >
                    <Download size={16} /> Download
                  </a>
                  <button 
                    onClick={() => setViewingDocument(null)} 
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition ml-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Viewer */}
              <div className="flex-1 bg-gray-100 overflow-hidden relative flex items-center justify-center">
                {viewingDocument.url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                  <img 
                    src={`${viewingDocument.url}?t=${Date.now()}`}
                    alt={viewingDocument.title}
                    className="max-w-full max-h-full object-contain p-4"
                  />
                ) : (
                  <iframe 
                    id="document-viewer-iframe"
                    src={`${viewingDocument.url}?t=${Date.now()}`}
                    className="w-full h-full border-none"
                    title={viewingDocument.title}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScholarshipAdminPanel;
