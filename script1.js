// Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el=>io.observe(el));

  // Header background shift on scroll (transparent over the slideshow, solid once scrolled)
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', ()=>{
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  });

  // Slideshow: auto-advance through the 4 photos, with manual dot navigation
  const slides = document.querySelectorAll('.slideshow .slide');
  const dots = document.querySelectorAll('.slideshow-dots .dot');
  let currentSlide = 0;
  let slideTimer;

  function goToSlide(index){
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  function nextSlide(){
    goToSlide((currentSlide + 1) % slides.length);
  }
  function startSlideTimer(){
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 5000);
  }
  if(slides.length){
    startSlideTimer();
    dots.forEach((dot, i)=>{
      dot.addEventListener('click', ()=>{
        goToSlide(i);
        startSlideTimer();
      });
    });
  }

  // Blueprint spec panel interactivity
  const specItems = document.querySelectorAll('.spec-item');
  const svgTargets = {
    'stringer-1': document.getElementById('stringer-1'),
    'stringer-2': document.getElementById('stringer-2'),
    'stringer-3': document.getElementById('stringer-3'),
    'ht-stamp': document.getElementById('ht-stamp'),
    'deck-boards': document.getElementById('deck-boards'),
  };
  function clearHighlights(){
    Object.values(svgTargets).forEach(el=>{
      if(el) el.style.filter = 'none';
    });
  }
  specItems.forEach(item=>{
    item.addEventListener('click', ()=>{
      specItems.forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      clearHighlights();
      const ids = item.dataset.target.split(' ');
      ids.forEach(id=>{
        const el = svgTargets[id];
        if(el) el.style.filter = 'drop-shadow(0 0 6px #B08968)';
      });
    });
  });

  // Product tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.product-panel');
  tabButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      tabButtons.forEach(b=>b.classList.remove('active'));
      panels.forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.product-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });
