import React, { useEffect, useState } from 'react'
import api from '../api'

export default function MyBookings(){
  const [bookings, setBookings] = useState([])

  async function load(){
    const { data } = await api.get('/api/bookings')
    setBookings(data)
  }
  useEffect(()=>{ load() }, [])

  async function cancel(id){
    if(!confirm('Cancel this booking?')) return;
    await api.delete('/api/bookings/' + id)
    load()
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-3">
      <h1 className="text-2xl font-semibold">My bookings</h1>
      {bookings.length === 0 && <div className="glass rounded-2xl p-6">No bookings yet.</div>}
      {bookings.map(b => (
        <div key={b._id} className="glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="font-semibold">Court {b.courtNumber} • {b.date}</div>
            <div className="text-gray-600 text-sm">Start: {b.hourStart}:00 • Duration: {b.durationHours}h</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">₹{b.totalPrice}</div>
            <button className="mt-2 px-3 py-1 rounded-xl border" onClick={()=>cancel(b._id)}>Cancel</button>
          </div>
        </div>
      ))}
    </div>
  )
}
