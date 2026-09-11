import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Save, CheckSquare, Square, FileText } from 'lucide-react';
import api from '../../api';

const AgentVerificationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  
  const [student, setStudent] = useState(null);
  const [report, setReport] = useState({
    academicDetails: { currentCourse: '', passingYear: '', marks: '' },
    familyDetails: { fatherName: '', fatherOccupation: '', motherName: '', motherOccupation: '', numberOfSiblings: '', siblingsEducation: '', totalAnnualIncome: '' },
    socioEconomic: { typeOfHouse: '', roofType: '', totalLandHolding: '', primaryWaterSource: '', modeOfTransport: '' },
    documents: [
      { name: 'Income Certificate', available: false, uploadedFile: '' },
      { name: 'Adhaar Card', available: false, uploadedFile: '' },
      { name: 'Bank Passbook', available: false, uploadedFile: '' },
      { name: 'Previous marksheet', available: false, uploadedFile: '' },
      { name: 'Tuition receipt', available: false, uploadedFile: '' },
      { name: 'College ID', available: false, uploadedFile: '' }
    ],
    agentRemarks: { strengths: '', weaknesses: '', finalRecommendation: 'Recommend' }
  });

  const [filesToUpload, setFilesToUpload] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.getAgentAssignment(id);
        if (res.success) {
          setStudent(res.student);
          if (res.report) {
            setReport(res.report);
          } else {
            // Pre-fill some data from student if report doesn't exist
            setReport(prev => ({
              ...prev,
              academicDetails: { ...prev.academicDetails, currentCourse: res.student.institutionName, marks: res.student.marks * 100 },
              familyDetails: { ...prev.familyDetails, totalAnnualIncome: res.student.annualIncome },
            }));
          }
        }
      } catch (error) {
        navigate('/agent/dashboard', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id, navigate]);

  const handleDocToggle = (index) => {
    const newDocs = [...report.documents];
    newDocs[index].available = !newDocs[index].available;
    setReport({ ...report, documents: newDocs });
  };

  const handleFileChange = (e, docName) => {
    if (e.target.files && e.target.files[0]) {
      setFilesToUpload({ ...filesToUpload, [docName]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(report));
      
      // Append files
      Object.keys(filesToUpload).forEach(docName => {
        formData.append(docName, filesToUpload[docName]);
      });

      const res = await api.submitVerification(id, formData);
      if (res.success) {
        setMessage('Verification Report Submitted!');
        setTimeout(() => navigate('/agent/dashboard'), 2000);
      }
    } catch (error) {
      setMessage(error.message || 'Submission failed');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* App Bar */}
      <div className="bg-indigo-600 text-white px-4 py-4 flex items-center gap-3 sticky top-0 z-10 shadow-md">
        <button onClick={() => navigate('/agent/dashboard')} className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-extrabold text-lg">Verify Application</h1>
      </div>

      {message && (
        <div className="m-4 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 font-bold flex items-center gap-3">
          <CheckCircle size={20} /> {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Student Info Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Applicant</h2>
          <p className="text-xl font-black text-gray-900">{student?.name}</p>
          <p className="text-sm text-gray-600">{student?.mobileNo}</p>
          <p className="text-sm text-gray-600 mt-2">{student?.institutionName}</p>
        </div>

        {/* 1. Academic Details */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-lg border-b pb-2">1. Academic Details</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Course / Year</label>
            <input type="text" value={report.academicDetails.currentCourse} onChange={e => setReport({...report, academicDetails: {...report.academicDetails, currentCourse: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Passing Year</label>
              <input type="text" value={report.academicDetails.passingYear} onChange={e => setReport({...report, academicDetails: {...report.academicDetails, passingYear: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Marks %</label>
              <input type="text" value={report.academicDetails.marks} onChange={e => setReport({...report, academicDetails: {...report.academicDetails, marks: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
          </div>
        </div>

        {/* 2. Family Details */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-lg border-b pb-2">2. Family Background</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Father's Name</label>
              <input type="text" value={report.familyDetails.fatherName} onChange={e => setReport({...report, familyDetails: {...report.familyDetails, fatherName: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Occupation</label>
              <input type="text" value={report.familyDetails.fatherOccupation} onChange={e => setReport({...report, familyDetails: {...report.familyDetails, fatherOccupation: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mother's Name</label>
              <input type="text" value={report.familyDetails.motherName} onChange={e => setReport({...report, familyDetails: {...report.familyDetails, motherName: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Occupation</label>
              <input type="text" value={report.familyDetails.motherOccupation} onChange={e => setReport({...report, familyDetails: {...report.familyDetails, motherOccupation: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Annual Income</label>
            <input type="text" value={report.familyDetails.totalAnnualIncome} onChange={e => setReport({...report, familyDetails: {...report.familyDetails, totalAnnualIncome: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-gray-900" />
          </div>
        </div>

        {/* 3. Socio-Economic */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-lg border-b pb-2">3. Socio-Economic Status</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type of House</label>
              <select value={report.socioEconomic.typeOfHouse} onChange={e => setReport({...report, socioEconomic: {...report.socioEconomic, typeOfHouse: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm">
                <option value="">Select...</option>
                <option value="Kutcha">Kutcha (Mud)</option>
                <option value="Semi-Pucca">Semi-Pucca</option>
                <option value="Pucca">Pucca (Concrete)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Land Holding</label>
              <input type="text" placeholder="e.g. 1 Acre" value={report.socioEconomic.totalLandHolding} onChange={e => setReport({...report, socioEconomic: {...report.socioEconomic, totalLandHolding: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
          </div>
        </div>

        {/* 4. Documents Checklist */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-lg border-b pb-2">4. Documents Available</h3>
          <p className="text-xs text-gray-500 mb-4">Check if document is physically available. If missing, please capture a photo to upload.</p>
          <div className="space-y-4">
            {report.documents.map((doc, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div 
                  onClick={() => handleDocToggle(idx)} 
                  className="flex items-center gap-3 cursor-pointer"
                >
                  {doc.available ? <CheckSquare size={24} className="text-indigo-600" /> : <Square size={24} className="text-gray-400" />}
                  <span className={`font-semibold text-sm ${doc.available ? 'text-gray-900' : 'text-gray-500'}`}>{doc.name}</span>
                </div>
                {!doc.available && (
                  <div className="mt-3 ml-9">
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(e, doc.name)}
                      className="text-xs w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                      accept="image/*,.pdf"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5. Remarks */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-lg border-b pb-2">5. Remarks</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Final Recommendation</label>
            <select value={report.agentRemarks.finalRecommendation} onChange={e => setReport({...report, agentRemarks: {...report.agentRemarks, finalRecommendation: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm">
              <option value="Recommend">✅ Recommend for Scholarship</option>
              <option value="Do Not Recommend">❌ Do Not Recommend</option>
              <option value="Needs Followup">⚠️ Needs Follow-up</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Notes</label>
            <textarea rows="3" value={report.agentRemarks.strengths} onChange={e => setReport({...report, agentRemarks: {...report.agentRemarks, strengths: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Any other observations..."></textarea>
          </div>
        </div>

        {/* Fixed Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-20">
          <button disabled={submitting} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition">
            <Save size={20} />
            {submitting ? 'Submitting...' : 'Submit Verification Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentVerificationForm;
