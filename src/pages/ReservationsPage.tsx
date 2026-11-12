import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'
import { createReservation } from '../lib/api'

export default function ReservationsPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', guests:2, reservation_date:'', reservation_time:'', message:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'error'>('idle')
  const [err, setErr] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(f=>({...f, [e.target.name]: e.target.value}))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading'); setErr('')
    try {
      await createReservation({ ...form, guests: Number(form.guests) || 1 })
      setStatus('ok')
      setForm({ name:'', email:'', phone:'', guests:2, reservation_date:'', reservation_time:'', message:'' })
    } catch (e:any) {
      setStatus('error'); setErr(e?.message || 'No se pudo enviar la reserva')
    }
  }

  return (
    <div>
      <section className="relative h-[500px] flex items-center justify-center text-center" style={{backgroundImage:'url(/images/bg_3.jpg)', backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="overlay-dark" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl uppercase mb-2">Reservas</h1>
          <p className="breadcrumbs text-sm uppercase tracking-wider"><span className="border-b border-white/20 mr-2"><Link to="/" className="text-white">Home</Link></span> <span>Reservas</span></p>
        </div>
      </section>

      <section className="section">
        <div className="container mt-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 text-white/90">
              <h2 className="text-2xl mb-6">Información</h2>
              <div className="space-y-4 text-gray-300">
                <p className="flex gap-3"><MapPin className="text-primary shrink-0" size={18}/> <span><span className="text-white">Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</span></p>
                <p className="flex gap-3"><Phone className="text-primary shrink-0" size={18}/> <span><span className="text-white">Phone:</span> + 1235 2355 98</span></p>
                <p className="flex gap-3"><Mail className="text-primary shrink-0" size={18}/> <span><span className="text-white">Email:</span> info@yoursite.com</span></p>
                <p className="flex gap-3"><Globe className="text-primary shrink-0" size={18}/> <span><span className="text-white">Website:</span> yoursite.com</span></p>
              </div>
              <p className="text-gray-400 text-sm mt-8">Las reservas se guardan en la base de datos (Supabase) y pueden gestionarse desde el <Link to="/admin" className="text-primary">panel de administración</Link>.</p>
            </div>
            <div className="md:col-span-1" />
            <div className="md:col-span-7">
              <h2 className="text-2xl text-white mb-6">Formulario de Reserva</h2>
              {status==='ok' && <div className="mb-4 p-3 border border-primary/50 text-primary">¡Reserva enviada correctamente! Te contactaremos para confirmar.</div>}
              {status==='error' && <div className="mb-4 p-3 border border-red-500/50 text-red-300">{err}</div>}
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="name" value={form.name} onChange={onChange} className="form-control-dark" placeholder="Nombre" />
                  <input required type="email" name="email" value={form.email} onChange={onChange} className="form-control-dark" placeholder="Email" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="phone" value={form.phone} onChange={onChange} className="form-control-dark" placeholder="Teléfono" />
                  <input type="number" min={1} name="guests" value={form.guests} onChange={onChange} className="form-control-dark" placeholder="Personas" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="date" name="reservation_date" value={form.reservation_date} onChange={onChange} className="form-control-dark" />
                  <input required type="time" name="reservation_time" value={form.reservation_time} onChange={onChange} className="form-control-dark" />
                </div>
                <textarea name="message" value={form.message} onChange={onChange} rows={5} className="form-control-dark" placeholder="Mensaje / notas" />
                <button disabled={status==='loading'} type="submit" className="btn btn-primary px-8 py-4 disabled:opacity-60">{status==='loading'?'Enviando...':'Enviar reserva'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}