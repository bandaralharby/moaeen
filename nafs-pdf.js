/* تنزيل تقرير نافس PDF مباشرة بدون نافذة الطباعة */
window.NAFS_PDF={
 async download(element,filename){
  if(!element) throw new Error('report element missing');
  const old=element.style.display;element.style.display='block';
  try{
   if(!window.html2canvas) await this.load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
   if(!window.jspdf) await this.load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
   await document.fonts?.ready;
   const canvas=await html2canvas(element,{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false,windowWidth:element.scrollWidth});
   const img=canvas.toDataURL('image/jpeg',0.96),{jsPDF}=window.jspdf;
   const pdf=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true});
   const pw=210,ph=297,margin=8,w=pw-margin*2,h=canvas.height*w/canvas.width,pageH=ph-margin*2;
   let y=0,remaining=h;
   pdf.addImage(img,'JPEG',margin,margin,w,h,undefined,'FAST');remaining-=pageH;
   while(remaining>0){y-=pageH;pdf.addPage();pdf.addImage(img,'JPEG',margin,margin+y,w,h,undefined,'FAST');remaining-=pageH}
   pdf.save(filename||'nafs-report.pdf');
  } finally {element.style.display=old}
 },
 load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
};