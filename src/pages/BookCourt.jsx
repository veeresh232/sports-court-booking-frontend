import React, { useEffect, useState } from 'react'
import api from '../api'

export default function BookCourt(){
  const [courts, setCourts] = useState([])
  const [rates, setRates] = useState([])
  const [form, setForm] = useState({ courtNumber: 1, date: '', hourStart: 8, durationHours: 1 })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    api.get('/api/public/courts').then(r=>setCourts(r.data))
    api.get('/api/public/rates').then(r=>setRates(r.data))
  },[])

  function rateFor(n){
    return rates.find(r=>r.courtNumber===Number(n))?.ratePerHour ?? 0
  }
  const totalPrice = rateFor(form.courtNumber) * Number(form.durationHours || 0)

  async function onSubmit(e){
    e.preventDefault()
    setError(null); setMessage(null)
    try{
      const { data } = await api.post('/api/bookings', form)
      setMessage(`Booked! Total ₹${data.totalPrice}`)
    }catch(err){
      setError(err.response?.data?.error || 'Booking failed')
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-6 glass rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Book a court</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600">Court</label>
            <select className="w-full border rounded-xl p-2" value={form.courtNumber} onChange={e=>setForm({...form, courtNumber: Number(e.target.value)})}>
              {courts.map(c => <option key={c._id} value={c.number}>Court {c.number}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Date</label>
            <input type="date" className="w-full border rounded-xl p-2" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600">Start hour</label>
            <input type="number" min="6" max="22" className="w-full border rounded-xl p-2" value={form.hourStart} onChange={e=>setForm({...form, hourStart: Number(e.target.value)})} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Duration (hours)</label>
            <input type="number" min="1" max="4" className="w-full border rounded-xl p-2" value={form.durationHours} onChange={e=>setForm({...form, durationHours: Number(e.target.value)})} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-gray-700">Total price</div>
          <div className="text-xl font-semibold">₹{totalPrice}</div>
        </div>
        {message && <div className="text-green-700">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
        <button className="w-full py-3 rounded-xl bg-indigo-600 text-white">Confirm booking</button>
      </form>
    </div>
  )
}
