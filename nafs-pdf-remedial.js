/* Remedial PDF uses the same polished renderer as the experimental report */
window.NAFS_PDF_REMEDIAL={
 async download(el,name){
  if(!window.NAFS_PDF_TEST) throw Error('experimental renderer not loaded');
  return window.NAFS_PDF_TEST.download(el,name||'خطة-نافس-العلاجية.pdf');
 }
};