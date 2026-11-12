import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getReservations, getMenuItems, upsertMenuItem, deleteMenuItem, upsertSiteConfig, getSiteConfig } from '../../lib/api'
import type { MenuItem, Reservation } from '../../lib/supabase'
import { hasSupabase } from '../../lib/supabase'

type Tab = 'reservations' | 'menu' | 'config'

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_ok') === '1')
  const [pass, setPass] = useState('')
  const [tab, setTab] = useState<Tab>('reservations')
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [configText, setConfigText] = useState('{\n  "hero_title": "Italian Cuizine",\n  "phone": "000 (123) 456 7890"\n}')
  const [msg, setMsg] = useState('')
  const expected = (import.meta.env.VITE_ADMIN_PASSWORD as string) || 'admin123'

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (pass === expected) { sessionStorage.setItem('admin_ok','1'); setAuthed(true) }
    else setMsg('Contraseña incorrecta')
  }

  const load = async () => {
    setMsg('')
    try {
      const [r, m, c] = await Promise.all([getReservations(), getMenuItems(), getSiteConfig()])
      setReservations(r); setMenu(m)
      if (Object.keys(c).length) setConfigText(JSON.stringify(c, null, 2))
    } catch (e:any) { setMsg(e?.message || 'Error cargando datos') }
  }
  useEffect(()=>{ if(authed) load() }, [authed])

  const [draft, setDraft] = useState<Partial<MenuItem>>({ name:'', description:'', price:0, image_url:'/images/pizza-1.jpg', category:'pizza', featured:false })
  const saveItem = async () => {
    try { await upsertMenuItem({ ...draft, price: Number(draft.price)||0 }); setMsg('Item guardado'); setDraft({ name:'', description:'', price:0, image_url:'/images/pizza-1.jpg', category:'pizza', featured:false }); load() }
    catch(e:any){ setMsg(e?.message||'Error') }
  }
  const remove = async (id:string) => { try { await deleteMenuItem(id); load() } catch(e:any){ setMsg(e?.message||'Error') } }
  const saveConfig = async () => {
    try {
      const obj = JSON.parse(configText)
      for (const [k,v] of Object.entries(obj)) await upsertSiteConfig(k, v)
      setMsg('Configuración guardada')
    } catch(e:any){ setMsg(e?.message||'JSON inválido o error') }
  }

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center bg-[#121618] p-6">
      <form onSubmit={login} className="w-full max-w-sm bg-black/30 p-8 border border-white/10">
        <h1 className="text-2xl text-white mb-2">Panel Admin</h1>
        <p className="text-gray-400 text-sm mb-6">Acceso para ver reservas, menú y configuración. <Link to="/" className="text-primary">Volver al sitio</Link></p>
        {msg && <p className="text-red-300 mb-3 text-sm">{msg}</p>}
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="form-control-dark mb-4" placeholder="Contraseña (VITE_ADMIN_PASSWORD)" />
        <button className="btn btn-primary w-full py-3">Entrar</button>
        <p className="text-xs text-gray-500 mt-4">Por defecto: <code>admin123</code> (cámbiala con <code>VITE_ADMIN_PASSWORD</code>). Requiere Supabase configurado para gestionar datos.</p>
      </form>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#121618] text-white">
      <div className="border-b border-white/10 bg-black/30">
        <div className="container py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl">Panel de administración</h1>
            <p className="text-xs text-gray-400">Reservas, menú y configuración {hasSupabase ? '· Supabase conectado' : '· Supabase NO configurado (solo lectura/fallback)'}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-primary">Ver sitio</Link>
            <button onClick={()=>{sessionStorage.removeItem('admin_ok'); setAuthed(false)}} className="text-gray-300 hover:text-white">Salir</button>
          </div>
        </div>
      </div>
      <div className="container py-8">
        {msg && <div className="mb-4 p-3 border border-primary/40 text-primary text-sm">{msg}</div>}
        <div className="flex gap-2 mb-6">
          {([['reservations','Reservas'],['menu','Menú'],['config','Configuración']] as [Tab,string][]).map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} className={`nav-link-pill ${tab===k?'active':''}`}>{l}</button>
          ))}
          <button onClick={load} className="ml-auto text-sm text-gray-300 hover:text-white">Refrescar</button>
        </div>

        {tab==='reservations' && (
          <div className="overflow-x-auto bg-black/20 border border-white/10">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-400 border-b border-white/10"><tr><th className="p-3">Fecha</th><th className="p-3">Hora</th><th className="p-3">Nombre</th><th className="p-3">Contacto</th><th className="p-3">Personas</th><th className="p-3">Mensaje</th><th className="p-3">Estado</th></tr></thead>
              <tbody>
                {reservations.length===0 && <tr><td colSpan={7} className="p-6 text-center text-gray-500">No hay reservas (o Supabase no configurado).</td></tr>}
                {reservations.map(r=> (
                  <tr key={r.id} className="border-b border-white/5 align-top"><td className="p-3">{r.reservation_date}</td><td className="p-3">{r.reservation_time}</td><td className="p-3">{r.name}</td><td className="p-3 text-gray-300">{r.email}<br/>{r.phone}</td><td className="p-3">{r.guests}</td><td className="p-3 text-gray-300 max-w-xs">{r.message}</td><td className="p-3"><span className="text-primary">{r.status||'pending'}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab==='menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-black/20 border border-white/10 p-4">
              <h3 className="text-lg mb-4">Agregar / editar item</h3>
              <div className="space-y-3">
                <input className="form-control-dark" placeholder="ID (vacío para nuevo)" value={draft.id||''} onChange={e=>setDraft(d=>({...d,id:e.target.value||undefined}))} />
                <input className="form-control-dark" placeholder="Nombre" value={draft.name||''} onChange={e=>setDraft(d=>({...d,name:e.target.value}))} />
                <input className="form-control-dark" placeholder="Descripción" value={draft.description||''} onChange={e=>setDraft(d=>({...d,description:e.target.value}))} />
                <input className="form-control-dark" placeholder="Precio" type="number" step="0.01" value={draft.price as any} onChange={e=>setDraft(d=>({...d,price:parseFloat(e.target.value)}))} />
                <input className="form-control-dark" placeholder="Imagen URL (/images/pizza-1.jpg)" value={draft.image_url||''} onChange={e=>setDraft(d=>({...d,image_url:e.target.value}))} />
                <select className="form-control-dark bg-transparent" value={draft.category} onChange={e=>setDraft(d=>({...d,category:e.target.value as any}))}>
                  <option value="pizza">pizza</option><option value="drinks">drinks</option><option value="burgers">burgers</option><option value="pasta">pasta</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-300"><input type="checkbox" checked={!!draft.featured} onChange={e=>setDraft(d=>({...d,featured:e.target.checked}))}/> Destacado</label>
                <button onClick={saveItem} disabled={!hasSupabase} className="btn btn-primary w-full py-3 disabled:opacity-50">Guardar en Supabase</button>
              </div>
            </div>
            <div className="lg:col-span-2 overflow-x-auto bg-black/20 border border-white/10">
              <table className="w-full text-sm"><thead className="text-left text-gray-400 border-b border-white/10"><tr><th className="p-3">Nombre</th><th className="p-3">Cat.</th><th className="p-3">Precio</th><th className="p-3">Dest.</th><th className="p-3"></th></tr></thead>
              <tbody>{menu.map(i=>(
                <tr key={i.id} className="border-b border-white/5"><td className="p-3">{i.name}</td><td className="p-3 text-gray-400">{i.category}</td><td className="p-3 text-primary">${Number(i.price).toFixed(2)}</td><td className="p-3">{i.featured?'sí':'-'}</td><td className="p-3 text-right space-x-2"><button onClick={()=>setDraft(i)} className="text-gray-300 hover:text-white">Editar</button><button onClick={()=>i.id&&remove(i.id)} disabled={!hasSupabase} className="text-red-300 hover:text-red-200 disabled:opacity-50">Borrar</button></td></tr>
              ))}</tbody></table>
            </div>
          </div>
        )}

        {tab==='config' && (
          <div className="bg-black/20 border border-white/10 p-4 max-w-3xl">
            <h3 className="text-lg mb-2">Configuración del sitio (key/value JSON)</h3>
            <p className="text-gray-400 text-sm mb-4">Se almacena en tabla <code>site_config</code> de Supabase. Edita como JSON objeto {`{ "clave": valor }`}.</p>
            <textarea value={configText} onChange={e=>setConfigText(e.target.value)} rows={16} className="form-control-dark w-full font-mono text-xs border border-white/10 p-3" />
            <button onClick={saveConfig} disabled={!hasSupabase} className="btn btn-primary mt-4 px-6 py-3 disabled:opacity-50">Guardar configuración</button>
          </div>
        )}
      </div>
    </div>
  )
}