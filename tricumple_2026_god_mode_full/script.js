
const target = new Date("2026-03-28T12:00:00").getTime();
const el = document.getElementById("countdown");

if(el){
  setInterval(()=>{
    const now = new Date().getTime();
    const d = target-now;
    if(d<0){ el.innerHTML="LA LEYENDA HA COMENZADO"; return;}
    const days = Math.floor(d/(1000*60*60*24));
    const h = Math.floor((d%(1000*60*60*24))/(1000*60*60));
    const m = Math.floor((d%(1000*60*60))/(1000*60));
    const s = Math.floor((d%(1000*60))/1000);
    el.innerHTML = `
      <div>${days}<span>DÍAS</span></div>
      <div>${h}<span>HORAS</span></div>
      <div>${m}<span>MIN</span></div>
      <div>${s}<span>SEG</span></div>
    `;
  },1000);
}

function activateLegend(){
  const btn=document.getElementById("ctaButton");
  const countdown=document.getElementById("countdown");
  const nav=document.getElementById("mainNav");
  const title=document.getElementById("heroTitle");

  btn.classList.add("fade-button");
  title.classList.add("title-activated");
  countdown.classList.remove("countdown-hidden");
  countdown.classList.add("countdown-visible");
  nav.classList.remove("nav-hidden");
  nav.classList.add("nav-visible");
}

/* Gallery logic */
let currentImages=[];
let currentIndex=0;

function buildGallery(containerId, folderPath, images){
  const container=document.getElementById(containerId);
  if(!container) return;
  currentImages=images.map(name=>folderPath+name);
  images.forEach((name,index)=>{
    const img=document.createElement("img");
    img.src=folderPath+name;
    img.onclick=()=>openModal(index);
    container.appendChild(img);
  });
}

function openModal(index){
  currentIndex=index;
  document.getElementById("modal").style.display="flex";
  document.getElementById("modal-img").src=currentImages[currentIndex];
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}
