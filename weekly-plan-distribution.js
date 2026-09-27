/* أنجز AI — محرك ربط التوزيع الأسبوعي بالدروس
   يقرأ lessonData الموجود في weekly-plan.html ويقترح دروس الأسبوع تلقائياً.
   صُمم بحيث يمكن استبدال التوزيع التلقائي لاحقاً بالتوزيع الرسمي لكل مادة دون تغيير واجهة المعلمة. */
(function(){
  const normWeek=v=>{const m=String(v||'').match(/(\d+)/);return m?Math.max(1,Math.min(18,+m[1])):1};
  const flat=(grade,subject)=>{
    const groups=(window.lessonData||{})[grade]?.[subject]||[];
    return groups.flatMap(g=>(g.l||[]).map(l=>({unit:g.g,lesson:l})));
  };
  const split=(items,weeks=18)=>{
    if(!items.length)return Array.from({length:weeks},()=>[]);
    const out=Array.from({length:weeks},()=>[]);
    items.forEach((x,i)=>out[Math.min(weeks-1,Math.floor(i*weeks/items.length))].push(x));
    return out;
  };
  function suggestion(grade,subject,week){
    const w=normWeek(week), items=flat(grade,subject), buckets=split(items);
    const rows=buckets[w-1]||[];
    return {
      week:w,
      lessons:rows.map(x=>x.lesson),
      units:[...new Set(rows.map(x=>x.unit))],
      homework:rows.length?`مراجعة وتطبيق تدريبات دروس الأسبوع ${w}`:'',
      source:'auto'
    };
  }
  window.AnjezWeeklyDistribution={suggestion,normWeek};
})();
