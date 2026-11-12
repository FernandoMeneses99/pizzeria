import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Search, Pizza, Medal, Laugh, ChefHat } from 'lucide-react'

function SocialIcon({ type }: { type: 'twitter'|'facebook'|'instagram' }) {
  const common = { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (type === 'twitter') return <svg {...common} viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  if (type === 'facebook') return <svg {...common} viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  return <svg {...common} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
}
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getMenuItems } from '../lib/api'
import type { MenuItem } from '../lib/supabase'
import { fallbackMenu } from '../data/fallback'

gsap.registerPlugin(ScrollTrigger)

const slides = [
  { bg:'/images/bg_1.jpg', sub:'Delicious', title:'Italian Cuizine', text:'A small river named Duden flows by their place and supplies it with the necessary regelialia.', img:'/images/bg_1.png', align:'left' },
  { bg:'/images/bg_1.jpg', sub:'Crunchy', title:'Italian Pizza', text:'A small river named Duden flows by their place and supplies it with the necessary regelialia.', img:'/images/bg_2.png', align:'right' },
  { bg:'/images/bg_3.jpg', sub:'Welcome', title:'We cooked your desired Pizza Recipe', text:'A small river named Duden flows by their place and supplies it with the necessary regelialia.', img:null, align:'center' },
]

