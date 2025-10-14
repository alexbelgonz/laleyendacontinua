import React, { useMemo, useState, useEffect } from 'react'

export default function App() {
  const EVENT = {
    title: 'Tricumple 2026 — La Leyenda continúa',
    hosts: ['Alex', 'Raul', 'Oriol'],
    startDate: new Date('2026-03-28T00:00:00'),
    endDate: new Date('2026-03-30T00:00:00'), // exclusive end
    displayDates: '28 – 29 de marzo de 2026',
    location: 'Ubicación por confirmar',
    description:
      'Tricumple 2026: tres cumpleañeros, una sola leyenda. Guarda la fecha y únete a la fiesta.',
  }

  const pad = (n)=> String(n).padStart(2,'0')
  const fmt = (d)=> `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`

  const googleUrl = useMemo(()=>{
    const dates = `${fmt(EVENT.startDate)}/${fmt(EVENT.endDate)}`
    const p = new URLSearchParams({ action:'TEMPLATE', text:EVENT.title, dates, details:EVENT.description, location:EVENT.location })
    return `https://calendar.google.com/calendar/render?${p.toString()}`
  },[])

  const ics = useMemo(()=>[
    'BEGIN:VCALENDAR','VERSION:2.0','CALSCALE:GREGORIAN','PRODID:-//Tricumple//2026//ES',
    'BEGIN:VEVENT',
    `SUMMARY:${EVENT.title}`,
    `DESCRIPTION:${EVENT.description.replace(/\n/g,'\\n')}`,
    `DTSTART;VALUE=DATE:${fmt(EVENT.startDate)}`,
    `DTEND;VALUE=DATE:${fmt(EVENT.endDate)}`,
    `LOCATION:${EVENT.location}`,
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n'),[])

  function downloadICS(){
    const blob = new Blob([ics],{type:'text/calendar;charset=utf-8'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Tricumple-2026.ics'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const [t,setT] = useState({d:0,h:0,m:0,s:0})
  useEffect(()=>{
    const tick=()=>{
      const diff = Math.max(0, EVENT.startDate.getTime()-Date.now())
      const d = Math.floor(diff/86400000)
      const h = Math.floor(diff/3600000)%24
      const m = Math.floor(diff/60000)%60
      const s = Math.floor(diff/1000)%60
      setT({d,h,m,s})
    }
    tick(); const id=setInterval(tick,1000); return ()=>clearInterval(id)
  },[])

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'2rem',background:'radial-gradient(circle at 30% -10%, rgba(255,215,0,0.15), transparent 70%)'}}>
      <h1 style={{fontSize:'3rem',fontWeight:800,marginBottom:'.5rem'}}>Tricumple 2026</h1>
      <h2 style={{fontSize:'1.5rem',color:'gold',marginBottom:'1rem'}}>La Leyenda continúa</h2>
      <p>{EVENT.hosts.join(' · ')} — {EVENT.displayDates}</p>
      <p style={{color:'#bbb'}}>{EVENT.location}</p>

      <div style={{marginTop:'1.5rem',display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center'}}>
        <a href={googleUrl} target="_blank" rel="noreferrer" style={{background:'gold',color:'#000',padding:'.75rem 1.5rem',borderRadius:'12px',textDecoration:'none',fontWeight:'bold'}}>Añadir a Google Calendar</a>
        <button onClick={downloadICS} style={{background:'rgba(255,255,255,0.1)',color:'#fff',padding:'.75rem 1.5rem',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.2)',fontWeight:'bold'}}>Apple / Outlook (.ics)</button>
      </div>

      <div style={{marginTop:'2rem'}}>
        <p style={{color:'#aaa',letterSpacing:'1px',textTransform:'uppercase',fontSize:'.75rem'}}>Cuenta atrás</p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',marginTop:'.5rem'}}>
          {Object.entries({Días:t.d,Horas:t.h,Min:t.m,Seg:t.s}).map(([k,v])=>(
            <div key={k} style={{background:'rgba(255,255,255,0.1)',padding:'.75rem 1rem',borderRadius:'8px'}}>
              <div style={{fontSize:'1.5rem',fontWeight:'bold',color:'#fff'}}>{String(v).padStart(2,'0')}</div>
              <div style={{fontSize:'.75rem',color:'#bbb'}}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{marginTop:'3rem',fontSize:'.75rem',color:'#666'}}>© 2026 Tricumple — Hecho con ❤️</footer>
    </div>
  )
}
