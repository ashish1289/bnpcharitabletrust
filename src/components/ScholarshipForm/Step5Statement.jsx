import React from 'react';

const TextArea = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea name={name} value={value} onChange={onChange} required={required} rows="4"
      className="w-full rounded-xl border border-gray-300 p-4 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none resize-none leading-relaxed text-gray-800" />
  </div>
);

const Step5Statement = ({ data, setFormData, settings }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      personalStatement: { ...prev.personalStatement, [e.target.name]: e.target.value }
    }));
  };

  return (
    <div>
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
        <p className="text-sm text-blue-800 font-medium">Please answer the following questions clearly and honestly. This helps us understand you better.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-2">
        <TextArea label="45. Why did you choose this particular course and institution?" name="whyCourseInstitution" value={data.whyCourseInstitution} onChange={handleChange} required={settings?.whyCourseInstitution !== false} />
        <TextArea label="46. What are your future career plans after completing this course?" name="plansAfterCourse" value={data.plansAfterCourse} onChange={handleChange} required={settings?.plansAfterCourse !== false} />
        <TextArea label="47. Describe any specific financial difficulties you or your family are facing:" name="financialDifficulties" value={data.financialDifficulties} onChange={handleChange} required={settings?.financialDifficulties !== false} />
        <TextArea label="48. How will this scholarship help you achieve your goals?" name="howScholarshipHelps" value={data.howScholarshipHelps} onChange={handleChange} required={settings?.howScholarshipHelps !== false} />
        <TextArea label="49. Why should you be considered for this scholarship?" name="whyConsiderYou" value={data.whyConsiderYou} onChange={handleChange} required={settings?.whyConsiderYou !== false} />
        <TextArea label="56. Is there anything else you would like the Selection Committee to know?" name="anythingElse" value={data.anythingElse} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Step5Statement;
