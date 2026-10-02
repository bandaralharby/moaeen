/* NAFS PDF TEST v3.2 */
window.NAFS_TEST_EVIDENCE=window.NAFS_TEST_EVIDENCE||[];
window.NAFS_PDF_TEST={
 load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})},
 esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))},
 async download(el,name){
  if(!el) throw new Error('report missing');
  if(!window.html2canvas) await this.load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
  if(!window.jspdf) await this.load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  if(document.fonts&&document.fonts.ready) await document.fonts.ready;
  const evidence=(window.NAFS_TEST_EVIDENCE||[]).filter(Boolean).slice(0,4);
  const teacher=(el.querySelector('.sig div:first-child b')?.textContent||'........................').trim();
  const principal=(el.querySelector('.sig div:last-child b')?.textContent||'........................').trim();
  const host=document.createElement('div');
  host.style.cssText='position:fixed;left:-20000px;top:0;width:1120px;direction:rtl;font-family:Tahoma,Arial,sans-serif';
  const page=document.createElement('div');
  page.style.cssText='width:1120px;height:1584px;box-sizing:border-box;padding:16px 22px 4px;overflow:hidden;background:#f7f8f5;color:#24332e';
  const style=document.createElement('style');
  style.textContent=`
  #nafsTestPage .rhead{height:154px;position:relative;border-radius:27px;padding:25px 48px 16px;background:linear-gradient(120deg,#153e38,#23665a 58%,#3b8370);overflow:hidden;text-align:center}#nafsTestPage .rhead h1{margin:0 0 5px;color:#fff;font-size:46px}#nafsTestPage .rsub{color:#e8f2ee;font-size:22px;font-weight:600}#nafsTestPage .metaCards{display:grid;grid-template-columns:repeat(7,1fr);gap:7px;margin:9px 4px 8px}#nafsTestPage .metaCard{background:#fff;border:1px solid #e7ece8;border-radius:12px;padding:4px;min-height:57px;text-align:center;font-size:16px;font-weight:800;display:flex;flex-direction:column;justify-content:center}#nafsTestPage .metaCard b{color:#2b7563;font-size:15px}#nafsTestPage .section{margin:0 0 5px;border:1px solid #e7ede9;border-radius:16px;overflow:hidden;background:#fff}#nafsTestPage .stitle{padding:5px 12px;text-align:center;background:#e2eee8;color:#24594b;font-size:23px;font-weight:800}#nafsTestPage .scontent{padding:6px 14px;text-align:center;font-size:21px;line-height:1.28}#nafsTestPage .ico{display:none!important}#nafsTestPage .skillHero{background:#dcefe6}#nafsTestPage .skillHero .stitle{background:#2b6c5c;color:#fff}#nafsTestPage .skillHero .scontent{font-size:19px;font-weight:800;padding:3px 10px 5px;line-height:1.12}#nafsTestPage .two{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:5px}#nafsTestPage .two .section{margin:0;min-height:112px}#nafsTestPage .two .section .scontent{font-size:18px;line-height:1.2;padding:5px 9px}#nafsTestPage .sig,#nafsTestPage .footer{display:none!important}#nafsTestPage .evidenceBlock{margin-top:5px;text-align:center}#nafsTestPage .eTitle{font-size:17px;font-weight:800;color:#2b7563;margin-bottom:3px}#nafsTestPage .evidence{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}#nafsTestPage .eCell{height:262px!important;border:1px solid #d6e2dc;border-radius:11px;overflow:hidden;background:#fff}#nafsTestPage .eCell img{width:100%;height:262px!important;object-fit:cover;display:block}`;
  document.head.appendChild(style);page.id='nafsTestPage';
  const head=el.querySelector('.rhead')?.cloneNode(true);if(head)page.appendChild(head);
  const meta=el.querySelector('.metaCards')?.cloneNode(true);if(meta){meta.insertAdjacentHTML('beforeend','<div class="metaCard"><b>المعلمة</b>'+this.esc(teacher)+'</div><div class="metaCard"><b>مديرة المدرسة</b>'+this.esc(principal)+'</div>');page.appendChild(meta)}
  const body=document.createElement('div');body.className='rbody';
  el.querySelectorAll('.rbody > .section,.rbody > .two').forEach(x=>body.appendChild(x.cloneNode(true)));
  if(evidence.length){const e=document.createElement('div');e.className='evidenceBlock';e.innerHTML='<div class="eTitle">الشواهد</div><div class="evidence">'+evidence.map(src=>'<div class="eCell"><img src="'+src+'"></div>').join('')+'</div>';body.appendChild(e)}
  page.appendChild(body);host.appendChild(page);document.body.appendChild(host);
  await Promise.all([...page.querySelectorAll('img')].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=i.onerror=r})));
  try{const canvas=await html2canvas(page,{scale:2,useCORS:true,backgroundColor:'#f7f8f5',logging:false,width:1120,height:1584,windowWidth:1120,windowHeight:1584});const {jsPDF}=window.jspdf;const pdf=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true});pdf.addImage(canvas.toDataURL('image/jpeg',.96),'JPEG',0,0,210,297,undefined,'FAST');pdf.save(name||'خطة-نافس-تجريبية.pdf')}finally{host.remove();style.remove()}
 }
};