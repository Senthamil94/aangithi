/* Hero slider */
(function(){
  const hero=document.querySelector('.hero');if(!hero)return;
  const slides=[...hero.querySelectorAll('.slide')],dots=[...hero.querySelectorAll('.dots button')];
  const DUR=6000;let i=0,t;hero.style.setProperty('--dur',DUR+'ms');
  const go=n=>{slides[i].classList.remove('on');dots[i].classList.remove('on');i=(n+slides.length)%slides.length;slides[i].classList.add('on');dots[i].classList.add('on');restart()};
  const restart=()=>{clearTimeout(t);if(!document.documentElement.classList.contains('a11y-stop-animations'))t=setTimeout(()=>go(i+1),DUR)};
  dots.forEach((d,n)=>d.addEventListener('click',()=>go(n)));
  hero.querySelector('[data-next]').addEventListener('click',()=>go(i+1));
  hero.querySelector('[data-prev]').addEventListener('click',()=>go(i-1));
  let x0=null;hero.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
  hero.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));x0=null});
  addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1)});
  document.addEventListener('visibilitychange',()=>document.hidden?clearTimeout(t):restart());
  restart();
})();
/* Lightbox */
(function(){
  const lb=document.querySelector('.lb');if(!lb)return;const img=lb.querySelector('img');
  document.querySelectorAll('[data-lb]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();img.src=a.href;img.alt=a.querySelector('img').alt;lb.classList.add('open')}));
  lb.addEventListener('click',()=>lb.classList.remove('open'));
})();
/* today's hours */
(function(){const d=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Los_Angeles'})).getDay();const el=document.querySelector('.hrs [data-day="'+d+'"]');el&&el.classList.add('today')})();
/* 3D tilt on cards (pointer devices) */
if(matchMedia('(hover:hover)').matches){document.querySelectorAll('.card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`translateY(-6px) rotateX(${-y*6}deg) rotateY(${x*8}deg)`});c.addEventListener('mouseleave',()=>c.style.transform='')})}
