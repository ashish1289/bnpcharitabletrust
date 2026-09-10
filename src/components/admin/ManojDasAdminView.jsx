import React, { useState, useEffect, useCallback } from 'react';
import { Search, Download, Eye, X, CheckCircle, Clock, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api';

const ManojDasAdminView = () => {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Selected for Modal
  const [selectedNom, setSelectedNom] = useState(null);

  // Stats
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchNominations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getManojDasNominations({
        page,
        limit,
        status: statusFilter,
        search: debouncedSearch
      });
      
      if (data.success) {
        setNominations(data.nominations);
        setTotalPages(data.pages || 1);
      } else {
        setMessage(data.message || 'Failed to fetch nominations');
      }
    } catch (error) {
      setMessage(error.message || 'Network error fetching nominations');
    } finally {
      setLoading(false);
    }
  }, [page, limit, statusFilter, debouncedSearch]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getManojDasStats();
      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  }, []);

  useEffect(() => {
    fetchNominations();
    fetchStats();
  }, [fetchNominations, fetchStats]);

  const handleStatusChange = async (id, newStatus, currentNotes) => {
    try {
      const data = await api.updateManojDasStatus(id, { status: newStatus, adminNotes: currentNotes });
      if (data.success) {
        setMessage('Status updated successfully');
        if (selectedNom && selectedNom._id === id) {
          setSelectedNom(data.nomination);
        }
        fetchNominations();
        fetchStats();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(error.message || 'Failed to update status');
    }
  };

  const handleExportExcel = () => {
    // Basic CSV export for Manoj Das nominations
    if (!nominations.length) {
      setMessage('No data to export');
      return;
    }
    
    const headers = ['Nominee Name', 'DOB', 'Main Category', 'Coordinator Name', 'District', 'Status', 'Date Applied'];
    const csvContent = [
      headers.join(','),
      ...nominations.map(n => [
        `"${n.nomineeName}"`,
        `"${n.dateOfBirth}"`,
        `"${n.mainCategory}"`,
        `"${n.coordinatorName}"`,
        `"${n.district}"`,
        n.status,
        new Date(n.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Manoj_Das_Nominations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {message && (
        <div className="mb-6 rounded-xl bg-blue-50 border border-blue-100 p-4 text-blue-700 font-medium flex items-center gap-3 shadow-sm">
          <CheckCircle size={20} className="text-blue-500 shrink-0" />
          {message}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div onClick={() => { setStatusFilter('all'); setPage(1); }} className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm flex items-center gap-4 ${statusFilter === 'all' ? 'bg-indigo-50 border-indigo-200 shadow-md ring-2 ring-indigo-500 ring-offset-2' : 'bg-white border-gray-200 hover:border-indigo-300'}`}>
          <div className={`p-3 rounded-xl ${statusFilter === 'all' ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
            <Clock size={20} />
          </div>
          <div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Nominations</p><p className="text-xl font-black text-gray-900">{stats.total}</p></div>
        </div>
        <div onClick={() => { setStatusFilter('pending'); setPage(1); }} className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm flex items-center gap-4 ${statusFilter === 'pending' ? 'bg-amber-50 border-amber-200 shadow-md ring-2 ring-amber-500 ring-offset-2' : 'bg-white border-gray-200 hover:border-amber-300'}`}>
          <div className={`p-3 rounded-xl ${statusFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600'}`}>
            <Clock size={20} />
          </div>
          <div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pending</p><p className="text-xl font-black text-gray-900">{stats.pending}</p></div>
        </div>
        <div onClick={() => { setStatusFilter('approved'); setPage(1); }} className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm flex items-center gap-4 ${statusFilter === 'approved' ? 'bg-green-50 border-green-200 shadow-md ring-2 ring-green-500 ring-offset-2' : 'bg-white border-gray-200 hover:border-green-300'}`}>
          <div className={`p-3 rounded-xl ${statusFilter === 'approved' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600'}`}>
            <CheckCircle size={20} />
          </div>
          <div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Approved</p><p className="text-xl font-black text-gray-900">{stats.approved}</p></div>
        </div>
        <div onClick={() => { setStatusFilter('rejected'); setPage(1); }} className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm flex items-center gap-4 ${statusFilter === 'rejected' ? 'bg-red-50 border-red-200 shadow-md ring-2 ring-red-500 ring-offset-2' : 'bg-white border-gray-200 hover:border-red-300'}`}>
          <div className={`p-3 rounded-xl ${statusFilter === 'rejected' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-600'}`}>
            <XCircle size={20} />
          </div>
          <div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Rejected</p><p className="text-xl font-black text-gray-900">{stats.rejected}</p></div>
        </div>
      </div>

      {/* Main Table */}
      <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">Manoj Das Nominations</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-wrap">
            <button onClick={handleExportExcel} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-green-200 text-green-700 font-bold text-sm rounded-xl hover:bg-green-50 transition shadow-sm">
              <Download size={16} /> Export CSV
            </button>
            <div className="relative w-full sm:w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" placeholder="Search nominee or coordinator..." 
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="p-5 font-semibold">Nominee Name</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold">Coordinator</th>
                <th className="p-5 font-semibold">Date Applied</th>
                <th className="p-5 font-semibold text-center">Status</th>
                <th className="p-5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && nominations.length === 0 ? (
                <tr><td colSpan="6" className="p-10 text-center text-gray-500">Loading...</td></tr>
              ) : nominations.length === 0 ? (
                <tr><td colSpan="6" className="p-10 text-center text-gray-500">No nominations found.</td></tr>
              ) : nominations.map((nom) => (
                <tr key={nom._id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-gray-900 text-base">{nom.nomineeName}</div>
                    <div className="text-xs text-gray-500">DOB: {nom.dateOfBirth}</div>
                  </td>
                  <td className="p-5 font-medium text-gray-800">{nom.mainCategory}</td>
                  <td className="p-5">
                    <div className="font-medium text-gray-800">{nom.coordinatorName}</div>
                    <div className="text-gray-500 text-xs">{nom.district}</div>
                  </td>
                  <td className="p-5 font-medium text-gray-600">
                    {new Date(nom.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-5 text-center">
                    <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border
                      ${nom.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                        nom.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                        nom.status === 'reviewed' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {nom.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => setSelectedNom(nom)}
                      className="px-4 py-2 bg-white border border-gray-200 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition shadow-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Details */}
      <AnimatePresence>
        {selectedNom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setSelectedNom(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="font-bold text-2xl text-gray-900">{selectedNom.nomineeName}</h3>
                  <p className="text-sm text-gray-500 mt-1">Nominated by {selectedNom.coordinatorName} ({selectedNom.district})</p>
                </div>
                <div className="flex gap-4 items-center">
                  <select 
                    value={selectedNom.status} 
                    onChange={(e) => handleStatusChange(selectedNom._id, e.target.value, selectedNom.adminNotes)}
                    className="p-2 border rounded-lg font-bold bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button onClick={() => setSelectedNom(null)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"><X size={20} /></button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div>
                  <h4 className="font-bold text-indigo-800 text-lg border-b pb-2 mb-4">Author Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="font-semibold text-gray-500 block">Name:</span> {selectedNom.nomineeName}</p>
                    <p><span className="font-semibold text-gray-500 block">Date of Birth:</span> {selectedNom.dateOfBirth}</p>
                    <p><span className="font-semibold text-gray-500 block">Main Category:</span> {selectedNom.mainCategory}</p>
                    <p><span className="font-semibold text-gray-500 block">Other Categories:</span> {selectedNom.otherCategories.filter(Boolean).join(', ') || 'None'}</p>
                    <p className="col-span-2"><span className="font-semibold text-gray-500 block">Address & Phone:</span> {selectedNom.addressAndPhone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-indigo-800 text-lg border-b pb-2 mb-4">Honours & Publications</h4>
                  <div className="space-y-4 text-sm">
                    <p><span className="font-semibold text-gray-500">Prior Honours:</span> {selectedNom.hasPriorHonour === 'yes' ? selectedNom.priorHonours.filter(Boolean).join(', ') : 'None'}</p>
                    <div>
                      <span className="font-semibold text-gray-500 block mb-1">Top Books:</span>
                      <ul className="list-disc pl-5">{selectedNom.topBooks.filter(Boolean).map((book, i) => <li key={i}>{book}</li>)}</ul>
                    </div>
                    <p><span className="font-semibold text-gray-500">Translated Books:</span> {selectedNom.hasTranslatedBooks === 'yes' ? selectedNom.translatedLanguages.filter(Boolean).join(', ') : 'None'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-indigo-800 text-lg border-b pb-2 mb-4">Recommendations</h4>
                  <div className="space-y-4 text-sm">
                    <p><span className="font-semibold text-gray-500 block">Reason for Recommendation:</span> {selectedNom.recommendationReason}</p>
                    {selectedNom.secondRecommendation && <p><span className="font-semibold text-gray-500 block">2nd Recommendation:</span> {selectedNom.secondRecommendation}</p>}
                    {selectedNom.briefOnFirstNominee && <p><span className="font-semibold text-gray-500 block">Brief on 1st Nominee:</span> {selectedNom.briefOnFirstNominee}</p>}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-indigo-800 text-lg border-b pb-2 mb-4">Panel Members</h4>
                  <ul className="space-y-2 text-sm">
                    {selectedNom.panelMembers.filter(p => p.name || p.phone).map((p, i) => (
                      <li key={i}><span className="font-medium">{p.name || 'Unnamed'}</span> - {p.phone || 'No phone'}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManojDasAdminView;
