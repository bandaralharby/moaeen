/* أنجز AI — الاقتراح الذكي للخطة الأسبوعية
   الأولوية لأي توزيع غربية موثق، وإلا يقترح من فهرس المنهج مع بقاء القرار للمعلمة.
*/
(function(){
  const normWeek=v=>{const m=String(v||'').match(/(\d+)/);return m?Math.max(1,Math.min(20,+m[1])):1};

  // التوزيعات الموثقة الموجودة حاليًا تبقى أعلى أولوية.
  const westernVerified={};

  function flatten(grade,subject){
    const groups=(window.lessonData||{})[grade]?.[subject]||[];
    return groups.flatMap(g=>(g.l||[]).map(l=>({unit:g.g||'',lesson:l})));
  }

  // توزيع ذكي متوازن يحافظ على ترتيب المنهج، ويترك أسابيع الإجازات/الاختبارات أخف.
  const lightWeeks=new Set([4,13,20]);
  function smartBuckets(items,weeks=20){
    const out=Array.from({length:weeks},()=>[]);
    if(!items.length) return out;
    const active=[];
    for(let w=1;w<=weeks;w++) if(!lightWeeks.has(w)) active.push(w);
    items.forEach((item,i)=>{
      const pos=Math.min(active.length-1,Math.floor(i*active.length/items.length));
      out[active[pos]-1].push(item);
    });
    return out;
  }

  function suggestion(grade,subject,week){
    const w=normWeek(week);
    const official=westernVerified[grade]?.[subject];
    if(official && Object.prototype.hasOwnProperty.call(official,w)){
      const lessons=official[w]||[];
      return {week:w,lessons,units:[],homework:lessons.length?`مراجعة وتطبيق تدريبات دروس الأسبوع ${w}`:'',source:'western-verified',verified:true,label:'حسب توزيع موثق'};
    }

    const items=flatten(grade,subject);
    const rows=smartBuckets(items,20)[w-1]||[];
    const lessons=rows.map(x=>x.lesson);
    const units=[...new Set(rows.map(x=>x.unit).filter(Boolean))];
    return {
      week:w,
      lessons,
      units,
      homework:lessons.length?`واجب مقترح: تطبيق تدريبات الدروس المحددة ومراجعتها`:'',
      source:'smart-suggestion',
      verified:false,
      editable:true,
      label:'اقتراح ذكي — قابل للتعديل'
    };
  }

  window.AnjezWeeklyDistribution={suggestion,normWeek};
})();
