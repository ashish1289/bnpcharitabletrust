import React from 'react';

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && '*'}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required}
      className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none" />
  </div>
);

const Step2Education = ({ data, setFormData, onDocChange, documents }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      educationalRecord: { ...prev.educationalRecord, [e.target.name]: e.target.value }
    }));
  };

  const handleTableChange = (index, e) => {
    const updated = [...data.pastEducation];
    updated[index][e.target.name] = e.target.value;
    setFormData(prev => ({
      ...prev,
      educationalRecord: { ...prev.educationalRecord, pastEducation: updated }
    }));
  };

  const examRows = ['Class 10', 'Class 12/Diploma', 'Graduation, if applicable', 'Most recent examination'];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">B. Educational Record</h2>
      
      <div className="overflow-x-auto mb-8 border rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Examination</th>
              <th className="p-3">School/College</th>
              <th className="p-3">Board/University</th>
              <th className="p-3">Year</th>
              <th className="p-3">Marks/CGPA</th>
              <th className="p-3">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {examRows.map((examName, index) => {
              if (!data.pastEducation[index]) {
                data.pastEducation[index] = { examination: examName, schoolCollege: '', boardUniversity: '', year: '', marksCgpa: '', percentage: '' };
              }
              return (
                <tr key={index} className="border-t">
                  <td className="p-3 font-semibold">{examName}</td>
                  <td className="p-2"><input className="w-full border p-2 rounded" name="schoolCollege" value={data.pastEducation[index].schoolCollege} onChange={(e) => handleTableChange(index, e)} /></td>
                  <td className="p-2"><input className="w-full border p-2 rounded" name="boardUniversity" value={data.pastEducation[index].boardUniversity} onChange={(e) => handleTableChange(index, e)} /></td>
                  <td className="p-2"><input className="w-full border p-2 rounded" name="year" value={data.pastEducation[index].year} onChange={(e) => handleTableChange(index, e)} /></td>
                  <td className="p-2"><input className="w-full border p-2 rounded" name="marksCgpa" value={data.pastEducation[index].marksCgpa} onChange={(e) => handleTableChange(index, e)} /></td>
                  <td className="p-2"><input className="w-full border p-2 rounded" name="percentage" value={data.pastEducation[index].percentage} onChange={(e) => handleTableChange(index, e)} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="md:col-span-2">
          <Input label="14. Name of the course for which assistance is requested:" name="courseName" value={data.courseName} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <Input label="15. Name and address of the institution:" name="institutionNameAddress" value={data.institutionNameAddress} onChange={handleChange} required />
        </div>
        
        <Input label="16. Course duration:" name="courseDuration" value={data.courseDuration} onChange={handleChange} required />
        <Input label="17. Present year or semester:" name="presentYearSemester" value={data.presentYearSemester} onChange={handleChange} required />
        <Input label="18. Admission status: Confirmed/Provisional/Awaiting allotment" name="admissionStatus" value={data.admissionStatus} onChange={handleChange} required />
        
        <div>
          <Input label="19. Total annual course fee:" name="totalAnnualCourseFee" value={data.totalAnnualCourseFee} onChange={handleChange} required />
          <div className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <label className="block text-sm font-bold text-[#0F72CE] mb-2">Attach Tuition Fee Document (PDF/Image) *</label>
            <input type="file" name="tuitionFeeReceipt" onChange={onDocChange} accept=".pdf,image/*" 
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0F72CE] file:text-white hover:file:bg-[#0A4C8B] transition" />
            {documents?.tuitionFeeReceipt && <p className="text-xs text-green-600 mt-2 font-semibold">✓ {documents.tuitionFeeReceipt.name} selected</p>}
          </div>
        </div>

        <Input label="20. Amount already paid:" name="amountAlreadyPaid" value={data.amountAlreadyPaid} onChange={handleChange} />
        <Input label="21. Outstanding amount:" name="outstandingAmount" value={data.outstandingAmount} onChange={handleChange} />
        <Input label="22. Expected expenditure on books, hostel, transport, equipment, and other items:" name="expectedExpenditure" value={data.expectedExpenditure} onChange={handleChange} />
        <Input label="23. Scholarship amount requested:" name="scholarshipAmountRequested" value={data.scholarshipAmountRequested} onChange={handleChange} required />
      </div>
    </div>
  );
};

export default Step2Education;
