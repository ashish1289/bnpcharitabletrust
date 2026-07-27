import React, { useEffect, useState } from 'react';

import api from '../../api';

const ScholarshipAdminPanel = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [admin, setAdmin] = useState(null);

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

  const updateStatus = async (id, status, adminNotes) => {
    try {
      await api.updateApplicationStatus(id, { status, adminNotes });
      setMessage('Status updated successfully');
      fetchApplications();
    } catch (error) {
      setMessage(error.message);
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
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-[#0F72CE] mb-4">Scholarship Applications</h2>
      <p className="text-gray-600 mb-6">Admin dashboard for reviewing applications.</p>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {message && <div className="rounded bg-blue-50 p-3 text-blue-700">{message}</div>}
        </div>
        <button type="button" onClick={handleLogout} className="inline-flex items-center justify-center rounded-full bg-[#0F72CE] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0A4C8B]">
          Logout
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Email</th>
              <th className="p-3">Institution</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="p-3">{app.studentName}</td>
                <td className="p-3">{app.email}</td>
                <td className="p-3">{app.institution}</td>
                <td className="p-3">{app.status}</td>
                <td className="p-3">
                  <select
                    className="rounded border p-2"
                    defaultValue={app.status}
                    onChange={(e) => updateStatus(app._id, e.target.value, app.adminNotes || '')}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScholarshipAdminPanel;
