
const target = new Date("2026-03-27T18:00:00").getTime();
const el = document.getElementById("countdown");

setInterval(()=>{
  const now = new Date().getTime();
  const d = target-now;
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

function activateLegend(){
  document.getElementById("ctaButton").style.display="none";
  document.getElementById("countdown").classList.add("visible");
  document.getElementById("eventInfo").classList.add("visible");
  document.getElementById("mainNav").classList.add("visible");

  const audio=document.getElementById("bgmusic");
  if(audio){
    audio.volume=0;
    audio.play().catch(()=>{});
    let fade=setInterval(()=>{
      if(audio.volume<0.4){audio.volume+=0.02;}
      else{clearInterval(fade);}
    },200);
  }
}
