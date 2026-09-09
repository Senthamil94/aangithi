(function(){
  const chips=[...document.querySelectorAll('.chip')],cats=[...document.querySelectorAll('.mcat')],items=[...document.querySelectorAll('.mi')];
  const input=document.querySelector('.mbar input'),search=document.querySelector('.mbar .search'),empty=document.querySelector('.empty'),chipRail=document.querySelector('.chips');
  let mode='all';
  const setChip=k=>{chips.forEach(c=>c.classList.toggle('on',c.dataset.cat===k));const on=chipRail.querySelector('.chip.on');if(on)chipRail.scrollTo({left:on.offsetLeft-chipRail.clientWidth/2+on.offsetWidth/2,behavior:'smooth'})};
  const filter=()=>{
    const q=input.value.trim().toLowerCase();search.classList.toggle('has',!!q);let any=0;
    items.forEach(it=>{const ok=(!q||it.dataset.name.includes(q))&&(mode!=='popular'||it.dataset.pop==='1');it.classList.toggle('hide',!ok);any+=ok});
    cats.forEach(c=>c.classList.toggle('hide',!c.querySelector('.mi:not(.hide)')));
    empty.classList.toggle('show',!any);
  };
  chips.forEach(c=>c.addEventListener('click',()=>{
    const k=c.dataset.cat;
    if(k==='popular'){mode=mode==='popular'?'all':'popular';filter();setChip(mode==='popular'?'popular':'');scrollTo({top:document.querySelector('.mbar').offsetTop-60,behavior:'smooth'});return}
    mode='all';input.value='';filter();setChip(k);document.getElementById(k).scrollIntoView({behavior:'smooth',block:'start'});
  }));
  input.addEventListener('input',()=>{mode='all';filter();if(input.value)setChip('')});
  document.querySelector('[data-clear]').addEventListener('click',()=>{input.value='';filter();input.focus()});
  /* scroll-spy */
  const spy=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&mode==='all'&&!input.value)setChip(e.target.dataset.cat)})},{rootMargin:'-45% 0px -50% 0px'});
  cats.forEach(c=>spy.observe(c));
  /* deep link */
  if(location.hash){const el=document.querySelector(location.hash);el&&setTimeout(()=>el.scrollIntoView({behavior:'smooth'}),300)}
})();
