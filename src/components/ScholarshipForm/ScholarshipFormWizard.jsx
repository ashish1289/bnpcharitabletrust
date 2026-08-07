import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react'; // Ensure correct import for framer-motion v12
import Step1Personal from './Step1Personal';
import Step2Education from './Step2Education';
import Step3Family from './Step3Family';
import Step4Assistance from './Step4Assistance';
import Step5Statement from './Step5Statement';
import Step6References from './Step6References';
import ApplicationPreview from './ApplicationPreview';
import api from '../../api';

const initialData = {
  personalDetails: { fullName: '', dateOfBirth: '', gender: '', mobileNumber: '', emailAddress: '', aadhaarNumber: '', permanentAddress: '', correspondenceAddress: '', districtAndState: '', ruralUrbanArea: '', preferredLanguage: '', disability: '', specialCategory: '' },
  educationalRecord: {
    pastEducation: [{ examination: 'Class 10', schoolCollege: '', boardUniversity: '', year: '', marksCgpa: '', percentage: '' }],
    courseCategory: '', courseName: '', institutionNameAddress: '', courseDuration: '', presentYearSemester: '', admissionStatus: '', totalAnnualCourseFee: '', amountAlreadyPaid: '', outstandingAmount: '', expectedExpenditure: '', scholarshipAmountRequested: ''
  },
  familyDetails: {
    familyMembers: [{ name: '', age: '', relationship: '', education: '', occupation: '', annualIncome: '' }],
    fatherOccupation: '', motherOccupation: '', totalFamilyMembers: '', earningMembers: '', dependants: '', totalAnnualFamilyIncome: '', incomeSources: '', agriculturalLand: '', houseOwnership: '', majorAssets: '', liabilities: '', hardships: '', firstGenStudent: '', siblingsStudying: ''
  },
  otherAssistance: { appliedAnotherScholarship: '', receivingAnotherScholarship: '', scholarshipNameSponsor: '', amountReceivedExpected: '', expensesCovered: '', supportFromNGO: '', academicAchievements: '', otherAchievements: '', volunteeringActivities: '', skillCourses: '', partTimeWork: '', awardsRecognitions: '' },
  personalStatement: { whyCourseInstitution: '', plansAfterCourse: '', financialDifficulties: '', howScholarshipHelps: '', challengeFaced: '', whyConsiderYou: '', anythingElse: '' },
  references: {
    reference1: { name: '', designation: '', institution: '', relationship: '', mobile: '', email: '' },
    reference2: { name: '', designation: '', institution: '', relationship: '', mobile: '', email: '' }
  },
  declarations: { applicantSignature: '', applicantName: '', applicantDate: '', applicantPlace: '', parentSignature: '', parentName: '', parentRelationship: '', parentDate: '' },
};

const steps = [
  { id: 1, title: 'Personal Details' },
  { id: 2, title: 'Educational Record' },
  { id: 3, title: 'Family Details' },
  { id: 4, title: 'Other Assistance' },
  { id: 5, title: 'Personal Statement' },
  { id: 6, title: 'References & Declarations' },
  { id: 7, title: 'Review Application' },
];

