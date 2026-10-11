// The App Store pills do nothing until the app is live (owner, Oct 2026): the real link goes in README.md.
document.querySelectorAll('a[data-soon]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length>1){e.preventDefault();document.querySelector(id)?.scrollIntoView({behavior:'smooth'})}}));
// Reveal on scroll: one observer, each element once, siblings inside a data-stagger group
// follow one another 80 ms apart. No scroll listeners, no layout reads during the motion.
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,group=el.closest('[data-stagger]');
    if(group){const i=[...group.querySelectorAll('.reveal')].indexOf(el);el.style.transitionDelay=(i*80)+'ms'}
    el.classList.add('in');io.unobserve(el)
  }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  reveals.forEach(el=>io.observe(el))
}else{reveals.forEach(el=>el.classList.add('in'))}
// Image placeholders: the shimmer under a picture stops once that picture has decoded.
// Already-complete images (cache, fast connection) are marked at once, so nothing flickers.
document.querySelectorAll('img.ph').forEach(img=>{
  const done=()=>img.classList.add('ok');
  if(img.complete&&img.naturalWidth>0)done();else{img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true})}
});
