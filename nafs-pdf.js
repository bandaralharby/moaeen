/* PDF A4 صفحة واحدة - تصميم هادئ v6 مع شعار وزارة التعليم */
window.NAFS_PDF={async download(el,name){if(!el)throw Error('report missing');const old={display:el.style.display,width:el.style.width,maxWidth:el.style.maxWidth,padding:el.style.padding};el.style.display='block';el.style.width='794px';el.style.maxWidth='794px';el.style.padding='0';el.style.background='#fff';
// إضافة نفس شعار وزارة التعليم الموجود في ملفات المشروع
const head=el.querySelector('.rhead');let logoWrap=null;if(head){logoWrap=document.createElement('div');logoWrap.className='nafsMoeIdentity';logoWrap.innerHTML='<img src="Moelogo.jpg" alt="شعار وزارة التعليم"><div><div>المملكة العربية السعودية</div><div>وزارة التعليم</div></div>';head.prepend(logoWrap)}
// إزالة الأيقونات والرموز من نسخة التقرير فقط
el.querySelectorAll('.ico').forEach(x=>x.style.display='none');el.querySelectorAll('.metaCard b').forEach(x=>{x.dataset.old=x.textContent;x.textContent=x.textContent.replace(/[🏫📚📅🎯★◆◎↗✓⌁▦↻]/g,'').trim()});
const css=document.createElement('style');css.id='nafsPdfCalm';css.textContent=`
#pdfReport{font-size:12.2px!important;line-height:1.5!important;border:1px solid #e6e9e7!important;color:#28332e!important;font-family:Tahoma,Arial!important}
#pdfReport .rhead{background:#f8faf9!important;color:#24352d!important;padding:13px 24px 13px!important;border-top:2px solid #79958a!important;border-bottom:1px solid #dce4e0!important;text-align:center!important;position:relative!important;min-height:86px!important}
#pdfReport .rhead:after{display:none!important}
#pdfReport .rhead h1{color:#263a31!important;font-size:22px!important;font-weight:700!important;margin:8px 145px 4px 120px!important;letter-spacing:0!important}
#pdfReport .rsub{color:#68766f!important;font-size:10px!important;opacity:1!important;margin:0 145px 0 120px!important}
#pdfReport .nafsMoeIdentity{position:absolute!important;right:20px!important;top:10px!important;width:132px!important;display:flex!important;align-items:center!important;gap:8px!important;text-align:right!important;color:#52645b!important;font-size:8.5px!important;line-height:1.55!important}
#pdfReport .nafsMoeIdentity img{width:64px!important;height:48px!important;object-fit:contain!important;display:block!important}
#pdfReport .metaCards{grid-template-columns:1.35fr 1fr 1fr!important;gap:0!important;padding:0 24px!important;margin:10px 0 7px!important;border:1px solid #e3e7e5!important;border-radius:7px!important;background:#fff!important}
#pdfReport .metaCard{background:#fff!important;border:0!important;border-left:1px solid #e8ebe9!important;border-radius:0!important;padding:7px 11px!important;color:#3c4742!important}
#pdfReport .metaCard:first-child{border-left:0!important}
#pdfReport .metaCard b{color:#73837b!important;font-size:9.5px!important;font-weight:700!important;margin-bottom:2px!important}
#pdfReport .rbody{padding:0 24px 12px!important}
#pdfReport .section{margin-top:5px!important;border:1px solid #e3e7e5!important;border-radius:7px!important;overflow:hidden!important;background:#fff!important}
#pdfReport .stitle{background:#f7f9f8!important;color:#42564c!important;font-size:10.8px!important;font-weight:700!important;padding:4px 10px!important;border-bottom:1px solid #edf0ee!important}
#pdfReport .ico{display:none!important}
#pdfReport .scontent{padding:5px 10px!important;background:#fff!important;color:#252d29!important;font-size:11.2px!important;line-height:1.5!important}
#pdfReport .skillHero{border:1px solid #d7dfdb!important;border-right:3px solid #7b9488!important;background:#fff!important}
#pdfReport .skillHero .stitle{background:#f3f6f4!important;color:#30463b!important}
#pdfReport .two{gap:7px!important}
#pdfReport .sig{margin-top:12px!important;gap:70px!important;font-size:10.5px!important;color:#4c5752!important}
#pdfReport .sig div{border-top:1px solid #aeb8b3!important;padding-top:5px!important}
#pdfReport .footer{color:#9aa39e!important;font-size:8.5px!important;margin-top:6px!important}
`;document.head.appendChild(css);try{if(!window.html2canvas)await this.load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');if(!window.jspdf)await this.load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');await document.fonts?.ready;if(logoWrap){const img=logoWrap.querySelector('img');if(img&&!img.complete)await new Promise(ok=>{img.onload=ok;img.onerror=ok})}const c=await html2canvas(el,{scale:2,useCORS:true,backgroundColor:'#fff',logging:false,width:794,windowWidth:794,scrollX:0,scrollY:0});const {jsPDF}=window.jspdf,p=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true}),mw=196,mh=283,r=c.width/c.height;let w=mw,h=w/r;if(h>mh){h=mh;w=h*r}p.addImage(c.toDataURL('image/jpeg',.98),'JPEG',(210-w)/2,(297-h)/2,w,h,undefined,'FAST');p.save(name||'nafs-report.pdf')}finally{css.remove();if(logoWrap)logoWrap.remove();el.querySelectorAll('.ico').forEach(x=>x.style.display='');el.querySelectorAll('.metaCard b').forEach(x=>{if(x.dataset.old){x.textContent=x.dataset.old;delete x.dataset.old}});el.style.display=old.display;el.style.width=old.width;el.style.maxWidth=old.maxWidth;el.style.padding=old.padding}},load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}};