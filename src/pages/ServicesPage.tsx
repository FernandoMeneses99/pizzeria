import { Link } from 'react-router-dom'
import { Pizza, Bike, ChefHat } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div>
      <section className="relative h-[500px] flex items-center justify-center text-center" style={{backgroundImage:'url(/images/bg_3.jpg)', backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="overlay-dark" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl uppercase mb-2">Services</h1>
          <p className="breadcrumbs text-sm uppercase tracking-wider"><span className="border-b border-white/20 mr-2"><Link to="/" className="text-white">Home</Link></span> <span>Services</span></p>
        </div>
      </section>
      <section className="section relative" style={{backgroundImage:'url(/images/food.png)', backgroundRepeat:'repeat'}}>
        <div className="absolute inset-0 bg-primary opacity-90" />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-[#1d1503] text-[30px] uppercase mb-4">Our Services</h2>
            <p className="text-[#5c3d03] max-w-2xl mx-auto">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[{icon:Pizza,title:'Healthy Foods',desc:'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'},{icon:Bike,title:'Fastest Delivery',desc:'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'},{icon:ChefHat,title:'Original Recipes',desc:'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'}].map((sv,i)=>(
              <div key={i} className="group">
                <div className="w-[100px] h-[100px] mx-auto mb-8 relative flex items-center justify-center">
                  <span className="absolute inset-0 border border-[#bf7e06] group-hover:bg-[#f8b500] group-hover:rotate-[135deg] group-hover:border-transparent transition-all duration-300"/>
                  <sv.icon className="text-[#5c3d03] group-hover:text-white relative z-10 transition-colors" size={50} strokeWidth={1.2}/>
                </div>
                <h3 className="text-lg uppercase mb-4 text-[#1d1503]">{sv.title}</h3>
                <p className="text-[#5c3d03]">{sv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container text-center">
          <h2 className="text-[30px] uppercase mb-4">Hot Meals</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3,4,5].map(n => (
              <div key={n} className="bg-black/20 p-4 text-left">
                <div className="h-48 bg-cover bg-center mb-4" style={{backgroundImage:`url(/images/pizza-${n}.jpg)`}} />
                <h3 className="text-xl mb-2">Delicious Pizza</h3>
                <p className="text-gray-500 text-sm mb-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
                <p className="text-primary">$2.90</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}