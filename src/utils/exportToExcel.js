import * as XLSX from 'xlsx';

/**
 * Helper to format past education array into a readable string
 */
const formatPastEducation = (pastEduArray) => {
  if (!pastEduArray || !Array.isArray(pastEduArray) || pastEduArray.length === 0) return 'N/A';
  return pastEduArray.map((edu, index) => {
    return `${index + 1}. ${edu.examination || 'Exam'}: ${edu.schoolCollege || 'Inst.'} (${edu.year || 'Year'}) - ${edu.percentage ? edu.percentage + '%' : (edu.marksCgpa ? edu.marksCgpa + ' CGPA' : '')}`;
  }).join(' | ');
};

/**
 * Helper to format family members array into a readable string
 */
const formatFamilyMembers = (membersArray) => {
  if (!membersArray || !Array.isArray(membersArray) || membersArray.length === 0) return 'N/A';
  return membersArray.map((m, index) => {
    return `${index + 1}. ${m.name || 'Name'} (${m.relationship || 'Rel.'}) - ${m.occupation || 'Occ.'}, Income: Rs.${m.annualIncome || '0'}`;
  }).join(' | ');
};

/**
 * Maps an array of application objects to a flat format for Excel
 */
const flattenApplications = (applications) => {
  return applications.map((app) => ({
    // System Fields
    'Application ID': app._id,
    'Status': (app.status || '').toUpperCase(),
    'Eligible': app.isEligible ? 'Yes' : 'No',
    'Applied Date': app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN') : 'N/A',
    
    // Admin Fields
    'Admin Notes': app.adminNotes || '',
    'Status Remark': app.statusRemark || '',

    // 1. Personal Details
    'Full Name': app.personalDetails?.fullName || '',
    'Date of Birth': app.personalDetails?.dateOfBirth || '',
    'Gender': app.personalDetails?.gender || '',
    'Mobile Number': app.personalDetails?.mobileNumber || '',
    'Email Address': app.personalDetails?.emailAddress || '',
    'Aadhaar Number': app.personalDetails?.aadhaarNumber || '',
    'Permanent Address': app.personalDetails?.permanentAddress || '',
    'Correspondence Address': app.personalDetails?.correspondenceAddress || '',
    'District & State': app.personalDetails?.districtAndState || '',
    'Area Type': app.personalDetails?.ruralUrbanArea || '',
    'Disability': app.personalDetails?.disability || '',
    'Special Category': app.personalDetails?.specialCategory || '',

    // 2. Educational Record
    'Course Name': app.educationalRecord?.courseName || '',
    'Institution': app.educationalRecord?.institutionNameAddress || '',
    'Course Duration': app.educationalRecord?.courseDuration || '',
    'Present Year/Sem': app.educationalRecord?.presentYearSemester || '',
    'Admission Status': app.educationalRecord?.admissionStatus || '',
    'Total Course Fee': app.educationalRecord?.totalAnnualCourseFee || '0',
    'Amount Already Paid': app.educationalRecord?.amountAlreadyPaid || '0',
    'Outstanding Amount': app.educationalRecord?.outstandingAmount || '0',
    'Scholarship Requested': app.educationalRecord?.scholarshipAmountRequested || '0',
    'Expected Expenditure': app.educationalRecord?.expectedExpenditure || '0',
    'Past Education': formatPastEducation(app.educationalRecord?.pastEducation),

    // 3. Family Details
    'Total Family Members': app.familyDetails?.totalFamilyMembers || '',
    'Earning Members': app.familyDetails?.earningMembers || '',
    'Dependants': app.familyDetails?.dependants || '',
    'Total Annual Income': app.familyDetails?.totalAnnualFamilyIncome || '0',
    'Father Occupation': app.familyDetails?.fatherOccupation || '',
    'Mother Occupation': app.familyDetails?.motherOccupation || '',
    'Income Sources': app.familyDetails?.incomeSources || '',
    'Agricultural Land': app.familyDetails?.agriculturalLand || '',
    'House Ownership': app.familyDetails?.houseOwnership || '',
    'Major Assets': app.familyDetails?.majorAssets || '',
    'Liabilities/Loans': app.familyDetails?.liabilities || '',
    'Hardships': app.familyDetails?.hardships || '',
    'First Gen Student': app.familyDetails?.firstGenStudent || '',
    'Siblings Studying': app.familyDetails?.siblingsStudying || '',
    'Family Members List': formatFamilyMembers(app.familyDetails?.familyMembers),

    // 4. Other Assistance & Achievements
    'Applied Other Scholarship': app.otherAssistance?.appliedAnotherScholarship || '',
    'Receiving Other Scholarship': app.otherAssistance?.receivingAnotherScholarship || '',
    'Other Scholarship Name': app.otherAssistance?.scholarshipNameSponsor || '',
    'Amount Expected (Other)': app.otherAssistance?.amountReceivedExpected || '',
    'Support from NGO': app.otherAssistance?.supportFromNGO || '',
    'Academic Achievements': app.otherAssistance?.academicAchievements || '',
    'Other Achievements': app.otherAssistance?.otherAchievements || '',
    'Volunteering': app.otherAssistance?.volunteeringActivities || '',
    'Skill Courses': app.otherAssistance?.skillCourses || '',
    'Part Time Work': app.otherAssistance?.partTimeWork || '',
    'Awards/Recognitions': app.otherAssistance?.awardsRecognitions || '',

    // 5. Personal Statement
    'Why Course/Institution': app.personalStatement?.whyCourseInstitution || '',
    'Plans After Course': app.personalStatement?.plansAfterCourse || '',
    'Financial Difficulties': app.personalStatement?.financialDifficulties || '',
    'How Scholarship Helps': app.personalStatement?.howScholarshipHelps || '',
    'Challenge Faced': app.personalStatement?.challengeFaced || '',
    'Why Consider You': app.personalStatement?.whyConsiderYou || '',
    'Anything Else': app.personalStatement?.anythingElse || '',

    // 6. References
    'Reference 1 Name': app.references?.reference1?.name || '',
    'Reference 1 Contact': `${app.references?.reference1?.mobile || ''} / ${app.references?.reference1?.email || ''}`,
    'Reference 2 Name': app.references?.reference2?.name || '',
    'Reference 2 Contact': `${app.references?.reference2?.mobile || ''} / ${app.references?.reference2?.email || ''}`,
  }));
};

/**
 * Export applications to Excel file
 * @param {Array} applications - Array of application objects
 * @param {String} filename - Name of the file to save
 */
export const exportToExcel = (applications, filename = 'Applications.xlsx') => {
  if (!applications || applications.length === 0) {
    console.warn("No data to export");
    return;
  }

  // 1. Flatten the data
  const flatData = flattenApplications(applications);

  // 2. Create a new workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  
  // 3. Optional: Add basic styling/column widths
  const colWidths = Object.keys(flatData[0]).map(key => ({
    // Calculate an approximate width based on the header length (min 15)
    wch: Math.max(key.length, 15)
  }));
  worksheet['!cols'] = colWidths;

  // 4. Append worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');

  // 5. Trigger download
  XLSX.writeFile(workbook, filename);
};
