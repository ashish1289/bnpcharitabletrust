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

const Step4Assistance = ({ data, setFormData }) => {
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
        <Input label="38. Have you applied for another scholarship?" name="appliedAnotherScholarship" value={data.appliedAnotherScholarship} onChange={handleChange} />
        <Input label="39. Are you currently receiving any scholarship?" name="receivingAnotherScholarship" value={data.receivingAnotherScholarship} onChange={handleChange} />
        <Input label="40. Name of scholarship or sponsor:" name="scholarshipNameSponsor" value={data.scholarshipNameSponsor} onChange={handleChange} />
        <Input label="41. Amount received or expected:" name="amountReceivedExpected" value={data.amountReceivedExpected} onChange={handleChange} />
        <div className="md:col-span-2">
          <Input label="42. Expenses covered by it:" name="expensesCovered" value={data.expensesCovered} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Input label="43. Have you received support from any NGO, government department, employer, or institution?" name="supportFromNGO" value={data.supportFromNGO} onChange={handleChange} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">E. Achievements and Personal Initiative</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="md:col-span-2">
          <Textarea label="44. Academic achievements:" name="academicAchievements" value={data.academicAchievements} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Textarea label="45. Sports, cultural, literary, technical, or other achievements:" name="otherAchievements" value={data.otherAchievements} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Textarea label="46. Volunteering or community activities:" name="volunteeringActivities" value={data.volunteeringActivities} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Textarea label="47. Skill-development or online courses completed:" name="skillCourses" value={data.skillCourses} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Textarea label="48. Part-time work or family responsibilities:" name="partTimeWork" value={data.partTimeWork} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Textarea label="49. Awards, certificates, or recognitions received:" name="awardsRecognitions" value={data.awardsRecognitions} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Step4Assistance;
