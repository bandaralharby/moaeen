/* PDF A4 صفحة واحدة - تصميم بصري أنيق v7 */
window.NAFS_PDF={async download(el,name){if(!el)throw Error('report missing');const old={display:el.style.display,width:el.style.width,maxWidth:el.style.maxWidth,padding:el.style.padding};el.style.display='block';el.style.width='794px';el.style.maxWidth='794px';el.style.padding='0';el.style.background='#fff';
const head=el.querySelector('.rhead');let logoWrap=null;if(head){logoWrap=document.createElement('div');logoWrap.className='nafsMoeIdentity';logoWrap.innerHTML='<img src="Moelogo.jpg" alt="شعار وزارة التعليم">';head.prepend(logoWrap)}
el.querySelectorAll('.ico').forEach(x=>x.style.display='none');el.querySelectorAll('.metaCard b').forEach(x=>{x.dataset.old=x.textContent;x.textContent=x.textContent.replace(/[🏫📚📅🎯★◆◎↗✓⌁▦↻]/g,'').trim()});
const css=document.createElement('style');css.id='nafsPdfFresh';css.textContent=`
#pdfReport{font-family:Tahoma,Arial!important;font-size:12px!important;line-height:1.55!important;color:#24332d!important;background:#fff!important;border:0!important;box-shadow:none!important;position:relative!important}
#pdfReport:before{content:'';display:block;height:7px;background:linear-gradient(90deg,#8fb8a5 0 32%,#d9c89e 32% 42%,#eaf2ee 42% 100%)}
#pdfReport .rhead{height:108px!important;background:linear-gradient(135deg,#f3f8f5,#ffffff)!important;color:#203c30!important;padding:22px 30px!important;border:0!important;border-bottom:1px solid #e1ebe6!important;text-align:right!important;position:relative!important}
#pdfReport .rhead:after{content:''!important;display:block!important;position:absolute!important;right:30px!important;bottom:17px!important;width:46px!important;height:3px!important;background:#cbb477!important;border-radius:3px!important}
#pdfReport .rhead h1{color:#244b3b!important;font-size:24px!important;font-weight:700!important;margin:7px 118px 4px 0!important;line-height:1.25!important}
#pdfReport .rsub{color:#75857d!important;font-size:10px!important;margin-right:118px!important;letter-spacing:0!important}
#pdfReport .nafsMoeIdentity{position:absolute!important;right:29px!important;top:17px!important;width:92px!important;height:64px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding-left:15px!important;border-left:1px solid #dbe5e0!important}
#pdfReport .nafsMoeIdentity img{width:76px!important;height:58px!important;object-fit:contain!important;display:block!important}
#pdfReport .metaCards{display:grid!important;grid-template-columns:1.4fr 1fr 1fr!important;gap:8px!important;padding:13px 30px 4px!important;margin:0!important;background:#fff!important;border:0!important}
#pdfReport .metaCard{background:#f8faf9!important;border:1px solid #e5ebe8!important;border-radius:11px!important;padding:8px 12px!important;color:#34433c!important;min-height:48px!important}
#pdfReport .metaCard b{display:block!important;color:#8a978f!important;font-size:9px!important;font-weight:400!important;margin-bottom:3px!important}
#pdfReport .rbody{padding:3px 30px 18px!important}
#pdfReport .section{margin-top:7px!important;border:0!important;border-radius:11px!important;overflow:hidden!important;background:#fafcfb!important;box-shadow:inset 0 0 0 1px #e6ece9!important}
#pdfReport .stitle{display:block!important;background:transparent!important;color:#527061!important;font-size:10px!important;font-weight:700!important;padding:7px 12px 1px!important;border:0!important}
#pdfReport .ico{display:none!important}
#pdfReport .scontent{padding:3px 12px 8px!important;background:transparent!important;color:#26332d!important;font-size:11.5px!important;line-height:1.55!important}
#pdfReport .skillHero{background:linear-gradient(135deg,#edf6f1,#f9fcfa)!important;box-shadow:inset 4px 0 0 #86ad99,inset 0 0 0 1px #dce9e2!important}
#pdfReport .skillHero .stitle{color:#3f6a56!important;font-size:10px!important}
#pdfReport .skillHero .scontent{font-size:12.4px!important;font-weight:700!important;color:#244b3a!important;padding-bottom:9px!important}
#pdfReport .two{display:grid!important;grid-template-columns:1.12fr .88fr!important;gap:8px!important}
#pdfReport .two .section:first-child{background:#fbfaf5!important;box-shadow:inset 0 0 0 1px #eee7d6!important}
#pdfReport .two .section:first-child .stitle{color:#8a7650!important}
#pdfReport .sig{display:grid!important;grid-template-columns:1fr 1fr!important;gap:80px!important;margin:17px 35px 0!important;text-align:center!important;font-size:10px!important;color:#66766e!important}
#pdfReport .sig div{border-top:1px solid #bfcac4!important;padding-top:6px!important}
#pdfReport .sig b{color:#33443c!important;font-size:10.5px!important}
#pdfReport .footer{text-align:center!important;color:#a2aca7!important;font-size:8px!important;margin-top:9px!important;letter-spacing:.2px!important}
`;document.head.appendChild(css);try{if(!window.html2canvas)await this.load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');if(!window.jspdf)await this.load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');await document.fonts?.ready;if(logoWrap){const img=logoWrap.querySelector('img');if(img&&!img.complete)await new Promise(ok=>{img.onload=ok;img.onerror=ok})}const c=await html2canvas(el,{scale:2,useCORS:true,backgroundColor:'#fff',logging:false,width:794,windowWidth:794,scrollX:0,scrollY:0});const {jsPDF}=window.jspdf,p=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true}),mw=196,mh=283,r=c.width/c.height;let w=mw,h=w/r;if(h>mh){h=mh;w=h*r}p.addImage(c.toDataURL('image/jpeg',.98),'JPEG',(210-w)/2,(297-h)/2,w,h,undefined,'FAST');p.save(name||'nafs-report.pdf')}finally{css.remove();if(logoWrap)logoWrap.remove();el.querySelectorAll('.ico').forEach(x=>x.style.display='');el.querySelectorAll('.metaCard b').forEach(x=>{if(x.dataset.old){x.textContent=x.dataset.old;delete x.dataset.old}});el.style.display=old.display;el.style.width=old.width;el.style.maxWidth=old.maxWidth;el.style.padding=old.padding}},load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}};