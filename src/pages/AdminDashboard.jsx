import React, { useEffect, useState } from 'react'
import api from '../api'

export default function AdminDashboard(){
  const [rates, setRates] = useState([])
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({})

  async function load(){
    const r = await api.get('/api/public/rates')
    setRates(r.data)
    const b = await api.get('/api/admin/bookings')
    setBookings(b.data)
    const s = await api.get('/api/admin/stats')
    setStats(s.data)
  }
  useEffect(()=>{ load() }, [])

  async function updateRate(courtNumber, ratePerHour){
    await api.post('/api/admin/rates', { courtNumber, ratePerHour: Number(ratePerHour) })
    load()
  }

  return (
    <div className="space-y-6 mt-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="glass rounded-2xl p-5">
          <div className="text-gray-600 text-sm">Users</div>
          <div className="text-3xl font-bold">{stats.users ?? '-'}</div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="text-gray-600 text-sm">Bookings</div>
          <div className="text-3xl font-bold">{stats.totalBookings ?? '-'}</div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="text-gray-600 text-sm">Revenue</div>
          <div className="text-3xl font-bold">₹{stats.totalRevenue ?? '-'}</div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-3">Hourly rates</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[1,2,3,4].map(n => {
            const r = rates.find(x=>x.courtNumber===n)?.ratePerHour ?? ''
            const [val, setVal] = React.useState(r)
            React.useEffect(()=>setVal(r), [r])
            return (
              <div key={n} className="flex items-center justify-between gap-3 border rounded-xl p-3">
                <div> Court {n} </div>
                <div className="flex items-center gap-2">
                  <input className="w-24 border rounded-lg p-2" value={val} onChange={e=>setVal(e.target.value)} />
                  <button className="px-3 py-1 rounded-xl bg-indigo-600 text-white" onClick={()=>updateRate(n, val)}>Save</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-3">All bookings</h2>
        <div className="space-y-2">
          {bookings.map(b => (
            <div key={b._id} className="border rounded-xl p-3 flex items-center justify-between">
              <div> Court {b.courtNumber} • {b.date} • {b.hourStart}:00 for {b.durationHours}h </div>
              <div>₹{b.totalPrice}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
