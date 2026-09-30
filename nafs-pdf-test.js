/* NAFS PDF TEST - isolated experimental copy based on stable v50 */
(function(){
 const stable=window.NAFS_PDF;
 if(!stable) return;
 window.NAFS_PDF_TEST={
   download: stable.download,
   esc: stable.esc,
   load: stable.load
 };
})();