const ScholarshipFormWizard = ({ authUser, draftApplication }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    // If resuming a draft, pre-populate with saved data
    if (draftApplication) {
      return {
        personalDetails: draftApplication.personalDetails || initialData.personalDetails,
        educationalRecord: draftApplication.educationalRecord || initialData.educationalRecord,
        familyDetails: draftApplication.familyDetails || initialData.familyDetails,
        otherAssistance: draftApplication.otherAssistance || initialData.otherAssistance,
        personalStatement: draftApplication.personalStatement || initialData.personalStatement,
        references: draftApplication.references || initialData.references,
        declarations: draftApplication.declarations || initialData.declarations,
      };
    }
    return initialData;
  });
  const [documents, setDocuments] = useState({ tuitionFeeReceipt: null, familyIncomeCertificate: null, aadhaarCard: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data.mandatoryFields);
      } catch (error) {
        console.error('Failed to load form settings, using defaults', error);
      }
    };
    loadSettings();
  }, []);

  // Hydrate email if authUser exists (only for new applications)
  React.useEffect(() => {
    if (!draftApplication && authUser?.email && !formData.personalDetails.emailAddress) {
      setFormData(prev => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, emailAddress: authUser.email, fullName: authUser.name || '' }
      }));
    }
  }, [authUser]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleDocumentChange = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  const isStepComplete = (stepId) => {
    const pd = formData.personalDetails;
    const ed = formData.educationalRecord;
    const fd = formData.familyDetails;
    const oa = formData.otherAssistance;
    const ps = formData.personalStatement;
    const ref = formData.references;
    const dec = formData.declarations;

    const config = settings || {};

    const check = (value, fieldName) => {
      // If setting is explicitly false, it is not required
      if (config[fieldName] === false) return true;
      // Otherwise it is required, so value must be truthy
      return !!value;
    };

    switch (stepId) {
      case 1:
        return check(pd.fullName, 'fullName') && 
               check(pd.dateOfBirth, 'dateOfBirth') && 
               check(pd.gender, 'gender') && 
               check(pd.mobileNumber, 'mobileNumber') && 
               check(pd.emailAddress, 'emailAddress') && 
               check(pd.aadhaarNumber, 'aadhaarNumber') && 
               check(pd.permanentAddress, 'permanentAddress') && 
               check(pd.districtAndState, 'districtAndState');
      case 2:
        return check(ed.courseName, 'courseName') && 
               check(ed.institutionNameAddress, 'institutionNameAddress') && 
               check(ed.courseDuration, 'courseDuration') && 
               check(ed.presentYearSemester, 'presentYearSemester') && 
               check(ed.totalAnnualCourseFee, 'totalAnnualCourseFee') && 
               check(ed.scholarshipAmountRequested, 'scholarshipAmountRequested');
      case 3:
        return check(fd.totalFamilyMembers, 'totalFamilyMembers') && 
               check(fd.totalAnnualFamilyIncome, 'totalAnnualFamilyIncome');
      case 4:
        return check(oa.appliedAnotherScholarship, 'appliedAnotherScholarship') && 
               check(oa.receivingAnotherScholarship, 'receivingAnotherScholarship');
      case 5:
        return check(ps.whyCourseInstitution, 'whyCourseInstitution') && 
               check(ps.financialDifficulties, 'financialDifficulties') && 
               check(ps.howScholarshipHelps, 'howScholarshipHelps');
      case 6:
        return check(ref.reference1.name, 'reference1') && 
               check(ref.reference1.mobile, 'reference1') && 
               check(dec.applicantSignature, 'applicantName') && 
               check(dec.applicantName, 'applicantName') && 
               check(dec.applicantDate, 'applicantDate') && 
               check(dec.applicantPlace, 'applicantPlace');
      default:
        return false;
    }
  };

  const handleSubmit = async (e, status = 'pending') => {
    if (e) e.preventDefault();
    
    if (status === 'pending') {
      const incompleteSteps = steps.filter(step => step.id !== 7 && !isStepComplete(step.id));
      if (incompleteSteps.length > 0) {
        setMessage(`Please completely fill out all required fields. Missing in: ${incompleteSteps.map(s => s.title).join(', ')}`);
        setCurrentStep(incompleteSteps[0].id);
        return;
      }
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const payloadData = { ...formData, status };
      
      const payload = new FormData();
      payload.append('applicationData', JSON.stringify(payloadData));
      
      if (documents.tuitionFeeReceipt) payload.append('tuitionFeeReceipt', documents.tuitionFeeReceipt);
      if (documents.familyIncomeCertificate) payload.append('familyIncomeCertificate', documents.familyIncomeCertificate);
      if (documents.aadhaarCard) payload.append('aadhaarCard', documents.aadhaarCard);
      
      for (let i = 0; i < 4; i++) {
        const certKey = `pastEducationCert_${i}`;
        if (documents[certKey]) {
          payload.append(certKey, documents[certKey]);
        }
      }

      // If resuming a draft, update it; otherwise create new
      if (draftApplication?._id) {
        await api.updateApplication(draftApplication._id, payload);
      } else {
        await api.submitScholarship(payload);
      }
      
      setMessage(status === 'draft' ? 'Draft saved successfully! You can resume it anytime from your profile.' : 'Application submitted successfully!');
      setCurrentStep(8); // Show success screen
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    // If settings haven't loaded yet, pass a default empty object to avoid crashes
    const config = settings || {};
    
    switch(currentStep) {
      case 1:
        return <Step1Personal data={formData.personalDetails} setFormData={setFormData} onDocChange={handleDocumentChange} documents={documents} settings={config} />;
      case 2:
        return <Step2Education data={formData.educationalRecord} setFormData={setFormData} onDocChange={handleDocumentChange} documents={documents} settings={config} />;
      case 3:
        return <Step3Family data={formData.familyDetails} setFormData={setFormData} onDocChange={handleDocumentChange} documents={documents} settings={config} />;
      case 4:
        return <Step4Assistance data={formData.otherAssistance} setFormData={setFormData} settings={config} />;
      case 5:
        return <Step5Statement data={formData.personalStatement} setFormData={setFormData} settings={config} />;
      case 6:
        return <Step6References data={formData.references} declarations={formData.declarations} setFormData={setFormData} settings={config} />;
      case 7:
        return (
          <div className="bg-gray-50 p-6 rounded-2xl border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Application</h2>
            <p className="text-gray-600 mb-8">Please review your details carefully before submitting. If you need to make changes, you can go back to previous steps.</p>
            <ApplicationPreview data={formData} />
          </div>
        );
      default:
        return <Step1Personal data={formData.personalDetails} setFormData={setFormData} onDocChange={handleDocumentChange} documents={documents} settings={config} />;
    }
  };

  if (currentStep === 8) {
    const isDraft = message.includes('Draft saved');
    return (
      <div className="text-center py-16 px-4">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl ${isDraft ? 'bg-orange-100' : 'bg-green-100'}`}>
          {isDraft ? '📝' : '✅'}
        </div>
        <h2 className={`text-3xl font-bold mb-4 ${isDraft ? 'text-orange-600' : 'text-green-600'}`}>
          {isDraft ? 'Draft Saved!' : 'Submitted Successfully!'}
        </h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <a href="/profile" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F72CE] text-white font-semibold rounded-full hover:bg-[#0A4C8B] transition">
          Go to My Profile
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">
      {/* Stepper Header */}
      <div className="bg-gray-50 border-b p-6 flex flex-wrap gap-4 items-center justify-between">
        {steps.map(step => {
          const isActive = currentStep === step.id;
          const isComplete = isStepComplete(step.id);
          
          let circleClass = 'bg-gray-200 text-gray-500';
          let textClass = 'text-gray-400';
          let icon = step.id;

          if (isActive) {
            circleClass = 'bg-[#0F72CE] text-white shadow-md shadow-blue-500/30';
            textClass = 'text-[#0F72CE] font-bold';
          } else if (isComplete) {
            circleClass = 'bg-green-500 text-white shadow-md shadow-green-500/20';
            textClass = 'text-green-600 font-semibold';
            icon = '✓';
          } else {
            // Not active, not complete -> red (incomplete)
            circleClass = 'bg-red-500 text-white shadow-md shadow-red-500/20';
            textClass = 'text-red-500 font-medium';
            icon = '!';
          }

          return (
            <div key={step.id} className={`flex items-center gap-2 ${textClass} transition-colors cursor-pointer`} onClick={() => setCurrentStep(step.id)}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${circleClass}`}>
                {icon}
              </span>
              <span className="hidden md:inline">{step.title}</span>
            </div>
          );
        })}
      </div>

      <div className="p-8">
        {message && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl">{message}</div>}
        
        <form onSubmit={(e) => { e.preventDefault(); if (currentStep === 7) handleSubmit(e, 'pending'); }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t flex flex-wrap gap-4 justify-between items-center">
            <button type="button" onClick={handlePrev} disabled={currentStep === 1 || isSubmitting} className="px-6 py-2 rounded-full border hover:bg-gray-50 disabled:opacity-50">
              Back
            </button>
            
            <div className="flex gap-4">
              {currentStep < 7 && (
                <button type="button" onClick={(e) => handleSubmit(e, 'draft')} disabled={isSubmitting} className="px-6 py-2 rounded-full border border-orange-200 text-orange-600 font-semibold hover:bg-orange-50 disabled:opacity-50 hidden md:block">
                  {isSubmitting ? 'Saving...' : 'Save as Draft'}
                </button>
              )}
              
              {currentStep < 7 ? (
                <button type="button" onClick={handleNext} className="px-6 py-2 rounded-full bg-[#0F72CE] text-white font-semibold hover:bg-[#0A4C8B]">
                  Next Step
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="px-8 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipFormWizard;
