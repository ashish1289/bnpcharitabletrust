import React from 'react';

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && '*'}</label>
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

const Step3Family = ({ data, setFormData, onDocChange, documents, settings }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      familyDetails: { ...prev.familyDetails, [e.target.name]: e.target.value }
    }));
  };

  const handleTableChange = (index, e) => {
    const updated = [...data.familyMembers];
    updated[index][e.target.name] = e.target.value;
    setFormData(prev => ({
      ...prev,
      familyDetails: { ...prev.familyDetails, familyMembers: updated }
    }));
  };

  const addFamilyMember = () => {
    setFormData(prev => ({
      ...prev,
      familyDetails: { ...prev.familyDetails, familyMembers: [...prev.familyDetails.familyMembers, { name: '', age: '', relationship: '', education: '', occupation: '', annualIncome: '' }] }
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">C. Family Details</h2>
      
      <div className="overflow-x-auto mb-4 border rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Relationship</th>
              <th className="p-3">Education</th>
              <th className="p-3">Occupation</th>
              <th className="p-3">Annual Income</th>
            </tr>
          </thead>
          <tbody>
            {data.familyMembers.map((member, index) => (
              <tr key={index} className="border-t">
                <td className="p-2"><input className="w-full border p-2 rounded" name="name" value={member.name} onChange={(e) => handleTableChange(index, e)} /></td>
                <td className="p-2"><input className="w-full border p-2 rounded" name="age" value={member.age} onChange={(e) => handleTableChange(index, e)} /></td>
                <td className="p-2"><input className="w-full border p-2 rounded" name="relationship" value={member.relationship} onChange={(e) => handleTableChange(index, e)} /></td>
                <td className="p-2"><input className="w-full border p-2 rounded" name="education" value={member.education} onChange={(e) => handleTableChange(index, e)} /></td>
                <td className="p-2"><input className="w-full border p-2 rounded" name="occupation" value={member.occupation} onChange={(e) => handleTableChange(index, e)} /></td>
                <td className="p-2"><input className="w-full border p-2 rounded" name="annualIncome" value={member.annualIncome} onChange={(e) => handleTableChange(index, e)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={addFamilyMember} className="mb-8 text-sm text-[#0F72CE] font-semibold hover:underline">+ Add another family member</button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input label="24. Father's occupation:" name="fatherOccupation" value={data.fatherOccupation} onChange={handleChange} required={settings?.fatherOccupation !== false} />
        <Input label="25. Mother's occupation:" name="motherOccupation" value={data.motherOccupation} onChange={handleChange} required={settings?.motherOccupation !== false} />
        
        <div>
          <Input label="26. Total annual family income (₹):" name="totalAnnualFamilyIncome" type="number" value={data.totalAnnualFamilyIncome} onChange={handleChange} required={settings?.totalAnnualFamilyIncome !== false} />
          <div className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <label className="block text-sm font-bold text-[#0F72CE] mb-2">Attach Income Certificate (PDF/Image) {settings?.familyIncomeCertificate !== false && '*'}</label>
            <input type="file" name="familyIncomeCertificate" onChange={onDocChange} accept=".pdf,image/*" required={settings?.familyIncomeCertificate !== false && !documents?.familyIncomeCertificate}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0F72CE] file:text-white hover:file:bg-[#0A4C8B] transition" />
            {documents?.familyIncomeCertificate && <p className="text-xs text-green-600 mt-2 font-semibold">✓ {documents.familyIncomeCertificate.name} selected</p>}
          </div>
        </div>
        
        <Input label="27. Total family members:" name="totalFamilyMembers" type="number" value={data.totalFamilyMembers} onChange={handleChange} required={settings?.totalFamilyMembers !== false} />
        <Input label="28. Number of earning members:" name="earningMembers" type="number" value={data.earningMembers} onChange={handleChange} required={settings?.earningMembers !== false} />
        
        <div className="md:col-span-2">
          <Input label="29. Specific sources of income (e.g., farming, salary, business):" name="incomeSources" value={data.incomeSources} onChange={handleChange} required={settings?.incomeSources !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="30. Agricultural land holding (if any, specify area):" name="agriculturalLand" value={data.agriculturalLand} onChange={handleChange} required={settings?.agriculturalLand !== false} />
        </div>
        
        <Select label="31. Own house or rented?" name="houseOwnership" value={data.houseOwnership} onChange={handleChange} options={['Owned', 'Rented', 'Other']} required={settings?.houseOwnership !== false} />
        
        <div className="md:col-span-2">
          <Input label="32. Major assets (e.g., 2-wheeler, 4-wheeler, commercial property):" name="majorAssets" value={data.majorAssets} onChange={handleChange} required={settings?.majorAssets !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="33. Details of outstanding loans/liabilities:" name="liabilities" value={data.liabilities} onChange={handleChange} required={settings?.liabilities !== false} />
        </div>
        <div className="md:col-span-2">
          <Input label="35. Serious illness, disability, bereavement, unemployment, or other hardship in the family:" name="hardships" value={data.hardships} onChange={handleChange} />
        </div>
        
        <Select label="36. Is the applicant a first-generation college student?" name="firstGenStudent" value={data.firstGenStudent} onChange={handleChange} options={['Yes', 'No']} />
        <div className="md:col-span-2">
          <Input label="37. Are any siblings currently studying? Provide details:" name="siblingsStudying" value={data.siblingsStudying} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Step3Family;