export default function Home() {
  const [idx, setIdx] = useState(0)
  const [menu, setMenu] = useState<MenuItem[]>(fallbackMenu)
  const [tab, setTab] = useState<'pizza'|'drinks'|'burgers'|'pasta'>('pizza')
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => { const t = setInterval(()=>setIdx(i=> (i+1)%slides.length), 5000); return ()=>clearInterval(t) }, [])
  useEffect(() => { getMenuItems().then(setMenu).catch(()=>{}) }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, {autoAlpha:0, y:40}, {autoAlpha:1, y:0, duration:0.8, ease:'power2.out', scrollTrigger:{trigger:el, start:'top 85%'}})
      })
      gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
        const target = Number(el.dataset.counter || 0)
        const obj = { val: 0 }
        gsap.to(obj, { val: target, duration: 4, ease:'power1.out', scrollTrigger:{trigger:el, start:'top 90%'}, onUpdate:()=>{ el.textContent = Math.floor(obj.val).toLocaleString() } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const featured = menu.filter(m=>m.category==='pizza').slice(0,6)
  const tabItems = menu.filter(m=>m.category===tab).slice(0,3)
  void slides[idx]

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="relative h-[750px] overflow-hidden">
        {slides.map((sl, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i===idx?'opacity-100':'opacity-0'}`} style={{backgroundImage:`url(${sl.bg})`, backgroundSize:'cover', backgroundPosition:'center'}}>
            <div className="overlay-dark" />
            <div className="container h-full relative z-10">
              <div className={`h-full flex items-center ${sl.align==='center'?'justify-center text-center': 'justify-between'} flex-col md:flex-row gap-6`}>
                <div className={`text-white ${sl.align==='center'?'max-w-2xl':'md:w-1/2'} ${sl.align==='right'?'md:order-last md:text-left':'md:text-right'} text-center md:text-inherit`}>
                  <span className="subheading-script mb-2">{sl.sub}</span>
                  <h1 className="text-4xl md:text-[40px] uppercase tracking-wide mb-4">{sl.title}</h1>
                  <p className="text-lg font-light mb-8 text-white/95">{sl.text}</p>
                  <p className="flex gap-2 justify-center md:justify-start flex-wrap">
                    <a href="#" className="btn btn-primary px-6 py-4">Order Now</a>
                    <Link to="/menu" className="btn btn-outline-white px-6 py-4">View Menu</Link>
                  </p>
                </div>
                {sl.img && <div className="md:w-1/2 flex justify-center"><img src={sl.img} alt="" className="max-w-full h-auto max-h-[520px]" /></div>}
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_,i)=>(<button key={i} onClick={()=>setIdx(i)} className={`w-[18px] h-[18px] rounded-full border-2 ${i===idx?'border-white':'border-white/50'} p-[2px]`}><span className={`block w-full h-full rounded-full ${i===idx?'bg-white':'bg-white/50'}`}/></button>))}
        </div>
      </section>

      {/* Intro */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row">
          <div className="bg-black text-white p-8 lg:w-[65%] lg:pl-[12%] lg:pr-[5%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-4"><Phone className="text-primary shrink-0" size={20}/><div><h3 className="text-base text-white mb-1">000 (123) 456 7890</h3><p className="text-gray-500 mb-0">A small river named Duden flows</p></div></div>
              <div className="flex gap-4"><MapPin className="text-primary shrink-0" size={20}/><div><h3 className="text-base text-white mb-1">198 West 21th Street</h3><p className="text-gray-500 mb-0">Suite 721 New York NY 10016</p></div></div>
              <div className="flex gap-4"><Clock className="text-primary shrink-0" size={20}/><div><h3 className="text-base text-white mb-1">Open Monday-Friday</h3><p className="text-gray-500 mb-0">8:00am - 9:00pm</p></div></div>
            </div>
          </div>
          <div className="bg-primary lg:w-[35%] p-6 flex items-center lg:pl-12">
            <ul className="flex gap-6 text-white text-xl">
              <li><a href="#" className="text-white hover:opacity-80"><SocialIcon type="twitter"/></a></li>
              <li><a href="#" className="text-white hover:opacity-80"><SocialIcon type="facebook"/></a></li>
              <li><a href="#" className="text-white hover:opacity-80"><SocialIcon type="instagram"/></a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="flex flex-col md:flex-row" data-reveal>
        <div className="md:w-1/2 min-h-[300px] bg-cover bg-center" style={{backgroundImage:'url(/images/about.jpg)'}} />
        <div className="md:w-1/2 p-8 md:p-[5%] flex flex-col justify-center">
          <h2 className="text-[30px] uppercase mb-6">Welcome to <span className="text-primary inline-flex items-center gap-2"><Pizza className="inline"/>Pizza</span> A Restaurant</h2>
          <p className="text-gray-500">On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
        </div>
      </section>

      {/* Services */}
      <section className="section relative" style={{backgroundImage:'url(/images/food.png)', backgroundRepeat:'repeat'}}>
        <div className="absolute inset-0 bg-primary opacity-90" />
        <div className="container relative z-10">
          <div className="text-center mb-12" data-reveal>
            <h2 className="text-[#1d1503] text-[30px] uppercase mb-4">Our Services</h2>
            <p className="text-[#5c3d03] max-w-2xl mx-auto">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[{icon:Pizza,title:'Healthy Foods'},{icon:Medal,title:'Fastest Delivery'},{icon:ChefHat,title:'Original Recipes'}].map((sv,i)=>(
              <div key={i} className="group" data-reveal>
                <div className="w-[100px] h-[100px] mx-auto mb-8 relative flex items-center justify-center">
                  <span className="absolute inset-0 border border-[#bf7e06] group-hover:bg-[#f8b500] group-hover:rotate-[135deg] group-hover:border-transparent transition-all duration-300"/>
                  <sv.icon className="text-[#5c3d03] group-hover:text-white relative z-10 transition-colors" size={50} strokeWidth={1.2}/>
                </div>
                <h3 className="text-lg uppercase mb-4 text-[#1d1503]">{sv.title}</h3>
                <p className="text-[#5c3d03]">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot meals */}
      <section className="section pb-0">
        <div className="container">
          <div className="text-center mb-12" data-reveal>
            <h2 className="text-[30px] uppercase mb-4">Hot Pizza Meals</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {featured.map((item, i) => (
            <div key={item.id} className="flex flex-col sm:flex-row" data-reveal>
              <a className={`block sm:w-1/2 h-64 sm:h-auto bg-cover bg-center ${(i%6)>=3?'sm:order-last':''}`} style={{backgroundImage:`url(${item.image_url || '/images/pizza-1.jpg'})`}} />
              <div className="sm:w-1/2 bg-black/20 p-6 flex flex-col justify-center">
                <h3 className="text-xl mb-2">{item.name}</h3>
                <p className="text-gray-500 mb-3 text-sm">{item.description}</p>
                <p className="flex items-center gap-2"><span className="text-primary">${item.price.toFixed(2)}</span> <a href="#" className="btn btn-outline-white px-3 py-1 text-sm">Order</a></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12" data-reveal>
            <h2 className="text-[30px] uppercase mb-2">Our Menu Pricing</h2>
            <p className="flip"><span className="deg1"></span><span className="deg2"></span><span className="deg3"></span></p>
            <p className="text-gray-500 max-w-2xl mx-auto mt-6">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {menu.filter(m=>m.category==='pizza').slice(0,8).map((item)=>(
              <div key={item.id} className="flex mb-8" data-reveal>
                <div className="w-[60px] h-[60px] rounded-full bg-cover bg-center shrink-0" style={{backgroundImage:`url(${item.image_url||'/images/pizza-1.jpg'})`}} />
                <div className="pl-4 w-full">
                  <div className="flex items-end relative">
                    <h3 className="text-lg bg-[url('/images/bg_4.jpg')] bg-fixed pr-4 relative z-10"><span className="bg-[#121618]/0">{item.name}</span></h3>
                    <span className="flex-1 border-b border-dashed border-[#bf7e06] mb-2 mx-1"/>
                    <span className="text-primary bg-[url('/images/bg_4.jpg')] bg-fixed pl-2">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {[1,2,3,4].map(i => (
          <a key={i} href="#" className="group relative h-[300px] bg-cover bg-center block" style={{backgroundImage:`url(/images/gallery-${i}.jpg)`}} data-reveal>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[50px] h-[50px] relative flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute inset-0 bg-primary group-hover:rotate-[135deg] transition-transform duration-500" />
                <Search className="text-white relative z-10" size={20}/>
              </div>
            </div>
          </a>
        ))}
      </section>

      {/* Counter */}
      <section className="relative py-28 bg-cover bg-center" style={{backgroundImage:'url(/images/bg_2.jpg)'}}>
        <div className="absolute inset-0 bg-black/80" />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[{icon:Pizza,val:100,label:'Pizza Branches'},{icon:Medal,val:85,label:'Number of Awards'},{icon:Laugh,val:10567,label:'Happy Customer'},{icon:ChefHat,val:900,label:'Staff'}].map((c,i)=>(
              <div key={i} className="group" data-reveal>
                <div className="w-20 h-20 mx-auto mb-5 relative flex items-center justify-center">
                  <span className="absolute inset-0 border border-primary group-hover:bg-primary group-hover:rotate-[135deg] transition-all duration-300" />
                  <c.icon className="text-primary group-hover:text-black relative z-10" size={36} strokeWidth={1.3}/>
                </div>
                <strong className="block text-[30px] text-primary font-normal" data-counter={c.val}>0</strong>
                <span className="text-gray-400 text-sm">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu tabs */}
      <section className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 min-h-[300px] bg-cover bg-center" style={{backgroundImage:'url(/images/about.jpg)'}} />
        <div className="lg:w-2/3 p-6 md:p-12">
          <div className="flex flex-wrap gap-2 mb-8" data-reveal>
            {(['pizza','drinks','burgers','pasta'] as const).map(t => (
              <button key={t} onClick={()=>setTab(t)} className={`nav-link-pill capitalize ${tab===t?'active':''}`}>{t}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal>
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

      {/* Blog */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12" data-reveal>
            <h2 className="text-[30px] uppercase mb-4">Recent from blog</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} data-reveal>
                <Link to="/blog" className="block h-[270px] bg-cover bg-center" style={{backgroundImage:`url(/images/image_${i}.jpg)`}} />
                <div className="py-6">
                  <div className="text-sm text-gray-500 flex gap-4 mb-2"><span>Sept 10, 2018</span><span>Admin</span><span className="flex items-center gap-1"><MessageIcon/> 3</span></div>
                  <h3 className="text-lg mb-2"><Link to="/blog" className="text-white hover:text-primary">The Delicious Pizza</Link></h3>
                  <p className="text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment / Reservation teaser (replaces contact map section on home) */}
      <section className="flex flex-col md:flex-row bg-black">
        <div className="md:w-1/2 min-h-[300px] bg-cover bg-center" style={{backgroundImage:'url(/images/bg_2.jpg)'}} />
        <div className="md:w-1/2 p-8 md:p-[7%]">
          <h3 className="text-white text-2xl mb-6" data-reveal>Reserva tu mesa</h3>
          <p className="text-gray-400 mb-6" data-reveal>Haz tu reserva en línea y la gestionaremos desde nuestro panel de administración.</p>
          <Link to="/reservas" className="btn btn-primary px-6 py-4" data-reveal>Ir al formulario de reservas</Link>
        </div>
      </section>
    </div>
  )
}

function MessageIcon(){ return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg> }