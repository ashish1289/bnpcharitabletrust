import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';
import ApplicationPreview from '../components/ScholarshipForm/ApplicationPreview';
import { X, Eye, Edit3 } from 'lucide-react';

const StudentProfile = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = await api.getCurrentUser();
        setUser(userData.user);

        if (userData.user.role === 'admin') {
          navigate('/admin/scholarships');
          return;
        }

        const appsData = await api.getMyApplications();
        setApplications(appsData);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {}
    localStorage.removeItem('bnpAuthUser');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border border-red-200';
      case 'draft': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'reviewed': return 'bg-purple-100 text-purple-700 border border-purple-200';
      default: return 'bg-amber-100 text-amber-700 border border-amber-200';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-500 font-medium">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  const draftApps = applications.filter(app => app.status === 'draft');
  const submittedApps = applications.filter(app => app.status !== 'draft');

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-24 min-h-[80vh]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0F72CE]">My Profile</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
          </div>
          <button onClick={handleLogout} className="px-5 py-2 rounded-full bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition">
            Logout
          </button>
        </div>

        {/* Draft Applications Section */}
        {draftApps.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-orange-800 flex items-center gap-2">
                  <Edit3 size={20} className="text-orange-600" />
                  Saved Drafts
                </h2>
                <p className="text-sm text-orange-600 mt-0.5">These applications are not yet submitted. Resume them to continue.</p>
              </div>
            </div>

            <div className="grid gap-4">
              {draftApps.map((app) => (
                <div key={app._id} className="p-5 bg-white border border-orange-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition">
                  <div>
                    <h3 className="font-bold text-gray-800">{app.educationalRecord?.courseName || 'Course Not Specified'}</h3>
                    <p className="text-sm text-gray-500">{app.educationalRecord?.institutionNameAddress || 'Institution Not Specified'}</p>
                    <p className="text-xs text-gray-400 mt-2">Last saved: {new Date(app.updatedAt || app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="flex items-center gap-1 text-sm text-gray-500 font-medium hover:underline"
                    >
                      <Eye size={16} /> Preview
                    </button>
                    {/* Original Resume Application button
                    <Link
                      to={`/scholarship/apply?resume=${app._id}`}
                      className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition shadow-sm"
                    >
                      <Edit3 size={16} /> Resume Application
                    </Link>
                    */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submitted Applications Section */}
        <div className="bg-white border rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">My Applications</h2>
            {/* Original New Application button
            <Link to="/scholarship/apply" className="px-4 py-2 rounded-full bg-[#0F72CE] text-white text-sm font-semibold hover:bg-[#0A4C8B] transition">
              + New Application
            </Link>
            */}
          </div>

          {submittedApps.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2">
              <p className="text-gray-500 mb-4">You haven't submitted any applications yet.</p>
              {/* Original Start Application button
              <Link to="/scholarship/apply" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0F72CE] text-white font-semibold rounded-full hover:bg-[#0A4C8B] transition text-sm">
                Start Application
              </Link>
              */}
              <p className="text-sm font-semibold text-red-500">The scholarship application date is now closed.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {submittedApps.map((app) => (
                <div key={app._id} className="p-5 border rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition bg-gray-50/50">
                  <div>
                    <h3 className="font-bold text-gray-800">{app.educationalRecord?.courseName || 'Course Not Specified'}</h3>
                    <p className="text-sm text-gray-500">{app.educationalRecord?.institutionNameAddress || 'Institution Not Specified'}</p>
                    <p className="text-xs text-gray-400 mt-2">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    {app.adminNotes && (
                      <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded max-w-xs text-right">
                        <strong>Note:</strong> {app.adminNotes}
                      </p>
                    )}
                    <button 
                      onClick={() => setSelectedApp(app)}
                      className="flex items-center gap-1 text-sm text-[#0F72CE] font-bold hover:underline"
                    >
                      <Eye size={16} /> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Application Preview Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Application Preview</h2>
                <p className="text-sm text-gray-500">
                  {selectedApp.status === 'draft' ? 'Draft — Last saved: ' : 'Submitted: '}
                  {new Date(selectedApp.updatedAt || selectedApp.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Original Resume button in modal
                {selectedApp.status === 'draft' && (
                  <Link
                    to={`/scholarship/apply?resume=${selectedApp._id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition"
                  >
                    <Edit3 size={16} /> Resume
                  </Link>
                )}
                */}
                <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-200 rounded-full transition">
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto bg-gray-50/50">
              <ApplicationPreview data={selectedApp} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudentProfile;
