import React from 'react';

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && '*'}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required}
      className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none" />
  </div>
);

const Step3Family = ({ data, setFormData, onDocChange }) => {
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
        <Input label="24. Father’s or guardian’s occupation:" name="fatherOccupation" value={data.fatherOccupation} onChange={handleChange} required />
        <Input label="25. Mother’s or guardian’s occupation:" name="motherOccupation" value={data.motherOccupation} onChange={handleChange} required />
        <Input label="26. Total number of family members:" name="totalFamilyMembers" value={data.totalFamilyMembers} onChange={handleChange} required />
        <Input label="27. Number of earning members:" name="earningMembers" value={data.earningMembers} onChange={handleChange} required />
        <Input label="28. Number of dependants:" name="dependants" value={data.dependants} onChange={handleChange} required />
        
        <div>
          <Input label="29. Total annual family income from all sources:" name="totalAnnualFamilyIncome" value={data.totalAnnualFamilyIncome} onChange={handleChange} required />
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Attach Family Income Document (PDF/Image)</label>
            <input type="file" name="familyIncomeCertificate" onChange={onDocChange} accept=".pdf,image/*" className="text-sm" />
          </div>
        </div>

        <div className="md:col-span-2">
          <Input label="30. Sources of family income:" name="incomeSources" value={data.incomeSources} onChange={handleChange} />
        </div>
        
        <Input label="31. Agricultural land owned or cultivated, if any:" name="agriculturalLand" value={data.agriculturalLand} onChange={handleChange} />
        <Input label="32. House ownership status: Owned/Rented/Other" name="houseOwnership" value={data.houseOwnership} onChange={handleChange} />
        
        <div className="md:col-span-2">
          <Input label="33. Major family assets, if any:" name="majorAssets" value={data.majorAssets} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Input label="34. Existing loans or major liabilities:" name="liabilities" value={data.liabilities} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Input label="35. Serious illness, disability, bereavement, unemployment, or other hardship in the family:" name="hardships" value={data.hardships} onChange={handleChange} />
        </div>
        
        <Input label="36. Is the applicant a first-generation college student? Yes/No" name="firstGenStudent" value={data.firstGenStudent} onChange={handleChange} />
        <div className="md:col-span-2">
          <Input label="37. Are any siblings currently studying? Provide details:" name="siblingsStudying" value={data.siblingsStudying} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Step3Family;
