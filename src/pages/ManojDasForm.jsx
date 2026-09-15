import React, { useState, useRef } from 'react';
import './ManojDasForm.css';
import api from '../api';
import { odishaDistrictsAndBlocks } from '../data/odishaLocations';

const q4Letters = ['କ', 'ଖ', 'ଗ', 'ଘ'];
const q7Letters = ['କ', 'ଖ', 'ଗ'];
const q8Letters = ['କ', 'ଖ', 'ଗ', 'ଘ', 'ଙ'];
const q10Letters = ['କ', 'ଖ', 'ଗ'];
const panelNums = ['୧', '୨', '୩', '୪'];

const ManojDasForm = () => {
  const [formData, setFormData] = useState({
    nomineeName: '',
    dateOfBirth: '',
    mainCategory: '',
    otherCategories: Array(4).fill(''),
    addressAndPhone: '', // kept for legacy if loaded
    addressVillage: '',
    addressPost: '',
    addressBlock: '',
    addressDistrict: '',
    addressPin: '',
    phoneNumber: '',
    hasPriorHonour: 'no',
    priorHonours: Array(3).fill(''),
    topBooks: Array(5).fill(''),
    hasTranslatedBooks: 'no',
    translatedLanguages: Array(3).fill(''),
    recommendationReason: '',
    secondRecommendation: '',
    briefOnFirstNominee: '',
    coordinatorName: '',
    coordinatorDate: '',
    district: '',
    panelMembers: Array(4).fill({ name: '', phone: '' })
  });

  const [errors, setErrors] = useState({});
  const [statusMsg, setStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const handlePanelChange = (index, subfield, value) => {
    setFormData(prev => {
      const newPanel = [...prev.panelMembers];
      newPanel[index] = { ...newPanel[index], [subfield]: value };
      return { ...prev, panelMembers: newPanel };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nomineeName.trim()) newErrors.nomineeName = true;
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = true;
    if (!formData.mainCategory.trim()) newErrors.mainCategory = true;
    
    // Validate new address fields
    if (!formData.addressVillage.trim()) newErrors.addressVillage = true;
    if (!formData.addressPost.trim()) newErrors.addressPost = true;
    if (!formData.addressBlock.trim()) newErrors.addressBlock = true;
    if (!formData.addressDistrict.trim()) newErrors.addressDistrict = true;
    if (!formData.addressPin.trim()) newErrors.addressPin = true;
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = true;
    
    // At least one top book
    if (!formData.topBooks[0].trim() && !formData.topBooks.find(b => b.trim())) {
      newErrors.topBooks = true;
    }
    
    if (!formData.recommendationReason.trim()) newErrors.recommendationReason = true;
    if (!formData.coordinatorName.trim()) newErrors.coordinatorName = true;
    if (!formData.coordinatorDate.trim()) newErrors.coordinatorDate = true;
    if (!formData.district.trim()) newErrors.district = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatusMsg('ଦୟାକରି ଚିହ୍ନିତ (*) ଘର ପୂରଣ କରନ୍ତୁ।');
      // Scroll to first error
      setTimeout(() => {
        const firstError = document.querySelector('.show-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setIsSubmitting(true);
    setStatusMsg('ଦାଖଲ କରାଯାଉଛି...');

    try {
      // We use the same api client setup, but manoj-das is public
      // If we don't have a specific method in api.js, we can just fetch directly
      const response = await fetch(`${import.meta.env.PROD ? 'https://app.bnptrust.in/api' : 'http://localhost:5000/api'}/manoj-das`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        setStatusMsg('ଆପଣଙ୍କର ମନୋନୟନ ସଫଳତାର ସହ ଦାଖଲ ହୋଇଛି!');
        alert('ଆପଣଙ୍କର ମନୋନୟନ ସଫଳତାର ସହ ଦାଖଲ ହୋଇଛି! (Nomination submitted successfully!)');
        // Clear form
        handleReset();
      } else {
        setStatusMsg(data.message || 'ତ୍ରୁଟି ଘଟିଛି। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।');
      }
    } catch (error) {
      console.error(error);
      setStatusMsg('ସର୍ଭର ସହିତ ସଂଯୋଗ ହୋଇପାରିଲା ନାହିଁ।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveDraft = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const nameGuess = (formData.nomineeName || 'nomination').trim().replace(/\s+/g, '_');
    a.href = url;
    a.download = `manoj-das-samman-${nameGuess || 'draft'}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatusMsg('ଡ୍ରାଫ୍ଟ ଡାଉନଲୋଡ୍ ହୋଇଗଲା।');
  };

  const handleLoadDraftClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        setFormData(prev => ({ ...prev, ...data }));
        setStatusMsg('ଡ୍ରାଫ୍ଟ ସଫଳତାର ସହ ଲୋଡ୍ ହୋଇଗଲା।');
      } catch (err) {
        setStatusMsg('ଫାଇଲ୍ ପଢ଼ିବାରେ ତ୍ରୁଟି ହେଲା।');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const handleReset = () => {
    if (confirm('ଆପଣ ନିଶ୍ଚିତ କି ସମସ୍ତ ତଥ୍ୟ ଖାଲି କରିବେ ?')) {
      setFormData({
        nomineeName: '',
        dateOfBirth: '',
        mainCategory: '',
        otherCategories: Array(4).fill(''),
        addressAndPhone: '',
        addressVillage: '',
        addressPost: '',
        addressBlock: '',
        addressDistrict: '',
        addressPin: '',
        phoneNumber: '',
        hasPriorHonour: 'no',
        priorHonours: Array(3).fill(''),
        topBooks: Array(5).fill(''),
        hasTranslatedBooks: 'no',
        translatedLanguages: Array(3).fill(''),
        recommendationReason: '',
        secondRecommendation: '',
        briefOnFirstNominee: '',
        coordinatorName: '',
        coordinatorDate: '',
        district: '',
        panelMembers: Array(4).fill({ name: '', phone: '' })
      });
      setErrors({});
      setStatusMsg('ଫର୍ମ ଖାଲି ହୋଇଗଲା।');
    }
  };

  return (
    <div className="manoj-das-wrap pt-20">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Oriya:wght@500;700&family=Noto+Sans+Oriya:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="sheet">
        <div className="motif"></div>
        <header>
          <p className="kicker">ODISHA SAHITYA SANSAD</p>
          <h1>ମନୋଜ ଦାସ ସାହିତ୍ୟ ସମ୍ମାନ – ୨୦୨୬</h1>
          <h2>ମନୋନୟନ ଫର୍ମ</h2>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <p className="block-title">ଲେଖକ/ଲେଖିକାଙ୍କ ବିବରଣୀ</p>

          <div className={`field ${errors.nomineeName ? 'show-error' : ''}`}>
            <label className="q" htmlFor="nomineeName"><span className="num">୧.</span> ଏହି ସମ୍ମାନ ପାଇଁ ଯୋଗ୍ୟ ମଣୁଥିବା ଲେଖକ/ଲେଖିକାଙ୍କ ନାମ<span className="req">*</span></label>
            <input type="text" id="nomineeName" name="nomineeName" required value={formData.nomineeName} onChange={handleChange} className={errors.nomineeName ? 'invalid' : ''} />
            <p className="error-msg">ଦୟାକରି ଲେଖକ/ଲେଖିକାଙ୍କ ନାମ ଲେଖନ୍ତୁ।</p>
          </div>

          <div className={`field ${errors.dateOfBirth ? 'show-error' : ''}`}>
            <label className="q" htmlFor="dateOfBirth"><span className="num">୨.</span> ଉକ୍ତ ଲେଖକ/ଲେଖିକାଙ୍କ ଜନ୍ମ ତାରିଖ<span className="req">*</span></label>
            <input type="text" id="dateOfBirth" name="dateOfBirth" placeholder="ଉଦାହରଣ: ୧୫/୦୮/୧୯୫୫" required value={formData.dateOfBirth} onChange={handleChange} className={errors.dateOfBirth ? 'invalid' : ''} />
            <p className="error-msg">ଦୟାକରି ଜନ୍ମ ତାରିଖ ଲେଖନ୍ତୁ।</p>
          </div>

          <div className={`field ${errors.mainCategory ? 'show-error' : ''}`}>
            <label className="q" htmlFor="mainCategory"><span className="num">୩.</span> ମୁଖ୍ୟତଃ ସେ ସାହିତ୍ୟର କେଉଁ ବିଭାଗରେ ଲେଖାଲେଖି କରନ୍ତି<span className="req">*</span></label>
            <input type="text" id="mainCategory" name="mainCategory" required value={formData.mainCategory} onChange={handleChange} className={errors.mainCategory ? 'invalid' : ''} />
            <p className="error-msg">ଦୟାକରି ମୁଖ୍ୟ ବିଭାଗ ଲେଖନ୍ତୁ।</p>
          </div>

          <div className="field">
            <label className="q"><span className="num">୪.</span> ଏକାଧିକ ବିଭାଗରେ ଲେଖାଲେଖି କରୁଥିଲେ ତାହା ଉଲ୍ଲେଖ କରନ୍ତୁ</label>
            <div className="sub-list">
              {q4Letters.map((letter, i) => (
                <div key={i} className="sub-row">
                  <span className="letter">{letter}-</span>
                  <input type="text" value={formData.otherCategories[i]} onChange={(e) => handleArrayChange('otherCategories', i, e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="q"><span className="num">୫.</span> ତାଙ୍କର ସଂପୂର୍ଣ୍ଣ ଡାକ ଠିକଣା ସହିତ ଫୋନ୍‌ ନମ୍ବର<span className="req">*</span></label>
            {formData.addressAndPhone && (
              <div style={{marginBottom: '10px', padding: '10px', background: '#fff3cd', borderRadius: '4px'}}>
                <strong>ପୁରୁଣା ଠିକଣା (Old Data):</strong> {formData.addressAndPhone}
              </div>
            )}
            <div className="coord-grid" style={{ marginTop: '10px' }}>
              <div className={`field ${errors.addressVillage ? 'show-error' : ''}`} style={{ margin: 0 }}>
                <label className="q" htmlFor="addressVillage">ଗ୍ରାମ/ସାହି (At/Village)<span className="req">*</span></label>
                <input type="text" id="addressVillage" name="addressVillage" required value={formData.addressVillage} onChange={handleChange} className={errors.addressVillage ? 'invalid' : ''} />
              </div>
              <div className={`field ${errors.addressPost ? 'show-error' : ''}`} style={{ margin: 0 }}>
                <label className="q" htmlFor="addressPost">ପୋଷ୍ଟ (Post)<span className="req">*</span></label>
                <input type="text" id="addressPost" name="addressPost" required value={formData.addressPost} onChange={handleChange} className={errors.addressPost ? 'invalid' : ''} />
              </div>
              
              <div className={`field ${errors.addressDistrict ? 'show-error' : ''}`} style={{ margin: 0 }}>
                <label className="q" htmlFor="addressDistrict">ଜିଲ୍ଲା (District)<span className="req">*</span></label>
                <select id="addressDistrict" name="addressDistrict" required value={formData.addressDistrict} onChange={(e) => { handleChange(e); setFormData(prev => ({...prev, addressBlock: ''})); }} className={errors.addressDistrict ? 'invalid' : ''} style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px'}}>
                  <option value="">ଜିଲ୍ଲା ବାଛନ୍ତୁ</option>
                  {Object.keys(odishaDistrictsAndBlocks).sort().map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <div className={`field ${errors.addressBlock ? 'show-error' : ''}`} style={{ margin: 0 }}>
                <label className="q" htmlFor="addressBlock">ବ୍ଲକ୍ (Block)<span className="req">*</span></label>
                <select id="addressBlock" name="addressBlock" required value={formData.addressBlock} onChange={handleChange} className={errors.addressBlock ? 'invalid' : ''} disabled={!formData.addressDistrict} style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px'}}>
                  <option value="">ବ୍ଲକ୍ ବାଛନ୍ତୁ</option>
                  {formData.addressDistrict && odishaDistrictsAndBlocks[formData.addressDistrict].map(block => (
                    <option key={block} value={block}>{block}</option>
                  ))}
                </select>
              </div>

              <div className={`field ${errors.addressPin ? 'show-error' : ''}`} style={{ margin: 0 }}>
                <label className="q" htmlFor="addressPin">ପିନ୍ କୋଡ୍ (PIN Code)<span className="req">*</span></label>
                <input type="text" id="addressPin" name="addressPin" required value={formData.addressPin} onChange={handleChange} className={errors.addressPin ? 'invalid' : ''} />
              </div>
              <div className={`field ${errors.phoneNumber ? 'show-error' : ''}`} style={{ margin: 0 }}>
                <label className="q" htmlFor="phoneNumber">ଫୋନ୍ ନମ୍ବର (Phone Number)<span className="req">*</span></label>
                <input type="text" id="phoneNumber" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className={errors.phoneNumber ? 'invalid' : ''} />
              </div>
            </div>
            {(errors.addressVillage || errors.addressPost || errors.addressBlock || errors.addressDistrict || errors.addressPin || errors.phoneNumber) && (
              <p className="error-msg">ଦୟାକରି ସଂପୂର୍ଣ୍ଣ ଠିକଣା ପୂରଣ କରନ୍ତୁ।</p>
            )}
          </div>

          <div className="divider"></div>
          <p className="block-title">ପୂର୍ବ ସମ୍ମାନ ଓ ପ୍ରକାଶନ</p>

          <div className="field">
            <fieldset>
              <legend className="q"><span className="num">୬.</span> ସେ ପୂର୍ବରୁ କୌଣସି ସମ୍ମାନ ବା ପୁରସ୍କାର ପାଇଛନ୍ତି କି ?</legend>
              <div className="radio-row">
                <label className="radio-opt"><input type="radio" name="hasPriorHonour" value="yes" checked={formData.hasPriorHonour === 'yes'} onChange={handleChange} /> ହଁ</label>
                <label className="radio-opt"><input type="radio" name="hasPriorHonour" value="no" checked={formData.hasPriorHonour === 'no'} onChange={handleChange} /> ନାହିଁ</label>
              </div>
            </fieldset>
            {formData.hasPriorHonour === 'yes' && (
              <div className="conditional" style={{ display: 'block' }}>
                <label className="q" style={{ fontSize: '14.5px', marginBottom: '8px' }}>୭. ଯଦି ହଁ, ତେବେ ସର୍ବାଧିକ ତିନୋଟିର ନାମ ଉଲ୍ଲେଖ କରନ୍ତୁ</label>
                <div className="sub-list">
                  {q7Letters.map((letter, i) => (
                    <div key={i} className="sub-row">
                      <span className="letter">{letter}-</span>
                      <input type="text" value={formData.priorHonours[i]} onChange={(e) => handleArrayChange('priorHonours', i, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={`field ${errors.topBooks ? 'show-error' : ''}`}>
            <label className="q"><span className="num">୮.</span> ଲେଖକ/ଲେଖିକାଙ୍କର ଉଲ୍ଲେଖନୀୟ ସର୍ବାଧିକ ୫ଟି ପୁସ୍ତକର ନାମ<span className="req">*</span></label>
            <div className="sub-list">
              {q8Letters.map((letter, i) => (
                <div key={i} className="sub-row">
                  <span className="letter">{letter}-</span>
                  <input type="text" value={formData.topBooks[i]} onChange={(e) => handleArrayChange('topBooks', i, e.target.value)} className={errors.topBooks && i===0 ? 'invalid' : ''} />
                </div>
              ))}
            </div>
            <p className="error-msg">ଦୟାକରି ଅତି କମରେ ଗୋଟିଏ ପୁସ୍ତକର ନାମ ଲେଖନ୍ତୁ।</p>
          </div>

          <div className="field">
            <fieldset>
              <legend className="q"><span className="num">୯.</span> ତାଙ୍କର କୌଣସି ପୁସ୍ତକ ଅନ୍ୟ ଭାରତୀୟ ଭାଷାରେ ଅନୂଦିତ ହୋଇଛି କି ?</legend>
              <div className="radio-row">
                <label className="radio-opt"><input type="radio" name="hasTranslatedBooks" value="yes" checked={formData.hasTranslatedBooks === 'yes'} onChange={handleChange} /> ହଁ</label>
                <label className="radio-opt"><input type="radio" name="hasTranslatedBooks" value="no" checked={formData.hasTranslatedBooks === 'no'} onChange={handleChange} /> ନାହିଁ</label>
              </div>
            </fieldset>
            {formData.hasTranslatedBooks === 'yes' && (
              <div className="conditional" style={{ display: 'block' }}>
                <label className="q" style={{ fontSize: '14.5px', marginBottom: '8px' }}>୧୦. ଯଦି ହଁ, ତେବେ କେଉଁ କେଉଁ ଭାଷାରେ ଅନୂଦିତ ହୋଇଛି ଲେଖନ୍ତୁ</label>
                <div className="sub-list">
                  {q10Letters.map((letter, i) => (
                    <div key={i} className="sub-row">
                      <span className="letter">{letter}-</span>
                      <input type="text" value={formData.translatedLanguages[i]} onChange={(e) => handleArrayChange('translatedLanguages', i, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="divider"></div>
          <p className="block-title">ସୁପାରିଶ</p>

          <div className={`field ${errors.recommendationReason ? 'show-error' : ''}`}>
            <label className="q" htmlFor="recommendationReason"><span className="num">୧୧.</span> ତାଙ୍କୁ 'ମନୋଜ ଦାସ ସାହିତ୍ୟ ସମ୍ମାନ' ପ୍ରଦାନ ପାଇଁ ଆପଣ କାହିଁକି ଯୋଗ୍ୟ ବୋଲି ଭାବୁଛନ୍ତି<span className="req">*</span></label>
            <textarea id="recommendationReason" name="recommendationReason" rows="4" required value={formData.recommendationReason} onChange={handleChange} className={errors.recommendationReason ? 'invalid' : ''}></textarea>
            <p className="error-msg">ଦୟାକରି କାରଣ ଲେଖନ୍ତୁ।</p>
          </div>

          <div className="field">
            <label className="q" htmlFor="secondRecommendation"><span className="num">୧୨.</span> ଏହି ଲେଖକ/ଲେଖିକାଙ୍କ ବ୍ୟତିତ ଆଉ କେଉଁ ଜଣେ ଲେଖକ/ଲେଖିକାଙ୍କ ନାମ ଦ୍ବିତୀୟରେ ସୁପାରିଶ ପାଇଁ ଯୋଗ୍ୟ ବୋଲି ଭାବୁଛନ୍ତି</label>
            <input type="text" id="secondRecommendation" name="secondRecommendation" value={formData.secondRecommendation} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="q" htmlFor="briefOnFirstNominee"><span className="num">୧୩.</span> ଆପଣ ପ୍ରଥମେ ସୁପାରିଶ କରିଥିବା ଲେଖକ/ଲେଖିକାଙ୍କ ସଂପର୍କରେ ସର୍ବନିମ୍ନ ଶବ୍ଦ ଓ ସର୍ବନିମ୍ନ ଧାଡ଼ିରେ କିଛି ଉଲ୍ଲେଖ କରନ୍ତୁ</label>
            <textarea id="briefOnFirstNominee" name="briefOnFirstNominee" rows="3" value={formData.briefOnFirstNominee} onChange={handleChange}></textarea>
          </div>

          <div className="divider"></div>
          <p className="block-title">ଜିଲ୍ଲା ସଂଯୋଜକଙ୍କ ବିବରଣୀ</p>

          <div className="coord-grid">
            <div className={`field ${errors.coordinatorName ? 'show-error' : ''}`} style={{ margin: 0 }}>
              <label className="q" htmlFor="coordinatorName">ଜିଲ୍ଲା ସଂଯୋଜକଙ୍କ ନାମ<span className="req">*</span></label>
              <input type="text" id="coordinatorName" name="coordinatorName" required value={formData.coordinatorName} onChange={handleChange} className={errors.coordinatorName ? 'invalid' : ''} />
              <p className="error-msg">ଜିଲ୍ଲା ସଂଯୋଜକଙ୍କ ନାମ ଲେଖନ୍ତୁ।</p>
            </div>
            <div className={`field ${errors.coordinatorDate ? 'show-error' : ''}`} style={{ margin: 0 }}>
              <label className="q" htmlFor="coordinatorDate">ତାରିଖ<span className="req">*</span></label>
              <input type="date" id="coordinatorDate" name="coordinatorDate" required value={formData.coordinatorDate} onChange={handleChange} className={errors.coordinatorDate ? 'invalid' : ''} />
              <p className="error-msg">ତାରିଖ ଉଲ୍ଲେଖ କରନ୍ତୁ।</p>
            </div>
            <div className={`field ${errors.district ? 'show-error' : ''}`} style={{ margin: 0 }}>
              <label className="q" htmlFor="district">ଜିଲ୍ଲାର ନାମ<span className="req">*</span></label>
              <input type="text" id="district" name="district" required value={formData.district} onChange={handleChange} className={errors.district ? 'invalid' : ''} />
              <p className="error-msg">ଜିଲ୍ଲାର ନାମ ଲେଖନ୍ତୁ।</p>
            </div>
          </div>

          <div className="field">
            <label className="q" style={{ marginBottom: '6px' }}>ଯେଉଁ ୪ଜଣ ସମଧର୍ମାଙ୍କ ସହ ଆଲୋଚନାକ୍ରମେ ପ୍ରଥମ ନାମ ସୁପାରିଶ କରାଯାଇଛି, ସେମାନଙ୍କ ନାମ ଓ ଟେଲିଫୋନ୍‌ ନମ୍ବର ଦିଅନ୍ତୁ</label>
            <table className="panel">
              <thead><tr><th>କ୍ର.ନଂ</th><th>ନାମ</th><th>ଯୋଗାଯୋଗ ନମ୍ବର</th></tr></thead>
              <tbody>
                {panelNums.map((num, i) => (
                  <tr key={i}>
                    <td className="idx">{num}</td>
                    <td><input type="text" value={formData.panelMembers[i].name} onChange={(e) => handlePanelChange(i, 'name', e.target.value)} /></td>
                    <td><input type="text" value={formData.panelMembers[i].phone} onChange={(e) => handlePanelChange(i, 'phone', e.target.value)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="notes">
            <p className="notes-title">ବି.ଦ୍ର:</p>
            <p>କ- ଜିଲ୍ଲା ସଂଯୋଜକ ନିଜ ନାମ ସୁପାରିଶ ନ କରିବାକୁ ଅନୁରୋଧ।</p>
            <p>ଖ- ଜିଲ୍ଲା ସଂଯୋଜକ ଏହି ଫର୍ମ ସହିତ ଲେଖକ/ଲେଖିକାଙ୍କ ସଂପର୍କରେ ଅଧିକ ତଥ୍ୟଫର୍ଦ୍ଦ ଯୋଗ କରିପାରିବେ।</p>
          </div>

          <div className="actions">
            <button type="submit" className="primary" disabled={isSubmitting}>
              {isSubmitting ? 'ଦାଖଲ କରାଯାଉଛି...' : 'ସବମିଟ୍ କରନ୍ତୁ'}
            </button>
            <button type="button" className="ghost" onClick={handlePrint}>ପ୍ରିଣ୍ଟ / PDF ଡାଉନଲୋଡ୍</button>
            <button type="button" className="ghost" onClick={handleSaveDraft}>ଡ୍ରାଫ୍ଟ ସେଭ୍ କରନ୍ତୁ</button>
            <button type="button" className="ghost" onClick={handleLoadDraftClick}>ଡ୍ରାଫ୍ଟ ଲୋଡ୍ କରନ୍ତୁ</button>
            <button type="button" className="ghost" onClick={handleReset}>ଫର୍ମ ଖାଲି କରନ୍ତୁ</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/json" style={{ display: 'none' }} />
          </div>
          <p className="status" id="statusMsg">{statusMsg}</p>
        </form>
      </div>
    </div>
  );
};

export default ManojDasForm;
