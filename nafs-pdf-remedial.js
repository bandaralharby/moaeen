/* Remedial PDF: same layout with a soft red treatment */
window.NAFS_PDF_REMEDIAL={
 async ensureRenderer(){
  if(window.NAFS_PDF_TEST) return;
  await new Promise((resolve,reject)=>{
   const s=document.createElement('script');
   s.src='nafs-pdf-test.js?v=390-20261002';
   s.onload=resolve;
   s.onerror=()=>reject(new Error('تعذر تحميل محرك التقرير'));
   document.head.appendChild(s);
  });
  if(!window.NAFS_PDF_TEST) throw new Error('تعذر تهيئة محرك التقرير');
 },
 async download(el,name){
  await this.ensureRenderer();
  const style=document.createElement('style');
  style.id='nafsRemedialPdfTheme';
  style.textContent=`
   #nafsPdfHostTest .rhead{background:linear-gradient(120deg,#7f3d3d,#a95d5d 58%,#c78383)!important}
   #nafsPdfHostTest .rsub{color:#fff2f2!important}
   #nafsPdfHostTest .metaCard{border-color:#ead8d8!important}
   #nafsPdfHostTest .metaCard:before{background:#b66565!important}
   #nafsPdfHostTest .metaCard b{color:#985050!important}
   #nafsPdfHostTest .section{border-color:#f0dddd!important}
   #nafsPdfHostTest .stitle{background:#f5e5e5!important;color:#8d4949!important}
   #nafsPdfHostTest .skillHero{background:#f5e2e2!important}
   #nafsPdfHostTest .skillHero .stitle{background:#a85e5e!important;color:#fff!important}
   #nafsPdfHostTest .hotPill{background:#fffafa!important;border-color:#e3c7c7!important;color:#8d5050!important}
   #nafsPdfHostTest .eTitle{color:#9e5555!important}
   #nafsPdfHostTest .eCell{border-color:#e7cece!important}
  `;
  document.head.appendChild(style);
  try{return await window.NAFS_PDF_TEST.download(el,name||'خطة-نافس-العلاجية.pdf')}
  finally{style.remove()}
 }
};