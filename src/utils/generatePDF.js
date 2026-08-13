import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PDFDocument } from 'pdf-lib';

// The base URL for fetching documents
const API_BASE_URL = import.meta.env.PROD ? 'https://app.bnptrust.in/api' : 'http://localhost:5000/api';

// Helper to convert image URL to base64 to ensure it embeds nicely
const getBase64ImageFromURL = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = error => reject(error);
    img.src = url;
  });
};

export const generatePDF = async (app) => {
  try {
    const doc = new jsPDF();
    let yPos = 20;
  
  // 1. Header (Logo & Title)
  try {
    const logoData = await getBase64ImageFromURL('/bnplogo.png');
    doc.addImage(logoData, 'PNG', 14, 10, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("BNP CHARITABLE TRUST", 50, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Scholarship Application Form", 50, 28);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Application ID: ${app._id}`, 50, 34);
    doc.text(`Date Applied: ${new Date(app.createdAt).toLocaleDateString()}`, 50, 40);
    yPos = 55;
  } catch(e) {
    // fallback if image fails to load
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("BNP CHARITABLE TRUST", 14, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Scholarship Application Form", 14, 28);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Application ID: ${app._id}`, 14, 34);
    doc.text(`Date Applied: ${new Date(app.createdAt).toLocaleDateString()}`, 14, 40);
    yPos = 50;
  }

  doc.setTextColor(0);

  const addSectionTitle = (title) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, 14, yPos);
    yPos += 5;
  };

  // Helper to draw a simple 2-column key-value table
  const drawKeyValueTable = (title, dataArray) => {
    addSectionTitle(title);
    autoTable(doc, {
      startY: yPos,
      body: dataArray,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 3, textColor: [0,0,0], lineColor: [200, 200, 200] },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: [245, 245, 245], cellWidth: 70 },
        1: { cellWidth: 110 }
      },
      margin: { left: 14 }
    });
    yPos = doc.lastAutoTable.finalY + 10;
  };

  // Personal Details
  drawKeyValueTable("1. Personal Details", [
    ["Full Name", app.personalDetails?.fullName || "N/A"],
    ["Date of Birth", app.personalDetails?.dateOfBirth || "N/A"],
    ["Gender", app.personalDetails?.gender || "N/A"],
    ["Mobile Number", app.personalDetails?.mobileNumber || "N/A"],
    ["Email Address", app.personalDetails?.emailAddress || "N/A"],
    ["Aadhaar Number", app.personalDetails?.aadhaarNumber || "N/A"],
    ["Permanent Address", app.personalDetails?.permanentAddress || "N/A"],
    ["Correspondence Address", app.personalDetails?.correspondenceAddress || "N/A"],
    ["District & State", app.personalDetails?.districtAndState || "N/A"],
    ["Rural/Urban Area", app.personalDetails?.ruralUrbanArea || "N/A"],
    ["Disability", app.personalDetails?.disability || "N/A"],
    ["Special Category", app.personalDetails?.specialCategory || "N/A"],
  ]);

  // Current Education
  drawKeyValueTable("2. Current Education", [
    ["Course Name", app.educationalRecord?.courseName || "N/A"],
    ["Institution Name & Address", app.educationalRecord?.institutionNameAddress || "N/A"],
    ["Course Duration", app.educationalRecord?.courseDuration || "N/A"],
    ["Present Year/Semester", app.educationalRecord?.presentYearSemester || "N/A"],
    ["Admission Status", app.educationalRecord?.admissionStatus || "N/A"],
    ["Total Annual Course Fee", `Rs. ${app.educationalRecord?.totalAnnualCourseFee || "0"}`],
    ["Amount Already Paid", `Rs. ${app.educationalRecord?.amountAlreadyPaid || "0"}`],
    ["Outstanding Amount", `Rs. ${app.educationalRecord?.outstandingAmount || "0"}`],
    ["Scholarship Amount Requested", `Rs. ${app.educationalRecord?.scholarshipAmountRequested || "0"}`],
  ]);

  // Past Education (Special Table)
  addSectionTitle("3. Past Education");
  const pastEdu = app.educationalRecord?.pastEducation || [];
  const pastEduBody = pastEdu.map(e => [
    e.examination || '',
    e.schoolCollege || '',
    e.boardUniversity || '',
    e.year || '',
    e.marksCgpa || '',
    e.percentage || ''
  ]);
  
  if (pastEduBody.length > 0) {
    autoTable(doc, {
      startY: yPos,
      head: [['Examination', 'School/College', 'Board/Univ', 'Year', 'Marks/CGPA', '%']],
      body: pastEduBody,
      theme: 'grid',
      styles: { fontSize: 8, textColor: [0,0,0], lineColor: [200,200,200] },
      headStyles: { fillColor: [240,240,240], fontStyle: 'bold', textColor: [0,0,0] },
      margin: { left: 14 }
    });
    yPos = doc.lastAutoTable.finalY + 10;
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("No past education records provided.", 14, yPos);
    yPos += 10;
  }

  // Family Details
  drawKeyValueTable("4. Family Details", [
    ["Father's Occupation", app.familyDetails?.fatherOccupation || "N/A"],
    ["Mother's Occupation", app.familyDetails?.motherOccupation || "N/A"],
    ["Total Annual Family Income", `Rs. ${app.familyDetails?.totalAnnualFamilyIncome || "0"}`],
    ["Total Family Members", app.familyDetails?.totalFamilyMembers || "N/A"],
    ["Earning Members", app.familyDetails?.earningMembers || "N/A"],
    ["Sources of Income", app.familyDetails?.incomeSources || "N/A"],
    ["Agricultural Land", app.familyDetails?.agriculturalLand || "N/A"],
    ["House Ownership", app.familyDetails?.houseOwnership || "N/A"],
    ["Major Assets", app.familyDetails?.majorAssets || "N/A"],
    ["Liabilities/Loans", app.familyDetails?.liabilities || "N/A"],
  ]);

  // Family Members Table
  addSectionTitle("5. Family Members");
  const familyMembers = app.familyDetails?.familyMembers || [];
  const famBody = familyMembers.map(m => [
    m.name || '',
    m.age || '',
    m.relationship || '',
    m.education || '',
    m.occupation || '',
    m.annualIncome || ''
  ]);
  
  if (famBody.length > 0) {
    autoTable(doc, {
      startY: yPos,
      head: [['Name', 'Age', 'Relationship', 'Education', 'Occupation', 'Annual Income']],
      body: famBody,
      theme: 'grid',
      styles: { fontSize: 8, textColor: [0,0,0], lineColor: [200,200,200] },
      headStyles: { fillColor: [240,240,240], fontStyle: 'bold', textColor: [0,0,0] },
      margin: { left: 14 }
    });
    yPos = doc.lastAutoTable.finalY + 10;
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("No family members provided.", 14, yPos);
    yPos += 10;
  }

  // Personal Statement
  drawKeyValueTable("6. Personal Statement", [
    ["Why course & institution?", app.personalStatement?.whyCourseInstitution || "N/A"],
    ["Plans after course?", app.personalStatement?.plansAfterCourse || "N/A"],
    ["Financial difficulties?", app.personalStatement?.financialDifficulties || "N/A"],
    ["How scholarship helps?", app.personalStatement?.howScholarshipHelps || "N/A"],
    ["Why consider you?", app.personalStatement?.whyConsiderYou || "N/A"],
  ]);

  // References
  addSectionTitle("7. References");
  
  const ref1 = app.references?.reference1 || {};
  autoTable(doc, {
    startY: yPos,
    body: [
      ["Reference 1", `${ref1.name || "N/A"} (${ref1.designation || "N/A"})`],
      ["Institution", ref1.institution || "N/A"],
      ["Relationship", ref1.relationship || "N/A"],
      ["Contact", `Mobile: ${ref1.mobile || "N/A"} | Email: ${ref1.email || "N/A"}`]
    ],
    theme: 'grid',
    styles: { fontSize: 8, textColor: [0,0,0], lineColor: [200,200,200] },
    columnStyles: { 0: { fontStyle: 'bold', fillColor: [245, 245, 245], cellWidth: 35 } },
    margin: { left: 14 }
  });
  yPos = doc.lastAutoTable.finalY + 5;

  const ref2 = app.references?.reference2 || {};
  autoTable(doc, {
    startY: yPos,
    body: [
      ["Reference 2", `${ref2.name || "N/A"} (${ref2.designation || "N/A"})`],
      ["Institution", ref2.institution || "N/A"],
      ["Relationship", ref2.relationship || "N/A"],
      ["Contact", `Mobile: ${ref2.mobile || "N/A"} | Email: ${ref2.email || "N/A"}`]
    ],
    theme: 'grid',
    styles: { fontSize: 8, textColor: [0,0,0], lineColor: [200,200,200] },
    columnStyles: { 0: { fontStyle: 'bold', fillColor: [245, 245, 245], cellWidth: 35 } },
    margin: { left: 14 }
  });
  yPos = doc.lastAutoTable.finalY + 10;

  // Declarations
  drawKeyValueTable("8. Declarations", [
    ["Applicant Signature (Name)", app.declarations?.applicantSignature || "N/A"],
    ["Applicant Name", app.declarations?.applicantName || "N/A"],
    ["Applicant Date & Place", `${app.declarations?.applicantDate || "N/A"}, ${app.declarations?.applicantPlace || "N/A"}`],
    ["Parent Signature (Name)", app.declarations?.parentSignature || "N/A"],
    ["Parent Name", app.declarations?.parentName || "N/A"],
    ["Parent Relationship", app.declarations?.parentRelationship || "N/A"],
    ["Parent Date", app.declarations?.parentDate || "N/A"],
  ]);

  // Page numbering
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleDateString()}`, 14, 290);
  }

    // Instead of saving directly, we get the ArrayBuffer to merge with other PDFs/Images
    const basePdfBytes = doc.output('arraybuffer');
    const pdfDoc = await PDFDocument.load(basePdfBytes);
    
    // Gather all document keys to fetch
    const documentKeys = [];
    if (app.documents?.tuitionFeeReceipt) documentKeys.push(app.documents.tuitionFeeReceipt);
    if (app.documents?.familyIncomeCertificate) documentKeys.push(app.documents.familyIncomeCertificate);
    if (app.documents?.aadhaarCard) documentKeys.push(app.documents.aadhaarCard);
    
    if (app.educationalRecord?.pastEducation) {
      app.educationalRecord.pastEducation.forEach(edu => {
        if (edu.certificateFile) documentKeys.push(edu.certificateFile);
      });
    }

    // Merge each document
    for (const key of documentKeys) {
      try {
        const url = `${API_BASE_URL}/scholarships/documents/${key}`;
        // Fetch with cookies for authentication
        const response = await fetch(url, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          console.warn(`Failed to fetch document: ${key}, status: ${response.status}`);
          continue;
        }

        const contentType = response.headers.get('content-type');
        const arrayBuffer = await response.arrayBuffer();

        if (contentType && contentType.includes('pdf')) {
          // Merge PDF
          const externalPdf = await PDFDocument.load(arrayBuffer);
          const copiedPages = await pdfDoc.copyPages(externalPdf, externalPdf.getPageIndices());
          copiedPages.forEach(page => pdfDoc.addPage(page));
        } else if (contentType && (contentType.includes('image') || contentType.includes('img'))) {
          // Embed Image
          let image;
          if (contentType.includes('png')) {
            image = await pdfDoc.embedPng(arrayBuffer);
          } else if (contentType.includes('jpeg') || contentType.includes('jpg')) {
            image = await pdfDoc.embedJpg(arrayBuffer);
          }
          
          if (image) {
            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            const imgDims = image.scaleToFit(width - 40, height - 40);
            
            page.drawImage(image, {
              x: page.getWidth() / 2 - imgDims.width / 2,
              y: page.getHeight() / 2 - imgDims.height / 2,
              width: imgDims.width,
              height: imgDims.height,
            });
          }
        }
      } catch (err) {
        console.error(`Error processing document ${key}:`, err);
      }
    }

    // Save final merged PDF
    const finalPdfBytes = await pdfDoc.save();
    const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    
    const filename = `BNP_Application_${app.personalDetails?.fullName?.replace(/\s+/g, '_') || 'Student'}_${new Date().getTime()}.pdf`;
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

  } catch (error) {
    console.error("PDF Generation failed:", error);
    alert("Failed to generate PDF. Please try again.");
  }
};
