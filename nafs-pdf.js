/* تنزيل تقرير نافس PDF في صفحة A4 واحدة بدون نافذة الطباعة */
window.NAFS_PDF={
 async download(element,filename){
  if(!element) throw new Error('report element missing');
  const oldDisplay=element.style.display,oldWidth=element.style.width,oldMax=element.style.maxWidth,oldPadding=element.style.padding;
  element.style.display='block';element.style.width='794px';element.style.maxWidth='794px';element.style.padding='18px 24px';
  element.classList.add('pdf-one-page');
  try{
   if(!window.html2canvas) await this.load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
   if(!window.jspdf) await this.load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
   await document.fonts?.ready;
   const canvas=await html2canvas(element,{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false,width:794,windowWidth:794,scrollX:0,scrollY:0});
   const img=canvas.toDataURL('image/jpeg',0.97),{jsPDF}=window.jspdf;
   const pdf=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true});
   const margin=7,maxW=196,maxH=283,ratio=canvas.width/canvas.height;
   let w=maxW,h=w/ratio;if(h>maxH){h=maxH;w=h*ratio}
   const x=(210-w)/2,y=(297-h)/2;
   pdf.addImage(img,'JPEG',x,y,w,h,undefined,'FAST');
   pdf.save(filename||'nafs-report.pdf');
  } finally {element.classList.remove('pdf-one-page');element.style.display=oldDisplay;element.style.width=oldWidth;element.style.maxWidth=oldMax;element.style.padding=oldPadding}
 },
 load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
};