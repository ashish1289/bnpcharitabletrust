import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Save, CheckSquare, Square, FileText, MapPin, Camera, UploadCloud, AlertCircle } from 'lucide-react';
import api from '../../api';

const AgentVerificationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [student, setStudent] = useState(null);
  const [report, setReport] = useState({
    correspondenceDepartment: '', correspondenceInstitution: '', correspondenceHostel: '', correspondenceRoomNo: '', hodNameMobile: '', wardenNameMobile: '',
    courseAndYear: '', institutionNameAddress: '', schoolPreviousNameAddress: '', collegePreviousNameAddress: '', marksObtainedPreviousExam: '', otherScholarship: 'No',
    fatherName: '', fatherAadhar: '', fatherContact: '', motherName: '', motherAadhar: '', motherContact: '', socialCategory: '', specialCategory: '',
    familyOccupation: '', annualFamilyIncome: '', rationCardType: '', housingCondition: '', landHoldingStatus: '', assetsOwned: [],
    documents: [
      { name: 'Passport Size Photographs (2 Copies)', copyAttached: false, originalVerified: false, remarks: '' },
      { name: "Student's Aadhaar Card Copy", copyAttached: false, originalVerified: false, remarks: '' },
      { name: "Parent/Guardian's Aadhaar Card Copy", copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Recent Family Photo with applicant', copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Marksheet of Previous Examination', copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Bonafide Student Certificate / ID Card/admission proof/ Intimation Letter/ any others', copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Valid Income Certificate', copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Caste Certificate (SC/ST/OBC/SEBC)', copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Ration Card / BPL Card Copy', copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Bank Passbook First Page Copy', copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Disability Certificate (if applicable)', copyAttached: false, originalVerified: false, remarks: '' },
      { name: 'Orphan / Single Parent Certificate (if applicable)', copyAttached: false, originalVerified: false, remarks: '' }
    ],
    localPersonInfo: '',
    isAuthentic: '', isGenuinelyInNeed: '', specificRemarks: '',
    finalRecommendation: 'RECOMMENDED', rejectionReason: ''
  });

  const [geolocation, setGeolocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.getAgentAssignment(id);
        if (res.success) {
          setStudent(res.student);
          if (res.report) {
            setReport(res.report);
            if (res.report.geolocation) setGeolocation(res.report.geolocation);
          } else {
            setReport(prev => ({
              ...prev,
              courseAndYear: res.student.institutionName,
              marksObtainedPreviousExam: (res.student.marks * 100).toFixed(2),
              annualFamilyIncome: res.student.annualIncome,
              socialCategory: res.student.category,
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

  const handleDocToggle = (index, field) => {
    const newDocs = [...report.documents];
    newDocs[index][field] = !newDocs[index][field];
    setReport({ ...report, documents: newDocs });
  };

  const handleDocRemark = (index, val) => {
    const newDocs = [...report.documents];
    newDocs[index].remarks = val;
    setReport({ ...report, documents: newDocs });
  };

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setFilesToUpload(prev => ({ ...prev, [fieldName]: e.target.files[0] }));
    }
  };

  const toggleAsset = (asset) => {
    setReport(prev => {
      const exists = prev.assetsOwned.includes(asset);
      return {
        ...prev,
        assetsOwned: exists ? prev.assetsOwned.filter(a => a !== asset) : [...prev.assetsOwned, asset]
      };
    });
  };

  const captureLocation = () => {
    setLocationLoading(true);
    setErrorMsg('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLocationLoading(false);
        },
        (error) => {
          setErrorMsg('Failed to get location. Please allow location permissions.');
          setLocationLoading(false);
        }
      );
    } else {
      setErrorMsg('Geolocation is not supported by this browser.');
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    
    if (!geolocation) {
      setErrorMsg('Please capture your location before submitting.');
      setSubmitting(false);
      return;
    }
    
    if (!filesToUpload.agentSelfie && !report.agentSelfieUrl) {
      setErrorMsg('Please capture a selfie as proof of visit.');
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ ...report, geolocation }));
      
      Object.keys(filesToUpload).forEach(key => {
        formData.append(key, filesToUpload[key]);
      });

      const res = await api.submitVerification(id, formData);
      if (res.success) {
        setMessage('Physical Verification Report Submitted!');
        setTimeout(() => navigate('/agent/dashboard'), 2000);
      }
    } catch (error) {
      setErrorMsg(error.message || 'Submission failed');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold">Loading Form...</div>;

  const InputRow = ({ label, value, onChange, type="text" }) => (
    <div className="mb-3">
      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">{label}</label>
      <input type={type} value={value} onChange={onChange} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm font-medium" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* App Bar */}
      <div className="bg-indigo-600 text-white px-4 py-4 flex items-center gap-3 sticky top-0 z-30 shadow-md">
        <button onClick={() => navigate('/agent/dashboard')} className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-extrabold text-lg">Physical Verification Form</h1>
      </div>

      {message && (
        <div className="m-4 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 font-bold flex items-center gap-3 shadow-sm">
          <CheckCircle size={20} /> {message}
        </div>
      )}
      {errorMsg && (
        <div className="m-4 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 font-bold flex items-center gap-3 shadow-sm">
          <AlertCircle size={20} /> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        
        {/* Section 1: Basic Info */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="font-black text-indigo-900 text-lg border-b pb-2 mb-4">1. Student's Basic Information</h2>
          <div className="bg-indigo-50 p-4 rounded-xl mb-4 border border-indigo-100">
            <p className="text-xl font-black text-indigo-900">{student?.name}</p>
            <p className="text-sm font-medium text-indigo-700">{student?.mobileNo}</p>
            <p className="text-xs text-indigo-600 mt-2">{student?.permanentAddress} | PIN: {student?.pinCode}</p>
          </div>
          
          <h3 className="font-bold text-gray-800 text-sm mb-3">Correspondence Address (Hostel/Mess)</h3>
          <InputRow label="Department" value={report.correspondenceDepartment} onChange={e => setReport({...report, correspondenceDepartment: e.target.value})} />
          <InputRow label="Institution Name & Address" value={report.correspondenceInstitution} onChange={e => setReport({...report, correspondenceInstitution: e.target.value})} />
          <InputRow label="Hostel/Pvt Mess Name" value={report.correspondenceHostel} onChange={e => setReport({...report, correspondenceHostel: e.target.value})} />
          <InputRow label="Room No" value={report.correspondenceRoomNo} onChange={e => setReport({...report, correspondenceRoomNo: e.target.value})} />
          <InputRow label="Name of HOD & Mobile" value={report.hodNameMobile} onChange={e => setReport({...report, hodNameMobile: e.target.value})} />
          <InputRow label="Name of Warden & Mobile" value={report.wardenNameMobile} onChange={e => setReport({...report, wardenNameMobile: e.target.value})} />
        </div>

        {/* Section 2: Academic */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="font-black text-indigo-900 text-lg border-b pb-2 mb-4">2. Academic & Institution Details</h2>
          <InputRow label="Current Course & Year/Semester" value={report.courseAndYear} onChange={e => setReport({...report, courseAndYear: e.target.value})} />
          <InputRow label="Institutions Name & Address" value={report.institutionNameAddress} onChange={e => setReport({...report, institutionNameAddress: e.target.value})} />
          <InputRow label="School (Previous) Name & Address" value={report.schoolPreviousNameAddress} onChange={e => setReport({...report, schoolPreviousNameAddress: e.target.value})} />
          <InputRow label="College (Previous) Name & Address" value={report.collegePreviousNameAddress} onChange={e => setReport({...report, collegePreviousNameAddress: e.target.value})} />
          <InputRow label="Marks Obtained in Previous Exam (%)" value={report.marksObtainedPreviousExam} onChange={e => setReport({...report, marksObtainedPreviousExam: e.target.value})} />
          
          <div className="mt-3">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Availing any other Scholarship?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm font-medium"><input type="radio" checked={report.otherScholarship === 'Yes'} onChange={() => setReport({...report, otherScholarship: 'Yes'})} className="w-4 h-4 text-indigo-600" /> Yes</label>
              <label className="flex items-center gap-2 text-sm font-medium"><input type="radio" checked={report.otherScholarship === 'No'} onChange={() => setReport({...report, otherScholarship: 'No'})} className="w-4 h-4 text-indigo-600" /> No</label>
            </div>
          </div>
        </div>

        {/* Section 3: Family */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="font-black text-indigo-900 text-lg border-b pb-2 mb-4">3. Family & Social Background</h2>
          <div className="grid grid-cols-2 gap-3">
            <InputRow label="Father's Name" value={report.fatherName} onChange={e => setReport({...report, fatherName: e.target.value})} />
            <InputRow label="Father's Aadhar" value={report.fatherAadhar} onChange={e => setReport({...report, fatherAadhar: e.target.value})} />
          </div>
          <InputRow label="Father's Contact" value={report.fatherContact} onChange={e => setReport({...report, fatherContact: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-3">
            <InputRow label="Mother's Name" value={report.motherName} onChange={e => setReport({...report, motherName: e.target.value})} />
            <InputRow label="Mother's Aadhar" value={report.motherAadhar} onChange={e => setReport({...report, motherAadhar: e.target.value})} />
          </div>
          <InputRow label="Mother's Contact" value={report.motherContact} onChange={e => setReport({...report, motherContact: e.target.value})} />
          
          <div className="mb-3">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Social Category</label>
            <select value={report.socialCategory} onChange={e => setReport({...report, socialCategory: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium">
              <option value="">Select...</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC/SEBC">OBC/SEBC</option>
              <option value="General">General</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Special Category (if applicable)</label>
            <select value={report.specialCategory} onChange={e => setReport({...report, specialCategory: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium">
              <option value="">None</option>
              <option value="Person with Disability (PwD)">Person with Disability (PwD)</option>
              <option value="Orphan">Orphan</option>
              <option value="Single Parent Child">Single Parent Child</option>
            </select>
          </div>
        </div>

        {/* Section 4: Socio Economic */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="font-black text-indigo-900 text-lg border-b pb-2 mb-4">4. Socio-Economic Details</h2>
          
          <div className="mb-3">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Primary Family Occupation</label>
            <select value={report.familyOccupation} onChange={e => setReport({...report, familyOccupation: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium">
              <option value="">Select...</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Daily Wage Labourer">Daily Wage Labourer</option>
              <option value="Service">Service</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <InputRow label="Annual Family Income (as per cert)" value={report.annualFamilyIncome} onChange={e => setReport({...report, annualFamilyIncome: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Ration Card Type</label>
              <select value={report.rationCardType} onChange={e => setReport({...report, rationCardType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium">
                <option value="">Select...</option>
                <option value="BPL">BPL</option>
                <option value="AAY (Antyodaya)">AAY (Antyodaya)</option>
                <option value="APL">APL</option>
                <option value="No Card">No Card</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Housing Condition</label>
              <select value={report.housingCondition} onChange={e => setReport({...report, housingCondition: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium">
                <option value="">Select...</option>
                <option value="Kucha">Kucha</option>
                <option value="Semi-Pucca">Semi-Pucca</option>
                <option value="Pucca">Pucca</option>
                <option value="Rented">Rented</option>
              </select>
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Land Holding Status</label>
            <select value={report.landHoldingStatus} onChange={e => setReport({...report, landHoldingStatus: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium">
              <option value="">Select...</option>
              <option value="Landless">Landless</option>
              <option value="Less than 1 Acre">Less than 1 Acre</option>
              <option value="1-5 Acres">1-5 Acres</option>
              <option value="Above 5 Acres">Above 5 Acres</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Assets/Vehicles Owned</label>
            <div className="flex flex-wrap gap-2">
              {['Two-Wheeler', 'Four-Wheeler', 'Tractor', 'Refrigerator', 'AC'].map(asset => (
                <label key={asset} className={`px-3 py-1.5 rounded-full border text-xs font-bold cursor-pointer transition ${report.assetsOwned.includes(asset) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-600'}`}>
                  <input type="checkbox" className="hidden" checked={report.assetsOwned.includes(asset)} onChange={() => toggleAsset(asset)} />
                  {asset}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Document Checklist */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="font-black text-indigo-900 text-lg border-b pb-2 mb-4">5. Document Verification Checklist</h2>
          <p className="text-xs text-gray-500 mb-4 leading-snug">Verify each document physically. If missing/incorrect, you can capture a live photo or upload a file directly.</p>
          
          <div className="space-y-4">
            {report.documents.map((doc, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="font-bold text-sm text-gray-900 mb-3">{idx + 1}. {doc.name}</p>
                <div className="flex flex-wrap gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    {doc.copyAttached ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-gray-400" />}
                    <span className="text-xs font-bold text-gray-700" onClick={() => handleDocToggle(idx, 'copyAttached')}>Copy Attached</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    {doc.originalVerified ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-gray-400" />}
                    <span className="text-xs font-bold text-gray-700" onClick={() => handleDocToggle(idx, 'originalVerified')}>Original Verified</span>
                  </label>
                </div>
                <input type="text" placeholder="Remarks..." value={doc.remarks} onChange={e => handleDocRemark(idx, e.target.value)} className="w-full bg-white border border-gray-300 p-2 rounded-lg text-xs mb-3" />
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Upload / Capture Image</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, `document_${idx}`)}
                    className="text-xs w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" 
                  />
                  {filesToUpload[`document_${idx}`] && <span className="text-[10px] text-green-600 font-bold">✓ File Selected</span>}
                  {!filesToUpload[`document_${idx}`] && doc.uploadedFileUrl && <span className="text-[10px] text-green-600 font-bold">✓ Previously Uploaded</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Local Reference */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="font-black text-indigo-900 text-lg border-b pb-2 mb-4">6. Local Reference</h2>
          <label className="block text-xs font-bold text-gray-600 uppercase mb-1 leading-snug">Info from Sarapanch / Ward Member / Important Person (Name & Position)</label>
          <textarea rows="3" value={report.localPersonInfo} onChange={e => setReport({...report, localPersonInfo: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium" placeholder="E.g., Spoke to Mr. Sharma (Ward Member)..."></textarea>
        </div>

        {/* Section 7: Observations */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="font-black text-indigo-900 text-lg border-b pb-2 mb-4">7. Field Inspection & Observations</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-800 mb-2">A. Are details provided by student authentic?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm font-medium"><input type="radio" checked={report.isAuthentic === 'Yes'} onChange={() => setReport({...report, isAuthentic: 'Yes'})} className="w-4 h-4 text-indigo-600" /> Yes</label>
              <label className="flex items-center gap-2 text-sm font-medium"><input type="radio" checked={report.isAuthentic === 'No'} onChange={() => setReport({...report, isAuthentic: 'No'})} className="w-4 h-4 text-indigo-600" /> No</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-800 mb-2">B. Is applicant genuinely in need of assistance?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm font-medium"><input type="radio" checked={report.isGenuinelyInNeed === 'Yes'} onChange={() => setReport({...report, isGenuinelyInNeed: 'Yes'})} className="w-4 h-4 text-indigo-600" /> Yes</label>
              <label className="flex items-center gap-2 text-sm font-medium"><input type="radio" checked={report.isGenuinelyInNeed === 'No'} onChange={() => setReport({...report, isGenuinelyInNeed: 'No'})} className="w-4 h-4 text-indigo-600" /> No</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">C. Specific Remarks/Observations</label>
            <textarea rows="3" value={report.specificRemarks} onChange={e => setReport({...report, specificRemarks: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-sm font-medium" placeholder="Additional notes..."></textarea>
          </div>
        </div>

        {/* Section 8: Recommendation */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-indigo-600">
          <h2 className="font-black text-indigo-900 text-lg border-b pb-2 mb-4">8. Final Recommendation</h2>
          <div className="mb-4">
            <select value={report.finalRecommendation} onChange={e => setReport({...report, finalRecommendation: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl font-bold text-base focus:ring-2 focus:ring-indigo-500">
              <option value="RECOMMENDED">✅ RECOMMENDED for Scholarship</option>
              <option value="REJECTED">❌ REJECTED</option>
              <option value="NEEDS FOLLOWUP">⚠️ Needs Follow-up</option>
            </select>
          </div>
          {report.finalRecommendation === 'REJECTED' && (
            <div>
              <label className="block text-xs font-bold text-red-600 uppercase mb-1">Reason for Rejection</label>
              <textarea rows="2" value={report.rejectionReason} onChange={e => setReport({...report, rejectionReason: e.target.value})} className="w-full bg-red-50 border border-red-200 p-2.5 rounded-lg text-sm font-medium" placeholder="State reason..."></textarea>
            </div>
          )}
        </div>

        {/* Section 9: Live Proofs & Uploads */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-green-500">
          <h2 className="font-black text-gray-900 text-lg border-b pb-2 mb-4">9. Proof of Visit (Required)</h2>
          
          <div className="space-y-6">
            {/* Geolocation */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Location Capture</label>
              {geolocation ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-700">
                    <MapPin size={18} />
                    <span className="text-xs font-bold">Lat: {geolocation.lat.toFixed(6)}, Lng: {geolocation.lng.toFixed(6)}</span>
                  </div>
                  <button type="button" onClick={captureLocation} className="text-xs font-bold text-green-700 underline">Update</button>
                </div>
              ) : (
                <button type="button" onClick={captureLocation} disabled={locationLoading} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition">
                  <MapPin size={18} /> {locationLoading ? 'Getting Location...' : 'Capture Current GPS Location'}
                </button>
              )}
            </div>

            {/* Agent Selfie */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Live Agent Selfie</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition relative">
                <input type="file" accept="image/*" capture="user" onChange={(e) => handleFileChange(e, 'agentSelfie')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-700">Tap to Take Selfie</p>
                {(filesToUpload.agentSelfie || report.agentSelfieUrl) && <p className="text-xs text-green-600 font-bold mt-1">✓ Selfie Captured</p>}
              </div>
            </div>

            {/* Physical Form Copy */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Scan/Photo of Physical Form</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition relative">
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'physicalFormCopy')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <UploadCloud size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-700">Tap to Upload Form</p>
                <p className="text-[10px] text-gray-500">Take a photo of the paper version</p>
                {(filesToUpload.physicalFormCopy || report.physicalFormCopyUrl) && <p className="text-xs text-green-600 font-bold mt-1">✓ Form Uploaded</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Declaration and Submit */}
        <div className="bg-gray-100 p-4 rounded-xl border border-gray-300 text-center mb-6">
          <p className="text-xs text-gray-600 font-semibold mb-4 leading-relaxed">
            I hereby declare that I have physically visited the applicant's residence/institution, verified all necessary original documents, and found the above information to be accurate to the best of my knowledge.
          </p>
          <button disabled={submitting} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition">
            <Save size={20} />
            {submitting ? 'Submitting...' : 'Agree & Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentVerificationForm;
