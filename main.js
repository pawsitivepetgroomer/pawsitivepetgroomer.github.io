(function(){
  document.documentElement.classList.add('js');
  var toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('site-nav');
  if(toggle&&nav){
    toggle.addEventListener('click',function(){var o=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'Close menu':'Open menu');});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');});});
  }
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  } else els.forEach(function(el){el.classList.add('in');});
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  var form=document.getElementById('booking-form'),status=document.getElementById('form-status');
  if(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      var ok=true,first=null;
      form.querySelectorAll('[required]').forEach(function(f){
        var bad=!f.value.trim()||(f.type==='email'&&!/^\S+@\S+\.\S+$/.test(f.value));
        f.classList.toggle('invalid',bad); f.setAttribute('aria-invalid',bad);
        if(bad){ok=false;first=first||f;}
      });
      if(!ok){status.textContent='Please fill in the highlighted fields.';first.focus();return;}
      var v=function(n){return (form.elements[n].value||'').trim();};
      var subject='Grooming appointment request: '+v('dog')+' ('+v('service')+')';
      var body=['Name: '+v('name'),'Email: '+v('email'),'Phone: '+v('phone'),'Dog: '+v('dog'),'Breed & size: '+v('breed'),'Service: '+v('service'),'Preferred day/time: '+v('preferred'),'','Notes:',v('notes')].join('\n');
      window.location.href='mailto:Jessica.s.finch@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      status.textContent='Opening your email app. If nothing happens, email Jessica.s.finch@gmail.com or call 801-577-6782.';
    });
  }
})();
