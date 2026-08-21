import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import api from '../../api';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: 'info' }); // type: 'info' | 'error' | 'success'
  const [loading, setLoading] = useState(false);

  // Forgot password state
  const [forgotStep, setForgotStep] = useState(1); // 1 = email, 2 = otp, 3 = new password
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const saveSession = (user) => {
    localStorage.setItem('bnpAuthUser', JSON.stringify(user));
  };

  const setMsg = (text, type = 'info') => setMessage({ text, type });
  const clearMsg = () => setMessage({ text: '', type: 'info' });

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
    clearMsg();

    if (!form.email || !form.password) {
      setMsg('Please provide both email and password.', 'error');
      setLoading(false);
      return;
    }

    if (mode === 'signup' && !form.name) {
      setMsg('Please enter your name to sign up.', 'error');
      setLoading(false);
      return;
    }

    if (mode === 'signup') {
      try {
        const data = await api.register(form);
        const user = { ...data.user, role: data.user?.role || 'viewer' };
        saveSession(user);
        setMsg('Account created. Redirecting...', 'success');
        navigate('/scholarship-info', { replace: true });
      } catch (error) {
        setMsg(error.message || 'Signup failed.', 'error');
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const data = await api.login(form);
      const user = { ...data.user, role: data.user?.role || 'student' };
      saveSession(user);

      if (user.role === 'admin') {
        navigate('/admin/scholarships', { replace: true });
      } else {
        navigate('/scholarship-info', { replace: true });
      }
    } catch (error) {
      setMsg(error.message || 'Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── Forgot Password Handlers ──────────────────────────

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmail) { setMsg('Please enter your email.', 'error'); return; }
    setLoading(true);
    clearMsg();
    try {
      await api.forgotPassword(forgotEmail);
      setMsg('OTP sent! Check your email inbox (may take a minute).', 'success');
      setForgotStep(2);
    } catch (err) {
      setMsg(err.message || 'Failed to send OTP.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) { setMsg('Please enter the 6-digit OTP.', 'error'); return; }
    setLoading(true);
    clearMsg();
    try {
      await api.verifyOtp(forgotEmail, otp);
      setMsg('OTP verified! Now set your new password.', 'success');
      setForgotStep(3);
    } catch (err) {
      setMsg(err.message || 'Invalid or expired OTP.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) { setMsg('Password must be at least 6 characters.', 'error'); return; }
    if (newPassword !== confirmPassword) { setMsg('Passwords do not match.', 'error'); return; }
    setLoading(true);
    clearMsg();
    try {
      await api.resetPassword(forgotEmail, otp, newPassword);
      setMsg('Password reset successfully! Please log in with your new password.', 'success');
      setTimeout(() => {
        setMode('login');
        setForgotStep(1);
        setForgotEmail(''); setOtp(''); setNewPassword(''); setConfirmPassword('');
        clearMsg();
      }, 2500);
    } catch (err) {
      setMsg(err.message || 'Failed to reset password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setForgotStep(1);
    clearMsg();
  };

  const msgColor = message.type === 'error'
    ? 'bg-red-50 border border-red-200 text-red-700'
    : message.type === 'success'
    ? 'bg-green-50 border border-green-200 text-green-700'
    : 'bg-blue-50 border border-blue-200 text-blue-700';

  return (
    <Layout>
      <section className="mx-auto max-w-lg px-6 py-24">
        <div className="rounded-3xl border bg-white p-8 shadow-xl">

          {/* Header */}
          <h1 className="text-3xl font-bold text-[#0F72CE]">
            {mode === 'forgot' ? 'Reset Password' : 'Login'}
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            {/* Original text when scholarship is open
            {mode === 'forgot'
              ? 'Enter your registered email to receive a one-time password.'
              : 'Students can sign up here. Admins log in with their credentials.'}
            */}
            {mode === 'forgot'
              ? 'Enter your registered email to receive a one-time password.'
              : 'Please log in with your credentials to check your application status.'}
          </p>

          {/* Mode Toggle (Login / Sign Up) */}
          {/* Original code to uncomment when scholarship starts again
          {mode !== 'forgot' && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => switchMode('login')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-[#0F72CE] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Login
              </button>
              <button
                onClick={() => switchMode('signup')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-[#0F72CE] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Sign Up
              </button>
            </div>
          )}
          */}
          {/* Active code (Sign up disabled) */}
          {mode !== 'forgot' && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => switchMode('login')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition bg-[#0F72CE] text-white`}
              >
                Login
              </button>
            </div>
          )}

          {/* Message Banner */}
          {message.text && (
            <div className={`mt-5 rounded-xl p-3 text-sm font-medium ${msgColor}`}>
              {message.text}
            </div>
          )}

          {/* ── LOGIN / SIGNUP FORM ── */}
          {mode !== 'forgot' && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F72CE]" />
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="yourname@email.com" className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F72CE]" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F72CE]" />
              </div>

              {/* Original button text when scholarship is open
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#0F72CE] px-4 py-3 font-semibold text-white hover:bg-[#0A4C8B] disabled:opacity-70 transition">
                {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
              </button>
              */}
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#0F72CE] px-4 py-3 font-semibold text-white hover:bg-[#0A4C8B] disabled:opacity-70 transition">
                {loading ? 'Please wait...' : 'Login'}
              </button>

              {mode === 'login' && (
                <p className="text-center text-sm text-gray-500">
                  <button type="button" onClick={() => switchMode('forgot')} className="text-[#0F72CE] font-semibold hover:underline">
                    Forgot Password?
                  </button>
                </p>
              )}
            </form>
          )}

          {/* ── FORGOT PASSWORD STEPS ── */}
          {mode === 'forgot' && (
            <div className="mt-6">
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <React.Fragment key={s}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${forgotStep >= s ? 'bg-[#0F72CE] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {forgotStep > s ? '✓' : s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-1 rounded ${forgotStep > s ? 'bg-[#0F72CE]' : 'bg-gray-200'}`} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1 — Enter Email */}
              {forgotStep === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">Your Registered Email</label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      placeholder="yourname@email.com"
                      className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F72CE]"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#0F72CE] px-4 py-3 font-semibold text-white hover:bg-[#0A4C8B] disabled:opacity-70 transition">
                    {loading ? 'Sending...' : 'Send OTP to Email'}
                  </button>
                </form>
              )}

              {/* Step 2 — Enter OTP */}
              {forgotStep === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <p className="text-sm text-gray-500">We sent a 6-digit OTP to <strong>{forgotEmail}</strong>. Enter it below.</p>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">Enter OTP</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      required
                      placeholder="123456"
                      className="w-full rounded-xl border border-gray-200 p-3 text-2xl text-center font-black tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#0F72CE]"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#0F72CE] px-4 py-3 font-semibold text-white hover:bg-[#0A4C8B] disabled:opacity-70 transition">
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button type="button" onClick={() => { setForgotStep(1); clearMsg(); }} className="w-full text-sm text-gray-500 hover:underline">
                    ← Use a different email / Resend OTP
                  </button>
                </form>
              )}

              {/* Step 3 — New Password */}
              {forgotStep === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <p className="text-sm text-gray-500">OTP verified ✓ — set your new password below.</p>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="At least 6 characters"
                      className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F72CE]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Repeat new password"
                      className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F72CE]"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-70 transition">
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              )}

              <p className="mt-4 text-center text-sm text-gray-500">
                <button type="button" onClick={() => switchMode('login')} className="text-[#0F72CE] font-semibold hover:underline">
                  ← Back to Login
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminLoginPage;
