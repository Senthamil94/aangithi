/* Catering hours: 9:00 AM – 10:00 PM PT */
(function(){
  const now=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Los_Angeles'}));
  const h=now.getHours();
  const open=h>=9&&h<22;
  document.querySelectorAll('[data-cater-status]').forEach(el=>{
    el.textContent=open?'Catering open now':'Catering closed now';
    el.classList.toggle('closed',!open);
  });
  const day=now.getDay();
  const el=document.querySelector('.chrs [data-day="'+day+'"]');
  el&&el.classList.add('today');
})();
