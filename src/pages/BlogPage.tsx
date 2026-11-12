import { Link } from 'react-router-dom'
import { Calendar, User, MessageSquare } from 'lucide-react'

export default function BlogPage() {
  const posts = [1,2,3,4,5,6]
  return (
    <div>
      <section className="relative h-[500px] flex items-center justify-center text-center" style={{backgroundImage:'url(/images/bg_3.jpg)', backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="overlay-dark" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl uppercase mb-2">Read our Blog</h1>
          <p className="breadcrumbs text-sm uppercase tracking-wider"><span className="border-b border-white/20 mr-2"><Link to="/" className="text-white">Home</Link></span> <span>Blog</span></p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(i => (
              <div key={i}>
                <a href="#" className="block h-[270px] bg-cover bg-center" style={{backgroundImage:`url(/images/image_${(i%6)+1}.jpg)`}} />
                <div className="py-6">
                  <div className="text-sm text-gray-500 flex flex-wrap gap-4 mb-2"><span className="flex items-center gap-1"><Calendar size={14}/> Sept 10, 2018</span><span className="flex items-center gap-1"><User size={14}/> Admin</span><span className="flex items-center gap-1"><MessageSquare size={14}/> 3</span></div>
                  <h3 className="text-lg mb-2"><a href="#" className="text-white hover:text-primary">The Delicious Pizza</a></h3>
                  <p className="text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}