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
  var gm=document.getElementById('gallery-more'),gal=document.getElementById('gallery');
  if(gm&&gal){
    gal.classList.add('collapsed'); gm.hidden=false;
    gm.addEventListener('click',function(){
      var open=gal.classList.toggle('collapsed')===false;
      gm.setAttribute('aria-expanded',open); gm.textContent=open?'Show fewer photos':'Show more photos';
      gal.querySelectorAll('.g-more').forEach(function(el){el.classList.add('in');});
      if(!open) gal.scrollIntoView({behavior:'smooth'});
    });
  }
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  var form=document.getElementById('booking-form'),status=document.getElementById('form-status');
  var sel=document.getElementById('f-service');
  document.querySelectorAll('[data-service]').forEach(function(b){
    b.addEventListener('click',function(){
      if(sel){sel.value=b.getAttribute('data-service');sel.classList.remove('invalid');}
      setTimeout(function(){var n=document.getElementById('f-name');if(n)n.focus({preventScroll:true});},600);
    });
  });
  if(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      var ok=true,first=null;
      form.querySelectorAll('[required]').forEach(function(f){
        var bad=!f.value.trim()||(f.type==='tel'&&f.value.replace(/\D/g,'').length<10);
        f.classList.toggle('invalid',bad); f.setAttribute('aria-invalid',bad);
        if(bad){ok=false;first=first||f;}
      });
      if(!ok){status.textContent='Please fill in the highlighted fields.';first.focus();return;}
      var em=form.elements.email;
      if(em.value.trim()&&!/^\S+@\S+\.\S+$/.test(em.value)){em.classList.add('invalid');status.textContent='Please check your email address, or leave it blank.';em.focus();return;}
      em.classList.remove('invalid');
      var v=function(n){var el=form.elements[n];return el?((el.value||'')+'').trim():'';};
      var subject='Booking request: '+v('dog')+' ('+v('service')+')';
      var body=['Name: '+v('name'),'Email: '+v('email'),'Phone: '+v('phone'),'Pet: '+v('dog'),'Breed: '+v('breed'),'Size: '+v('size'),'Service: '+v('service'),'Preferred day/time: '+v('preferred'),'','Notes:',v('notes')].join('\n');
      window.location.href='mailto:pawsitivepetgroomer@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      status.textContent='Opening your email app. If nothing happens, email pawsitivepetgroomer@gmail.com or call or text (801) 577-6782.';
    });
  }
})();
