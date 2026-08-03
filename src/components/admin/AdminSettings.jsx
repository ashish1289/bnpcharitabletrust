import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Settings, ShieldAlert, FileText, Check, X } from 'lucide-react';
import api from '../../api';

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data);
      } catch (error) {
        setMessage('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateSettings(settings);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const toggleField = (fieldKey) => {
    setSettings(prev => ({
      ...prev,
      mandatoryFields: {
        ...prev.mandatoryFields,
        [fieldKey]: !prev.mandatoryFields[fieldKey]
      }
    }));
  };

  const handleCriteriaChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      eligibilityCriteria: {
        ...prev.eligibilityCriteria,
        [name]: Number(value)
      }
    }));
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#0F72CE] border-t-transparent rounded-full"></div></div>;
  if (!settings) return null;

  const renderToggle = (label, fieldKey) => {
    const isRequired = settings.mandatoryFields[fieldKey];
    return (
      <div 
        onClick={() => toggleField(fieldKey)}
        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
      >
        <span className="font-medium text-gray-700 text-sm">{label}</span>
        <div className={`flex items-center justify-center w-12 h-6 rounded-full transition-colors ${isRequired ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isRequired ? 'translate-x-3' : '-translate-x-3'}`} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Settings className="text-[#0F72CE]" /> Platform Settings
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Configure eligibility rules and form requirements</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#0F72CE] text-white font-bold rounded-xl hover:bg-[#0A4C8B] transition shadow-md disabled:opacity-70"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 font-medium flex items-center gap-3 shadow-sm">
          <CheckCircle size={20} className="text-green-500 shrink-0" />
          {message}
        </div>
      )}

      {/* Eligibility Rules */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm mb-8">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
          <ShieldAlert className="text-amber-500" /> Automated Eligibility Rules
        </h3>
        <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
          Applications failing these criteria will submit successfully but will be silently routed to the "Ineligible" tab to keep your main queue clean.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block uppercase tracking-wide">Max Annual Family Income (₹)</label>
            <input 
              type="number"
              name="maxAnnualIncome"
              value={settings.eligibilityCriteria.maxAnnualIncome}
              onChange={handleCriteriaChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0F72CE] font-bold text-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block uppercase tracking-wide">Min Recent Marks (%)</label>
            <input 
              type="number"
              name="minMarksPercentage"
              value={settings.eligibilityCriteria.minMarksPercentage}
              onChange={handleCriteriaChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0F72CE] font-bold text-lg"
            />
          </div>
        </div>
      </div>

      {/* Mandatory Fields */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
          <FileText className="text-[#0F72CE]" /> Form Field Requirements
        </h3>
        <p className="text-sm text-gray-500 mb-8 font-medium">Toggle switches to make fields mandatory (green) or optional (gray) for the student application form.</p>

        <div className="space-y-10">
          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Step 1: Personal Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderToggle('Full Name', 'fullName')}
              {renderToggle('Date of Birth', 'dateOfBirth')}
              {renderToggle('Gender', 'gender')}
              {renderToggle('Aadhaar Number', 'aadhaarNumber')}
              {renderToggle('Mobile Number', 'mobileNumber')}
              {renderToggle('Email Address', 'emailAddress')}
              {renderToggle('Permanent Address', 'permanentAddress')}
              {renderToggle('Correspondence Address', 'correspondenceAddress')}
              {renderToggle('District & State', 'districtAndState')}
              {renderToggle('Rural/Urban Area', 'ruralUrbanArea')}
              {renderToggle('Disability', 'disability')}
              {renderToggle('Special Category', 'specialCategory')}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Step 2: Educational Record</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderToggle('Course Name', 'courseName')}
              {renderToggle('Institution Name', 'institutionNameAddress')}
              {renderToggle('Course Duration', 'courseDuration')}
              {renderToggle('Present Year/Sem', 'presentYearSemester')}
              {renderToggle('Admission Status', 'admissionStatus')}
              {renderToggle('Total Annual Fee', 'totalAnnualCourseFee')}
              {renderToggle('Amount Paid', 'amountAlreadyPaid')}
              {renderToggle('Outstanding Amount', 'outstandingAmount')}
              {renderToggle('Scholarship Requested', 'scholarshipAmountRequested')}
              {renderToggle('Past Education Table', 'pastEducation')}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Step 3: Family Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderToggle('Father Occupation', 'fatherOccupation')}
              {renderToggle('Mother Occupation', 'motherOccupation')}
              {renderToggle('Total Annual Income', 'totalAnnualFamilyIncome')}
              {renderToggle('Total Members', 'totalFamilyMembers')}
              {renderToggle('Earning Members', 'earningMembers')}
              {renderToggle('Income Sources', 'incomeSources')}
              {renderToggle('Agricultural Land', 'agriculturalLand')}
              {renderToggle('House Ownership', 'houseOwnership')}
              {renderToggle('Major Assets', 'majorAssets')}
              {renderToggle('Liabilities', 'liabilities')}
              {renderToggle('Family Members Table', 'familyMembersTable')}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Step 4: Achievements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderToggle('Applied Elsewhere', 'appliedAnotherScholarship')}
              {renderToggle('Receiving Another', 'receivingAnotherScholarship')}
              {renderToggle('Academic Achievements', 'academicAchievements')}
              {renderToggle('Awards & Recognitions', 'awardsRecognitions')}
              {renderToggle('Volunteering', 'volunteeringActivities')}
              {renderToggle('Support from NGO', 'supportFromNGO')}
              {renderToggle('Part-Time Work', 'partTimeWork')}
              {renderToggle('Skill Courses', 'skillCourses')}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Step 5: Personal Statement</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderToggle('Why this course?', 'whyCourseInstitution')}
              {renderToggle('Plans after course?', 'plansAfterCourse')}
              {renderToggle('Financial difficulties?', 'financialDifficulties')}
              {renderToggle('How will this help?', 'howScholarshipHelps')}
              {renderToggle('Why consider you?', 'whyConsiderYou')}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Step 6: Documents & Declarations</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderToggle('Reference 1', 'reference1')}
              {renderToggle('Reference 2', 'reference2')}
              {renderToggle('Tuition Fee Receipt', 'tuitionFeeReceipt')}
              {renderToggle('Income Certificate', 'familyIncomeCertificate')}
              {renderToggle('Aadhaar Card', 'aadhaarCard')}
              {renderToggle('Applicant Name (Sig)', 'applicantName')}
              {renderToggle('Date', 'applicantDate')}
              {renderToggle('Place', 'applicantPlace')}
              {renderToggle('Parent Name (Sig)', 'parentName')}
              {renderToggle('Parent Relationship', 'parentRelationship')}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
