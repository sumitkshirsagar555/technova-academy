document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("#menuToggle");
  const navMenu = document.querySelector("#navMenu");
  if(menuToggle && navMenu){
    menuToggle.addEventListener("click",()=>{
      const open = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click",(e)=>{
      if(!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded","false");
      }
    });
    navMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{navMenu.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));
  }

  const header=document.querySelector(".site-header");
  const backTop=document.querySelector("#backTop");
  const onScroll=()=>{
    header?.classList.toggle("scrolled",window.scrollY>12);
    backTop?.classList.toggle("show",window.scrollY>500);
  };
  window.addEventListener("scroll",onScroll,{passive:true}); onScroll();
  backTop?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}})
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

  const counters=document.querySelectorAll("[data-counter]");
  const counterObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target, target=parseFloat(el.dataset.counter), suffix=el.dataset.suffix||"", decimal=Number(el.dataset.decimal||0);
      const start=performance.now(), duration=1400;
      const tick=now=>{
        const progress=Math.min((now-start)/duration,1), eased=1-Math.pow(1-progress,3), value=target*eased;
        el.textContent=value.toFixed(decimal)+suffix;
        if(progress<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); counterObserver.unobserve(el);
    })
  },{threshold:.5});
  counters.forEach(el=>counterObserver.observe(el));

  document.querySelectorAll(".faq-item>button").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const item=btn.parentElement, open=item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(other=>{
        other.classList.remove("open"); other.querySelector("button").setAttribute("aria-expanded","false");
        const ans=other.querySelector(".faq-answer"); ans.style.maxHeight=null;
      });
      if(!open){item.classList.add("open");btn.setAttribute("aria-expanded","true");const ans=item.querySelector(".faq-answer");ans.style.maxHeight=ans.scrollHeight+"px";}
    });
  });

  const testimonials=[
    {name:"Aarav Kulkarni",course:"Java Full Stack",rating:5,text:"The project-first approach helped me understand how Java concepts connect to an actual application. The interview practice was useful too."},
    {name:"Meera Joshi",course:"Software Testing",rating:5,text:"I liked the structured roadmap and practical testing exercises. It made the transition from theory to interview questions much easier."},
    {name:"Rohan Patil",course:"MERN Full Stack",rating:5,text:"The learning journey kept me consistent. Building projects gave me something concrete to discuss during interviews."}
  ];
  const testEl=document.querySelector("#testimonial"), dotsEl=document.querySelector("#testDots"); let current=0, timer;
  function renderTestimonial(){
    if(!testEl)return;
    const t=testimonials[current];
    testEl.innerHTML=`<div class="quote">“</div><div class="stars">${"★".repeat(t.rating)}</div><p>${t.text}</p><strong>${t.name}</strong><small>${t.course}</small>`;
    if(dotsEl)dotsEl.innerHTML=testimonials.map((_,i)=>`<button class="${i===current?"active":""}" aria-label="Show testimonial ${i+1}" data-index="${i}"></button>`).join("");
    dotsEl?.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{current=Number(b.dataset.index);renderTestimonial();restart()}));
  }
  function next(){current=(current+1)%testimonials.length;renderTestimonial()} function prev(){current=(current-1+testimonials.length)%testimonials.length;renderTestimonial()}
  document.querySelector("#nextTest")?.addEventListener("click",()=>{next();restart()});
  document.querySelector("#prevTest")?.addEventListener("click",()=>{prev();restart()});
  function restart(){clearInterval(timer);timer=setInterval(next,5000)}
  if(testEl){renderTestimonial();restart();const wrap=document.querySelector(".testimonial-wrap");wrap?.addEventListener("mouseenter",()=>clearInterval(timer));wrap?.addEventListener("mouseleave",restart)}

  function validateForm(form, fields){
    let valid=true;
    fields.forEach(name=>{
      const field=form.elements[name], error=field?.parentElement?.querySelector(".field-error");
      if(!field)return;
      let msg="";
      if(!field.value.trim())msg="This field is required.";
      else if(name==="mobile" && !/^[6-9]\d{9}$/.test(field.value.trim()))msg="Enter a valid 10-digit mobile number.";
      else if(name==="email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()))msg="Enter a valid email address.";
      if(error)error.textContent=msg;
      field.classList.toggle("input-error",!!msg);
      if(msg)valid=false;
      field.addEventListener("input",()=>{field.classList.remove("input-error");if(error)error.textContent=""},{once:true});
    });
    return valid;
  }
  const demoForm=document.querySelector("#demoForm");
  demoForm?.addEventListener("submit",e=>{
    e.preventDefault();
    if(validateForm(demoForm,["name","mobile","email","course","mode"])){
      demoForm.querySelector("#demoSuccess")?.classList.add("show");
      demoForm.reset(); showToast("Demo request validated successfully.");
    }
  });
  window.validateTechNovaForm=validateForm;
  function showToast(msg){const toast=document.querySelector("#toast");if(!toast)return;toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),3200)}
  window.showTechNovaToast=showToast;
});