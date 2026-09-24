import React, { useState, useEffect, useCallback } from 'react';
import { Search, Download, Eye, X, CheckCircle, Clock, XCircle, Trash2, Edit, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api';
import ManojDasPrintView from './ManojDasPrintView';
import { odishaDistrictsAndBlocks } from '../../data/odishaLocations';

const ManojDasAdminView = () => {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Selected for Modal
  const [selectedNom, setSelectedNom] = useState(null);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

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
        district: districtFilter,
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
  }, [page, limit, statusFilter, districtFilter, debouncedSearch]);

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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this nomination permanently?')) return;
    try {
      const data = await api.deleteManojDasNomination(id);
      if (data.success) {
        setMessage('Nomination deleted successfully');
        fetchNominations();
        fetchStats();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(error.message || 'Failed to delete nomination');
    }
  };

  const handleEditSave = async () => {
    try {
      const data = await api.updateManojDasNomination(selectedNom._id, editData);
      if (data.success) {
        setMessage('Nomination updated successfully');
        setSelectedNom(data.nomination);
        setIsEditMode(false);
        fetchNominations();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(error.message || 'Failed to update nomination');
    }
  };

  const handleExportExcel = async () => {
    try {
      const data = await api.getManojDasNominations({
        page: 1,
        limit: 10000,
        status: statusFilter,
        district: districtFilter,
        search: debouncedSearch
      });

      const exportRows = Array.isArray(data?.nominations) ? data.nominations : [];
      if (!exportRows.length) {
        setMessage('No data to export');
        return;
      }

      const flattenNominationForCsv = (nomination) => {
        const safeString = (value) => {
          if (value === null || value === undefined) return '';
          if (Array.isArray(value)) {
            return value
              .map(item => safeString(item))
              .filter(Boolean)
              .join(' | ');
          }
          if (typeof value === 'object') {
            if ('name' in value || 'phone' in value) {
              return `${value.name || ''}${value.phone ? ` (${value.phone})` : ''}`.trim();
            }
            return Object.entries(value)
              .map(([key, nestedValue]) => `${key}: ${safeString(nestedValue)}`)
              .join(' | ');
          }
          return String(value);
        };

        const panelMembers = Array.isArray(nomination.panelMembers) ? nomination.panelMembers : [];

        return {
          _id: nomination._id || '',
          nomineeName: nomination.nomineeName || '',
          dateOfBirth: nomination.dateOfBirth || '',
          mainCategory: nomination.mainCategory || '',
          otherCategories: safeString(nomination.otherCategories),
          addressAndPhone: nomination.addressAndPhone || '',
          addressVillage: nomination.addressVillage || '',
          addressPost: nomination.addressPost || '',
          addressBlock: nomination.addressBlock || '',
          addressDistrict: nomination.addressDistrict || '',
          addressPin: nomination.addressPin || '',
          phoneNumber: nomination.phoneNumber || '',
          hasPriorHonour: nomination.hasPriorHonour || '',
          priorHonours: safeString(nomination.priorHonours),
          topBooks: safeString(nomination.topBooks),
          hasTranslatedBooks: nomination.hasTranslatedBooks || '',
          translatedLanguages: safeString(nomination.translatedLanguages),
          recommendationReason: nomination.recommendationReason || '',
          secondRecommendation: nomination.secondRecommendation || '',
          briefOnFirstNominee: nomination.briefOnFirstNominee || '',
          coordinatorName: nomination.coordinatorName || '',
          coordinatorDate: nomination.coordinatorDate || '',
          district: nomination.district || '',
          panelMembers: panelMembers
            .map((member) => `${member.name || ''}${member.phone ? ` (${member.phone})` : ''}`.trim())
            .filter(Boolean)
            .join(' ; '),
          panelMember_1_name: panelMembers[0]?.name || '',
          panelMember_1_phone: panelMembers[0]?.phone || '',
          panelMember_2_name: panelMembers[1]?.name || '',
          panelMember_2_phone: panelMembers[1]?.phone || '',
          panelMember_3_name: panelMembers[2]?.name || '',
          panelMember_3_phone: panelMembers[2]?.phone || '',
          panelMember_4_name: panelMembers[3]?.name || '',
          panelMember_4_phone: panelMembers[3]?.phone || '',
          status: nomination.status || '',
          adminNotes: nomination.adminNotes || '',
          createdAt: nomination.createdAt || '',
          updatedAt: nomination.updatedAt || ''
        };
      };

      const flattenedRows = exportRows.map(flattenNominationForCsv);
      const headers = Object.keys(flattenedRows[0]);

      const csvContent = [
        headers.join(','),
        ...flattenedRows.map(row =>
          headers.map(header => {
            const rawValue = row[header] ?? '';
            const escapedValue = String(rawValue).replace(/"/g, '""');
            return `"${escapedValue}"`;
          }).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Manoj_Das_Nominations_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setMessage('CSV export completed successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message || 'Failed to export nominations');
    }
  };

  if (isPrintMode && selectedNom) {
    return <ManojDasPrintView formData={selectedNom} onBack={() => setIsPrintMode(false)} />;
  }

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
            <select 
              value={districtFilter} 
              onChange={(e) => { setDistrictFilter(e.target.value); setPage(1); }}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm cursor-pointer min-w-[150px]"
            >
              <option value="all">All Districts</option>
              {Object.keys(odishaDistrictsAndBlocks).sort().map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
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
                <th className="p-5 font-semibold">Nominee Name (ଲେଖକ/ଲେଖିକାଙ୍କ ନାମ)</th>
                <th className="p-5 font-semibold">Category (ବିଭାଗ)</th>
                <th className="p-5 font-semibold">Coordinator (ଜିଲ୍ଲା ସଂଯୋଜକ)</th>
                <th className="p-5 font-semibold">Date Applied</th>
                <th className="p-5 font-semibold text-center">Status</th>
                <th className="p-5 font-semibold text-right">Actions</th>
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
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedNom(nom)}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition shadow-sm"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleDelete(nom._id)}
                        className="p-1.5 bg-white border border-gray-200 text-red-500 rounded-lg hover:bg-red-50 transition shadow-sm"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
                <div className="flex gap-2 items-center flex-wrap">
                  {!isEditMode ? (
                    <>
                      <button onClick={() => { setEditData(selectedNom); setIsEditMode(true); }} className="px-3 py-1.5 bg-white border border-gray-200 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition shadow-sm flex items-center gap-1"><Edit size={16}/> Edit</button>
                      <button onClick={() => setIsPrintMode(true)} className="px-3 py-1.5 bg-white border border-gray-200 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition shadow-sm flex items-center gap-1"><Printer size={16}/> Print</button>
                      <select 
                        value={selectedNom.status} 
                        onChange={(e) => handleStatusChange(selectedNom._id, e.target.value, selectedNom.adminNotes)}
                        className="p-1.5 border rounded-lg font-bold bg-white focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <button onClick={handleEditSave} className="px-4 py-1.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm">Save Changes</button>
                      <button onClick={() => setIsEditMode(false)} className="px-4 py-1.5 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition shadow-sm">Cancel</button>
                    </>
                  )}
                  <button onClick={() => { setSelectedNom(null); setIsEditMode(false); }} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition ml-2"><X size={20} /></button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                
                {isEditMode ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm mb-4">
                      <strong>Edit Mode:</strong> You can fix old addresses by copying the text below into the new fields.
                      {editData.addressAndPhone && <div className="mt-2 text-gray-600 italic">Old Address: {editData.addressAndPhone}</div>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="block text-sm font-bold text-gray-700">Nominee Name</label><input type="text" value={editData.nomineeName} onChange={e => setEditData({...editData, nomineeName: e.target.value})} className="w-full p-2 border rounded" /></div>
                      <div><label className="block text-sm font-bold text-gray-700">DOB</label><input type="text" value={editData.dateOfBirth} onChange={e => setEditData({...editData, dateOfBirth: e.target.value})} className="w-full p-2 border rounded" /></div>
                      <div><label className="block text-sm font-bold text-gray-700">Main Category</label><input type="text" value={editData.mainCategory} onChange={e => setEditData({...editData, mainCategory: e.target.value})} className="w-full p-2 border rounded" /></div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-bold text-gray-800 mb-2">New Address Fields</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-bold text-gray-700">Village</label><input type="text" value={editData.addressVillage || ''} onChange={e => setEditData({...editData, addressVillage: e.target.value})} className="w-full p-2 border rounded" /></div>
                        <div><label className="block text-sm font-bold text-gray-700">Post</label><input type="text" value={editData.addressPost || ''} onChange={e => setEditData({...editData, addressPost: e.target.value})} className="w-full p-2 border rounded" /></div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700">District</label>
                          <select value={editData.addressDistrict || ''} onChange={e => setEditData({...editData, addressDistrict: e.target.value, addressBlock: ''})} className="w-full p-2 border rounded">
                            <option value="">Select</option>
                            {Object.keys(odishaDistrictsAndBlocks).sort().map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700">Block</label>
                          <select value={editData.addressBlock || ''} onChange={e => setEditData({...editData, addressBlock: e.target.value})} className="w-full p-2 border rounded" disabled={!editData.addressDistrict}>
                            <option value="">Select</option>
                            {editData.addressDistrict && odishaDistrictsAndBlocks[editData.addressDistrict].map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                        <div><label className="block text-sm font-bold text-gray-700">PIN Code</label><input type="text" value={editData.addressPin || ''} onChange={e => setEditData({...editData, addressPin: e.target.value})} className="w-full p-2 border rounded" /></div>
                        <div><label className="block text-sm font-bold text-gray-700">Phone</label><input type="text" value={editData.phoneNumber || ''} onChange={e => setEditData({...editData, phoneNumber: e.target.value})} className="w-full p-2 border rounded" /></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="font-bold text-indigo-800 text-lg border-b pb-2 mb-4">Author Details (ଲେଖକ/ଲେଖିକାଙ୍କ ବିବରଣୀ)</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><span className="font-semibold text-gray-500 block">Name:</span> {selectedNom.nomineeName}</p>
                        <p><span className="font-semibold text-gray-500 block">Date of Birth:</span> {selectedNom.dateOfBirth}</p>
                        <p><span className="font-semibold text-gray-500 block">Main Category:</span> {selectedNom.mainCategory}</p>
                        <p><span className="font-semibold text-gray-500 block">Other Categories:</span> {selectedNom.otherCategories.filter(Boolean).join(', ') || 'None'}</p>
                      </div>
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="font-bold text-gray-700 block mb-2 border-b pb-1">Postal Address (ସଂପୂର୍ଣ୍ଣ ଡାକ ଠିକଣା ସହିତ ଫୋନ୍‌ ନମ୍ବର)</span>
                        {selectedNom.addressAndPhone && (
                          <div className="mb-3 text-sm text-amber-700 bg-amber-50 p-2 rounded">
                            <span className="font-semibold">Old Format:</span> {selectedNom.addressAndPhone}
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <p><span className="font-semibold text-gray-500">Village:</span> {selectedNom.addressVillage || '-'}</p>
                          <p><span className="font-semibold text-gray-500">Post:</span> {selectedNom.addressPost || '-'}</p>
                          <p><span className="font-semibold text-gray-500">Block:</span> {selectedNom.addressBlock || '-'}</p>
                          <p><span className="font-semibold text-gray-500">District:</span> {selectedNom.addressDistrict || '-'}</p>
                          <p><span className="font-semibold text-gray-500">PIN Code:</span> {selectedNom.addressPin || '-'}</p>
                          <p><span className="font-semibold text-gray-500">Phone:</span> {selectedNom.phoneNumber || '-'}</p>
                        </div>
                      </div>
                    </div>

                <div>
                  <h4 className="font-bold text-indigo-800 text-lg border-b pb-2 mb-4">Honours & Publications (ପୂର୍ବ ସମ୍ମାନ ଓ ପ୍ରକାଶନ)</h4>
                  <div className="space-y-4 text-sm">
                    <p><span className="font-semibold text-gray-500">Prior Honours (ପୂର୍ବ ସମ୍ମାନ):</span> {selectedNom.hasPriorHonour === 'yes' ? selectedNom.priorHonours.filter(Boolean).join(', ') : 'None'}</p>
                    <div>
                      <span className="font-semibold text-gray-500 block mb-1">Top Books (୫ଟି ପୁସ୍ତକର ନାମ):</span>
                      <ul className="list-disc pl-5">{selectedNom.topBooks.filter(Boolean).map((book, i) => <li key={i}>{book}</li>)}</ul>
                    </div>
                    <p><span className="font-semibold text-gray-500">Translated Books (ଅନୂଦିତ ପୁସ୍ତକ):</span> {selectedNom.hasTranslatedBooks === 'yes' ? selectedNom.translatedLanguages.filter(Boolean).join(', ') : 'None'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-indigo-800 text-lg border-b pb-2 mb-4">Recommendations (ସୁପାରିଶ)</h4>
                  <div className="space-y-4 text-sm">
                    <p><span className="font-semibold text-gray-500 block">Reason for Recommendation (କାହିଁକି ଯୋଗ୍ୟ):</span> {selectedNom.recommendationReason}</p>
                    {selectedNom.secondRecommendation && <p><span className="font-semibold text-gray-500 block">2nd Recommendation (ଦ୍ବିତୀୟ ସୁପାରିଶ):</span> {selectedNom.secondRecommendation}</p>}
                    {selectedNom.briefOnFirstNominee && <p><span className="font-semibold text-gray-500 block">Brief on 1st Nominee (ପ୍ରଥମ ଲେଖକ/ଲେଖିକାଙ୍କ ସଂପର୍କରେ):</span> {selectedNom.briefOnFirstNominee}</p>}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-indigo-800 text-lg border-b pb-2 mb-4">Panel Members (୪ଜଣ ସମଧର୍ମା)</h4>
                  <ul className="space-y-2 text-sm">
                    {selectedNom.panelMembers.filter(p => p.name || p.phone).map((p, i) => (
                      <li key={i}><span className="font-medium">{p.name || 'Unnamed'}</span> - {p.phone || 'No phone'}</li>
                    ))}
                  </ul>
                </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManojDasAdminView;
