import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import ScholarshipFormWizard from '../components/ScholarshipForm/ScholarshipFormWizard';

const ScholarshipApply = () => {
  const [authUser, setAuthUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('bnpAuthUser');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('bnpAuthUser');
    setAuthUser(null);
  };

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#0F72CE]">BNP Sikshya Sahayog Scholarship Form</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Eligibility: Students who have secured 60% or above marks in the qualifying examination and whose annual family income does not exceed ₹3,00,000 are eligible to apply for this scholarship.
          </p>
        </div>

        {!authUser ? (
          <div className="mb-8 rounded-3xl border bg-white p-8 shadow-xl text-center max-w-md mx-auto">
            <div className="rounded-xl bg-blue-50 p-4 text-blue-700 mb-6">
              Please sign in first using the Login button to continue with your scholarship application.
            </div>
            <Link to="/admin/login" className="inline-flex rounded-full bg-[#0F72CE] px-8 py-3 font-semibold text-white hover:bg-[#0A4C8B]">
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-600">Signed in as <span className="font-semibold text-[#0A4C8B]">{authUser.name}</span></p>
              <button type="button" onClick={handleLogout} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
            </div>

            <ScholarshipFormWizard authUser={authUser} />
          </>
        )}
      </section>
    </Layout>
  );
};

export default ScholarshipApply;
