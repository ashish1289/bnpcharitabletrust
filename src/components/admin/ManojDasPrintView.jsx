import React from 'react';
import '../../pages/ManojDasForm.css';

const ManojDasPrintView = ({ formData, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="manoj-das-wrap pt-20 bg-gray-100 min-h-screen pb-20">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Oriya:wght@500;700&family=Noto+Sans+Oriya:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Non-printable controls */}
      <div className="print:hidden fixed top-24 left-1/2 -translate-x-1/2 flex gap-4 z-50 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-200">
        <button onClick={onBack} className="px-6 py-2 bg-gray-800 text-white rounded-full font-bold hover:bg-gray-700 transition">Back to Admin</button>
        <button onClick={handlePrint} className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition">Print Form</button>
      </div>

      <div className="sheet mx-auto shadow-2xl print:shadow-none print:m-0" style={{ pointerEvents: 'none' }}>
        <div className="motif"></div>
        <header>
          <p className="kicker">ODISHA SAHITYA SANSAD</p>
          <h1>ମନୋଜ ଦାସ ସାହିତ୍ୟ ସମ୍ମାନ – ୨୦୨୬</h1>
          <h2>ମନୋନୟନ ଫର୍ମ</h2>
        </header>

        <div>
          <p className="block-title">ଲେଖକ/ଲେଖିକାଙ୍କ ବିବରଣୀ</p>

          <div className="field">
            <label className="q"><span className="num">୧.</span> ଏହି ସମ୍ମାନ ପାଇଁ ଯୋଗ୍ୟ ମଣୁଥିବା ଲେଖକ/ଲେଖିକାଙ୍କ ନାମ</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md font-medium text-lg">{formData.nomineeName || '-'}</div>
          </div>

          <div className="field">
            <label className="q"><span className="num">୨.</span> ଉକ୍ତ ଲେଖକ/ଲେଖିକାଙ୍କ ଜନ୍ମ ତାରିଖ</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md font-medium">{formData.dateOfBirth || '-'}</div>
          </div>

          <div className="field">
            <label className="q"><span className="num">୩.</span> ମୁଖ୍ୟତଃ ସେ ସାହିତ୍ୟର କେଉଁ ବିଭାଗରେ ଲେଖାଲେଖି କରନ୍ତି</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md font-medium">{formData.mainCategory || '-'}</div>
          </div>

          <div className="field">
            <label className="q"><span className="num">୪.</span> ଏକାଧିକ ବିଭାଗରେ ଲେଖାଲେଖି କରୁଥିଲେ ତାହା ଉଲ୍ଲେଖ କରନ୍ତୁ</label>
            <div className="sub-list">
              {['କ', 'ଖ', 'ଗ', 'ଘ'].map((letter, i) => (
                <div key={i} className="sub-row">
                  <span className="letter">{letter}-</span>
                  <div className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.otherCategories?.[i] || ''}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="q"><span className="num">୫.</span> ତାଙ୍କର ସଂପୂର୍ଣ୍ଣ ଡାକ ଠିକଣା ସହିତ ଫୋନ୍‌ ନମ୍ବର</label>
            
            {formData.addressAndPhone && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md mb-4 text-sm">
                <strong>ପୁରୁଣା ଠିକଣା:</strong> {formData.addressAndPhone}
              </div>
            )}
            
            <div className="coord-grid">
              <div className="field" style={{ margin: 0 }}>
                <label className="q">ଗ୍ରାମ/ସାହି (At/Village)</label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.addressVillage || '-'}</div>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label className="q">ପୋଷ୍ଟ (Post)</label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.addressPost || '-'}</div>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label className="q">ଜିଲ୍ଲା (District)</label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.addressDistrict || '-'}</div>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label className="q">ବ୍ଲକ୍ (Block)</label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.addressBlock || '-'}</div>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label className="q">ପିନ୍ କୋଡ୍ (PIN Code)</label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.addressPin || '-'}</div>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label className="q">ଫୋନ୍ ନମ୍ବର (Phone Number)</label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.phoneNumber || '-'}</div>
              </div>
            </div>
          </div>

          <div className="divider"></div>
          <p className="block-title">ପୂର୍ବ ସମ୍ମାନ ଓ ପ୍ରକାଶନ</p>

          <div className="field">
            <fieldset>
              <legend className="q"><span className="num">୬.</span> ସେ ପୂର୍ବରୁ କୌଣସି ସମ୍ମାନ ବା ପୁରସ୍କାର ପାଇଛନ୍ତି କି ?</legend>
              <div className="radio-row">
                <label className="radio-opt"><input type="radio" checked={formData.hasPriorHonour === 'yes'} readOnly /> ହଁ</label>
                <label className="radio-opt"><input type="radio" checked={formData.hasPriorHonour === 'no'} readOnly /> ନାହିଁ</label>
              </div>
            </fieldset>
            {formData.hasPriorHonour === 'yes' && (
              <div className="conditional" style={{ display: 'block' }}>
                <label className="q" style={{ fontSize: '14.5px', marginBottom: '8px' }}>୭. ଯଦି ହଁ, ତେବେ ସର୍ବାଧିକ ତିନୋଟିର ନାମ ଉଲ୍ଲେଖ କରନ୍ତୁ</label>
                <div className="sub-list">
                  {['କ', 'ଖ', 'ଗ'].map((letter, i) => (
                    <div key={i} className="sub-row">
                      <span className="letter">{letter}-</span>
                      <div className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.priorHonours?.[i] || ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="field">
            <label className="q"><span className="num">୮.</span> ଲେଖକ/ଲେଖିକାଙ୍କର ଉଲ୍ଲେଖନୀୟ ସର୍ବାଧିକ ୫ଟି ପୁସ୍ତକର ନାମ</label>
            <div className="sub-list">
              {['କ', 'ଖ', 'ଗ', 'ଘ', 'ଙ'].map((letter, i) => (
                <div key={i} className="sub-row">
                  <span className="letter">{letter}-</span>
                  <div className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.topBooks?.[i] || ''}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="field">
            <fieldset>
              <legend className="q"><span className="num">୯.</span> ତାଙ୍କର କୌଣସି ପୁସ୍ତକ ଅନ୍ୟ ଭାରତୀୟ ଭାଷାରେ ଅନୂଦିତ ହୋଇଛି କି ?</legend>
              <div className="radio-row">
                <label className="radio-opt"><input type="radio" checked={formData.hasTranslatedBooks === 'yes'} readOnly /> ହଁ</label>
                <label className="radio-opt"><input type="radio" checked={formData.hasTranslatedBooks === 'no'} readOnly /> ନାହିଁ</label>
              </div>
            </fieldset>
            {formData.hasTranslatedBooks === 'yes' && (
              <div className="conditional" style={{ display: 'block' }}>
                <label className="q" style={{ fontSize: '14.5px', marginBottom: '8px' }}>୧୦. ଯଦି ହଁ, ତେବେ କେଉଁ କେଉଁ ଭାଷାରେ ଅନୂଦିତ ହୋଇଛି ଲେଖନ୍ତୁ</label>
                <div className="sub-list">
                  {['କ', 'ଖ', 'ଗ'].map((letter, i) => (
                    <div key={i} className="sub-row">
                      <span className="letter">{letter}-</span>
                      <div className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-md">{formData.translatedLanguages?.[i] || ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="divider"></div>
          <p className="block-title">ସୁପାରିଶ</p>

          <div className="field">
            <label className="q"><span className="num">୧୧.</span> ତାଙ୍କୁ 'ମନୋଜ ଦାସ ସାହିତ୍ୟ ସମ୍ମାନ' ପ୍ରଦାନ ପାଇଁ ଆପଣ କାହିଁକି ଯୋଗ୍ୟ ବୋଲି ଭାବୁଛନ୍ତି</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[100px] whitespace-pre-wrap">{formData.recommendationReason || '-'}</div>
          </div>

          <div className="field">
            <label className="q"><span className="num">୧୨.</span> ଏହି ଲେଖକ/ଲେଖିକାଙ୍କ ବ୍ୟତିତ ଆଉ କେଉଁ ଜଣେ ଲେଖକ/ଲେଖିକାଙ୍କ ନାମ ଦ୍ବିତୀୟରେ ସୁପାରିଶ ପାଇଁ ଯୋଗ୍ୟ ବୋଲି ଭାବୁଛନ୍ତି</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">{formData.secondRecommendation || '-'}</div>
          </div>

          <div className="field">
            <label className="q"><span className="num">୧୩.</span> ଆପଣ ପ୍ରଥମେ ସୁପାରିଶ କରିଥିବା ଲେଖକ/ଲେଖିକାଙ୍କ ସଂପର୍କରେ ସର୍ବନିମ୍ନ ଶବ୍ଦ ଓ ସର୍ବନିମ୍ନ ଧାଡ଼ିରେ କିଛି ଉଲ୍ଲେଖ କରନ୍ତୁ</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[80px] whitespace-pre-wrap">{formData.briefOnFirstNominee || '-'}</div>
          </div>

          <div className="divider"></div>
          <p className="block-title">ଜିଲ୍ଲା ସଂଯୋଜକଙ୍କ ବିବରଣୀ</p>

          <div className="coord-grid">
            <div className="field" style={{ margin: 0 }}>
              <label className="q">ଜିଲ୍ଲା ସଂଯୋଜକଙ୍କ ନାମ</label>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">{formData.coordinatorName || '-'}</div>
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label className="q">ତାରିଖ</label>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">{formData.coordinatorDate || '-'}</div>
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label className="q">ଜିଲ୍ଲାର ନାମ</label>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">{formData.district || '-'}</div>
            </div>
          </div>

          <div className="field mt-6">
            <label className="q" style={{ marginBottom: '6px' }}>ଯେଉଁ ୪ଜଣ ସମଧର୍ମାଙ୍କ ସହ ଆଲୋଚନାକ୍ରମେ ପ୍ରଥମ ନାମ ସୁପାରିଶ କରାଯାଇଛି, ସେମାନଙ୍କ ନାମ ଓ ଟେଲିଫୋନ୍‌ ନମ୍ବର ଦିଅନ୍ତୁ</label>
            <table className="panel">
              <thead><tr><th>କ୍ର.ନଂ</th><th>ନାମ</th><th>ଯୋଗାଯୋଗ ନମ୍ବର</th></tr></thead>
              <tbody>
                {['୧', '୨', '୩', '୪'].map((num, i) => (
                  <tr key={i}>
                    <td className="idx">{num}</td>
                    <td><div className="p-2">{formData.panelMembers?.[i]?.name || ''}</div></td>
                    <td><div className="p-2">{formData.panelMembers?.[i]?.phone || ''}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManojDasPrintView;
