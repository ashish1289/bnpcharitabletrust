import React from 'react';

const Textarea = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && '*'}</label>
    <textarea name={name} value={value} onChange={onChange} required={required} rows="4"
      className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none" />
  </div>
);

const Step5Statement = ({ data, setFormData }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      personalStatement: { ...prev.personalStatement, [e.target.name]: e.target.value }
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">F. Career and Personal Statement</h2>
      <p className="text-sm text-gray-500 mb-6 italic">Applicants may answer in English, Odia, Hindi, or another permitted language.</p>
      
      <div className="grid grid-cols-1 gap-y-2">
        <Textarea label="50. Why did you choose this course and institution?" name="whyCourseInstitution" value={data.whyCourseInstitution} onChange={handleChange} required />
        <Textarea label="51. What do you plan to do after completing the course?" name="plansAfterCourse" value={data.plansAfterCourse} onChange={handleChange} required />
        <Textarea label="52. Describe your present financial difficulties." name="financialDifficulties" value={data.financialDifficulties} onChange={handleChange} required />
        <Textarea label="53. How will the scholarship help you continue your education?" name="howScholarshipHelps" value={data.howScholarshipHelps} onChange={handleChange} required />
        <Textarea label="54. Describe a challenge you have faced and how you responded to it." name="challengeFaced" value={data.challengeFaced} onChange={handleChange} required />
        <Textarea label="55. Why should the Trust consider you for this scholarship?" name="whyConsiderYou" value={data.whyConsiderYou} onChange={handleChange} required />
        <Textarea label="56. Is there anything else you would like the Selection Committee to know?" name="anythingElse" value={data.anythingElse} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Step5Statement;
