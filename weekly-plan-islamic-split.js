/* فصل القرآن الكريم عن الدراسات الإسلامية أثناء تعبئة الخطة، مع إبقائهما قابلين للدمج في التقرير */
(function(){
  const data=window.lessonData||{};
  Object.keys(data).forEach(function(grade){
    const row=data[grade]||{};
    const combined=row['القرآن الكريم والدراسات الإسلامية'];
    if(combined){
      const q=[], islamic=[];
      combined.forEach(function(group){
        const title=String(group.g||'');
        if(/قرآن|تلاوة|حفظ|سورة|تجويد/i.test(title)) q.push(group); else islamic.push(group);
      });
      if(q.length) row['القرآن الكريم']=q;
      if(islamic.length) row['الدراسات الإسلامية']=islamic;
      delete row['القرآن الكريم والدراسات الإسلامية'];
    }
  });
  document.addEventListener('DOMContentLoaded',function(){
    try{
      const i=base.indexOf('القرآن الكريم والدراسات الإسلامية');
      if(i>=0) base.splice(i,1,'القرآن الكريم','الدراسات الإسلامية');
      if(typeof fillSubjects==='function' && window.shareToken) fillSubjects();
      if(typeof renderAdmin==='function' && window.adminToken) renderAdmin();
    }catch(e){console.warn('Islamic subjects split:',e)}
  });
})();