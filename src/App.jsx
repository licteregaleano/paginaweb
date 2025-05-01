import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar';
import Header from './components/Header';
import Presentation from './components/Presentation';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Articles from './components/Articles';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Header />
      <main>
        <Presentation />
        <Services />
        <Testimonials />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
