import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-500 font-medium">Loading profile...</p>
        </div>
      </Layout>
    );
  }

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

        <div className="bg-white border rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">My Applications</h2>
            <Link to="/scholarship/apply" className="px-4 py-2 rounded-full bg-[#0F72CE] text-white text-sm font-semibold hover:bg-[#0A4C8B] transition">
              + New Application
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2">
              <p className="text-gray-500 mb-4">You haven't submitted any applications yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((app) => (
                <div key={app._id} className="p-5 border rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition bg-gray-50/50">
                  <div>
                    <h3 className="font-bold text-gray-800">{app.educationalRecord?.courseName || 'Course Not Specified'}</h3>
                    <p className="text-sm text-gray-500">{app.educationalRecord?.institutionNameAddress || 'Institution Not Specified'}</p>
                    <p className="text-xs text-gray-400 mt-2">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase
                      ${app.status === 'approved' ? 'bg-green-100 text-green-700' : 
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                        app.status === 'draft' ? 'bg-gray-200 text-gray-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {app.status}
                    </span>
                    {app.adminNotes && (
                      <p className="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded max-w-xs text-right">
                        <strong>Note:</strong> {app.adminNotes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
