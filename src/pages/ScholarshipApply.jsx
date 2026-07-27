import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';

import api from '../api';

const ScholarshipApply = () => {
  const [authUser, setAuthUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('bnpAuthUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    institution: '',
    course: '',
    yearOfStudy: '',
    familyIncome: '',
    reason: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser?.email) {
      setFormData((prev) => ({
        ...prev,
        email: prev.email || authUser.email,
        studentName: prev.studentName || authUser.name || '',
      }));
    }
  }, [authUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('bnpAuthUser');
    setAuthUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.submitScholarship(formData);

      setMessage('Scholarship application submitted successfully. You can check back later for updates.');
      setFormData({
        studentName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        institution: '',
        course: '',
        yearOfStudy: '',
        familyIncome: '',
        reason: '',
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#0F72CE]">Scholarship Application</h1>
          <p className="mt-3 text-gray-600">Use the shared Login button to continue, then submit your scholarship request.</p>
        </div>

        {!authUser ? (
          <div className="mb-8 rounded-3xl border bg-white p-8 shadow-xl">
            <div className="rounded-xl bg-blue-50 p-4 text-blue-700">
              Please sign in first using the Login button in the navbar to continue with your scholarship application.
            </div>
            <Link to="/admin/login" className="mt-6 inline-flex rounded-full bg-[#0F72CE] px-5 py-3 font-semibold text-white hover:bg-[#0A4C8B]">
              Go to Login
            </Link>
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-600">Signed in as <span className="font-semibold text-[#0A4C8B]">{authUser.name}</span></p>
            <button type="button" onClick={handleLogout} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
          </div>
        )}

        {authUser && (
          <>
            <div className="mb-6 flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-600">Signed in as <span className="font-semibold text-[#0A4C8B]">{authUser.name}</span></p>
              <button type="button" onClick={handleLogout} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Logout
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border bg-white p-8 shadow-xl">
              {message && <div className="rounded bg-green-50 p-3 text-green-700">{message}</div>}

            <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Full Name</label>
              <input name="studentName" value={formData.studentName} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">School / College</label>
              <input name="institution" value={formData.institution} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Course / Program</label>
              <input name="course" value={formData.course} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Year of Study</label>
              <input name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Family Income</label>
              <input name="familyIncome" value={formData.familyIncome} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Why do you need this scholarship?</label>
            <textarea name="reason" value={formData.reason} onChange={handleChange} required rows="5" className="w-full rounded-xl border p-3" />
          </div>

            <button type="submit" disabled={loading} className="rounded-xl bg-[#0F72CE] px-6 py-3 font-semibold text-white hover:bg-[#0A4C8B] disabled:opacity-70">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
          </>
        )}
      </section>
    </Layout>
  );
};

export default ScholarshipApply;
