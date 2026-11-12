import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMenuItems } from '../lib/api'
import type { MenuItem } from '../lib/supabase'
import { fallbackMenu } from '../data/fallback'

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>(fallbackMenu)
  const [tab, setTab] = useState<'pizza'|'drinks'|'burgers'|'pasta'>('pizza')
  useEffect(()=>{ getMenuItems().then(setMenu).catch(()=>{}) },[])
  const pizzas = menu.filter(m=>m.category==='pizza')
  const tabItems = menu.filter(m=>m.category===tab).slice(0,3)
  return (
    <div>
      <section className="relative h-[500px] flex items-center justify-center text-center" style={{backgroundImage:'url(/images/bg_3.jpg)', backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="overlay-dark" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl uppercase mb-2">Our Menu</h1>
          <p className="breadcrumbs text-sm uppercase tracking-wider"><span className="border-b border-white/20 mr-2"><Link to="/" className="text-white">Home</Link></span> <span>Menu</span></p>
        </div>
      </section>

      <section className="section pb-0">
        <div className="container text-center mb-12">
          <h2 className="text-[30px] uppercase mb-4">Our Menu</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {pizzas.slice(0,6).map((item,i)=>(
            <div key={item.id} className="flex flex-col sm:flex-row">
              <a className={`block sm:w-1/2 h-64 sm:h-auto bg-cover bg-center ${(i%6)>=3?'sm:order-last':''}`} style={{backgroundImage:`url(${item.image_url||'/images/pizza-1.jpg'})`}} />
              <div className="sm:w-1/2 bg-black/20 p-6 flex flex-col justify-center">
                <h3 className="text-xl mb-2">{item.name}</h3>
                <p className="text-gray-500 mb-3 text-sm">{item.description}</p>
                <p className="flex items-center gap-2"><span className="text-primary">${item.price.toFixed(2)}</span> <a href="#" className="btn btn-outline-white px-3 py-1 text-sm">Order</a></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-[30px] uppercase mb-2">Our Menu Pricing</h2>
            <p className="flip"><span className="deg1"></span><span className="deg2"></span><span className="deg3"></span></p>
            <p className="text-gray-500 max-w-2xl mx-auto mt-6">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {pizzas.slice(0,8).map((item)=>(
              <div key={item.id} className="flex mb-8">
                <div className="w-[60px] h-[60px] rounded-full bg-cover bg-center shrink-0" style={{backgroundImage:`url(${item.image_url||'/images/pizza-1.jpg'})`}} />
                <div className="pl-4 w-full">
                  <div className="flex items-end"><h3 className="text-lg pr-4">{item.name}</h3><span className="flex-1 border-b border-dashed border-[#bf7e06] mb-2 mx-1"/><span className="text-primary pl-2">${item.price.toFixed(2)}</span></div>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 min-h-[300px] bg-cover bg-center" style={{backgroundImage:'url(/images/about.jpg)'}} />
        <div className="lg:w-2/3 p-6 md:p-12">
          <div className="flex flex-wrap gap-2 mb-8">
            {(['pizza','drinks','burgers','pasta'] as const).map(t => (
              <button key={t} onClick={()=>setTab(t)} className={`nav-link-pill capitalize ${tab===t?'active':''}`}>{t}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tabItems.map(item => (
              <div key={item.id} className="text-center">
                <a href="#" className="block w-[200px] h-[200px] rounded-full mx-auto mb-4 bg-cover bg-center" style={{backgroundImage:`url(${item.image_url||'/images/pizza-1.jpg'})`}} />
                <h3 className="text-[22px] mb-2"><a href="#" className="text-white hover:text-primary">{item.name}</a></h3>
                <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                <p className="text-primary mb-3">${item.price.toFixed(2)}</p>
                <p><a href="#" className="btn btn-outline-white px-4 py-2">Add to cart</a></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}