import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Acerca from './pages/Acerca';
import Servicios from './pages/Servicios';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import Minijuego from './pages/Minijuego';
import Footer from './components/Footer';
import Post from "./pages/Post.jsx";
import Privacidad from "./pages/Privacidad.jsx";

import "./styles/animaciones.css";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route 
          path="/minijuego" 
          element={<div style={{ padding: "2rem" }}>El juego estará disponible próximamente.</div>}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/privacidad" element={<Privacidad />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
