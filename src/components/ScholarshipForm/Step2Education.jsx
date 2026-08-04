import React from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

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

const Step2Education = ({ data, setFormData, onDocChange, documents, settings }) => {
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
              <th className="p-3">Certificate</th>
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
                  <td className="p-2 align-middle">
                    <div className="flex flex-col items-center justify-center">
                      <label className={`cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border transition shadow-sm w-full min-w-[90px] ${documents && documents[`pastEducationCert_${index}`] ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                        {documents && documents[`pastEducationCert_${index}`] ? (
                          <>
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span className="text-xs font-bold truncate max-w-[50px]">{documents[`pastEducationCert_${index}`].name}</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud size={14} className="text-[#0F72CE]" />
                            <span className="text-xs font-semibold">Upload</span>
                          </>
                        )}
                        <input 
                          type="file" 
                          name={`pastEducationCert_${index}`} 
                          onChange={onDocChange} 
                          accept=".pdf,image/*" 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="md:col-span-2">
          <Select 
            label="14. Name of the course for which assistance is requested:" 
            name="courseCategory" 
            value={data.courseCategory || ''} 
            onChange={(e) => {
              handleChange(e);
              if (e.target.value !== 'Other') {
                // Auto-sync courseName with courseCategory if not Other
                setFormData(prev => ({
                  ...prev,
                  educationalRecord: { ...prev.educationalRecord, courseName: e.target.value }
                }));
              } else {
                // Clear courseName when switching to Other
                setFormData(prev => ({
                  ...prev,
                  educationalRecord: { ...prev.educationalRecord, courseName: '' }
                }));
              }
            }} 
            options={[
              'Medical / Healthcare', 
              'Engineering', 
              'Post Graduation', 
              'Diploma', 
              'Graduation', 
              'B.Ed', 
              'M.Ed', 
              'Other'
            ]}
            required={settings?.courseName !== false} 
          />
          {data.courseCategory === 'Other' && (
            <div className="mt-2">
              <Input 
                label="Please specify the course name:" 
                name="courseName" 
                value={data.courseName} 
                onChange={handleChange} 
                required={true} 
              />
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <Input label="15. Name and address of the institution:" name="institutionNameAddress" value={data.institutionNameAddress} onChange={handleChange} required={settings?.institutionNameAddress !== false} />
        </div>
        <Input label="16. Total duration of the course (e.g., 4 years):" name="courseDuration" value={data.courseDuration} onChange={handleChange} required={settings?.courseDuration !== false} />
        <Input label="17. Present year/semester of study:" name="presentYearSemester" value={data.presentYearSemester} onChange={handleChange} required={settings?.presentYearSemester !== false} />
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            18. Admission status: {settings?.admissionStatus !== false && <span className="text-red-500">*</span>}
          </label>
          <select name="admissionStatus" value={data.admissionStatus} onChange={handleChange} required={settings?.admissionStatus !== false}
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-[#0F72CE] focus:ring-1 focus:ring-[#0F72CE] outline-none bg-white">
            <option value="">Select Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        
        <div>
          <Input label="19. Total annual course fee:" name="totalAnnualCourseFee" type="number" value={data.totalAnnualCourseFee} onChange={handleChange} required={settings?.totalAnnualCourseFee !== false} />
          <div className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <label className="block text-sm font-bold text-[#0F72CE] mb-2">Attach Tuition Fee Receipt / Structure {settings?.tuitionFeeReceipt !== false && '*'}</label>
            <input type="file" name="tuitionFeeReceipt" onChange={onDocChange} accept=".pdf,image/*" required={settings?.tuitionFeeReceipt !== false && !documents?.tuitionFeeReceipt}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0F72CE] file:text-white hover:file:bg-[#0A4C8B] transition" />
            {documents?.tuitionFeeReceipt && <p className="text-xs text-green-600 mt-2 font-semibold">✓ {documents.tuitionFeeReceipt.name} selected</p>}
          </div>
        </div>

        <Input label="20. Amount already paid (if any):" name="amountAlreadyPaid" type="number" value={data.amountAlreadyPaid} onChange={handleChange} required={settings?.amountAlreadyPaid !== false} />
        <Input label="21. Outstanding amount:" name="outstandingAmount" type="number" value={data.outstandingAmount} onChange={handleChange} required={settings?.outstandingAmount !== false} />
        <Input label="22. Scholarship amount requested:" name="scholarshipAmountRequested" type="number" value={data.scholarshipAmountRequested} onChange={handleChange} required={settings?.scholarshipAmountRequested !== false} />
      </div>
    </div>
  );
};

export default Step2Education;
