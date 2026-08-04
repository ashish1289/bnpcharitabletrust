import React from 'react';
import { User, GraduationCap, Users, HeartHandshake, FileText, CheckCircle } from 'lucide-react';

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-3">
      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
        <Icon size={20} />
      </div>
      <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
        {children}
      </div>
    </div>
  </div>
);

const Field = ({ label, value, fullWidth = false }) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className={fullWidth ? 'col-span-1 md:col-span-2' : ''}>
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-gray-900 font-medium whitespace-pre-wrap">{value}</p>
    </div>
  );
};

const ApplicationPreview = ({ data }) => {
  if (!data) return null;

  const pd = data.personalDetails || {};
  const ed = data.educationalRecord || {};
  const fd = data.familyDetails || {};
  const oa = data.otherAssistance || {};
  const ps = data.personalStatement || {};
  const ref = data.references || {};
  const dec = data.declarations || {};

  return (
    <div className="w-full text-left">
      <Section title="Personal Details" icon={User}>
        <Field label="Full Name" value={pd.fullName} />
        <Field label="Date of Birth" value={pd.dateOfBirth} />
        <Field label="Gender" value={pd.gender} />
        <Field label="Aadhaar Number" value={pd.aadhaarNumber} />
        <Field label="Mobile Number" value={pd.mobileNumber} />
        <Field label="Email Address" value={pd.emailAddress} />
        <Field label="Permanent Address" value={pd.permanentAddress} fullWidth />
        <Field label="Correspondence Address" value={pd.correspondenceAddress} fullWidth />
        <Field label="District & State" value={pd.districtAndState} />
        <Field label="Area Type" value={pd.ruralUrbanArea} />
        <Field label="Disability" value={pd.disability} />
        <Field label="Special Category" value={pd.specialCategory} />
      </Section>

      <Section title="Educational Record" icon={GraduationCap}>
        <Field label="Course Name" value={ed.courseName} />
        <Field label="Institution Name & Address" value={ed.institutionNameAddress} fullWidth />
        <Field label="Course Duration" value={ed.courseDuration} />
        <Field label="Present Year/Semester" value={ed.presentYearSemester} />
        <Field label="Admission Status" value={ed.admissionStatus} />
        <Field label="Total Annual Course Fee" value={ed.totalAnnualCourseFee ? `₹${ed.totalAnnualCourseFee}` : ''} />
        <Field label="Amount Already Paid" value={ed.amountAlreadyPaid ? `₹${ed.amountAlreadyPaid}` : ''} />
        <Field label="Outstanding Amount" value={ed.outstandingAmount ? `₹${ed.outstandingAmount}` : ''} />
        <Field label="Scholarship Amount Requested" value={ed.scholarshipAmountRequested ? `₹${ed.scholarshipAmountRequested}` : ''} />
      </Section>

      <Section title="Family Details" icon={Users}>
        <Field label="Father's Occupation" value={fd.fatherOccupation} />
        <Field label="Mother's Occupation" value={fd.motherOccupation} />
        <Field label="Total Family Members" value={fd.totalFamilyMembers} />
        <Field label="Earning Members" value={fd.earningMembers} />
        <Field label="Total Annual Family Income" value={fd.totalAnnualFamilyIncome ? `₹${fd.totalAnnualFamilyIncome}` : ''} />
        <Field label="House Ownership" value={fd.houseOwnership} />
        <Field label="Specific Sources of Income" value={fd.incomeSources} fullWidth />
        <Field label="Agricultural Land" value={fd.agriculturalLand} fullWidth />
        <Field label="Major Assets" value={fd.majorAssets} fullWidth />
        <Field label="Liabilities" value={fd.liabilities} fullWidth />
      </Section>

      <Section title="Achievements & Assistance" icon={HeartHandshake}>
        <Field label="Applied for another scholarship?" value={oa.appliedAnotherScholarship} />
        <Field label="Receiving another scholarship?" value={oa.receivingAnotherScholarship} />
        {oa.receivingAnotherScholarship === 'Yes' && (
          <>
            <Field label="Scholarship Name & Sponsor" value={oa.scholarshipNameSponsor} />
            <Field label="Amount Received/Expected" value={oa.amountReceivedExpected} />
          </>
        )}
        <Field label="Academic Achievements" value={oa.academicAchievements} fullWidth />
        <Field label="Awards & Recognitions" value={oa.awardsRecognitions} fullWidth />
        <Field label="Volunteering Activities" value={oa.volunteeringActivities} fullWidth />
        <Field label="Support from NGO/Trust" value={oa.supportFromNGO} fullWidth />
        <Field label="Part-time Work / Internship" value={oa.partTimeWork} fullWidth />
        <Field label="Skill Courses" value={oa.skillCourses} fullWidth />
      </Section>

      <Section title="Personal Statement" icon={FileText}>
        <Field label="Why did you choose this course and institution?" value={ps.whyCourseInstitution} fullWidth />
        <Field label="Future career plans after completing this course" value={ps.plansAfterCourse} fullWidth />
        <Field label="Specific financial difficulties you or your family are facing" value={ps.financialDifficulties} fullWidth />
        <Field label="How will this scholarship help you achieve your goals?" value={ps.howScholarshipHelps} fullWidth />
        <Field label="Why should you be considered for this scholarship?" value={ps.whyConsiderYou} fullWidth />
      </Section>

      <Section title="Declarations & References" icon={CheckCircle}>
        <div className="col-span-1 md:col-span-2 mb-4 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-bold text-gray-800 mb-2">Reference 1</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" value={ref.reference1?.name} />
            <Field label="Designation" value={ref.reference1?.designation} />
            <Field label="Institution" value={ref.reference1?.institution} />
            <Field label="Mobile" value={ref.reference1?.mobile} />
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2 mb-4 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-bold text-gray-800 mb-2">Reference 2</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" value={ref.reference2?.name} />
            <Field label="Designation" value={ref.reference2?.designation} />
            <Field label="Institution" value={ref.reference2?.institution} />
            <Field label="Mobile" value={ref.reference2?.mobile} />
          </div>
        </div>

        <Field label="Applicant Signature" value={dec.applicantSignature} />
        <Field label="Applicant Date" value={dec.applicantDate} />
        <Field label="Parent/Guardian Signature" value={dec.parentSignature} />
        <Field label="Parent/Guardian Date" value={dec.parentDate} />
      </Section>
    </div>
  );
};

export default ApplicationPreview;
