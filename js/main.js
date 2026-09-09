/* ===== Aangithi — shared behaviour ===== */
(function(){
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const ORDER='https://order.boons.io/site/angithi-indian-restaurant/409';

  /* header shadow */
  const hdr=$('.hdr');
  const onScroll=()=>hdr&&hdr.classList.toggle('scrolled',scrollY>8);
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  /* drawer */
  const burger=$('.burger'),drawer=$('.drawer');
  const setDrawer=o=>{drawer.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
  burger&&burger.addEventListener('click',()=>setDrawer(!drawer.classList.contains('open')));
  drawer&&$$('.scrim, a, .dclose',drawer).forEach(el=>el.addEventListener('click',()=>setDrawer(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setDrawer(false)});

  /* bottom bar */
  const bbar=$('.bbar');
  if(bbar){setTimeout(()=>bbar.classList.add('show'),400)}

  /* reveal on scroll */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  $$('.rv').forEach(el=>io.observe(el));

  /* open / closed status (12:00pm–9:30pm PT) */
  const now=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Los_Angeles'}));
  const mins=now.getHours()*60+now.getMinutes();
  const open=mins>=12*60&&mins<21*60+30;
  $$('[data-status]').forEach(status=>{
    status.textContent=open?'Open now':'Closed now';
    status.classList.toggle('closed',!open);
  });

  /* toast */
  const toast=$('.toast');
  window.showToast=m=>{if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>toast.classList.remove('show'),2200)};

  /* share */
  $$('[data-share]').forEach(b=>b.addEventListener('click',async()=>{
    const d={title:'Aangithi Indian Restaurant — Morgan Hill',text:'North Indian food in Morgan Hill, CA — veg and non-veg. Order online:',url:location.href};
    try{if(navigator.share){await navigator.share(d)}else{await navigator.clipboard.writeText(location.href);showToast('Link copied')}}catch(e){}
  }));

  /* magnetic buttons on pointer devices */
  if(matchMedia('(hover:hover)').matches){
    $$('.btn-primary').forEach(b=>{
      b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.25 - 2}px)`});
      b.addEventListener('mouseleave',()=>b.style.transform='');
    });
  }
})();

document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

