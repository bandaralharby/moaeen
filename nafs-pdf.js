/* NAFS PDF v8 - قالب تحريري راقٍ، صفحة A4 واحدة */
window.NAFS_PDF={async download(el,name){if(!el)throw Error('report missing');const old={display:el.style.display,width:el.style.width,maxWidth:el.style.maxWidth,padding:el.style.padding};el.style.display='block';el.style.width='794px';el.style.maxWidth='794px';el.style.padding='0';el.style.background='#fff';const head=el.querySelector('.rhead');let logo=null;if(head){logo=document.createElement('div');logo.className='nafsBrand';logo.innerHTML='<img src="Moelogo.jpg" alt="شعار وزارة التعليم">';head.prepend(logo)}el.querySelectorAll('.ico').forEach(x=>x.style.display='none');el.querySelectorAll('.metaCard b').forEach(x=>{x.dataset.old=x.textContent;x.textContent=x.textContent.replace(/[🏫📚📅🎯★◆◎↗✓⌁▦↻]/g,'').trim()});const style=document.createElement('style');style.textContent=`
#pdfReport{font-family:Tahoma,Arial!important;color:#25332d!important;background:#fff!important;border:0!important;position:relative!important;font-size:12px!important;line-height:1.55!important;padding:0!important}
#pdfReport:before{content:'';position:absolute;right:0;top:0;width:11px;height:100%;background:#315f4d!important}
#pdfReport .rhead{height:128px!important;background:#fff!important;border:0!important;padding:27px 44px 20px 185px!important;position:relative!important;text-align:right!important}
#pdfReport .rhead:before{content:'';position:absolute;right:44px;bottom:15px;width:72px;height:4px;border-radius:4px;background:#d9b86c!important}
#pdfReport .rhead:after{content:''!important;position:absolute!important;left:31px!important;top:22px!important;width:1px!important;height:72px!important;background:#dfe7e3!important;display:block!important}
#pdfReport .rhead h1{margin:7px 0 5px!important;color:#234c3b!important;font-size:27px!important;line-height:1.2!important;font-weight:700!important}
#pdfReport .rsub{margin:0!important;color:#89958f!important;font-size:10.5px!important}
#pdfReport .nafsBrand{position:absolute!important;left:45px!important;top:24px!important;width:118px!important;height:72px!important;display:flex!important;align-items:center!important;justify-content:center!important}
#pdfReport .nafsBrand img{width:102px!important;height:70px!important;object-fit:contain!important}
#pdfReport .metaCards{display:grid!important;grid-template-columns:1.25fr 1fr 1fr!important;gap:0!important;margin:0 44px 13px!important;padding:0!important;background:#f5f7f6!important;border-radius:12px!important;overflow:hidden!important;border:0!important}
#pdfReport .metaCard{background:transparent!important;border:0!important;border-left:1px solid #e1e6e3!important;border-radius:0!important;padding:10px 15px!important;min-height:55px!important;color:#34443d!important;font-size:11px!important}
#pdfReport .metaCard:first-child{border-left:0!important}
#pdfReport .metaCard b{display:block!important;color:#8a9690!important;font-size:8.8px!important;font-weight:400!important;margin-bottom:3px!important}
#pdfReport .rbody{padding:0 44px 17px!important}
#pdfReport .section{position:relative!important;margin:0 0 7px!important;background:#fff!important;border:0!important;border-bottom:1px solid #e7ebe9!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;padding:0 0 7px!important}
#pdfReport .stitle{background:transparent!important;color:#547064!important;font-size:10px!important;font-weight:700!important;padding:0 0 3px!important;border:0!important;display:block!important}
#pdfReport .scontent{background:transparent!important;color:#27342e!important;font-size:11.5px!important;line-height:1.55!important;padding:0!important}
#pdfReport .ico{display:none!important}
#pdfReport .skillHero{margin:10px 0 9px!important;background:#eef5f1!important;border:0!important;border-radius:13px!important;padding:11px 16px 12px!important;box-shadow:none!important}
#pdfReport .skillHero:before{content:'المهارة المحورية';display:block;color:#81948a;font-size:8.5px;margin-bottom:3px}
#pdfReport .skillHero .stitle{display:none!important}
#pdfReport .skillHero .scontent{color:#214a39!important;font-size:13.5px!important;font-weight:700!important;line-height:1.55!important;padding:0!important}
#pdfReport .two{display:grid!important;grid-template-columns:1.25fr .75fr!important;gap:18px!important;margin:1px 0 8px!important}
#pdfReport .two .section{background:#fff!important;border:0!important;border-top:3px solid #d7c18b!important;padding:8px 0 6px!important;margin:0!important;box-shadow:none!important}
#pdfReport .two .section:last-child{border-top-color:#91b2a2!important}
#pdfReport .two .stitle{color:#6b756f!important;font-size:9.5px!important}
#pdfReport .two .scontent{font-size:10.7px!important}
#pdfReport .sig{display:grid!important;grid-template-columns:1fr 1fr!important;gap:100px!important;margin:19px 35px 0!important;text-align:center!important;color:#69756f!important;font-size:9.5px!important}
#pdfReport .sig div{border-top:1px solid #b8c2bd!important;padding-top:6px!important}
#pdfReport .sig b{display:block!important;color:#33443c!important;font-size:10.5px!important;margin-top:3px!important}
#pdfReport .footer{text-align:center!important;color:#adb5b1!important;font-size:8px!important;margin-top:8px!important}
`;document.head.appendChild(style);try{if(!window.html2canvas)await this.load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');if(!window.jspdf)await this.load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');await document.fonts?.ready;if(logo){const i=logo.querySelector('img');if(i&&!i.complete)await new Promise(ok=>{i.onload=ok;i.onerror=ok})}const c=await html2canvas(el,{scale:2,useCORS:true,backgroundColor:'#fff',logging:false,width:794,windowWidth:794,scrollX:0,scrollY:0});const {jsPDF}=window.jspdf,p=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true}),mw=196,mh=283,r=c.width/c.height;let w=mw,h=w/r;if(h>mh){h=mh;w=h*r}p.addImage(c.toDataURL('image/jpeg',.98),'JPEG',(210-w)/2,(297-h)/2,w,h,undefined,'FAST');p.save(name||'nafs-report.pdf')}finally{style.remove();if(logo)logo.remove();el.querySelectorAll('.ico').forEach(x=>x.style.display='');el.querySelectorAll('.metaCard b').forEach(x=>{if(x.dataset.old){x.textContent=x.dataset.old;delete x.dataset.old}});Object.assign(el.style,old)}},load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}};