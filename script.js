// The App Store pills do nothing until the app is live (owner, Oct 2026): the real link goes in README.md.
document.querySelectorAll('a[data-soon]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length>1){e.preventDefault();document.querySelector(id)?.scrollIntoView({behavior:'smooth'})}}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});document.querySelectorAll('.feature,.steps article,.life').forEach(el=>io.observe(el));
