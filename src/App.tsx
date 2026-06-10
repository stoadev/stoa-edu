import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/guards/ProtectedRoute'
import RedirectIfAuthenticated from './components/guards/RedirectIfAuthenticated'
import Home from './routes/Home'
import Courses from './routes/Courses'
import CourseDetail from './routes/CourseDetail'
import Categories from './routes/Categories'
import Cart from './routes/Cart'
import Checkout from './routes/Checkout'
import Login from './routes/Login'
import Register from './routes/Register'
import About from './routes/About'
import Contact from './routes/Contact'
import NotFound from './routes/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
