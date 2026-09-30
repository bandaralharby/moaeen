/* TEST COPY: stable NAFS PDF v50. Edit this file for experiments; production nafs-pdf.js stays untouched. */
/* This loader snapshots the current production implementation into a separate test entry point. */
(function(){
 const s=document.createElement('script');
 s.src='nafs-pdf.js?v=50';
 s.dataset.nafsTest='1';
 document.head.appendChild(s);
})();