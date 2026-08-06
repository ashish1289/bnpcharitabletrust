import React from 'react';

const Input = ({ label, name, value, onChange, type = "text", required = false, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && '*'}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} {...props}
      className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none" />
  </div>
);

const Step6References = ({ data, declarations, setFormData, settings }) => {
  const handleRefChange = (refNumber, e) => {
    let { name, value } = e.target;
    if (name === 'mobile') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        [refNumber]: { ...prev.references[refNumber], [name]: value }
      }
    }));
  };

  const handleDecChange = (e) => {
    setFormData(prev => ({
      ...prev,
      declarations: { ...prev.declarations, [e.target.name]: e.target.value }
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">G. References</h2>
      <p className="text-sm text-gray-500 mb-6 italic">References should not ordinarily be close relatives.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Reference 1 */}
        <div className="p-6 border rounded-2xl bg-gray-50">
          <h3 className="font-bold text-lg mb-4 text-[#0F72CE]">Reference 1</h3>
          <Input label="Name:" name="name" value={data.reference1.name} onChange={(e) => handleRefChange('reference1', e)} required={settings?.reference1 !== false} />
          <Input label="Designation:" name="designation" value={data.reference1.designation} onChange={(e) => handleRefChange('reference1', e)} required={settings?.reference1 !== false} />
          <Input label="Institution or organisation:" name="institution" value={data.reference1.institution} onChange={(e) => handleRefChange('reference1', e)} required={settings?.reference1 !== false} />
          <Input label="Relationship with applicant:" name="relationship" value={data.reference1.relationship} onChange={(e) => handleRefChange('reference1', e)} required={settings?.reference1 !== false} />
          <Input label="Mobile number:" name="mobile" type="tel" maxLength={10} value={data.reference1.mobile} onChange={(e) => handleRefChange('reference1', e)} required={settings?.reference1 !== false && settings?.referenceMobile !== false} />
          <Input label="Email address:" name="email" type="email" value={data.reference1.email} onChange={(e) => handleRefChange('reference1', e)} required={settings?.reference1 !== false && settings?.referenceEmail !== false} />
        </div>

        {/* Reference 2 */}
        <div className="p-6 border rounded-2xl bg-gray-50">
          <h3 className="font-bold text-lg mb-4 text-[#0F72CE]">Reference 2</h3>
          <Input label="Name:" name="name" value={data.reference2.name} onChange={(e) => handleRefChange('reference2', e)} required={settings?.reference2 !== false} />
          <Input label="Designation:" name="designation" value={data.reference2.designation} onChange={(e) => handleRefChange('reference2', e)} required={settings?.reference2 !== false} />
          <Input label="Institution or organisation:" name="institution" value={data.reference2.institution} onChange={(e) => handleRefChange('reference2', e)} required={settings?.reference2 !== false} />
          <Input label="Relationship with applicant:" name="relationship" value={data.reference2.relationship} onChange={(e) => handleRefChange('reference2', e)} required={settings?.reference2 !== false} />
          <Input label="Mobile number:" name="mobile" type="tel" maxLength={10} value={data.reference2.mobile} onChange={(e) => handleRefChange('reference2', e)} required={settings?.reference2 !== false && settings?.referenceMobile !== false} />
          <Input label="Email address:" name="email" type="email" value={data.reference2.email} onChange={(e) => handleRefChange('reference2', e)} required={settings?.reference2 !== false && settings?.referenceEmail !== false} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">H. Applicant’s Declaration</h2>
      <div className="p-6 border rounded-2xl bg-white shadow-sm mb-10">
        <p className="text-sm text-gray-700 mb-6 leading-relaxed">
          I declare that the information provided in this application is true and complete to the best of my knowledge. I understand that the Trust may verify the information and documents submitted by me. I agree to inform the Trust about any material change in my admission, course, family income, or receipt of another scholarship.<br/><br/>
          I understand that submission of false information may result in rejection or cancellation of the scholarship.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Applicant’s signature (Type full name):" name="applicantSignature" value={declarations.applicantSignature} onChange={handleDecChange} required={settings?.applicantName !== false} />
          <Input label="Name:" name="applicantName" value={declarations.applicantName} onChange={handleDecChange} required={settings?.applicantName !== false} />
          <Input label="Date:" name="applicantDate" type="date" value={declarations.applicantDate} onChange={handleDecChange} required={settings?.applicantDate !== false} />
          <Input label="Place:" name="applicantPlace" value={declarations.applicantPlace} onChange={handleDecChange} required={settings?.applicantPlace !== false} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">I. Parent or Guardian’s Declaration</h2>
      <div className="p-6 border rounded-2xl bg-white shadow-sm">
        <p className="text-sm text-gray-700 mb-6 leading-relaxed">
          I confirm that the family, income, educational, and financial information provided in this application is correct. I authorise the Trust to verify the submitted information for scholarship purposes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Parent/Guardian’s signature (Type full name):" name="parentSignature" value={declarations.parentSignature} onChange={handleDecChange} required={settings?.parentName !== false} />
          <Input label="Name:" name="parentName" value={declarations.parentName} onChange={handleDecChange} required={settings?.parentName !== false} />
          <Input label="Relationship with applicant:" name="parentRelationship" value={declarations.parentRelationship} onChange={handleDecChange} required={settings?.parentRelationship !== false} />
          <Input label="Date:" name="parentDate" type="date" value={declarations.parentDate} onChange={handleDecChange} required={settings?.applicantDate !== false} />
        </div>
      </div>
    </div>
  );
};

export default Step6References;
