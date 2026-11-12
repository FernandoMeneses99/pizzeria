import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import ReservationsPage from './pages/ReservationsPage'
import AdminPage from './pages/admin/AdminPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reservas" element={<ReservationsPage />} />
        <Route path="/contact" element={<ReservationsPage />} />
      </Route>
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  )
}