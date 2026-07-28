import React, { useEffect, useState } from 'react';
import { Search, LogOut, FileText, CheckCircle, XCircle, Clock, Eye, Download, User } from 'lucide-react';
import api from '../../api';

const ScholarshipAdminPanel = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [admin, setAdmin] = useState(null);
  
  // Detail view state
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = async () => {
    try {
      const data = await api.getApplications();
      setApplications(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const data = await api.getCurrentUser();
        setAdmin(data.user);
        fetchApplications();
      } catch {
        setMessage('Please log in as admin first.');
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  const updateStatus = async (id, status, currentNotes) => {
    try {
      const updated = await api.updateApplicationStatus(id, { status, adminNotes: currentNotes });
      setMessage(`Status updated to ${status}`);
      if (selectedApp?._id === id) {
        setSelectedApp(updated.application);
      }
      fetchApplications();
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
      setMessage('Notes saved');
      fetchApplications();
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

  if (loading) return <div className="p-8">Loading applications...</div>;

  return (
    <div className="max-w-screen-2xl mx-auto p-4 md:p-8 pt-24 md:pt-28 h-screen flex flex-col bg-gray-50/50">
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-[#0F72CE]/10 p-3 rounded-xl">
            <User className="text-[#0F72CE]" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
            <p className="text-sm text-gray-500 font-medium">Review and manage scholarship applications</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 rounded-full bg-red-50 text-red-600 px-5 py-2.5 font-semibold hover:bg-red-100 transition shadow-sm border border-red-100">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {message && (
        <div className="mb-6 rounded-xl bg-blue-50/80 backdrop-blur border border-blue-100 p-4 text-blue-700 font-medium flex items-center gap-2 shadow-sm">
          <CheckCircle size={20} className="text-blue-500" />
          {message}
        </div>
      )}

      <div className="flex-1 flex gap-6 overflow-hidden">
        
        {/* Left Side: Table of applications */}
        <div className={`flex-col border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden ${selectedApp ? 'hidden lg:flex w-1/3' : 'flex w-full'}`}>
          <div className="p-5 border-b bg-gray-50/80 flex items-center justify-between">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <FileText size={18} className="text-gray-400" />
              All Applications
            </h3>
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">{applications.length}</span>
          </div>
          <div className="overflow-y-auto flex-1">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left sticky top-0 shadow-sm">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Name</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {applications.map((app) => (
                  <tr 
                    key={app._id} 
                    onClick={() => setSelectedApp(app)}
                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${selectedApp?._id === app._id ? 'bg-blue-50 border-l-4 border-[#0F72CE]' : ''}`}
                  >
                    <td className="p-4">
                      <div className="font-semibold text-gray-800">{app.personalDetails?.fullName || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{app.personalDetails?.emailAddress}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase
                        ${app.status === 'approved' ? 'bg-green-100 text-green-700' : 
                          app.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                          app.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-amber-100 text-amber-700'}`}>
                        {app.status === 'approved' && <CheckCircle size={14} />}
                        {app.status === 'rejected' && <XCircle size={14} />}
                        {app.status === 'pending' && <Clock size={14} />}
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-gray-500 hidden md:table-cell">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">No applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Detail View */}
        {selectedApp && (
          <div className="flex-1 flex flex-col border rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">
                <button onClick={() => setSelectedApp(null)} className="lg:hidden mr-4 text-[#0F72CE]">← Back</button>
                {selectedApp.personalDetails?.fullName} - Application Details
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-semibold">Change Status:</span>
                <select
                  className="rounded border p-2 bg-white text-sm font-semibold text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-[#0F72CE]"
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
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              
              {/* Internal Notes Section */}
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h4 className="font-semibold text-yellow-800 mb-2">Internal Admin Notes</h4>
                <textarea 
                  className="w-full p-3 border rounded-lg bg-white mb-2 shadow-sm text-sm"
                  rows="3"
                  value={selectedApp.adminNotes || ''}
                  onChange={handleNotesChange}
                  placeholder="Leave internal notes for the selection committee here..."
                />
                <button onClick={saveNotes} className="px-4 py-2 bg-yellow-600 text-white text-sm font-semibold rounded-lg hover:bg-yellow-700">Save Notes</button>
              </div>

              {/* Data Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Personal Details */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h4 className="font-bold text-gray-800 border-b pb-2 mb-4 text-lg">Personal Details</h4>
                  <div className="space-y-3 text-sm">
                    <p><span className="font-semibold text-gray-600">DOB:</span> {selectedApp.personalDetails?.dateOfBirth}</p>
                    <p><span className="font-semibold text-gray-600">Gender:</span> {selectedApp.personalDetails?.gender}</p>
                    <p><span className="font-semibold text-gray-600">Phone:</span> {selectedApp.personalDetails?.mobileNumber}</p>
                    <p><span className="font-semibold text-gray-600">Aadhaar:</span> {selectedApp.personalDetails?.aadhaarNumber}</p>
                    <p><span className="font-semibold text-gray-600">Address:</span> {selectedApp.personalDetails?.permanentAddress}</p>
                  </div>
                </div>

                {/* Educational Details */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h4 className="font-bold text-gray-800 border-b pb-2 mb-4 text-lg">Educational Details</h4>
                  <div className="space-y-3 text-sm">
                    <p><span className="font-semibold text-gray-600">Course:</span> {selectedApp.educationalRecord?.courseName}</p>
                    <p><span className="font-semibold text-gray-600">Institution:</span> {selectedApp.educationalRecord?.institutionNameAddress}</p>
                    <p><span className="font-semibold text-gray-600">Fee:</span> ₹{selectedApp.educationalRecord?.totalAnnualCourseFee}</p>
                    <p><span className="font-semibold text-gray-600">Requested Amount:</span> ₹{selectedApp.educationalRecord?.scholarshipAmountRequested}</p>
                  </div>
                </div>

                {/* Documents Section (The PDF Viewers/Links) */}
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-800 border-b pb-3 mb-5 text-lg flex items-center gap-2">
                    <FileText size={20} className="text-[#0F72CE]" />
                    Attached Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    <div className="border border-gray-200 p-5 rounded-xl bg-gray-50/50 flex flex-col items-center text-center transition hover:shadow-md">
                      <span className="font-semibold text-sm mb-3 text-gray-700">Tuition Fee Receipt</span>
                      {selectedApp.documents?.tuitionFeeReceipt ? (
                        <a href={`http://localhost:5000/${selectedApp.documents.tuitionFeeReceipt.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F72CE] text-white rounded-lg text-sm font-semibold hover:bg-[#0A4C8B] w-full transition shadow-sm">
                          <Eye size={16} /> View Document
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm py-2">Not Provided</span>
                      )}
                    </div>

                    <div className="border border-gray-200 p-5 rounded-xl bg-gray-50/50 flex flex-col items-center text-center transition hover:shadow-md">
                      <span className="font-semibold text-sm mb-3 text-gray-700">Family Income Cert</span>
                      {selectedApp.documents?.familyIncomeCertificate ? (
                        <a href={`http://localhost:5000/${selectedApp.documents.familyIncomeCertificate.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F72CE] text-white rounded-lg text-sm font-semibold hover:bg-[#0A4C8B] w-full transition shadow-sm">
                          <Eye size={16} /> View Document
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm py-2">Not Provided</span>
                      )}
                    </div>

                    <div className="border border-gray-200 p-5 rounded-xl bg-gray-50/50 flex flex-col items-center text-center transition hover:shadow-md">
                      <span className="font-semibold text-sm mb-3 text-gray-700">Aadhaar Card</span>
                      {selectedApp.documents?.aadhaarCard ? (
                        <a href={`http://localhost:5000/${selectedApp.documents.aadhaarCard.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F72CE] text-white rounded-lg text-sm font-semibold hover:bg-[#0A4C8B] w-full transition shadow-sm">
                          <Eye size={16} /> View Document
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm py-2">Not Provided</span>
                      )}
                    </div>

                  </div>
                </div>

                {/* Personal Statement */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
                  <h4 className="font-bold text-gray-800 border-b pb-2 mb-4 text-lg">Personal Statement</h4>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div><span className="font-semibold block mb-1">Why choose this course?</span> {selectedApp.personalStatement?.whyCourseInstitution || 'N/A'}</div>
                    <div><span className="font-semibold block mb-1">Financial Difficulties:</span> {selectedApp.personalStatement?.financialDifficulties || 'N/A'}</div>
                    <div><span className="font-semibold block mb-1">How scholarship helps:</span> {selectedApp.personalStatement?.howScholarshipHelps || 'N/A'}</div>
                    <div><span className="font-semibold block mb-1">Why consider you?</span> {selectedApp.personalStatement?.whyConsiderYou || 'N/A'}</div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipAdminPanel;
