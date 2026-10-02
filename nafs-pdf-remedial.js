/* Remedial PDF uses the same polished renderer as the experimental report */
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
  return window.NAFS_PDF_TEST.download(el,name||'خطة-نافس-العلاجية.pdf');
 }
};