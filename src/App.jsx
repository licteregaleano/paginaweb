import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Acerca from './pages/Acerca';
import Servicios from './pages/Servicios';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';

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
      </Routes>
    </>
  );
}

export default App;
