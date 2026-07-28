import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';

import api from '../../api';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const saveSession = (user) => {
    localStorage.setItem('bnpAuthUser', JSON.stringify(user));
  };

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('bnpAuthUser') || 'null');
      if (savedUser?.role === 'admin') {
        navigate('/admin/scholarships', { replace: true });
      }
    } catch {
      // Ignore invalid stored values
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!form.email || !form.password) {
      setMessage('Please provide both email and password.');
      setLoading(false);
      return;
    }

    if (mode === 'signup' && !form.name) {
      setMessage('Please enter your name to sign up.');
      setLoading(false);
      return;
    }

    if (mode === 'signup') {
      const studentUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: 'student',
      };

      saveSession(studentUser);
      setMessage('Student account created. Redirecting to the scholarship info portal...');
      navigate('/scholarship-info', { replace: true });
      setLoading(false);
      return;
    }

    try {
      const data = await api.login(form);
      const user = {
        ...data.user,
        role: data.user?.role || 'student',
      };
      saveSession(user);

      if (user.role === 'admin') {
        navigate('/admin/scholarships', { replace: true });
      } else {
        navigate('/scholarship-info', { replace: true });
      }
    } catch (error) {
      setMessage(error.message || 'Login failed. Please check your admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-6 py-24">
        <div className="rounded-3xl border bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-[#0F72CE]">Login</h1>
          <p className="mt-2 text-gray-600">Students can sign up here. Admins should log in with their credentials to access the dashboard.</p>

          <div className="mt-6 flex gap-3">
            <button onClick={() => setMode('login')} className={`rounded-full px-4 py-2 ${mode === 'login' ? 'bg-[#0F72CE] text-white' : 'bg-gray-100 text-gray-700'}`}>
              Login
            </button>
            <button onClick={() => setMode('signup')} className={`rounded-full px-4 py-2 ${mode === 'signup' ? 'bg-[#0F72CE] text-white' : 'bg-gray-100 text-gray-700'}`}>
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {message && <div className="rounded bg-blue-50 p-3 text-blue-700">{message}</div>}

            {mode === 'signup' && (
              <div>
                <label className="mb-2 block text-sm font-semibold">Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border p-3" />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full rounded-xl border p-3" />
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#0F72CE] px-4 py-3 font-semibold text-white hover:bg-[#0A4C8B] disabled:opacity-70">
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLoginPage;
