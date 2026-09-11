import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, FileText, CheckCircle, Clock, Users, X, MapPin, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api';

const UgApprovedView = () => {
  const [students, setStudents] = useState([]);
  const [agents, setAgents] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // Filters and Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  
  // Selection
  const [selectedIds, setSelectedIds] = useState([]);
  const [assignAgentId, setAssignAgentId] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Document Modal & Report Modal
  const [selectedDocs, setSelectedDocs] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [ugData, agentsData, distData] = await Promise.all([
        api.getUgApprovedList({ page, limit, status: statusFilter, district: districtFilter }),
        api.getAgents(),
        api.getUgDistricts()
      ]);
      
      if (ugData.success) {
        setStudents(ugData.students);
        setTotalPages(ugData.pages);
      }
      if (agentsData.success) {
        setAgents(agentsData.agents);
      }
      if (distData.success) {
        setDistricts(distData.districts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, statusFilter, districtFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(students.map(s => s._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (selectedIds.length === 0 || !assignAgentId) {
      setMessage('Please select students and an agent');
      return;
    }
    setAssigning(true);
    try {
      const res = await api.assignUgStudents({ studentIds: selectedIds, agentId: assignAgentId });
      if (res.success) {
        setMessage(`Successfully assigned ${selectedIds.length} students.`);
        setSelectedIds([]);
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(error.message || 'Assignment failed');
    } finally {
      setAssigning(false);
    }
  };

  const handleViewReport = async (studentId) => {
    setLoadingReport(true);
    try {
      const res = await api.getVerificationReport(studentId);
      if (res.success) {
        setSelectedReport(res.report);
      }
    } catch (error) {
      alert('Failed to load report or report not found.');
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {message && (
        <div className="mb-4 rounded-xl bg-blue-50 border border-blue-100 p-4 text-blue-700 font-medium flex items-center gap-3">
          <CheckCircle size={20} className="text-blue-500" />
          {message}
        </div>
      )}

      {/* Top Bar: Filters & Assignment */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm mb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex flex-wrap gap-4 items-center w-full xl:w-auto">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select value={districtFilter} onChange={e => {setDistrictFilter(e.target.value); setPage(1);}} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <select value={statusFilter} onChange={e => {setStatusFilter(e.target.value); setPage(1);}} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center w-full xl:w-auto p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <span className="text-sm font-bold text-gray-700">{selectedIds.length} Selected</span>
              <select value={assignAgentId} onChange={(e) => setAssignAgentId(e.target.value)} className="bg-gray-50 border border-gray-200 text-gray-700 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium">
                <option value="">Select Agent...</option>
                <option value="unassign">⚠️ Unassign Selected</option>
                {agents.map(a => (
                  <option key={a._id} value={a._id}>{a.name} ({a.email})</option>
                ))}
              </select>
          <button onClick={handleAssign} disabled={assigning || selectedIds.length === 0 || !assignAgentId} className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-2">
            <Users size={16} /> Assign
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="p-4"><input type="checkbox" onChange={handleSelectAll} checked={students.length > 0 && selectedIds.length === students.length} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" /></th>
                <th className="p-4 font-semibold">Student Info</th>
                <th className="p-4 font-semibold">District</th>
                <th className="p-4 font-semibold">Marks / Income</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold">Agent</th>
                <th className="p-4 font-semibold text-right">Docs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">Loading records...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">No records found.</td></tr>
              ) : (
                students.map(s => (
                  <tr key={s._id} className={selectedIds.includes(s._id) ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}>
                    <td className="p-4"><input type="checkbox" checked={selectedIds.includes(s._id)} onChange={() => handleSelect(s._id)} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" /></td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.mobileNo}</div>
                    </td>
                    <td className="p-4 text-gray-700">{s.district}</td>
                    <td className="p-4">
                      <div className="text-gray-900 font-medium">{(s.marks * 100).toFixed(1)}%</div>
                      <div className="text-xs text-gray-500">₹{s.annualIncome}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${s.verificationStatus === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {s.verificationStatus === 'Verified' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                        {s.verificationStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      {s.assignedAgent ? (
                        <div className="text-indigo-700 font-semibold text-xs bg-indigo-50 px-2 py-1 rounded-lg inline-block border border-indigo-100">{s.assignedAgent.name}</div>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      {s.verificationStatus === 'Verified' && (
                        <button onClick={() => handleViewReport(s._id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition border border-transparent hover:border-green-100" title="View Field Report">
                          <Eye size={18} />
                        </button>
                      )}
                      <button onClick={() => setSelectedDocs(s.documentUrls)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition border border-transparent hover:border-indigo-100" title="View Initial Docs">
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border bg-white rounded-lg text-sm font-semibold hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 border bg-white rounded-lg text-sm font-semibold hover:bg-gray-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Docs Modal */}
      <AnimatePresence>
        {selectedDocs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSelectedDocs(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2"><FileText size={20} className="text-indigo-600"/> Submitted Documents</h3>
                <button onClick={() => setSelectedDocs(null)} className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-full transition"><X size={16} /></button>
              </div>
              <div className="p-5 overflow-y-auto max-h-[60vh] space-y-3">
                {Object.entries(selectedDocs).map(([key, url]) => {
                  if (!url) return null;
                  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition">
                      <span className="text-sm font-semibold text-gray-700">{label}</span>
                      <a href={url} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm font-bold hover:underline">View</a>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Field Report Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedReport(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="font-black text-xl text-gray-900">Physical Verification Report</h3>
                  <p className="text-sm text-gray-500 font-medium">Submitted by {selectedReport.agentId?.name || 'Agent'}</p>
                </div>
                <button onClick={() => setSelectedReport(null)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto space-y-8 bg-gray-50/50">
                
                {/* Geolocation & Selfie */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedReport.geolocation && (
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-3">
                      <h4 className="font-bold text-gray-700 flex items-center gap-2 uppercase text-xs"><MapPin size={16}/> GPS Location Captured</h4>
                      <div className="bg-gray-50 p-3 rounded-xl font-mono text-sm text-gray-600">
                        Lat: {selectedReport.geolocation.lat} <br/>
                        Lng: {selectedReport.geolocation.lng}
                      </div>
                      <a href={`https://maps.google.com/?q=${selectedReport.geolocation.lat},${selectedReport.geolocation.lng}`} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm font-bold hover:underline">View on Google Maps</a>
                    </div>
                  )}
                  {selectedReport.agentSelfieUrl && (
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                      <h4 className="font-bold text-gray-700 uppercase text-xs mb-3">Agent Selfie</h4>
                      <img src={selectedReport.agentSelfieUrl} alt="Agent Selfie" className="w-full h-40 object-cover rounded-xl" />
                    </div>
                  )}
                  {selectedReport.physicalFormCopyUrl && (
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 md:col-span-2">
                      <h4 className="font-bold text-gray-700 uppercase text-xs mb-3">Physical Form Copy</h4>
                      <a href={selectedReport.physicalFormCopyUrl} target="_blank" rel="noreferrer" className="block text-center bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-100 transition">
                        View Uploaded Physical Form
                      </a>
                    </div>
                  )}
                </div>

                {/* Report Details */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h4 className="font-black text-indigo-900 text-lg mb-4 border-b pb-2">Final Recommendation</h4>
                  <div className={`text-lg font-black p-4 rounded-xl inline-block ${selectedReport.finalRecommendation === 'RECOMMENDED' ? 'bg-green-100 text-green-800' : selectedReport.finalRecommendation === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                    {selectedReport.finalRecommendation}
                  </div>
                  {selectedReport.rejectionReason && (
                    <p className="mt-3 text-red-700 bg-red-50 p-3 rounded-lg font-medium text-sm">Reason: {selectedReport.rejectionReason}</p>
                  )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                  <h4 className="font-black text-indigo-900 text-lg mb-2 border-b pb-2">Field Observations</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-xs text-gray-500 font-bold uppercase block">Authentic?</span><span className="font-semibold text-gray-900">{selectedReport.isAuthentic}</span></div>
                    <div><span className="text-xs text-gray-500 font-bold uppercase block">Genuinely in Need?</span><span className="font-semibold text-gray-900">{selectedReport.isGenuinelyInNeed}</span></div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-bold uppercase block">Remarks</span>
                    <p className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg mt-1">{selectedReport.specificRemarks || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-bold uppercase block">Local Person Info (Sarpanch/Ward Member)</span>
                    <p className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg mt-1">{selectedReport.localPersonInfo || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h4 className="font-black text-indigo-900 text-lg mb-4 border-b pb-2">Verified Documents Checklist</h4>
                  <div className="grid gap-3">
                    {selectedReport.documents?.map((doc, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-xl bg-gray-50">
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-800">{doc.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {doc.copyAttached ? '✅ Attached' : '❌ Not Attached'} | {doc.originalVerified ? '✅ Verified' : '❌ Not Verified'}
                          </p>
                          {doc.remarks && <p className="text-xs text-gray-600 mt-1 italic">Remarks: {doc.remarks}</p>}
                        </div>
                        {doc.uploadedFileUrl && (
                          <a href={doc.uploadedFileUrl} target="_blank" rel="noreferrer" className="mt-2 md:mt-0 text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1.5 rounded-lg whitespace-nowrap hover:bg-indigo-200 transition">View Upload</a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UgApprovedView;
