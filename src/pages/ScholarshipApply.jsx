import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import ScholarshipFormWizard from '../components/ScholarshipForm/ScholarshipFormWizard';
import api from '../api';

const ScholarshipApply = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('resume');

  const [authUser, setAuthUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('bnpAuthUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [draftApplication, setDraftApplication] = useState(null);
  const [loadingDraft, setLoadingDraft] = useState(!!resumeId);
  const [draftError, setDraftError] = useState('');

  useEffect(() => {
    if (!resumeId || !authUser) return;  // don't fetch if not logged in
    const fetchDraft = async () => {
      try {
        const data = await api.getApplication(resumeId);
        if (data.status !== 'draft') {
          setDraftError('This application is not a draft and cannot be edited.');
        } else {
          setDraftApplication(data);
        }
      } catch (err) {
        setDraftError(err.message || 'Failed to load draft application.');
      } finally {
        setLoadingDraft(false);
      }
    };
    fetchDraft();
  }, [resumeId, authUser]);

  const handleLogout = () => {
    localStorage.removeItem('bnpAuthUser');
    setAuthUser(null);
  };

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#0F72CE]">
            {draftApplication ? 'Resume Your Application' : 'BNP Sikshya Sahayog Scholarship Form'}
          </h1>
          {/* Original text when scholarship is open
          {draftApplication ? (
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              You're resuming your saved draft. All your previous progress has been loaded.
            </p>
          ) : (
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Eligibility: Students who have secured 60% or above marks in the qualifying examination and whose annual family income does not exceed ₹3,00,000 are eligible to apply for this scholarship.
            </p>
          )}
          */}
          {draftApplication ? (
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              The scholarship application date has ended. You can no longer resume or edit your application.
            </p>
          ) : (
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              The scholarship application date has ended. No new applications are being accepted at this time.
            </p>
          )}
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
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-600">Signed in as <span className="font-semibold text-[#0A4C8B]">{authUser.name}</span></p>
                {draftApplication && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wide">
                    Resuming Draft
                  </span>
                )}
              </div>
              <button type="button" onClick={handleLogout} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
            </div>

            {loadingDraft ? (
              <div className="text-center py-20">
                <div className="animate-spin w-10 h-10 border-4 border-[#0F72CE] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Loading your draft application...</p>
              </div>
            ) : (
              <>
                {/* Original form code when scholarship is open
                {draftError ? (
                  <div className="rounded-2xl border bg-red-50 p-8 text-center max-w-md mx-auto">
                    <p className="text-red-600 font-semibold mb-4">{draftError}</p>
                    <Link to="/profile" className="inline-flex rounded-full bg-[#0F72CE] px-6 py-2 font-semibold text-white hover:bg-[#0A4C8B]">
                      Back to Profile
                    </Link>
                  </div>
                ) : (
                  <ScholarshipFormWizard authUser={authUser} draftApplication={draftApplication} />
                )}
                */}

                {/* Active code (Application closed) */}
                <div className="rounded-2xl border bg-yellow-50 p-8 text-center max-w-md mx-auto">
                  <p className="text-yellow-700 font-semibold mb-4">
                    The scholarship application date is over. New applications or draft submissions are no longer allowed.
                  </p>
                  <Link to="/profile" className="inline-flex rounded-full bg-[#0F72CE] px-6 py-2 font-semibold text-white hover:bg-[#0A4C8B]">
                    Check Application Status
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </Layout>
  );
};

export default ScholarshipApply;
