import { Link } from 'react-router-dom'
import { Pizza, Medal, Laugh, ChefHat } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[500px] flex items-center justify-center text-center" style={{backgroundImage:'url(/images/bg_3.jpg)', backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="overlay-dark" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl uppercase mb-2">About</h1>
          <p className="breadcrumbs text-sm uppercase tracking-wider"><span className="border-b border-white/20 mr-2"><Link to="/" className="text-white">Home</Link></span> <span>About</span></p>
        </div>
      </section>
      <section className="flex flex-col md:flex-row">
        <div className="md:w-1/2 min-h-[350px] bg-cover bg-center" style={{backgroundImage:'url(/images/about.jpg)'}} />
        <div className="md:w-1/2 p-8 md:p-[5%] flex flex-col justify-center">
          <h2 className="text-[30px] uppercase mb-6">Welcome to <span className="text-primary inline-flex items-center gap-2"><Pizza className="inline"/>Pizza</span> A Restaurant</h2>
          <p className="text-gray-500">On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
        </div>
      </section>
      <section className="relative py-28 bg-cover bg-center" style={{backgroundImage:'url(/images/bg_2.jpg)'}}>
        <div className="absolute inset-0 bg-black/80" />
        <div className="container relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[{icon:Pizza,val:'100',label:'Pizza Branches'},{icon:Medal,val:'85',label:'Number of Awards'},{icon:Laugh,val:'10,567',label:'Happy Customer'},{icon:ChefHat,val:'900',label:'Staff'}].map((c,i)=>(
            <div key={i} className="group">
              <div className="w-20 h-20 mx-auto mb-5 relative flex items-center justify-center">
                <span className="absolute inset-0 border border-primary group-hover:bg-primary group-hover:rotate-[135deg] transition-all duration-300" />
                <c.icon className="text-primary group-hover:text-black relative z-10" size={36} strokeWidth={1.3}/>
              </div>
              <strong className="block text-[30px] text-primary font-normal">{c.val}</strong>
              <span className="text-gray-400 text-sm">{c.label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section text-center">
        <div className="container">
          <h2 className="text-[30px] uppercase mb-4">Our Chef</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i=>(
              <div key={i} className="border border-[#5c3d03] p-6 hover:border-primary transition-colors">
                <div className="w-[140px] h-[140px] rounded-full mx-auto mb-4 bg-cover bg-center border border-[#8d5d05]" style={{backgroundImage:`url(/images/person_${i}.jpg)`}} />
                <h3 className="text-primary text-[15px] uppercase">Tom Smith</h3>
                <span className="block text-xs text-gray-400 mb-3">Head Chef</span>
                <p className="text-gray-500 text-sm">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}