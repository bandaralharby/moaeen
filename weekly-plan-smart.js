/* استعادة الخطة الذكية دون التأثير على لوحة المسؤول أو التقرير */
(function(){
  function weekNumber(){
    const t=(document.getElementById('teacherWeek')?.textContent||'');
    const m=t.match(/(?:الأسبوع\s*)?(\d+)/);
    return m?Math.max(1,Math.min(18,Number(m[1]))):1;
  }
  function ensureSmartBox(){
    const picker=document.getElementById('lessonPicker');
    if(!picker)return null;
    let box=document.getElementById('smartSuggestion');
    if(!box){
      box=document.createElement('div');box.id='smartSuggestion';box.className='smart';
      picker.parentNode.insertBefore(box,picker);
    }
    return box;
  }
  function updateTitle(){
    const summary=document.querySelector('.lessonAccordion summary');if(!summary)return;
    const picked=[...document.querySelectorAll('input[name="lessonPick"]:checked')].map(x=>x.value);
    if(!picked.length){summary.textContent='اختيار / تغيير الدرس';return;}
    const shown=picked.length<=2?picked.join(' + '):picked.slice(0,2).join(' + ')+' + '+(picked.length-2)+' أخرى';
    summary.textContent='الدرس المقترح: '+shown+' — تغيير';
  }
  function apply(){
    const picker=document.getElementById('lessonPicker');
    const checks=[...document.querySelectorAll('input[name="lessonPick"]')];
    const box=ensureSmartBox();
    if(!picker||picker.classList.contains('hide')||!checks.length){if(box)box.style.display='none';return;}
    const wk=weekNumber(),active=[1,2,3,5,6,7,8,9,10,11,12,14,15,16,17,18];
    checks.forEach(c=>c.checked=false);
    if([4,13].includes(wk)){
      box.style.display='block';box.innerHTML='<b>الاقتراح الذكي — الأسبوع '+wk+':</b> أسبوع خفيف/إجازة؛ راجع الخطة قبل إضافة درس.';updateTitle();return;
    }
    let pos=active.indexOf(wk);if(pos<0)pos=0;
    const start=Math.floor(pos*checks.length/active.length);
    const end=Math.max(start+1,Math.floor((pos+1)*checks.length/active.length));
    const chosen=checks.slice(start,Math.min(checks.length,end));chosen.forEach(c=>c.checked=true);
    box.style.display='block';box.innerHTML='<b>الاقتراح الذكي — الأسبوع '+wk+':</b> تم تحديد '+chosen.length+' من دروس الأسبوع تلقائيًا، ويمكن تعديلها.';
    updateTitle();
  }
  document.addEventListener('change',function(e){
    if(e.target&&e.target.name==='lessonPick'){updateTitle();return;}
    if(e.target&&(e.target.id==='grade'||e.target.id==='subject'))setTimeout(apply,30);
  });
  document.addEventListener('DOMContentLoaded',function(){setTimeout(apply,500)});
})();