import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Calendar, User, MessageSquare } from 'lucide-react'

function SocialIcon({ type }: { type: 'twitter'|'facebook'|'instagram' }) {
  const common = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (type === 'twitter') return <svg {...common} viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  if (type === 'facebook') return <svg {...common} viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  return <svg {...common} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
}

export default function Footer() {
  return (
    <footer className="section bg-[#101315] text-white/70 relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h2 className="text-white text-base font-normal uppercase tracking-wider mb-10">About Us</h2>
            <p className="mb-6">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <ul className="flex gap-3 mt-8">
              {(['twitter','facebook','instagram'] as const).map((t,i)=>(<li key={i}><a href="#" className="w-[50px] h-[50px] rounded-full bg-white/5 flex items-center justify-center text-white hover:text-primary"><SocialIcon type={t}/></a></li>))}
            </ul>
          </div>
          <div>
            <h2 className="text-white text-base font-normal uppercase tracking-wider mb-10">Recent Blog</h2>
            {[1,2].map(i => (
              <div key={i} className="flex mb-4 gap-4">
                <a className="block w-20 h-20 bg-cover bg-center shrink-0" style={{backgroundImage:`url(/images/image_${i}.jpg)`}} />
                <div className="text-sm">
                  <h3 className="text-base font-light mb-2"><Link to="/blog" className="text-white/90 hover:text-primary">Even the all-powerful Pointing has no control about</Link></h3>
                  <div className="text-xs text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1"><Calendar size={12}/> Sept 15, 2018</span>
                    <span className="flex items-center gap-1"><User size={12}/> Admin</span>
                    <span className="flex items-center gap-1"><MessageSquare size={12}/> 19</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-white text-base font-normal uppercase tracking-wider mb-10">Services</h2>
            <ul className="space-y-2">
              {['Cooked','Deliver','Quality Foods','Mixed'].map(s=> <li key={s}><a href="#" className="text-white/70 hover:text-white py-1 block">{s}</a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-white text-base font-normal uppercase tracking-wider mb-10">Have a Questions?</h2>
            <ul className="space-y-4">
              <li className="flex gap-3"><MapPin className="text-white shrink-0 mt-1" size={18}/><span>203 Fake St. Mountain View, San Francisco, California, USA</span></li>
              <li className="flex gap-3"><Phone className="text-white shrink-0 mt-1" size={18}/><a href="tel:+23923929210">+2 392 3929 210</a></li>
              <li className="flex gap-3"><Mail className="text-white shrink-0 mt-1" size={18}/><a href="mailto:info@yourdomain.com">info@yourdomain.com</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-white/70 text-sm">
          <p>Copyright &copy; {new Date().getFullYear()} All rights reserved | Template inspired by Colorlib, rebuilt with React, Tailwind, shadcn/ui patterns, GSAP & Lucide. <Link to="/admin" className="text-primary/80 hover:text-primary ml-1">Admin</Link></p>
        </div>
      </div>
    </footer>
  )
}