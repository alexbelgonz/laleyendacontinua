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

  function formatDateYYYYMMDD(d) {
    const pad = (n) => n.toString().padStart(2, '0')
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  }

  const googleUrl = useMemo(() => {
    const dates = `${formatDateYYYYMMDD(EVENT.startDate)}/${formatDateYYYYMMDD(EVENT.endDate)}`
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: EVENT.title,
      dates,
      details: EVENT.description,
      location: EVENT.location,
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }, [])

  const icsContent = useMemo(() => {
    const dtStart = formatDateYYYYMMDD(EVENT.startDate)
    const dtEnd = formatDateYYYYMMDD(EVENT.endDate)
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Tricumple//2026//ES',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${EVENT.title}`,
      `DESCRIPTION:${EVENT.description.replace(/\n/g, '\\n')}`,
      `DTSTART;VALUE=DATE:${dtStart}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      `LOCATION:${EVENT.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
  }, [])

  function downloadICS() {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, EVENT.startDate.getTime() - new Date().getTime())
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const m = Math.floor((diff / (1000 * 60)) % 60)
      const s = Math.floor((diff / 1000) % 60)
      setCountdown({ d, h, m, s })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', background: 'radial-gradient(circle at 30% -10%, rgba(255,215,0,0.15), transparent 70%)' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Tricumple 2026</h1>
      <h2 style={{ fontSize: '1.5rem', color: 'gold', marginBottom: '1rem' }}>La Leyenda continúa</h2>
      <p>{EVENT.hosts.join(' · ')} — {EVENT.displayDates}</p>
      <p style={{ color: '#bbb' }}>{EVENT.location}</p>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href={googleUrl} target="_blank" rel="noreferrer" style={{ background: 'gold', color: 'black', padding: '0.75rem 1.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Añadir a Google Calendar</a>
        <button onClick={downloadICS} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 'bold' }}>Apple / Outlook (.ics)</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <p style={{ color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>Cuenta atrás</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
          {Object.entries({ Días: countdown.d, Horas: countdown.h, Min: countdown.m, Seg: countdown.s }).map(([label, val]) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{String(val).padStart(2, '0')}</div>
              <div style={{ fontSize: '0.75rem', color: '#bbb' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ marginTop: '3rem', fontSize: '0.75rem', color: '#666' }}>© 2026 Tricumple — Hecho con ❤️</footer>
    </div>
  )
}
