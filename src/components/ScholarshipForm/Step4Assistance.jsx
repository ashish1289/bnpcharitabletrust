import React from 'react';

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && '*'}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required}
      className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none" />
  </div>
);

const Textarea = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && '*'}</label>
    <textarea name={name} value={value} onChange={onChange} required={required} rows="3"
      className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none" />
  </div>
);

const Select = ({ label, name, value, onChange, options, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select name={name} value={value} onChange={onChange} required={required}
      className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none bg-white">
      <option value="">Select an option</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Step4Assistance = ({ data, setFormData, settings }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      otherAssistance: { ...prev.otherAssistance, [e.target.name]: e.target.value }
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">D. Other Financial Assistance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mb-8">
        <Select label="35. Have you applied for any other scholarship?" name="appliedAnotherScholarship" value={data.appliedAnotherScholarship} onChange={handleChange} options={['Yes', 'No']} required={settings?.appliedAnotherScholarship !== false} />
        <Select label="36. Are you receiving any other scholarship?" name="receivingAnotherScholarship" value={data.receivingAnotherScholarship} onChange={handleChange} options={['Yes', 'No']} required={settings?.receivingAnotherScholarship !== false} />
        
        {data.receivingAnotherScholarship === 'Yes' && (
          <>
            <Input label="37. Scholarship name and sponsor:" name="scholarshipNameSponsor" value={data.scholarshipNameSponsor} onChange={handleChange} required={settings?.scholarshipNameSponsor !== false} />
            <Input label="38. Amount received/expected:" name="amountReceivedExpected" value={data.amountReceivedExpected} onChange={handleChange} required={settings?.amountReceivedExpected !== false} />
          </>
        )}

        <div className="md:col-span-2 mt-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">E. Achievements & Extracurricular Activities</h3>
        </div>

        <div className="md:col-span-2">
          <Input label="39. Major academic achievements (e.g., Olympiad rank, school topper):" name="academicAchievements" value={data.academicAchievements} onChange={handleChange} required={settings?.academicAchievements !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="40. Awards, recognitions, or participation in sports/arts:" name="awardsRecognitions" value={data.awardsRecognitions} onChange={handleChange} required={settings?.awardsRecognitions !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="41. Volunteering or social service activities:" name="volunteeringActivities" value={data.volunteeringActivities} onChange={handleChange} required={settings?.volunteeringActivities !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="42. Have you received support from any NGO/Trust before? Details:" name="supportFromNGO" value={data.supportFromNGO} onChange={handleChange} required={settings?.supportFromNGO !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="43. Have you engaged in any part-time work or internship?" name="partTimeWork" value={data.partTimeWork} onChange={handleChange} required={settings?.partTimeWork !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="44. Relevant skill courses completed (e.g., coding, tailoring):" name="skillCourses" value={data.skillCourses} onChange={handleChange} required={settings?.skillCourses !== false} />
        </div>
      </div>
    </div>
  );
};

export default Step4Assistance;
