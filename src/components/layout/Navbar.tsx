import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Pizza } from 'lucide-react'
import { cn } from '../../lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/reservas', label: 'Reservas' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [awake, setAwake] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY
      setScrolled(st > 150)
      setAwake(st > 350)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={cn(
      'z-50 w-full transition-all duration-300',
      scrolled ? 'fixed top-0 left-0 right-0 bg-[#121618] shadow-[0_0_10px_0_rgba(0,0,0,.1)]' : 'absolute bg-[#121618] lg:bg-[#121618]',
      scrolled && !awake ? '-translate-y-[130px]' : 'translate-y-0'
    )} id="ftco-navbar">
      <div className="container flex flex-wrap items-center justify-between py-2 lg:py-0">
        <Link to="/" className="flex items-center gap-1 font-display text-white text-2xl leading-none py-2">
          <Pizza className="text-primary w-6 h-6 mr-1" />
          <span className="flex flex-col">
            <span>Pizza</span>
            <small className="uppercase text-[11px] tracking-[4px] text-primary text-center -mt-0.5">Delicous</small>
          </span>
        </Link>
        <button className="lg:hidden text-white/80 uppercase tracking-widest text-sm flex items-center gap-1" onClick={()=>setOpen(v=>!v)} aria-label="Menu">
          {open ? <X size={18}/> : <Menu size={18}/>} Menu
        </button>
        <div className={cn('w-full lg:w-auto lg:flex', open ? 'block' : 'hidden')}>
          <ul className="flex flex-col lg:flex-row lg:items-center lg:ml-auto py-2 lg:py-0">
            {links.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to==='/'} className={({isActive})=>cn(
                  'block text-sm py-2 lg:py-6 lg:px-5 transition-colors',
                  isActive ? 'text-primary' : 'text-white/70 hover:text-primary'
                )}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}