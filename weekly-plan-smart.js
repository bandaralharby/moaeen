/* الخطة الذكية: تعتمد توزيع المنهج الفعلي المحمّل لكل صف ومادة، بلا افتراض أسابيع إجازة */
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
    if(!box){box=document.createElement('div');box.id='smartSuggestion';box.className='smart';picker.parentNode.insertBefore(box,picker)}
    return box;
  }
  function updateTitle(){
    const summary=document.querySelector('.lessonAccordion summary');if(!summary)return;
    const picked=[...document.querySelectorAll('input[name="lessonPick"]:checked')].map(x=>x.value);
    if(!picked.length){summary.textContent='اختيار / تغيير الدرس';return}
    const shown=picked.length<=2?picked.join(' + '):picked.slice(0,2).join(' + ')+' + '+(picked.length-2)+' أخرى';
    summary.textContent='دروس الأسبوع: '+shown+' — تغيير';
  }
  function actualWeekLessons(data,wk){
    if(!Array.isArray(data))return [];
    const direct=[];
    for(const grp of data){
      const g=String(grp?.g||'');
      const nums=(g.match(/\d+/g)||[]).map(Number);
      if(nums.includes(wk)) direct.push(...(grp.l||[]));
      else if(/الأسبوع/.test(g)&&nums.length===2&&wk>=nums[0]&&wk<=nums[1]) direct.push(...(grp.l||[]));
    }
    if(direct.length)return [...new Set(direct)];
    /* بعض ملفات المناهج مخزنة كمجموعات متتابعة دون رقم أسبوع صريح؛ نستخدم ترتيب المجموعة نفسها لا توزيع كل الدروس حسابيًا */
    const groups=data.filter(x=>Array.isArray(x?.l)&&x.l.length);
    const indexed=groups[wk-1];
    return indexed?[...new Set(indexed.l)]:[];
  }
  function apply(){
    const picker=document.getElementById('lessonPicker'),grade=document.getElementById('grade')?.value,subject=document.getElementById('subject')?.value;
    const checks=[...document.querySelectorAll('input[name="lessonPick"]')],box=ensureSmartBox();
    if(!picker||picker.classList.contains('hide')||!checks.length){if(box)box.style.display='none';return}
    const wk=weekNumber(),data=window.lessonData?.[grade]?.[subject],wanted=actualWeekLessons(data,wk);
    checks.forEach(c=>c.checked=wanted.includes(c.value));
    if(!wanted.length){box.style.display='block';box.innerHTML='<b>الخطة الذكية — الأسبوع '+wk+':</b> لا يوجد توزيع أسبوعي موثّق لهذه المادة في البيانات الحالية؛ اختر الدرس يدويًا.'}
    else{box.style.display='block';box.innerHTML='<b>الخطة الذكية — الأسبوع '+wk+':</b> تم اختيار دروس هذا الأسبوع من توزيع المنهج الفعلي، ويمكن تعديلها قبل الحفظ.'}
    updateTitle();
  }
  document.addEventListener('change',function(e){if(e.target&&e.target.name==='lessonPick'){updateTitle();return}if(e.target&&(e.target.id==='grade'||e.target.id==='subject'))setTimeout(apply,40)});
  document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,650));
  const timer=setInterval(()=>{if(document.getElementById('lessonPicker')){apply();clearInterval(timer)}},300);setTimeout(()=>clearInterval(timer),5000);
})();