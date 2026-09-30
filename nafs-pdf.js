/* NAFS PDF v9 - تقرير بصري ببطاقات مميزة */
window.NAFS_PDF={async download(el,name){if(!el)throw Error('report missing');const old={display:el.style.display,width:el.style.width,maxWidth:el.style.maxWidth,padding:el.style.padding};el.style.display='block';el.style.width='794px';el.style.maxWidth='794px';el.style.padding='0';el.style.background='#f7faf8';const head=el.querySelector('.rhead');let logo=null;if(head){logo=document.createElement('div');logo.className='nafsBrand';logo.innerHTML='<img src="Moelogo.jpg" alt="شعار وزارة التعليم">';head.prepend(logo)}el.querySelectorAll('.ico').forEach(x=>x.style.display='none');el.querySelectorAll('.metaCard b').forEach(x=>{x.dataset.old=x.textContent;x.textContent=x.textContent.replace(/[🏫📚📅🎯★◆◎↗✓⌁▦↻]/g,'').trim()});const style=document.createElement('style');style.textContent=`
#pdfReport{font-family:Tahoma,Arial!important;color:#26352f!important;background:#f7faf8!important;border:0!important;position:relative!important;font-size:12px!important;line-height:1.5!important;padding:24px 28px 20px!important}
#pdfReport:before{display:none!important}
#pdfReport .rhead{height:112px!important;background:linear-gradient(135deg,#1f654b,#347a60)!important;border:0!important;border-radius:20px!important;padding:25px 30px 20px 150px!important;position:relative!important;text-align:right!important;overflow:hidden!important;box-shadow:0 8px 22px rgba(36,87,67,.12)!important}
#pdfReport .rhead:before{content:'';position:absolute;left:-25px;bottom:-45px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.06)!important}
#pdfReport .rhead:after{content:''!important;position:absolute!important;right:31px!important;bottom:18px!important;width:55px!important;height:3px!important;border-radius:5px!important;background:#e4c77f!important;display:block!important}
#pdfReport .rhead h1{margin:4px 0 5px!important;color:#fff!important;font-size:25px!important;line-height:1.2!important;font-weight:700!important}
#pdfReport .rsub{margin:0!important;color:#dcebe4!important;font-size:10px!important}
#pdfReport .nafsBrand{position:absolute!important;left:24px!important;top:20px!important;width:104px!important;height:72px!important;background:#fff!important;border-radius:15px!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 5px 14px rgba(0,0,0,.08)!important}
#pdfReport .nafsBrand img{width:86px!important;height:58px!important;object-fit:contain!important}
#pdfReport .metaCards{display:grid!important;grid-template-columns:1.3fr 1fr 1fr!important;gap:9px!important;margin:11px 0 10px!important;padding:0!important;background:transparent!important;border:0!important}
#pdfReport .metaCard{background:#fff!important;border:1px solid #e4ebe7!important;border-radius:12px!important;padding:8px 12px!important;min-height:49px!important;color:#304039!important;font-size:10.5px!important;box-shadow:0 3px 10px rgba(42,71,59,.04)!important}
#pdfReport .metaCard b{display:block!important;color:#84928b!important;font-size:8.5px!important;font-weight:400!important;margin-bottom:2px!important}
#pdfReport .rbody{padding:0!important;display:block!important}
#pdfReport .section{position:relative!important;margin:0 0 7px!important;background:#fff!important;border:1px solid #e4ebe7!important;border-radius:13px!important;overflow:hidden!important;box-shadow:0 3px 11px rgba(43,75,62,.045)!important;padding:0!important}
#pdfReport .stitle{background:#eef5f1!important;color:#3d6a56!important;font-size:9.5px!important;font-weight:700!important;padding:5px 11px!important;border:0!important;border-bottom:1px solid #e5ede9!important;display:block!important}
#pdfReport .scontent{background:#fff!important;color:#27362f!important;font-size:10.9px!important;line-height:1.5!important;padding:7px 11px!important}
#pdfReport .ico{display:none!important}
#pdfReport .skillHero{margin:8px 0!important;background:linear-gradient(135deg,#e5f2eb,#f3f8f5)!important;border:1px solid #cfe1d8!important;border-radius:15px!important;box-shadow:0 5px 14px rgba(50,100,78,.07)!important}
#pdfReport .skillHero .stitle{background:transparent!important;color:#698579!important;border:0!important;padding:8px 13px 0!important;font-size:8.8px!important}
#pdfReport .skillHero .scontent{background:transparent!important;color:#1f5a42!important;font-size:12.6px!important;font-weight:700!important;line-height:1.5!important;padding:4px 13px 10px!important}
#pdfReport .two{display:grid!important;grid-template-columns:1.15fr .85fr!important;gap:8px!important;margin:0 0 7px!important}
#pdfReport .two .section{margin:0!important;min-height:78px!important}
#pdfReport .two .section:first-child{background:#fffaf0!important;border-color:#eee1bf!important}
#pdfReport .two .section:first-child .stitle{background:#faf2df!important;color:#846d3d!important;border-bottom-color:#eee1bf!important}
#pdfReport .two .section:first-child .scontent{background:#fffaf0!important}
#pdfReport .two .section:last-child{background:#f1f6fa!important;border-color:#dbe7ee!important}
#pdfReport .two .section:last-child .stitle{background:#e9f1f6!important;color:#557487!important;border-bottom-color:#dbe7ee!important}
#pdfReport .two .section:last-child .scontent{background:#f1f6fa!important}
#pdfReport .rbody>.section:nth-last-of-type(3){border-color:#dfe9e4!important}
#pdfReport .rbody>.section:nth-last-of-type(2){border-color:#e8e1d3!important}
#pdfReport .sig{display:grid!important;grid-template-columns:1fr 1fr!important;gap:85px!important;margin:14px 28px 0!important;text-align:center!important;color:#738079!important;font-size:9px!important}
#pdfReport .sig div{border-top:1px solid #b9c6c0!important;padding-top:5px!important}
#pdfReport .sig b{display:block!important;color:#304139!important;font-size:10px!important;margin-top:2px!important}
#pdfReport .footer{text-align:center!important;color:#a4aea9!important;font-size:7.5px!important;margin-top:6px!important}
`;document.head.appendChild(style);try{if(!window.html2canvas)await this.load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');if(!window.jspdf)await this.load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');await document.fonts?.ready;if(logo){const i=logo.querySelector('img');if(i&&!i.complete)await new Promise(ok=>{i.onload=ok;i.onerror=ok})}const c=await html2canvas(el,{scale:2,useCORS:true,backgroundColor:'#f7faf8',logging:false,width:794,windowWidth:794,scrollX:0,scrollY:0});const {jsPDF}=window.jspdf,p=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true}),mw=196,mh=283,r=c.width/c.height;let w=mw,h=w/r;if(h>mh){h=mh;w=h*r}p.addImage(c.toDataURL('image/jpeg',.98),'JPEG',(210-w)/2,(297-h)/2,w,h,undefined,'FAST');p.save(name||'nafs-report.pdf')}finally{style.remove();if(logo)logo.remove();el.querySelectorAll('.ico').forEach(x=>x.style.display='');el.querySelectorAll('.metaCard b').forEach(x=>{if(x.dataset.old){x.textContent=x.dataset.old;delete x.dataset.old}});Object.assign(el.style,old)}},load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}};