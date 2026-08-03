import React from 'react';

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input type={type} name={name} value={value} onChange={onChange} required={required}
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

const Step1Personal = ({ data, setFormData, onDocChange, documents, settings }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [e.target.name]: e.target.value }
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">A. Applicant’s Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input label="1. Full name:" name="fullName" value={data.fullName} onChange={handleChange} required={settings?.fullName !== false} />
        <Input label="2. Date of birth:" name="dateOfBirth" type="date" value={data.dateOfBirth} onChange={handleChange} required={settings?.dateOfBirth !== false} />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            3. Gender: {settings?.gender !== false && <span className="text-red-500">*</span>}
          </label>
          <select name="gender" value={data.gender} onChange={handleChange} required={settings?.gender !== false}
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none bg-white">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <Input label="4. Mobile number:" name="mobileNumber" value={data.mobileNumber} onChange={handleChange} required={settings?.mobileNumber !== false} />
        <Input label="5. Email address:" name="emailAddress" type="email" value={data.emailAddress} onChange={handleChange} required={settings?.emailAddress !== false} />
        
        <div>
          <Input label="6. Aadhaar or identity-document number:" name="aadhaarNumber" value={data.aadhaarNumber} onChange={handleChange} required={settings?.aadhaarNumber !== false} />
          <div className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <label className="block text-sm font-bold text-[#0F72CE] mb-2">Attach Aadhaar Copy (PDF/Image) {settings?.aadhaarCard !== false && '*'}</label>
            <input type="file" name="aadhaarCard" onChange={onDocChange} accept=".pdf,image/*" required={settings?.aadhaarCard !== false && !documents?.aadhaarCard}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0F72CE] file:text-white hover:file:bg-[#0A4C8B] transition" />
            {documents?.aadhaarCard && <p className="text-xs text-green-600 mt-2 font-semibold">✓ {documents.aadhaarCard.name} selected</p>}
          </div>
        </div>

        <div className="md:col-span-2">
          <Input label="7. Complete permanent address with PIN code:" name="permanentAddress" value={data.permanentAddress} onChange={handleChange} required={settings?.permanentAddress !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="8. Current correspondence address:" name="correspondenceAddress" value={data.correspondenceAddress} onChange={handleChange} required={settings?.correspondenceAddress !== false} />
        </div>
        
        <Input label="9. District and state:" name="districtAndState" value={data.districtAndState} onChange={handleChange} required={settings?.districtAndState !== false} />
        <Select label="10. Rural/urban area:" name="ruralUrbanArea" value={data.ruralUrbanArea} onChange={handleChange} options={['Rural', 'Urban']} required={settings?.ruralUrbanArea !== false} />
        <Input label="11. Preferred language for communication:" name="preferredLanguage" value={data.preferredLanguage} onChange={handleChange} required={settings?.preferredLanguage !== false} />
        <Input label="12. Disability, if any:" name="disability" value={data.disability} onChange={handleChange} required={settings?.disability !== false} />
        <Select label="13. Category requiring special consideration:" name="specialCategory" value={data.specialCategory} onChange={handleChange} options={['General', 'SC', 'ST', 'OBC', 'SEBC', 'Other']} required={settings?.specialCategory !== false} />
      </div>
    </div>
  );
};

export default Step1Personal;
